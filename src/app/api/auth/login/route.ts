import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phone } = body;

        return NextResponse.json({
            success: true,
            phone: phone,
            message: 'Login successful'
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Login failed'
        }, { status: 500 });
    }
}
