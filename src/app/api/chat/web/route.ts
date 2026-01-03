import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Message from '@/models/Message';

// GET: Fetch chat history for a user
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const phone = searchParams.get('phone');

        if (!phone) {
            return NextResponse.json(
                { success: false, message: 'Phone number is required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Fetch last 50 messages, sorted by time
        const messages = await Message.find({ phone })
            .sort({ createdAt: 1 })
            .limit(50);

        return NextResponse.json({
            success: true,
            messages: messages.map(msg => ({
                id: msg._id,
                from: msg.role === 'user' ? 'user' : 'sakha', // Map DB role to frontend role
                text: msg.content,
                timestamp: msg.createdAt,
            })),
        });
    } catch (error) {
        console.error('Fetch history error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch history' },
            { status: 500 }
        );
    }
}

// POST: Send a message and get a response
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { phone, message } = body;

        if (!phone || !message) {
            return NextResponse.json(
                { success: false, message: 'Phone and message are required' },
                { status: 400 }
            );
        }

        await connectDB();

        // 1. Save USER message to DB
        await Message.create({
            phone,
            role: 'user',
            content: message,
        });

        console.log(`[Chat/Web] Saved message from ${phone}: "${message}"`);

        // 2. Generate BOT response (Simulated for now, replace with AI call later)
        // Here you would normally call your Python/LLM API
        const botResponseText = "I'm a professional health assistant designed to help with medical concerns. 👩‍⚕️\n\nI can help with *health-related* questions about:\n• Sexual health (STDs, contraception, reproductive health)\n• Mental health (including LGBTQ+ support)\n• Abuse/assault (support resources)\n\nBut I cannot engage with inappropriate, offensive, or non-medical content.\n\nIf you have a genuine health question, please rephrase it professionally. 😊";

        // 3. Save BOT response to DB
        await Message.create({
            phone,
            role: 'assistant',
            content: botResponseText,
        });

        return NextResponse.json({
            success: true,
            response: botResponseText,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({
            success: false,
            message: 'Chat request failed'
        }, { status: 500 });
    }
}
