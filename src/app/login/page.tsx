'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { HiMail, HiLockClosed, HiEye, HiEyeOff, HiArrowRight } from 'react-icons/hi';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginPage() {
    const { login, googleLogin, user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Redirect if already logged in
    useEffect(() => {
        if (user && !authLoading) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    if (user && !authLoading) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await login(email, password);
            if (result.success) {
                router.push('/');
            } else {
                setError(result.error || 'Invalid email or password');
            }
        } catch (err: any) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F1A] transition-colors duration-300">
            <main className="pt-28 pb-20 px-4">
                <div className="max-w-md mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-[#1E1E2E] p-8 rounded-3xl border border-gray-200 dark:border-[#3B3B52]/50 shadow-xl"
                    >
                        <div className="text-center mb-8">
                            <h1 className="text-3xl font-bold font-[Poppins] text-gray-900 dark:text-white mb-2">Welcome Back</h1>
                            <p className="text-gray-600 dark:text-gray-400">Log in to manage your professional identity</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                <div className="relative">
                                    <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                        required
                                        className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl pl-12 pr-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                                    <Link href="/forgot-password" title="Forgot Password?" className="text-xs text-[#6C63FF] hover:underline font-medium">
                                        Forgot Password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl pl-12 pr-12 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
                                    >
                                        {showPassword ? <HiEyeOff className="text-xl" /> : <HiEye className="text-xl" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-white py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#6C63FF]/25"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Log In
                                        <HiArrowRight />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-[#3B3B52]/50" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white dark:bg-[#1E1E2E] text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <div className="mt-8 flex flex-col items-center gap-4">
                                <div className="relative w-full flex justify-center">
                                    <div className="w-full max-w-[240px] overflow-hidden rounded-full">
                                        <GoogleLogin
                                            onSuccess={async (credentialResponse) => {
                                                if (credentialResponse.credential) {
                                                    const result = await googleLogin(credentialResponse.credential);
                                                    if (result.success) {
                                                        router.replace('/');
                                                    } else {
                                                        setError(result.error || 'Google login failed');
                                                    }
                                                }
                                            }}
                                            onError={() => {
                                                setError('Google Login Failed');
                                            }}
                                            theme="filled_blue"
                                            shape="circle"
                                            text="continue_with"
                                            width="240px"
                                        />
                                    </div>
                                    <span className="absolute -top-7.5 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 text-[10px] font-bold px-3 py-1 rounded-full dark:bg-green-500/20 dark:text-green-400 border border-green-200 dark:border-green-500/30 shadow-sm z-10 whitespace-nowrap">
                                        Recommended
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-8">
                            Don&apos;t have an account?{' '}
                            <Link href="/signup" className="text-[#6C63FF] hover:text-[#8B83FF] font-medium transition-colors">
                                Sign up free
                            </Link>
                        </p>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
