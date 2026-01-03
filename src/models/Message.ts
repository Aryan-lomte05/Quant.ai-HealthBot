import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IMessage extends Document {
    phone: string; // User ID
    role: 'user' | 'assistant'; // Who sent the message
    content: string;
    createdAt: Date;
}

const MessageSchema = new Schema<IMessage>(
    {
        phone: {
            type: String,
            required: true,
            index: true, // Indexed for fast retrieval by user
        },
        role: {
            type: String,
            enum: ['user', 'assistant'],
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt
    }
);

// Prevent model recompilation in development
const Message: Model<IMessage> =
    mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;
