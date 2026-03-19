import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Redis } from '@upstash/redis';

const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const RATE_LIMIT_WINDOW = 60; // seconds
const MAX_REQUESTS = 60;

export async function proxy(request: NextRequest) {
    // Skip non-API routes early
    if (!request.nextUrl.pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0] ||
        request.headers.get('x-real-ip') ||
        'anonymous';

    const key = `rate_limit:${ip}`;

    const current = await redis.incr(key);

    if (current === 1) {
        await redis.expire(key, RATE_LIMIT_WINDOW);
    }

    if (current > MAX_REQUESTS) {
        return NextResponse.json(
            { error: 'Too many requests, please try again later.' },
            { status: 429 }
        );
    }

    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', MAX_REQUESTS.toString());
    response.headers.set(
        'X-RateLimit-Remaining',
        Math.max(0, MAX_REQUESTS - current).toString()
    );

    return response;
}

export const config = {
    matcher: '/api/:path*',
};