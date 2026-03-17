import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="py-8 border-t border-gray-200 dark:border-[#3B3B52]/50 bg-white dark:bg-[#0F0F1A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-lg" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Built with <span className="text-gray-900 dark:text-white font-semibold">CareerCanvas</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="https://github.com"
                            target="_blank"
                            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            <FaGithub className="text-lg" />
                            GitHub
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
