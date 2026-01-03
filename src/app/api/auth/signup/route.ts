import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, password, age, weight, height, gender, location } = body;

        // Validate required fields
        if (!name || !email || !phone || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Name, email, phone, and password are required',
                },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 8) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Password must be at least 8 characters',
                },
                { status: 400 }
            );
        }

        // Connect to database
        await connectDB();

        // 1. Check if an account with this email ALREADY exists and is FULLY REGISTERED (not a placeholder)
        // We check if email exists AND name is NOT 'Guest' (or checks if we are updating a different user)
        const existingEmail = await User.findOne({ email: email.toLowerCase() });
        // If we find a user with this email, and it's NOT the user currently trying to signup (by phone), block it
        if (existingEmail && existingEmail.phone !== phone) {
            return NextResponse.json(
                { success: false, message: 'Email already registered' },
                { status: 409 }
            );
        }

        // 2. Find the user by phone (which should have been created/verified by OTP step)
        const user = await User.findOne({ phone });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Please verify your phone number first' },
                { status: 400 }
            );
        }

        if (!user.isVerified) {
            return NextResponse.json(
                { success: false, message: 'Phone number not verified' },
                { status: 400 }
            );
        }

        // 3. Update the verified placeholder user with full details
        // We use findOneAndUpdate or just save updates
        user.name = name;
        user.email = email.toLowerCase();
        user.password = password; // Will be hashed by save hook
        user.age = age ? Number(age) : undefined;
        user.weight = weight ? Number(weight) : undefined;
        user.height = height ? Number(height) : undefined;
        user.gender = gender;
        user.location = location;

        // Clear OTP fields
        user.otp = undefined;
        user.otpExpiry = undefined;

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, phone: user.phone },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Return user data (without password)
        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            age: user.age,
            weight: user.weight,
            height: user.height,
            gender: user.gender,
            location: user.location,
            isVerified: user.isVerified,
            createdAt: user.createdAt,
        };

        return NextResponse.json({
            success: true,
            message: 'User registered successfully. Please verify your phone number.',
            user: userData,
            token,
        });
    } catch (error: any) {
        console.error('Signup error:', error);

        // Handle mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map((err: any) => err.message);
            return NextResponse.json(
                {
                    success: false,
                    message: messages.join(', '),
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: 'Signup failed. Please try again.',
            },
            { status: 500 }
        );
    }
}
