import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

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

        const user = await User.findOne({ phone }).select('-password');

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                age: user.age,
                weight: user.weight,
                height: user.height,
                gender: user.gender,
                location: user.location,
                isVerified: user.isVerified,
                points: user.points,
                badges: user.badges,
                bloodGroup: user.bloodGroup,
                allergies: user.allergies,
                conditions: user.conditions,
                emergencyContact: user.emergencyContact,
                createdAt: user.createdAt,
            }
        });
    } catch (error: any) {
        console.error('Fetch user error:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to fetch user' },
            { status: 500 }
        );
    }
}

export async function PATCH(request: Request) {
    try {
        const body = await request.json();
        const { id, name, email, phone, age, weight, height, gender, location, points, bloodGroup, allergies, conditions, emergencyContact } = body;

        if (!id) {
            return NextResponse.json(
                { success: false, message: 'User ID is required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, phone, age, weight, height, gender, location, points, bloodGroup, allergies, conditions, emergencyContact },
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Profile updated successfully',
            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                age: updatedUser.age,
                weight: updatedUser.weight,
                height: updatedUser.height,
                gender: updatedUser.gender,
                location: updatedUser.location,
                points: updatedUser.points,
                badges: updatedUser.badges,
                bloodGroup: updatedUser.bloodGroup,
                allergies: updatedUser.allergies,
                conditions: updatedUser.conditions,
                emergencyContact: updatedUser.emergencyContact,
            }
        });
    } catch (error: any) {
        console.error('Update user error:', error);
        return NextResponse.json(
            { success: false, message: error.message || 'Failed to update user' },
            { status: 500 }
        );
    }
}
