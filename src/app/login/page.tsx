'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { HiEye, HiEyeOff, HiArrowRight } from 'react-icons/hi';

export default function LoginPage() {
    const { login, user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && !authLoading) router.push('/dashboard');
    }, [user, authLoading, router]);

    if (authLoading || user) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F1A] flex items-center justify-center transition-colors duration-300">
                <div className="w-8 h-8 border-4 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login(email, password);

        if (result.success) {
            router.push('/dashboard');
        } else {
            setError(result.error || 'Login failed');
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F1A] flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[128px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Link href="/" className="flex items-center justify-center gap-2 mb-8 group">
                    <img src="/logo.png" alt="CareerCanvas Logo" className="w-10 h-10 object-contain rounded-xl group-hover:scale-110 transition-transform" />
                    <span className="text-xl font-bold font-[Poppins] text-gray-900 dark:text-white">
                        Career<span className="gradient-text">Canvas</span>
                    </span>
                </Link>

                <div className="bg-white/80 dark:bg-[#1E1E2E]/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-[#3B3B52]/50 p-8 shadow-xl">
                    <h1 className="text-2xl font-bold font-[Poppins] text-center mb-2 text-gray-900 dark:text-white">Welcome Back</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-8">Log in to manage your portfolio</p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                required
                                className="w-full bg-white dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full bg-white dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl px-4 py-3 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#6C63FF] focus:ring-1 focus:ring-[#6C63FF] transition-all pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
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
                                <span className="px-2 bg-white/80 dark:bg-[#1E1E2E]/80 text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => alert('Google Login coming soon!')}
                                className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-200 dark:border-[#3B3B52]/50 rounded-xl bg-white dark:bg-[#3B3B52]/30 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#3B3B52]/50 transition-colors relative"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                <span>Continue with Google</span>
                                <span className="absolute right-4 bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full dark:bg-green-500/20 dark:text-green-400">Recommended</span>
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-6">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-[#6C63FF] hover:text-[#8B83FF] font-medium transition-colors">
                            Sign up free
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
