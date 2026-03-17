const fs = require('fs');
const path = 'd:/Portfolio Builder/careercanvas/src/app/dashboard/page.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  // Backgrounds
  ['bg-[#0F0F1A]', 'bg-gray-50 dark:bg-[#0F0F1A]'],
  ['bg-[#1E1E2E]/60', 'bg-white/60 dark:bg-[#1E1E2E]/60'],
  ['bg-[#1E1E2E]/80', 'bg-white/80 dark:bg-[#1E1E2E]/80'],
  ['bg-[#1E1E2E]', 'bg-white dark:bg-[#1E1E2E]'],
  ['bg-[#2A2A3E]/50', 'bg-gray-100/50 dark:bg-[#2A2A3E]/50'],
  ['bg-[#2A2A3E]', 'bg-gray-100 dark:bg-[#2A2A3E]'],
  ['bg-[#0F0F1A]/50', 'bg-white/50 dark:bg-[#0F0F1A]/50'],
  
  // Borders
  ['border-[#3B3B52]/50', 'border-gray-200 dark:border-[#3B3B52]/50'],
  ['border-[#3B3B52]/30', 'border-gray-200 dark:border-[#3B3B52]/30'],
  ['border-[#3B3B52]', 'border-gray-200 dark:border-[#3B3B52]'],
  
  // Text
  ['text-white', 'text-gray-900 dark:text-white'],
  ['text-gray-400', 'text-gray-600 dark:text-gray-400'],
  ['text-gray-300', 'text-gray-700 dark:text-gray-300'],
  ['text-gray-500', 'text-gray-400 dark:text-gray-500'],
  
  // Placeholders
  ['placeholder-gray-500', 'placeholder-gray-400 dark:placeholder-gray-500']
];

replacements.forEach(([findStr, replaceStr]) => {
  content = content.replaceAll(findStr, replaceStr);
});

// Fixes for over-replaced strings
content = content.replaceAll('text-gray-900 dark:text-white-400', 'text-gray-600 dark:text-white-400');
content = content.replaceAll('hover:text-gray-900 dark:text-white', 'hover:text-gray-900 dark:hover:text-white');
content = content.replaceAll('border-gray-900 dark:text-white', 'border-white');
content = content.replaceAll('border-t-transparent text-gray-900 dark:text-white', 'border-t-transparent');

// Fix the spinner colors that got messed up (border-gray-900 dark:text-white)
content = content.replaceAll('border-2 border-gray-900 dark:text-white border-t-transparent', 'border-2 border-white border-t-transparent');

// Save back
fs.writeFileSync(path, content, 'utf8');
console.log('Dashboard text/bg classes updated for light/dark mode.');
