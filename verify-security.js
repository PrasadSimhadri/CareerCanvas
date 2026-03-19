const http = require('http');

const API_BASE = 'http://localhost:3000/api';
const REVIEWS_URL = `${API_BASE}/reviews`;
const PORTFOLIO_URL = `${API_BASE}/portfolio`;

async function testRateLimiting() {
    // console.log('--- Testing Rate Limiting ---');
    let successCount = 0;
    let rateLimitedCount = 0;

    // We'll try to hit the API 70 times (limit is 60)
    for (let i = 0; i < 70; i++) {
        try {
            const res = await fetch(REVIEWS_URL);
            if (res.status === 200) {
                successCount++;
            } else if (res.status === 429) {
                rateLimitedCount++;
            }
        } catch (err) {
            console.error('Request failed:', err.message);
        }
    }

    // console.log(`Success: ${successCount}, Rate Limited: ${rateLimitedCount}`);
    if (rateLimitedCount > 0) {
        // console.log('Rate limiting is working!');
    } else {
        // console.log(' Rate limiting NOT working (or limit not reached)!');
    }
}

async function testUnauthorizedAccess() {
    // console.log('\n--- Testing Unauthorized Access ---');
    try {
        const res = await fetch(PORTFOLIO_URL);
        if (res.status === 401) {
            // console.log('Unauthorized access correctly blocked (401)!');
        } else {
            // console.log(` Unauthorized access NOT blocked! Status: ${res.status}`);
        }
    } catch (err) {
        console.error('Request failed:', err.message);
    }
}

async function runTests() {
    // console.log('Starting Security Verification...');
    // console.log('Note: Ensure the local dev server is running at http://localhost:3000');
    
    await testUnauthorizedAccess();
    await testRateLimiting();
}

runTests();
