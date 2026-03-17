'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { HiArrowLeft, HiMail, HiLockClosed, HiShieldCheck } from 'react-icons/hi';
import Navbar from '@/components/Navbar';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1); // 1: Request OTP, 2: Reset Password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleRequestOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: data.message });
                setStep(2);
            } else {
                setMessage({ type: 'error', text: data.error });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage({ type: 'success', text: data.message });
                // Reset form or redirect after successful reset?
                // For now, keep success message and offer login link
            } else {
                setMessage({ type: 'error', text: data.error });
            }
        } catch (err) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F1A] transition-colors duration-300">
            <main className="pt-20 pb-20 px-4">
                <div className="max-w-md mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-[#1E1E2E] p-8 rounded-3xl border border-gray-200 dark:border-[#3B3B52]/50 shadow-xl"
                    >
                        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#6C63FF] transition-colors mb-6">
                            <HiArrowLeft /> Back to Login
                        </Link>

                        <div className="mb-8">
                            <h1 className="text-3xl font-bold font-[Poppins] text-gray-900 dark:text-white mb-2">
                                {step === 1 ? 'Forgot Password?' : 'Reset Password'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {step === 1 
                                    ? "No worries! Enter your email and we'll send you a 6-digit OTP." 
                                    : "Enter the OTP sent to your email and choose a new password."}
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.form
                                    key="step1"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleRequestOtp}
                                    className="space-y-6"
                                >
                                    <div className="relative group">
                                        <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-[#6C63FF] transition-colors" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your registered email"
                                            className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-2xl pl-12 pr-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition-all font-medium"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-[#6C63FF]/25 disabled:opacity-50"
                                    >
                                        {loading ? 'Sending OTP...' : 'Send OTP'}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="step2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleResetPassword}
                                    className="space-y-6"
                                >
                                    <div className="relative group">
                                        <HiShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-[#6C63FF] transition-colors" />
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="6-digit OTP"
                                            className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-2xl pl-12 pr-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition-all font-medium tracking-widest text-center"
                                            required
                                            maxLength={6}
                                        />
                                    </div>

                                    <div className="relative group">
                                        <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-gray-400 group-focus-within:text-[#6C63FF] transition-colors" />
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="New Password"
                                            className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-2xl pl-12 pr-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition-all font-medium"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-white py-4 rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-[#6C63FF]/25 disabled:opacity-50"
                                    >
                                        {loading ? 'Resetting...' : 'Reset Password'}
                                    </button>

                                    <div className="text-center">
                                        <button 
                                            type="button" 
                                            onClick={() => setStep(1)}
                                            className="text-sm text-gray-500 hover:text-[#6C63FF] transition-colors"
                                        >
                                            Didn't receive code? Send again
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>

                        {message.text && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-6 p-4 rounded-2xl text-center text-sm font-medium ${
                                    message.type === 'success' 
                                        ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' 
                                        : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'
                                }`}
                            >
                                {message.text}
                                {message.type === 'success' && message.text.includes('successfully') && (
                                    <div className="mt-2">
                                        <Link href="/login" className="font-bold underline decoration-2">Login now</Link>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
