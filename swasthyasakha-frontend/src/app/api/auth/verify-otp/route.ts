import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { otp } = body;

        // Simulate Success for any 6 digit OTP
        if (otp && otp.length === 6) {
            return NextResponse.json({
                success: true,
                message: 'OTP verified successfully'
            });
        }

        return NextResponse.json({
            success: false,
            message: 'Invalid OTP'
        }, { status: 400 });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to verify OTP'
        }, { status: 500 });
    }
}
