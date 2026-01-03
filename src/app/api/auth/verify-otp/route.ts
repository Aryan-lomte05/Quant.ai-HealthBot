import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phone, otp } = body;

        if (!phone || !otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Phone number and OTP are required',
                },
                { status: 400 }
            );
        }

        await connectDB();

        console.log('VERIFY-OTP: Searching for user with phone:', phone);
        const user = await User.findOne({ phone });
        console.log('VERIFY-OTP: User found:', user ? 'Yes' : 'No');

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found',
                },
                { status: 404 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json({
                success: true,
                message: 'User already verified',
            });
        }

        // Check if OTP matches and is not expired
        // In production, you would check otpExpiry. For now ensuring otp matches is enough provided it exists.
        if (user.otp !== otp) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Invalid OTP',
                },
                { status: 400 }
            );
        }

        // Check expiry if set.
        if (user.otpExpiry && user.otpExpiry < new Date()) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'OTP has expired',
                },
                { status: 400 }
            );
        }

        // Verify user
        console.log('VERIFY-OTP: Marking user as verified for phone:', phone);
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();
        console.log('VERIFY-OTP: User saved successfully');

        return NextResponse.json({
            success: true,
            message: 'Phone number verified successfully',
        });
    } catch (error: any) {
        console.error('Verify OTP error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Verification failed',
            },
            { status: 500 }
        );
    }
}
