import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    try {
        const payload = await getCurrentUser();

        if (!payload) {
            return NextResponse.json(
                { user: null },
                { status: 200 }
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

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
