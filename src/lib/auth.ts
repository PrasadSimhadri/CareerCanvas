import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_NAME = 'careercanvas_token';
const TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

if (!JWT_SECRET) {
    throw new Error('Please define JWT_SECRET in .env.local');
}

export interface JWTPayload {
    userId: string;
    username: string;
    email: string;
}

//  Create a JWT token from user data
export function createToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
        expiresIn: TOKEN_MAX_AGE,
    });
}

// Verify and decode a JWT token
export function verifyToken(token: string): JWTPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch {
        return null;
    }
}

// Set the JWT token as an HTTP-only cookie (for use in API routes)
export async function setTokenCookie(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(TOKEN_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: TOKEN_MAX_AGE,
        path: '/',
    });
}

// Remove the JWT cookie (logout)
export async function removeTokenCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(TOKEN_NAME);
}

// Get the current user from the JWT cookie (for Server Components / API routes)
export async function getCurrentUser(): Promise<JWTPayload | null> {
    const cookieStore = await cookies(); // no await
    const token = cookieStore.get(TOKEN_NAME)?.value;

    if (!token) return null;

    return verifyToken(token);
}

// Get the current user from the request (for API route handlers)
export function getUserFromRequest(request: NextRequest): JWTPayload | null {
    const token = request.cookies.get(TOKEN_NAME)?.value;

    if (!token) return null;
    return verifyToken(token);
}
