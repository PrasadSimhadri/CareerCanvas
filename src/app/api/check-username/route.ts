import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json(
                { error: 'Username is required' },
                { status: 400 }
            );
        }

        if (username.length < 3) {
            return NextResponse.json({
                available: false,
                message: 'Username must be at least 3 characters',
            });
        }

        if (!/^[a-z0-9_-]+$/.test(username.toLowerCase())) {
            return NextResponse.json({
                available: false,
                message: 'Username can only contain lowercase letters, numbers, hyphens, and underscores',
            });
        }

        await connectDB();

        const existingUser = await User.findOne({ username: username.toLowerCase() });

        return NextResponse.json({
            available: !existingUser,
            message: existingUser ? 'Username is already taken' : 'Username is available',
        });
    } catch (error) {
        console.error('Check username error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
