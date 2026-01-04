import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Question from '@/models/Community';

// GET - Fetch specific question by ID
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;

        await connectDB();

        const question = await Question.findById(id).lean();

        if (!question) {
            return NextResponse.json(
                { success: false, message: 'Question not found' },
                { status: 404 }
            );
        }

        // Increment view count
        await Question.findByIdAndUpdate(id, { $inc: { viewCount: 1 } });

        return NextResponse.json({
            success: true,
            question: {
                id: question._id.toString(),
                userId: question.userId,
                author: question.author,
                text: question.text,
                details: question.details,
                topic: question.topic,
                upvotes: question.upvotes,
                upvotedBy: question.upvotedBy || [],
                answers: (question.answers || []).map((a: any) => ({
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
                viewCount: question.viewCount + 1,
                timestamp: question.createdAt,
            },
        });
    } catch (error: any) {
        console.error('Fetch question error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch question' },
            { status: 500 }
        );
    }
}

// PATCH - Update question (upvotes, add answer)
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const body = await request.json();
        const { action, userId, answerText, author } = body;

        await connectDB();

        const question = await Question.findById(id);

        if (!question) {
            return NextResponse.json(
                { success: false, message: 'Question not found' },
                { status: 404 }
            );
        }

        if (action === 'upvote' && userId) {
            // Toggle upvote
            const hasUpvoted = question.upvotedBy.includes(userId);

            if (hasUpvoted) {
                // Remove upvote
                question.upvotes = Math.max(0, question.upvotes - 1);
                question.upvotedBy = question.upvotedBy.filter((id: string) => id !== userId);
            } else {
                // Add upvote
                question.upvotes += 1;
                question.upvotedBy.push(userId);
            }

            await question.save();

            return NextResponse.json({
                success: true,
                message: hasUpvoted ? 'Upvote removed' : 'Upvoted successfully',
                upvotes: question.upvotes,
                hasUserUpvoted: !hasUpvoted,
            });
        } else if (action === 'add_answer' && answerText) {
            // Add new answer
            question.answers.push({
                userId,
                author: author || 'NeemTree-47',
                text: answerText,
                isAI: false,
                isVerifiedDoctor: false,
                timestamp: new Date(),
            });

            await question.save();

            return NextResponse.json({
                success: true,
                message: 'Answer added successfully',
                answers: question.answers.map((a: any) => ({
                    id: a._id?.toString(),
                    userId: a.userId,
                    author: a.author,
                    text: a.text,
                    isAI: a.isAI,
                    isVerifiedDoctor: a.isVerifiedDoctor,
                    timestamp: a.timestamp,
                })),
            });
        } else {
            return NextResponse.json(
                { success: false, message: 'Invalid action' },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Update question error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update question' },
            { status: 500 }
        );
    }
}

// DELETE - Delete question (owner only)
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json(
                { success: false, message: 'User ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const question = await Question.findById(id);

        if (!question) {
            return NextResponse.json(
                { success: false, message: 'Question not found' },
                { status: 404 }
            );
        }

        // Check ownership
        if (question.userId !== userId) {
            return NextResponse.json(
                { success: false, message: 'Unauthorized - you can only delete your own questions' },
                { status: 403 }
            );
        }

        await Question.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: 'Question deleted successfully',
        });
    } catch (error: any) {
        console.error('Delete question error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to delete question' },
            { status: 500 }
        );
    }
}
