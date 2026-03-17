'use client';

import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaExternalLinkAlt, FaTrophy, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

interface PortfolioData {
    profileImageUrl: string;
    basicInfo: { fullName: string; tagline: string; description: string };
    about: { description: string; interests: string[]; cards: { title: string; description: string }[] };
    education: { degree: string; institution: string; location: string; startYear: string; endYear: string; grade: string }[];
    experience: { role: string; company: string; location: string; startDate: string; endDate: string; skills: string[]; description: string }[];
    projects: { title: string; techStack: string[]; description: string; githubUrl: string; liveUrl: string }[];
    skills: { category: string; skills: string[] }[];
    achievements: { title: string; organization: string; description: string }[];
    contact: { email: string; phone: string; linkedinUrl: string; githubUrl: string; location: string };
}

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function CreativeTemplate({ data, isPreview = false }: { data: PortfolioData, isPreview?: boolean }) {
    const { resolvedTheme, setTheme: setGlobalTheme } = useTheme();
    const [localTheme, setLocalTheme] = useState<'light' | 'dark' | null>(null);
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const currentTheme = isPreview && localTheme ? localTheme : resolvedTheme;
    const isDark = !mounted || currentTheme === 'dark';

    const toggleTheme = () => {
        if (isPreview) {
            setLocalTheme(prev => (prev === 'dark' || (!prev && resolvedTheme === 'dark')) ? 'light' : 'dark');
        } else {
            setGlobalTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
        }
    };
    
    const colors = isDark ? {
        bg: '#0F0118',
        text: '#f1f1f6',
        navBg: 'rgba(15,1,24,0.8)',
        cardBg: 'rgba(255,255,255,0.03)',
        cardBorder: 'rgba(139,92,246,0.15)',
        textSec: 'rgba(241,241,246,0.5)',
        pillBg: 'rgba(139,92,246,0.1)',
        iconBg: 'rgba(255,255,255,0.03)',
        accent: '#8B5CF6'
    } : {
        bg: '#ffffff',
        text: '#1e1b4b',
        navBg: 'rgba(255,255,255,0.8)',
        cardBg: '#f8fafc',
        cardBorder: 'rgba(139,92,246,0.1)',
        textSec: '#475569',
        pillBg: 'rgba(139,92,246,0.1)',
        iconBg: '#f1f5f9',
        accent: '#7c3aed'
    };

    const hasPhoto = !!data.profileImageUrl;

    return (
        <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Poppins', sans-serif", minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            {/* Background Blobs (Artistic) */}
            <div style={{ position: 'fixed', top: '-10%', right: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(236,72,153,0.1), transparent)', borderRadius: '50%', filter: 'blur(100px)', zIndex: 0 }} />

            {/* Navigation */}
            <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, background: colors.navBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${colors.cardBorder}` }}>
                <div style={{ maxWidth: 1300, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.05em' }}>
                        <span style={{ color: colors.accent }}>{data.basicInfo.fullName.split(' ')[0]}</span>.
                    </span>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hidden md:flex">
                        {['About', 'Projects', 'Skills', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: colors.text, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'all 0.3s' }}>{item}</a>
                        ))}
                        {mounted && (
                            <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: '12px', background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, color: colors.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {isDark ? <FaSun /> : <FaMoon />}
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Asymmetrical Hero Section */}
            <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1, padding: '120px 24px 60px' }}>
                <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', display: 'flex', flexDirection: hasPhoto ? 'row' : 'column', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
                    
                    <motion.div initial={{ opacity: 0, x: hasPhoto ? -40 : 0, y: hasPhoto ? 0 : 40 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8 }} style={{ flex: 1, textAlign: hasPhoto ? 'left' : 'center', maxWidth: hasPhoto ? 700 : 900 }}>
                        <div style={{ display: 'inline-block', padding: '6px 16px', background: 'linear-gradient(90deg, #8B5CF6, #EC4899)', borderRadius: 50, color: 'white', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>Portfolio</div>
                        <h1 style={{ fontSize: hasPhoto ? 'clamp(3rem, 8vw, 5rem)' : 'clamp(4rem, 10vw, 7rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.06em', marginBottom: 24 }}>
                            {data.basicInfo.fullName.split(' ').map((name, i) => (
                                <span key={i} style={{ display: 'block', color: i === 1 ? 'transparent' : 'inherit', WebkitTextStroke: i === 1 ? `1px ${colors.text}` : 'none' }}>{name}</span>
                            ))}
                        </h1>
                        <p style={{ fontSize: '1.4rem', color: colors.accent, fontWeight: 700, marginBottom: 24 }}>{data.basicInfo.tagline}</p>
                        <p style={{ color: colors.textSec, fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 500, margin: hasPhoto ? '0' : '0 auto 40px' }}>{data.basicInfo.description}</p>
                        
                        <div style={{ display: 'flex', gap: 16, justifyContent: hasPhoto ? 'flex-start' : 'center', marginTop: 40 }}>
                            {data.contact.linkedinUrl && <SocialIconButton href={data.contact.linkedinUrl} icon={<FaLinkedinIn />} color="#0077B5" />}
                            {data.contact.githubUrl && <SocialIconButton href={data.contact.githubUrl} icon={<FaGithub />} color="#333" />}
                            {data.contact.email && <SocialIconButton href={`mailto:${data.contact.email}`} icon={<FaEnvelope />} color="#EA4335" />}
                        </div>
                    </motion.div>

                    {hasPhoto && (
                        <motion.div initial={{ opacity: 0, scale: 0.8, rotate: 10 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8 }} style={{ flex: '0 0 auto', position: 'relative' }}>
                            <div style={{ width: 400, height: 450, overflow: 'hidden', clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)', position: 'relative' }}>
                                <img src={data.profileImageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(139,92,246,0.3), transparent)', pointerEvents: 'none' }} />
                            </div>
                            {/* Decorative element */}
                            <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, border: `2px solid ${colors.accent}`, zIndex: -1 }} />
                            <div style={{ position: 'absolute', bottom: -20, left: -20, width: 150, height: 150, background: 'rgba(236,72,153,0.1)', zIndex: -1 }} />
                        </motion.div>
                    )}
                </div>
            </section>

            {/* About Section - Artistic Layout */}
            {data.about.description && (
                <section id="about" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', gap: 80, flexWrap: 'wrap' }}>
                        <div style={{ flex: '0 0 250px' }}>
                            <h2 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1, color: colors.cardBorder, letterSpacing: '-0.1em' }}>ABOUT</h2>
                        </div>
                        <div style={{ flex: 1, minWidth: 300 }}>
                            <div style={{ background: colors.cardBg, padding: 40, border: `1px solid ${colors.cardBorder}`, borderRadius: '0 40px 0 40px' }}>
                                {data.about.description.split('\n').map((p, i) => (
                                    <p key={i} style={{ color: colors.textSec, fontSize: '1.2rem', lineHeight: 1.7, marginBottom: 20 }}>{p}</p>
                                ))}
                                {data.about.interests?.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 40 }}>
                                        {data.about.interests.map((interest, i) => (
                                            <span key={i} style={{ padding: '8px 20px', border: `1px solid ${colors.accent}`, borderRadius: 50, fontSize: '0.85rem', fontWeight: 700, color: colors.accent, textTransform: 'uppercase' }}>{interest}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Projects - Bento Grid */}
            {data.projects?.length > 0 && data.projects[0].title && (
                <section id="projects" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: 60, textAlign: 'center' }}>PROJECTS<span style={{ color: colors.accent }}>.</span></h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gridAutoRows: '400px', gap: 24 }}>
                            {data.projects.map((proj, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -10 }}
                                    style={{ 
                                        gridColumn: i === 0 ? 'span 2' : 'span 1',
                                        background: i % 2 === 0 ? 'linear-gradient(135deg, #8B5CF6, #6366F1)' : colors.cardBg,
                                        color: i % 2 === 0 ? 'white' : colors.text,
                                        borderRadius: 32,
                                        padding: 40,
                                        border: `1px solid ${colors.cardBorder}`,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}
                                    className="md:col-span-1 lg:col-span-2"
                                >
                                    <div>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                                            {proj.techStack.map((tech, j) => (
                                                <span key={j} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.2)' : colors.pillBg, padding: '4px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 700 }}>{tech}</span>
                                            ))}
                                        </div>
                                        <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 16, lineHeight: 1.1 }}>{proj.title}</h3>
                                        <p style={{ opacity: 0.8, fontSize: '1rem', lineHeight: 1.5, maxWidth: 500 }}>{proj.description}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: 20 }}>
                                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>GITHUB &rarr;</a>}
                                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem' }}>LIVE DEMO &rarr;</a>}
                                    </div>
                                    {/* Abstract shape */}
                                    <div style={{ position: 'absolute', bottom: -20, right: -20, width: 100, height: 100, background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills - Artistic Mosaic */}
            {data.skills?.length > 0 && (
                <section id="skills" style={{ padding: '100px 24px', background: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.02)' }}>
                    <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 24 }}>
                            <h2 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1 }}>EXPERTISE<br/><span style={{ color: colors.accent }}>& ABILITIES</span></h2>
                            <p style={{ color: colors.textSec, maxWidth: 400 }}>A collection of technologies and methodologies I have mastered over the years.</p>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                            {data.skills.flatMap(s => s.skills).map((skill, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ scale: 1.05, background: colors.accent, color: 'white' }}
                                    style={{ 
                                        padding: '16px 32px', 
                                        background: colors.cardBg, 
                                        borderRadius: 16, 
                                        border: `1px solid ${colors.cardBorder}`,
                                        fontSize: '1.1rem',
                                        fontWeight: 600,
                                        cursor: 'default',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" style={{ padding: '120px 24px', textAlign: 'center' }}>
                <motion.div {...fadeUp} style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h2 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: 24, letterSpacing: '-0.04em' }}>LET&apos;S CHAT<span style={{ color: colors.accent }}>.</span></h2>
                    <p style={{ fontSize: '1.2rem', color: colors.textSec, marginBottom: 48 }}>Open for collaborations and interesting projects.</p>
                    <a href={`mailto:${data.contact.email}`} style={{ display: 'inline-block', fontSize: '2rem', fontWeight: 800, color: colors.text, textDecoration: 'none', borderBottom: `4px solid ${colors.accent}`, paddingBottom: 8, marginBottom: 60 }}>{data.contact.email}</a>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
                        <ContactPill icon={<FaPhone />} label="Phone" value={data.contact.phone} colors={colors} />
                        <ContactPill icon={<FaLinkedinIn />} label="LinkedIn" value="Profile" href={data.contact.linkedinUrl} colors={colors} />
                        <ContactPill icon={<FaGithub />} label="GitHub" value="Repositories" href={data.contact.githubUrl} colors={colors} />
                    </div>
                </motion.div>
            </section>

            <footer style={{ padding: '60px 24px', textAlign: 'center', opacity: 0.6 }}>
                <p style={{ color: colors.textSec }}>
                    Built with <a href="/" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 600 }}>CareerCanvas</a> •{' '}
                    <a href="https://github.com/PrasadSimhadri/CareerCanvas" target="_blank" style={{ color: colors.textSec, textDecoration: 'none' }}>
                        <FaGithub style={{ display: 'inline', marginRight: 4 }} />GitHub
                    </a>
                </p>
            </footer>

            {/* <footer style={{ background: colors.bg, padding: '30px 0', textAlign: 'center', borderTop: `1px solid ${colors.border}` }}>
                <p style={{ color: colors.textSec }}>
                    Built with <a href="/" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 600 }}>CareerCanvas</a> •{' '}
                    <a href="https://github.com/PrasadSimhadri/CareerCanvas" target="_blank" style={{ color: colors.textSec, textDecoration: 'none' }}>
                        <FaGithub style={{ display: 'inline', marginRight: 4 }} />GitHub
                    </a>
                </p>
            </footer> */}

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
                html { scroll-behavior: smooth; }
                ::selection { background: #8B5CF6; color: white; }
            `}</style>
        </div>
    );
}

function SocialIconButton({ href, icon, color }: { href: string; icon: React.ReactNode; color: string }) {
    return (
        <a href={href} target="_blank" style={{ width: 50, height: 50, borderRadius: 16, border: '1px solid currentColor', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: 'inherit', textDecoration: 'none', transition: 'all 0.3s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-5px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'currentColor'; e.currentTarget.style.color = 'inherit'; e.currentTarget.style.transform = 'none'; }}>
            {icon}
        </a>
    );
}

function ContactPill({ icon, label, value, href, colors }: { icon: React.ReactNode; label: string; value: string; href?: string; colors: any }) {
    const content = (
        <div style={{ textAlign: 'left' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.accent, fontWeight: 800, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                {icon} {label}
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{value}</div>
        </div>
    );

    if (href) return <a href={href} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>{content}</a>;
    return content;
}
