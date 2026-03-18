import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory store for rate limiting
// Note: In a production environment with multiple instances, use Redis or a similar shared store.
const rateLimitStore = new Map<string, { count: number; lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60; // 60 requests per minute

export function middleware(request: NextRequest) {
    // Only apply rate limiting to API routes
    if (request.nextUrl.pathname.startsWith('/api')) {
        const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 'anonymous';
        const now = Date.now();
        
        const rateLimitInfo = rateLimitStore.get(ip) || { count: 0, lastReset: now };

        // Reset the window if it's expired
        if (now - rateLimitInfo.lastReset > RATE_LIMIT_WINDOW) {
            rateLimitInfo.count = 0;
            rateLimitInfo.lastReset = now;
        }

        rateLimitInfo.count++;
        rateLimitStore.set(ip, rateLimitInfo);

        if (rateLimitInfo.count > MAX_REQUESTS) {
            return NextResponse.json(
                { error: 'Too many requests, please try again later.' },
                { status: 429 }
            );
        }
    }

    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
};
