import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendOtpEmail } from '@/lib/mail';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // For security, don't reveal if user exists or not
            return NextResponse.json({ success: true, message: 'If an account exists, an OTP has been sent.' });
        }

        if (user.googleId && !user.passwordHash) {
             return NextResponse.json({ error: 'This account uses Google Login. Please use Google to sign in.' }, { status: 400 });
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

        user.resetOtp = otp;
        user.resetOtpExpires = otpExpires;
        await user.save();

        await sendOtpEmail(user.email, otp);

        return NextResponse.json({ success: true, message: 'OTP sent to your email.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
