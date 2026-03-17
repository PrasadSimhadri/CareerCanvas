import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Review from '@/models/Review';
import { getCurrentUser } from '@/lib/auth';
import { sendFeedbackEmail } from '@/lib/mail';

export async function GET() {
    try {
        await connectDB();
        const reviews = await Review.find().sort({ createdAt: -1 }).limit(10);
        return NextResponse.json({ reviews });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        
        const userPayload = await getCurrentUser();
        
        if (!userPayload) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { rating, comment, isSuggestion } = await req.json();

        if (rating === undefined || !comment) {
            return NextResponse.json({ error: 'Rating and comment are required' }, { status: 400 });
        }

        const newReview = await Review.create({
            user: userPayload.userId,
            username: userPayload.username,
            rating,
            comment,
            isSuggestion: !!isSuggestion,
        });

        // Send email notification to admin
        try {
            await sendFeedbackEmail(userPayload.username, rating, comment, !!isSuggestion);
        } catch (emailError) {
            console.error('Failed to send feedback email:', emailError);
            // Don't fail the request if email fails
        }

        return NextResponse.json({ success: true, review: newReview });
    } catch (error) {
        console.error('Review submission error:', error);
        return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
    }
}
