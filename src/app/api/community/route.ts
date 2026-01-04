import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Question from '@/models/Community';

// GET - Fetch all questions with filters
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const topic = searchParams.get('topic');
        const search = searchParams.get('search');
        const sortBy = searchParams.get('sortBy') || 'newest';
        const userId = searchParams.get('userId');

        await connectDB();

        // Build query
        let query: any = {};

        if (topic && topic !== 'General') {
            if (topic === 'my_questions' && userId) {
                query.userId = userId;
            } else {
                query.topic = topic;
            }
        }

        if (search) {
            query.$or = [
                { text: { $regex: search, $options: 'i' } },
                { details: { $regex: search, $options: 'i' } },
            ];
        }

        // Build sort
        let sort: any = {};
        if (sortBy === 'upvoted') {
            sort = { upvotes: -1, createdAt: -1 };
        } else {
            sort = { createdAt: -1 };
        }

        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;

        const total = await Question.countDocuments(query);

        const questions = await Question.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit)
            .lean();

        return NextResponse.json({
            success: true,
            questions: questions.map(q => ({
                id: q._id.toString(),
                userId: q.userId,
                author: q.author,
                text: q.text,
                details: q.details,
                topic: q.topic,
                upvotes: q.upvotes,
                upvotedBy: q.upvotedBy || [],
                answers: (q.answers || []).map((a: any) => ({
                    id: a._id?.toString(),
                    userId: a.userId,
                    author: a.author,
                    text: a.text,
                    isAI: a.isAI,
                    isVerifiedDoctor: a.isVerifiedDoctor,
                    timestamp: a.timestamp,
                })),
                aiResponse: q.aiResponse,
                aiIntent: q.aiIntent,
                viewCount: q.viewCount,
                timestamp: q.createdAt,
            })),
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error: any) {
        console.error('Fetch questions error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch questions' },
            { status: 500 }
        );
    }
}

// POST - Create new question and optionally get AI response
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, author, text, details, topic, getAIResponse } = body;

        if (!text || !topic) {
            return NextResponse.json(
                { success: false, message: 'Question text and topic are required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Create question
        const question = new Question({
            userId,
            author: author || 'NeemTree-47',
            text,
            details: details || '',
            topic,
            upvotes: 0,
            upvotedBy: [],
            answers: [],
            viewCount: 0,
        });

        // Optionally get AI response from ML endpoint
        if (getAIResponse) {
            try {
                const mlEndpoint = process.env.ML_ENDPOINT || 'https://unoperated-merideth-sparklike.ngrok-free.dev/ask';
                const mlResponse = await fetch(mlEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        question: `${text}${details ? '. ' + details : ''}`,
                        user_id: userId,
                    }),
                });

                if (mlResponse.ok) {
                    const mlData = await mlResponse.json();

                    // Store AI response
                    question.aiResponse = mlData.response;
                    question.aiIntent = mlData.intent;

                    // Add AI response as an answer
                    question.answers.push({
                        author: 'SwasthyaSakha AI',
                        text: mlData.response,
                        isAI: true,
                        isVerifiedDoctor: false,
                        timestamp: new Date(),
                    });
                }
            } catch (mlError) {
                console.error('ML endpoint error:', mlError);
                // Continue without AI response
            }
        }

        await question.save();

        return NextResponse.json({
            success: true,
            message: 'Question posted successfully',
            question: {
                id: question._id.toString(),
                userId: question.userId,
                author: question.author,
                text: question.text,
                details: question.details,
                topic: question.topic,
                upvotes: question.upvotes,
                upvotedBy: question.upvotedBy,
                answers: question.answers.map((a: any) => ({
                    id: a._id?.toString(),
                    userId: a.userId,
                    author: a.author,
                    text: a.text,
                    isAI: a.isAI,
                    isVerifiedDoctor: a.isVerifiedDoctor,
                    timestamp: a.timestamp,
                })),
                aiResponse: question.aiResponse,
                aiIntent: question.aiIntent,
                viewCount: question.viewCount,
                timestamp: question.createdAt,
            },
        });
    } catch (error: any) {
        console.error('Create question error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to create question' },
            { status: 500 }
        );
    }
}
