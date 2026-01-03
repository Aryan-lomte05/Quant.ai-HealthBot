import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { emailOrPhone, password } = body;

        // Validate required fields
        if (!emailOrPhone || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Email/Phone and password are required',
                },
                { status: 400 }
            );
        }

        // Connect to database
        await connectDB();

        // Find user by email or phone
        const user = await User.findOne({
            $or: [
                { email: emailOrPhone.toLowerCase() },
                { phone: emailOrPhone },
            ],
        });

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid credentials',
                },
                { status: 401 }
            );
        }

        // Verify password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid credentials',
                },
                { status: 401 }
            );
        }

        // Check if user is verified
        if (!user.isVerified) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Please verify your phone number first',
                    requiresVerification: true,
                    phone: user.phone,
                },
                { status: 403 }
            );
        }

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
            message: 'Login successful',
            user: userData,
            token,
        });
    } catch (error: any) {
        console.error('Login error:', error);

        return NextResponse.json(
            {
                success: false,
                message: 'Login failed. Please try again.',
            },
            { status: 500 }
        );
    }
}
