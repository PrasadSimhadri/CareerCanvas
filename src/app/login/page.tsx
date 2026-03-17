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
            <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
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
        <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-[128px]" />
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[128px]" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Link href="/" className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#06B6D4] flex items-center justify-center text-white font-bold text-lg">
                        C
                    </div>
                    <span className="text-xl font-bold font-[Poppins] text-white">
                        Career<span className="gradient-text">Canvas</span>
                    </span>
                </Link>

                <div className="bg-[#1E1E2E]/80 backdrop-blur-xl rounded-2xl border border-[#3B3B52]/50 p-8">
                    <h1 className="text-2xl font-bold font-[Poppins] text-center mb-2">Welcome Back</h1>
                    <p className="text-gray-400 text-center text-sm mb-8">Log in to manage your portfolio</p>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-6 text-red-400 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="john@example.com"
                                required
                                className="w-full bg-[#0F0F1A] border border-[#3B3B52] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6C63FF] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    required
                                    className="w-full bg-[#0F0F1A] border border-[#3B3B52] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#6C63FF] transition-colors pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
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

                    <p className="text-center text-gray-400 text-sm mt-6">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="text-[#6C63FF] hover:text-[#8B83FF] font-medium">
                            Sign up free
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
