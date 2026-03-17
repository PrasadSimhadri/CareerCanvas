import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getUserFromRequest } from '@/lib/auth';

// GET: Fetch current user's portfolio data
export async function GET(request: NextRequest) {
    try {
        const payload = getUserFromRequest(request);

        if (!payload) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        await connectDB();

        const user = await User.findById(payload.userId).select('-passwordHash');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ portfolio: user });
    } catch (error) {
        console.error('Get portfolio error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// PUT: Update portfolio data
export async function PUT(request: NextRequest) {
    try {
        const payload = getUserFromRequest(request);

        if (!payload) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        await connectDB();

        const data = await request.json();

        // Fields that can be updated
        const allowedFields = [
            'selectedTemplate',
            'profileImageUrl',
            'basicInfo',
            'about',
            'education',
            'experience',
            'projects',
            'skills',
            'achievements',
            'contact',
        ];

        // Build update object with only allowed fields
        const updateData: Record<string, unknown> = {};
        for (const field of allowedFields) {
            if (data[field] !== undefined) {
                updateData[field] = data[field];
            }
        }

        const user = await User.findByIdAndUpdate(
            payload.userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-passwordHash');

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: 'Portfolio updated successfully',
            portfolio: user,
        });
    } catch (error) {
        console.error('Update portfolio error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
