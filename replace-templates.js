const fs = require('fs');

function processTemplate(filePath, isCreative) {
  let content = fs.readFileSync(filePath, 'utf8');

  if (isCreative) {
    // Inject useTheme and colors
    content = content.replace(
      "import { motion } from 'framer-motion';",
      "import { motion } from 'framer-motion';\nimport { useTheme } from 'next-themes';\nimport { useState, useEffect } from 'react';\nimport { FaSun, FaMoon } from 'react-icons/fa';"
    );
    
    content = content.replace(
      "export default function CreativeTemplate({ data }: { data: PortfolioData }) {",
      `export default function CreativeTemplate({ data }: { data: PortfolioData }) {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = !mounted || currentTheme === 'dark';
    
    const colors = isDark ? {
        bg: '#0F0118',
        text: '#f1f1f6',
        navBg: 'rgba(15,1,24,0.8)',
        cardBg: 'rgba(255,255,255,0.03)',
        cardBorder: 'rgba(139,92,246,0.15)',
        textSec: 'rgba(241,241,246,0.6)',
        pillBg: 'rgba(139,92,246,0.1)',
        iconBg: 'rgba(255,255,255,0.03)'
    } : {
        bg: '#fdfaee',
        text: '#1e1b4b',
        navBg: 'rgba(253,250,238,0.8)',
        cardBg: 'rgba(255,255,255,0.6)',
        cardBorder: 'rgba(139,92,246,0.3)',
        textSec: 'rgba(30,27,75,0.7)',
        pillBg: 'rgba(139,92,246,0.15)',
        iconBg: 'rgba(255,255,255,0.6)'
    };`
    );

    // Replace hardcoded values with colors object
    content = content.replaceAll("'#0F0118'", "colors.bg");
    content = content.replaceAll("'#f1f1f6'", "colors.text");
    content = content.replaceAll("'rgba(15,1,24,0.8)'", "colors.navBg");
    content = content.replaceAll("'rgba(255,255,255,0.03)'", "colors.cardBg");
    content = content.replaceAll("'rgba(139,92,246,0.15)'", "colors.cardBorder");
    content = content.replaceAll("'rgba(241,241,246,0.6)'", "colors.textSec");
    content = content.replaceAll("'rgba(241,241,246,0.7)'", "colors.textSec"); // mapped to same
    content = content.replaceAll("'rgba(241,241,246,0.5)'", "colors.textSec");
    content = content.replaceAll("'rgba(241,241,246,0.4)'", "colors.textSec");
    content = content.replaceAll("'rgba(139,92,246,0.1)'", "colors.pillBg");

    // Add Toggle Button to the nav
    content = content.replace(
      "</div>\n                </div>\n            </nav>",
      `    {mounted && (
                            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ background: 'none', border: 'none', color: colors.textSec, cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
                                {isDark ? <FaSun /> : <FaMoon />}
                            </button>
                        )}
                    </div>
                </div>
            </nav>`
    );
  } else {
    // SidebarTemplate
    content = content.replace(
      "import { motion } from 'framer-motion';",
      "import { motion } from 'framer-motion';\nimport { useTheme } from 'next-themes';\nimport { useEffect, useState } from 'react';\nimport { FaSun, FaMoon } from 'react-icons/fa';"
    );
    
    content = content.replace(
      "export default function SidebarTemplate({ data }: { data: PortfolioData }) {",
      `export default function SidebarTemplate({ data }: { data: PortfolioData }) {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
    
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = !mounted || currentTheme === 'dark';
    
    const colors = isDark ? {
        bg: '#12122B',
        sidebarBg: 'linear-gradient(180deg, #16162E, #0E0E20)',
        text: '#E8E6F0',
        textSec: 'rgba(232,230,240,0.6)',
        cardBg: 'rgba(255,255,255,0.02)',
        cardBorder: 'rgba(245,158,11,0.08)',
        hoverBg: 'rgba(245,158,11,0.1)',
        sidebarTextOff: 'rgba(232,230,240,0.5)'
    } : {
        bg: '#F9FAFB',
        sidebarBg: '#FFFFFF',
        text: '#111827',
        textSec: 'rgba(17,24,39,0.7)',
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(245,158,11,0.2)',
        hoverBg: 'rgba(245,158,11,0.15)',
        sidebarTextOff: 'rgba(17,24,39,0.6)'
    };`
    );

    // Replace
    content = content.replaceAll("'#12122B'", "colors.bg");
    content = content.replaceAll("'linear-gradient(180deg, #16162E, #0E0E20)'", "colors.sidebarBg");
    content = content.replaceAll("'#E8E6F0'", "colors.text");
    content = content.replaceAll("'rgba(232,230,240,0.6)'", "colors.textSec");
    content = content.replaceAll("'rgba(232,230,240,0.65)'", "colors.textSec");
    content = content.replaceAll("'rgba(232,230,240,0.55)'", "colors.textSec");
    content = content.replaceAll("'rgba(232,230,240,0.7)'", "colors.textSec");
    content = content.replaceAll("'rgba(232,230,240,0.5)'", "colors.sidebarTextOff");
    content = content.replaceAll("'rgba(232,230,240,0.4)'", "colors.sidebarTextOff");
    content = content.replaceAll("'rgba(232,230,240,0.35)'", "colors.sidebarTextOff");
    content = content.replaceAll("'rgba(255,255,255,0.02)'", "colors.cardBg");
    content = content.replaceAll("'rgba(245,158,11,0.08)'", "colors.cardBorder");
    content = content.replaceAll("'rgba(245,158,11,0.1)'", "colors.hoverBg");

    // Add Toggle Button to the sidebar nav
    content = content.replace(
      "</nav>\n            </aside>",
      `    {mounted && (
                        <button
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                                borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
                                marginTop: 16, background: 'transparent', color: colors.sidebarTextOff, transition: 'all 0.2s'
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#F59E0B'; }}
                            onMouseLeave={e => { e.currentTarget.style.color = colors.sidebarTextOff; }}
                        >
                            <span style={{ fontSize: '1rem' }}>{isDark ? <FaSun /> : <FaMoon />}</span>
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    )}
                </nav>
            </aside>`
    );
  }

  fs.writeFileSync(filePath, content, 'utf8');
}

processTemplate('d:/Portfolio Builder/careercanvas/src/components/templates/CreativeTemplate.tsx', true);
processTemplate('d:/Portfolio Builder/careercanvas/src/components/templates/SidebarTemplate.tsx', false);
console.log('Templates updated with theme toggles and color variables.');
