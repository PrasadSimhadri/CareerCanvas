'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                    ? 'py-2 bg-[#0F0F1A]/90 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-[#3B3B52]/50'
                    : 'py-4 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#06B6D4] flex items-center justify-center text-white font-bold text-lg font-[Poppins] group-hover:scale-110 transition-transform">
                            C
                        </div>
                        <span className="text-xl font-bold font-[Poppins] text-white">
                            Career<span className="gradient-text">Canvas</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/#templates"
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Templates
                        </Link>
                        <Link
                            href="/#features"
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Features
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#06B6D4] flex items-center justify-center text-white text-xs font-bold uppercase">
                                    {user.username.charAt(0)}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-4 py-2"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="text-sm font-medium text-white bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#6C63FF]/25"
                                >
                                    Sign Up Free
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-white text-2xl"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
                    </button>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4 border-t border-[#3B3B52]/50"
                        >
                            <div className="flex flex-col gap-3 pt-4">
                                <Link
                                    href="/#templates"
                                    className="text-gray-300 hover:text-white py-2"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Templates
                                </Link>
                                <Link
                                    href="/#features"
                                    className="text-gray-300 hover:text-white py-2"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Features
                                </Link>
                                {user ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            className="text-gray-300 hover:text-white py-2"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setMobileOpen(false); }}
                                            className="text-left text-gray-400 hover:text-white py-2"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-gray-300 hover:text-white py-2"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            Log In
                                        </Link>
                                        <Link
                                            href="/signup"
                                            className="inline-block text-center text-white bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] px-5 py-2.5 rounded-xl"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            Sign Up Free
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}
