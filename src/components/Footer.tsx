import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="py-8 border-t border-[#3B3B52]/50 bg-[#0F0F1A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6C63FF] to-[#06B6D4] flex items-center justify-center text-white font-bold text-sm">
                            C
                        </div>
                        <span className="text-sm text-gray-400">
                            Built with <span className="text-white font-semibold">CareerCanvas</span>
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
