import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phone, message } = body;

        // Simulate Backend Logic
        // In a real app, this would connect to the Python/LLM backend
        // For now, we return the EXACT response format from the user's screenshot

        console.log(`Chat request from ${phone}: ${message}`);

        return NextResponse.json({
            success: true,
            response: "I'm a professional health assistant designed to help with medical concerns. 👩‍⚕️\n\nI can help with *health-related* questions about:\n• Sexual health (STDs, contraception, reproductive health)\n• Mental health (including LGBTQ+ support)\n• Abuse/assault (support resources)\n\nBut I cannot engage with inappropriate, offensive, or non-medical content.\n\nIf you have a genuine health question, please rephrase it professionally. 😊",
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Chat request failed'
        }, { status: 500 });
    }
}
