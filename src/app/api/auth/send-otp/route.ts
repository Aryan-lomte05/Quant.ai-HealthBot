import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phone } = body;

        console.log(`Sending OTP to ${phone}`);

        // Simulate Success
        return NextResponse.json({
            success: true,
            message: 'OTP sent successfully'
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Failed to send OTP'
        }, { status: 500 });
    }
}
