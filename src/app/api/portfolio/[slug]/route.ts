import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug) {
            return NextResponse.json(
                { error: 'Slug is required' },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findOne({ slug }).select('-passwordHash -email');

        if (!user) {
            return NextResponse.json(
                { error: 'Portfolio not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ portfolio: user });
    } catch (error) {
        console.error('Get portfolio by slug error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
