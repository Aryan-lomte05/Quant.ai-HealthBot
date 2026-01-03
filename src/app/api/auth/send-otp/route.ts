import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phone } = body;

        if (!phone) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Phone number is required',
                },
                { status: 400 }
            );
        }

        await connectDB();

        console.log('SEND-OTP: Searching for user with phone:', phone);
        let user = await User.findOne({ phone });
        console.log('SEND-OTP: User found:', user ? 'Yes' : 'No');

        // Generate new OTP (Fixed for testing)
        const otp = '123456';
        const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        if (!user) {
            console.log('SEND-OTP: Creating new temporary user for phone:', phone);
            user = await User.create({
                phone,
                otp,
                otpExpiry,
                isVerified: false,
                name: 'Guest', // Placeholder
                email: `${phone}@temp.com`, // Placeholder to satisfy unique constraint temporarily
                password: await import('bcryptjs').then(b => b.hash(Math.random().toString(36), 10)), // Random placeholder password
            });
            console.log('SEND-OTP: User created successfully');
        } else {
            // Update existing user's OTP
            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();
        }

        // In a real application, you would send this OTP via SMS (e.g., Twilio)
        // For development/demo, we'll return it in the response or log it
        console.log(`Generated OTP for ${phone}: ${otp}`);

        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully',
            otp: otp,
        });
    } catch (error: any) {
        console.error('Send OTP error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to send OTP',
            },
            { status: 500 }
        );
    }
}
