'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { HiSun, HiMoon } from 'react-icons/hi';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-[#1E1E2E] flex items-center justify-center opacity-50 cursor-not-allowed">
        <span className="sr-only">Loading Theme Toggle</span>
      </button>
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-[#1E1E2E] dark:hover:bg-[#2A2A3E] flex items-center justify-center text-gray-600 dark:text-gray-300 transition-colors relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 24 : 0,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <HiSun className="text-xl text-amber-500" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          y: isDark ? 0 : -24,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="absolute"
      >
        <HiMoon className="text-xl text-blue-400" />
      </motion.div>
    </button>
  );
}
