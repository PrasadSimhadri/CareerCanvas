import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        await connectDB();
        const { email, otp, newPassword } = await req.json();

        if (!email || !otp || !newPassword) {
            return NextResponse.json({ error: 'Email, OTP, and new password are required' }, { status: 400 });
        }

        const trimmedEmail = email.trim().toLowerCase();
        const trimmedOtp = otp.trim();

        console.log('Reset Password Attempt:', { trimmedEmail, trimmedOtp });
        
        const user = await User.findOne({ email: trimmedEmail });

        if (!user) {
            console.log('User not found:', trimmedEmail);
            return NextResponse.json({ error: 'User not found' }, { status: 400 });
        }

        console.log('User found. Stored OTP:', user.resetOtp);
        console.log('Stored Expiry:', user.resetOtpExpires);

        if (!user.resetOtp || user.resetOtp !== trimmedOtp) {
            console.log('OTP Mismatch. Received:', trimmedOtp, 'Stored:', user.resetOtp);
            return NextResponse.json({ error: 'Invalid OTP' }, { status: 400 });
        }

        if (!user.resetOtpExpires || user.resetOtpExpires < new Date()) {
            console.log('OTP Expired. Expiry:', user.resetOtpExpires, 'Now:', new Date());
            return NextResponse.json({ error: 'OTP has expired. Please request a new one.' }, { status: 400 });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(newPassword, salt);

        // Update user
        user.passwordHash = passwordHash;
        user.resetOtp = undefined;
        user.resetOtpExpires = undefined;
        await user.save();

        console.log('Password reset successful for:', trimmedEmail);
        return NextResponse.json({ success: true, message: 'Password reset successfully. You can now login.' });
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
