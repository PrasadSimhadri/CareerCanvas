import { NextRequest, NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { createToken, setTokenCookie } from '@/lib/auth';

const client = new OAuth2Client(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { credential } = await request.json();

        if (!credential) {
            return NextResponse.json({ error: 'Google credential is required' }, { status: 400 });
        }

        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return NextResponse.json({ error: 'Invalid Google token' }, { status: 400 });
        }

        const { email, name, picture, sub: googleId } = payload;

        // Find or create user
        let user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Create a new user if not exists
            // Generate a unique username from name
            let baseUsername = name?.toLowerCase().replace(/\s+/g, '') || email.split('@')[0];
            let username = baseUsername;
            let counter = 1;
            
            while (await User.findOne({ username })) {
                username = `${baseUsername}${counter}`;
                counter++;
            }

            user = await User.create({
                username,
                email: email.toLowerCase(),
                profileImageUrl: picture,
                googleId,
                // No password for Google users
                basicInfo: {
                    fullName: name || '',
                    tagline: '',
                    description: '',
                },
            });
        }

        // Create JWT and set cookie
        const token = createToken({
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
        });

        await setTokenCookie(token);

        return NextResponse.json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                slug: user.slug,
            },
        });
    } catch (error) {
        console.error('Google Auth error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
