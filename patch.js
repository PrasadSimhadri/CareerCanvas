const fs = require('fs');

try {
    // 1. Dashboard UI Fix
    let dashboard = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');
    dashboard = dashboard.replace(/dark:bg-white /g, '');
    dashboard = dashboard.replace(/dark:border-gray-200 /g, '');
    dashboard = dashboard.replace(/dark:bg-gray-100 /g, '');
    
    // There are some inputs that might have dark:bg-white text-gray-900 etc. Let's find inputs and replace white background in dark mode
    dashboard = dashboard.replace(/dark:bg-white/g, 'dark:bg-[#0F0F1A]'); // just in case
    dashboard = dashboard.replace(/dark:bg-\[#0F0F1A\] dark:bg-\[#1E1E2E\]\/80 /g, 'dark:bg-[#1E1E2E]/80 ');
    dashboard = dashboard.replace(/dark:bg-\[#0F0F1A\] dark:bg-\[#1E1E2E\]\/60 /g, 'dark:bg-[#1E1E2E]/60 ');
    dashboard = dashboard.replace(/dark:bg-\[#0F0F1A\] dark:bg-\[#2A2A3E\]\/50 /g, 'dark:bg-[#2A2A3E]/50 ');

    fs.writeFileSync('src/app/dashboard/page.tsx', dashboard, 'utf8');

    // 2. Google Button HTML
    const googleBtn = `
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
`;

    // Auth pages update
    ['src/app/login/page.tsx', 'src/app/signup/page.tsx'].forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        
        // Replace logo (if not already replaced)
        content = content.replace(
            /<div className="w-10 h-10 rounded-xl bg-gradient-to-br from-\[#6C63FF\] to-\[#06B6D4\] flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform">\s*C\s*<\/div>/g,
            '<img src="/logo.png" alt="CareerCanvas Logo" className="w-10 h-10 object-contain rounded-xl group-hover:scale-110 transition-transform" />'
        );

        // Insert google btn
        if (!content.includes('Continue with Google')) {
            content = content.replace(/<\/form>\s*<p className="text-center/g, '</form>\n' + googleBtn + '\n                    <p className="text-center');
        }
        
        fs.writeFileSync(file, content, 'utf8');
    });

    console.log('Patch successfully applied!');
} catch (error) {
    console.error('Error applying patch:', error);
}
