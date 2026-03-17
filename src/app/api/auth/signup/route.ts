import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { createToken, setTokenCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const { username, email, password } = await request.json();

        // Validate inputs
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: 'Username, email, and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        // Check if username or email already exists
        const existingUser = await User.findOne({
            $or: [{ username: username.toLowerCase() }, { email: email.toLowerCase() }],
        });

        if (existingUser) {
            if (existingUser.username === username.toLowerCase()) {
                return NextResponse.json(
                    { error: 'Username is already taken' },
                    { status: 409 }
                );
            }
            if (existingUser.googleId) {
                return NextResponse.json(
                    { error: 'This email is registered via Google. Please use "Continue with Google" to login.' },
                    { status: 409 }
                );
            }
            return NextResponse.json(
                { error: 'Email is already registered' },
                { status: 409 }
            );
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            passwordHash,
        });

        // Create JWT and set cookie
        const token = createToken({
            userId: user._id.toString(),
            username: user.username,
            email: user.email,
        });

        await setTokenCookie(token);

        return NextResponse.json(
            {
                message: 'Account created successfully',
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    slug: user.slug,
                },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error('Signup error:', error);

        // Handle mongoose validation errors
        if (error && typeof error === 'object' && 'name' in error && (error as any).name === 'ValidationError') {
            const messages = Object.values((error as any).errors).map((e: any) => e.message);
            return NextResponse.json({ error: messages.join(', ') }, { status: 400 });
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
