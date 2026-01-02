import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        return NextResponse.json({
            success: true,
            message: 'User registered successfully'
        });
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Signup failed'
        }, { status: 500 });
    }
}
