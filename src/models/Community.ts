import mongoose, { Schema, Document, Model } from 'mongoose';

// Answer subdocument interface
export interface IAnswer {
    _id?: string;
    userId?: string; // Optional - for logged-in users
    author: string; // Anonymous name like "NeemTree-47" or "SwasthyaSakha AI"
    text: string;
    isAI: boolean; // true if this is an AI-generated response
    isVerifiedDoctor?: boolean;
    timestamp: Date;
}

// Question document interface
export interface IQuestion extends Document {
    userId?: string; // Optional - for logged-in users
    author: string; // Anonymous name like "NeemTree-47"
    text: string; // Question title
    details?: string; // Additional context
    topic: string; // Category: General, Diabetes, Heart Health, etc.
    upvotes: number;
    upvotedBy: string[]; // Array of user IDs who upvoted
    answers: IAnswer[];
    aiResponse?: string; // Direct AI response from ML endpoint
    aiIntent?: string; // Intent detected by ML model
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
}

// Answer schema
const AnswerSchema = new Schema<IAnswer>(
    {
        userId: {
            type: String,
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
        },
        text: {
            type: String,
            required: [true, 'Answer text is required'],
            minlength: [10, 'Answer must be at least 10 characters'],
            maxlength: [2000, 'Answer cannot exceed 2000 characters'],
        },
        isAI: {
            type: Boolean,
            default: false,
        },
        isVerifiedDoctor: {
            type: Boolean,
            default: false,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: true } // Enable _id for subdocuments
);

// Question schema
const QuestionSchema = new Schema<IQuestion>(
    {
        userId: {
            type: String,
            trim: true,
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
            default: 'NeemTree-47', // Default anonymous name
        },
        text: {
            type: String,
            required: [true, 'Question text is required'],
            minlength: [10, 'Question must be at least 10 characters'],
            maxlength: [300, 'Question cannot exceed 300 characters'],
            trim: true,
        },
        details: {
            type: String,
            maxlength: [1000, 'Details cannot exceed 1000 characters'],
            trim: true,
        },
        topic: {
            type: String,
            required: [true, 'Topic is required'],
            enum: [
                'General',
                'Diabetes',
                'Heart Health',
                'Nutrition',
                'Mental Health',
                'Pregnancy',
                'Fitness',
                'Skin Care',
                'Respiratory',
                'Digestion',
            ],
            default: 'General',
        },
        upvotes: {
            type: Number,
            default: 0,
            min: [0, 'Upvotes cannot be negative'],
        },
        upvotedBy: {
            type: [String],
            default: [],
        },
        answers: {
            type: [AnswerSchema],
            default: [],
        },
        aiResponse: {
            type: String,
        },
        aiIntent: {
            type: String,
        },
        viewCount: {
            type: Number,
            default: 0,
            min: [0, 'View count cannot be negative'],
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
QuestionSchema.index({ createdAt: -1 }); // Sort by newest
QuestionSchema.index({ upvotes: -1 }); // Sort by most upvoted
QuestionSchema.index({ topic: 1 }); // Filter by topic
QuestionSchema.index({ userId: 1 }); // Filter by user
QuestionSchema.index({ text: 'text', details: 'text' }); // Text search

// Prevent model recompilation in development
const Question: Model<IQuestion> =
    mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema);

export default Question;
