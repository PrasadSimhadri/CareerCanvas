'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import ThemeToggle from '@/components/ThemeToggle';

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
            className={`fixed left-0 w-full z-50 flex justify-center transition-[padding,top] duration-500 ease-in-out ${
                scrolled ? 'top-4 px-4 sm:px-6' : 'top-0 px-0'
            }`}
        >
            <motion.div
                layout
                className={`w-full transition-all duration-500 ease-in-out ${
                    scrolled 
                        ? 'max-w-5xl bg-white/80 dark:bg-[#0F0F1A]/80 backdrop-blur-xl shadow-lg border border-gray-200 dark:border-[#3B3B52]/50 rounded-full px-6 py-2' 
                        : 'max-w-7xl bg-transparent px-4 py-4 sm:px-6 lg:px-8'
                }`}
            >
                <nav className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <img src="/logo.png" alt="CareerCanvas Logo" className="w-10 h-10 object-contain rounded-xl group-hover:scale-110 transition-transform" />
                        <span className="text-xl font-bold font-[Poppins] text-gray-900 dark:text-white">
                            Career<span className="gradient-text">Canvas</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            href="/#templates"
                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Templates
                        </Link>
                        <Link
                            href="/#features"
                            className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            Features
                        </Link>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    Dashboard
                                </Link>
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                >
                                    Logout
                                </button>
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#06B6D4] flex items-center justify-center text-white text-xs font-bold uppercase">
                                    {user.username.charAt(0)}
                                </div>
                                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2" />
                                <ThemeToggle />
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors px-4 py-2"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="text-sm font-medium text-white bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-[#6C63FF]/25"
                                >
                                    Sign Up Free
                                </Link>
                                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700 mx-2 ml-4" />
                                <ThemeToggle />
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger && Theme Toggle */}
                    <div className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            className="text-gray-900 dark:text-white text-2xl"
                            onClick={() => setMobileOpen(!mobileOpen)}
                        >
                            {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-[#3B3B52]/50 bg-white dark:bg-transparent"
                        >
                            <div className="flex flex-col gap-3 pt-4 px-2">
                                <Link
                                    href="/#templates"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Templates
                                </Link>
                                <Link
                                    href="/#features"
                                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    Features
                                </Link>
                                {user ? (
                                    <>
                                        <Link
                                            href="/dashboard"
                                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
                                            onClick={() => setMobileOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={() => { logout(); setMobileOpen(false); }}
                                            className="text-left text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white py-2"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href="/login"
                                            className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white py-2"
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
            </motion.div>
        </motion.header>
    );
}
