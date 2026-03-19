const fs = require('fs');
let s = fs.readFileSync('d:/Portfolio Builder/careercanvas/src/components/templates/SidebarTemplate.tsx', 'utf8');

const replacement = `                    ))}
                    {mounted && (
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
            </aside>`;

s = s.replace(/                    \)\)}[\r\n\s]+<\/nav>[\r\n\s]+<\/aside>/, replacement);

fs.writeFileSync('d:/Portfolio Builder/careercanvas/src/components/templates/SidebarTemplate.tsx', s, 'utf8');
// console.log('Sidebar theme switch added!');
