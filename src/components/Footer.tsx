import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-8 border-t border-gray-200 dark:border-[#3B3B52]/50 bg-white dark:bg-[#0F0F1A]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain rounded-lg" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Built with <span className="text-gray-900 dark:text-white font-semibold">BuildUrSite</span>
                        </span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}