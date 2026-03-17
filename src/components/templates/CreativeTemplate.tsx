'use client';

import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaExternalLinkAlt, FaTrophy, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

interface PortfolioData {
    profileImageUrl: string;
    basicInfo: { fullName: string; tagline: string; description: string };
    about: { description: string; interests: string[] };
    education: { degree: string; institution: string; location: string; startYear: string; endYear: string; grade: string }[];
    experience: { role: string; company: string; location: string; startDate: string; endDate: string; skills: string[]; description: string }[];
    projects: { title: string; techStack: string[]; description: string; githubUrl: string; liveUrl: string }[];
    skills: { category: string; skills: string[] }[];
    achievements: { title: string; organization: string; description: string }[];
    contact: { email: string; phone: string; linkedinUrl: string; githubUrl: string; location: string };
}

const containerVariants = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true }
};

const itemVariants = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
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
        pillBg: 'rgba(139,92,246,0.15)',
        iconBg: 'rgba(255,255,255,0.03)',
        accent: '#8B5CF6',
        accentGradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
        secondary: '#EC4899'
    } : {
        bg: '#ffffff',
        text: '#1e1b4b',
        navBg: 'rgba(255,255,255,0.8)',
        cardBg: '#f8fafc',
        cardBorder: 'rgba(139,92,246,0.1)',
        textSec: '#475569',
        pillBg: 'rgba(139,92,246,0.08)',
        iconBg: '#f1f5f9',
        accent: '#7c3aed',
        accentGradient: 'linear-gradient(135deg, #7c3aed, #9333ea)',
        secondary: '#db2777'
    };

    const hasPhoto = !!data.profileImageUrl;

    return (
        <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Poppins', sans-serif", minHeight: '100vh', position: 'relative', overflowX: 'hidden' }}>
            {/* Background Blobs (Enhanced) */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ position: 'fixed', top: '-10%', right: '-10%', width: 700, height: 700, background: `radial-gradient(circle, ${colors.accent}20, transparent)`, borderRadius: '50%', filter: 'blur(120px)', zIndex: 0 }} 
            />
            <motion.div 
                animate={{ scale: [1, 1.3, 1], x: [0, -60, 0], y: [0, -40, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                style={{ position: 'fixed', bottom: '-10%', left: '-10%', width: 600, height: 600, background: `radial-gradient(circle, ${colors.secondary}15, transparent)`, borderRadius: '50%', filter: 'blur(120px)', zIndex: 0 }} 
            />

            {/* Navigation */}
            <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, background: colors.navBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${colors.cardBorder}` }}>
                <div style={{ maxWidth: 1300, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.05em' }}>
                        <span style={{ color: colors.accent }}>{data.basicInfo.fullName.split(' ')[0]}</span>.
                    </motion.span>
                    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }} className="hidden lg:flex">
                        {['About', 'Projects', 'Experience', 'Education', 'Achievements', 'Skills', 'Contact'].map((item) => (
                            <motion.a key={item} href={`#${item.toLowerCase()}`} whileHover={{ scale: 1.05, color: colors.accent }} style={{ color: colors.text, textDecoration: 'none', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', transition: 'color 0.3s' }}>{item}</motion.a>
                        ))}
                        {mounted && (
                            <motion.button 
                                whileTap={{ scale: 0.9 }}
                                onClick={toggleTheme} 
                                style={{ width: 40, height: 40, borderRadius: '12px', background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, color: colors.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                                {isDark ? <FaSun /> : <FaMoon />}
                            </motion.button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Asymmetrical Hero Section */}
            <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', zIndex: 1, padding: '120px 24px 60px' }}>
                <div style={{ maxWidth: 1300, margin: '0 auto', width: '100%', display: 'flex', flexDirection: hasPhoto ? 'row' : 'column', alignItems: 'center', gap: 60, flexWrap: 'wrap' }}>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: hasPhoto ? -60 : 0, y: hasPhoto ? 0 : 60 }} 
                        animate={{ opacity: 1, x: 0, y: 0 }} 
                        transition={{ duration: 1, ease: "easeOut" }} 
                        style={{ flex: 1, textAlign: hasPhoto ? 'left' : 'center', maxWidth: hasPhoto ? 700 : 900 }}
                    >
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 }} style={{ display: 'inline-block', padding: '6px 16px', background: `linear-gradient(90deg, ${colors.accent}, ${colors.secondary})`, borderRadius: 50, color: 'white', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 24 }}>Creative Portfolio</motion.div>
                        <h1 style={{ fontSize: hasPhoto ? 'clamp(3rem, 8vw, 5rem)' : 'clamp(4rem, 10vw, 7rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.06em', marginBottom: 24 }}>
                            {data.basicInfo.fullName.split(' ').map((name, i) => (
                                <motion.span 
                                    key={i} 
                                    initial={{ opacity: 0, x: -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    style={{ display: 'block', color: i === 1 ? 'transparent' : 'inherit', WebkitTextStroke: i === 1 ? `1px ${colors.text}` : 'none' }}
                                >
                                    {name}
                                </motion.span>
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
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, rotate: 10 }} 
                            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
                            transition={{ duration: 1, ease: "easeOut" }} 
                            style={{ flex: '0 0 auto', position: 'relative' }}
                        >
                            <div style={{ width: clamp('300px', '40vw', '450px'), height: clamp('350px', '45vw', '500px'), overflow: 'hidden', clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0% 100%)', position: 'relative' }}>
                                <img src={data.profileImageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${colors.accent}40, transparent)`, pointerEvents: 'none' }} />
                            </div>
                            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, border: `3px solid ${colors.accent}`, zIndex: -1 }} />
                            <div style={{ position: 'absolute', bottom: -30, left: -30, width: 180, height: 180, background: `${colors.secondary}20`, zIndex: -1 }} />
                        </motion.div>
                    )}
                </div>
            </section>

            {/* About Section */}
            {data.about.description && (
                <section id="about" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1300, margin: '0 auto', display: 'flex', gap: 80, flexWrap: 'wrap' }}>
                        <div style={{ flex: '0 0 250px' }}>
                            <h2 style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, color: isDark ? '#ffffff' : '#000000', letterSpacing: '-0.1em' }}>ABOUT_</h2>
                        </div>
                        <motion.div 
                            variants={itemVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            style={{ flex: 1, minWidth: 300 }}
                        >
                            <div style={{ background: colors.cardBg, padding: clamp('24px', '5vw', '60px'), border: `1px solid ${colors.cardBorder}`, borderRadius: '0 60px 0 60px', position: 'relative' }}>
                                {data.about.description.split('\n').map((p, i) => (
                                    <p key={i} style={{ color: colors.textSec, fontSize: '1.2rem', lineHeight: 1.8, marginBottom: 24 }}>{p}</p>
                                ))}
                                {data.about.interests?.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                                        {data.about.interests.map((interest, i) => (
                                            <motion.span
                                                key={i}
                                                variants={itemVariants}
                                                style={{
                                                    padding: '12px 24px',
                                                    borderRadius: '100px',
                                                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                                                    background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 700,
                                                    color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.7)',
                                                    textTransform: 'uppercase',
                                                    letterSpacing: '1px'
                                                }}
                                            >
                                                {interest}
                                            </motion.span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Projects - Refined Bento Grid */}
            {data.projects?.length > 0 && data.projects[0].title && (
                <section id="projects" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: 80, textAlign: 'center' }}
                        >
                            PROJECTS<span style={{ color: colors.accent }}>.</span>
                        </motion.h2>
                        
                        <div style={{ 
                            display: 'grid', 
                            gridTemplateColumns: 'repeat(12, 1fr)', 
                            gridAutoRows: 'minmax(300px, auto)',
                            gap: 24 
                        }}>
                            {data.projects.map((proj, i) => {
                                const isBig = i % 3 === 0;
                                return (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        whileHover={{ y: -10, boxShadow: `0 20px 40px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}` }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        style={{ 
                                            gridColumn: isBig ? 'span 12' : 'span 6',
                                            gridRow: isBig ? 'span 1' : 'span 1',
                                            background: i % 2 === 0 ? colors.accentGradient : colors.cardBg,
                                            color: i % 2 === 0 ? 'white' : colors.text,
                                            borderRadius: 40,
                                            padding: clamp('32px', '5vw', '48px'),
                                            border: `1px solid ${colors.cardBorder}`,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'space-between',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        className="col-span-12 md:col-span-12 lg:col-span-6"
                                    >
                                        {/* CSS adjustment for smaller screens */}
                                        <style dangerouslySetInnerHTML={{ __html: `
                                            @media (max-width: 1024px) {
                                                .col-span-12 { grid-column: span 12 !important; }
                                            }
                                        `}} />
                                        
                                        <div>
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
                                                {proj.techStack.map((tech, j) => (
                                                    <span key={j} style={{ background: i % 2 === 0 ? 'rgba(255,255,255,0.2)' : colors.pillBg, padding: '6px 16px', borderRadius: 12, fontSize: '0.8rem', fontWeight: 700 }}>{tech}</span>
                                                ))}
                                            </div>
                                            <h3 style={{ fontSize: isBig ? '3rem' : '1.8rem', fontWeight: 900, marginBottom: 20, lineHeight: 1.1 }}>{proj.title}</h3>
                                            <p style={{ opacity: 0.9, fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 650, marginBottom: 40 }}>{proj.description}</p>
                                        </div>
                                        
                                        <div style={{ display: 'flex', gap: 24 }}>
                                            {proj.githubUrl && <a href={proj.githubUrl} target="_blank" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>GITHUB <FaArrowUp style={{ transform: 'rotate(45deg)' }} /></a>}
                                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" style={{ color: 'inherit', textDecoration: 'none', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 6 }}>LIVE DEMO <FaArrowUp style={{ transform: 'rotate(45deg)' }} /></a>}
                                        </div>
                                        
                                        {/* Abstract Circle Decoration */}
                                        <div style={{ 
                                            position: 'absolute', 
                                            bottom: -40, 
                                            right: -40, 
                                            width: isBig ? 180 : 120, 
                                            height: isBig ? 180 : 120, 
                                            background: 'rgba(255,255,255,0.1)', 
                                            borderRadius: '50%',
                                            pointerEvents: 'none' 
                                        }} />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience & Education - Asymmetrical Split */}
            {(data.experience?.length > 0 || data.education?.length > 0) && (
                <section style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1300, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 80 }}>
                        
                        {/* Experience */}
                        <div id="experience" style={{ gridColumn: 'span 12' }} className="col-span-12 lg:col-span-7">
                            <motion.h2 variants={itemVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{ fontSize: '3rem', fontWeight: 900, marginBottom: 60 }}>EXPERIENCE</motion.h2>
                            <motion.div 
                                variants={containerVariants}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: true }}
                                style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
                            >
                                {data.experience.map((exp, i) => (
                                    <motion.div key={i} variants={itemVariants} style={{ position: 'relative', paddingLeft: 40, borderLeft: `2px solid ${colors.cardBorder}` }}>
                                        <div style={{ position: 'absolute', left: -9, top: 0, width: 16, height: 16, borderRadius: '50%', background: colors.accent, border: `4px solid ${colors.bg}` }} />
                                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: colors.accent, letterSpacing: '0.1em' }}>{exp.startDate} — {exp.endDate}</span>
                                        <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '8px 0' }}>{exp.role}</h3>
                                        <p style={{ fontSize: '1.1rem', fontWeight: 600, color: colors.secondary, marginBottom: 16 }}>{exp.company}</p>
                                        <p style={{ color: colors.textSec, lineHeight: 1.7 }}>{exp.description}</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                                            {exp.skills?.map((skill, j) => (
                                                <span key={j} style={{ fontSize: '0.7rem', fontWeight: 700, padding: '4px 12px', background: colors.pillBg, borderRadius: 6 }}>{skill}</span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Education */}
                        <div id="education" style={{ gridColumn: 'span 12' }} className="col-span-12">
                            <motion.h2 variants={itemVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{ fontSize: '3rem', fontWeight: 900, marginBottom: 60 }}>EDUCATION</motion.h2>
                            <motion.div 
                                variants={containerVariants}
                                initial="initial"
                                whileInView="whileInView"
                                viewport={{ once: true }}
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: data.education.length > 1 ? 'row' : 'column', 
                                    flexWrap: 'wrap',
                                    gap: 32,
                                    justifyContent: data.education.length > 1 ? 'center' : 'flex-start'
                                }}
                            >
                                {data.education.map((edu, i) => (
                                    <motion.div 
                                        key={i} 
                                        variants={itemVariants} 
                                        style={{ 
                                            background: colors.cardBg, 
                                            padding: 32, 
                                            borderRadius: 24, 
                                            border: `1px solid ${colors.cardBorder}`,
                                            flex: data.education.length > 1 ? '1 1 400px' : 'none',
                                            maxWidth: data.education.length > 1 ? '600px' : '100%'
                                        }}
                                    >
                                        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: colors.secondary }}>{edu.startYear} — {edu.endYear}</span>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '8px 0' }}>{edu.degree}</h3>
                                        <p style={{ fontWeight: 600 }}>{edu.institution}</p>
                                        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, color: colors.textSec, fontSize: '0.9rem' }}>
                                            <span style={{ fontWeight: 800, color: colors.accent }}>{edu.grade}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Achievements - Mosaic Grid */}
            {data.achievements?.length > 0 && data.achievements[0].title && (
                <section id="achievements" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                        <motion.h2 variants={itemVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{ fontSize: '3rem', fontWeight: 900, marginBottom: 60, textAlign: 'center' }}>ACHIEVEMENTS</motion.h2>
                        <motion.div 
                            variants={containerVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            style={{ 
                                display: 'flex', 
                                flexWrap: 'wrap', 
                                gap: 24,
                                justifyContent: 'center'
                            }}
                        >
                            {data.achievements.map((ach, i) => (
                                <motion.div 
                                    key={i} 
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.03, rotate: 1 }}
                                    style={{ 
                                        background: colors.cardBg, 
                                        padding: 40, 
                                        borderRadius: 32, 
                                        border: `1px solid ${colors.cardBorder}`, 
                                        position: 'relative',
                                        flex: data.achievements.length === 1 ? '0 1 600px' : data.achievements.length === 2 ? '1 1 45%' : '1 1 30%',
                                        minWidth: '300px',
                                        maxWidth: data.achievements.length === 1 ? '800px' : 'none'
                                    }}
                                >
                                    <FaTrophy style={{ fontSize: '2.5rem', color: colors.accent, marginBottom: 24, opacity: 0.5 }} />
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12 }}>{ach.title}</h3>
                                    <p style={{ fontSize: '0.9rem', color: colors.secondary, fontWeight: 700, marginBottom: 16 }}>{ach.organization}</p>
                                    <p style={{ color: colors.textSec, fontSize: '1rem', lineHeight: 1.6 }}>{ach.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Skills - Interactive Marquee/Grid */}
            {data.skills?.length > 0 && (
                <section id="skills" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1300, margin: '0 auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 60, flexWrap: 'wrap', gap: 40 }}>
                            <motion.h2 variants={itemVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{ fontSize: '4.5rem', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.05em' }}>MINDSET<br/><span style={{ color: colors.accent }}>& TOOLS</span></motion.h2>
                            <motion.p variants={itemVariants} initial="initial" whileInView="whileInView" viewport={{ once: true }} style={{ color: colors.textSec, maxWidth: 450, fontSize: '1.2rem' }}>A strategic overlap of technologies and creative methodologies refined through years of persistent practice.</motion.p>
                        </div>
                        
                        <motion.div 
                            variants={containerVariants}
                            initial="initial"
                            whileInView="whileInView"
                            viewport={{ once: true }}
                            style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}
                        >
                            {data.skills.flatMap(s => s.skills).map((skill, i) => (
                                <motion.div 
                                    key={i} 
                                    variants={itemVariants}
                                    whileHover={{ scale: 1.1, backgroundColor: colors.accent, color: 'white', borderColor: colors.accent }}
                                    style={{ 
                                        padding: '16px 32px', 
                                        background: colors.cardBg, 
                                        borderRadius: 20, 
                                        border: `1px solid ${colors.cardBorder}`,
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        cursor: 'default',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', background: `linear-gradient(135deg, ${colors.bg}, ${colors.cardBg})`, padding: clamp('40px', '8vw', '100px'), borderRadius: 60, border: `1px solid ${colors.cardBorder}` }}
                >
                    <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', fontWeight: 900, marginBottom: 32, letterSpacing: '-0.04em' }}>LET&apos;S CHAT<span style={{ color: colors.accent }}>.</span></h2>
                    <p style={{ fontSize: '1.2rem', color: colors.textSec, marginBottom: 60 }}>Have a bold idea? Let&apos;s build the future together.</p>
                    <motion.a 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`mailto:${data.contact.email}`} 
                        style={{ display: 'inline-block', fontSize: clamp('1.2rem', '3.5vw', '2.2rem'), fontWeight: 900, color: colors.text, textDecoration: 'none', background: colors.accentGradient, padding: '18px 40px', borderRadius: 24, boxShadow: `0 15px 30px ${colors.accent}40`, marginBottom: 80 }}
                    >
                        {data.contact.email}
                    </motion.a>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: clamp('20px', '5vw', '60px'), flexWrap: 'wrap' }}>
                        <ContactPill icon={<FaPhone />} label="Phone" value={data.contact.phone} colors={colors} />
                        <ContactPill icon={<FaLinkedinIn />} label="LinkedIn" value="Profile" href={data.contact.linkedinUrl} colors={colors} />
                        <ContactPill icon={<FaGithub />} label="GitHub" value="Repos" href={data.contact.githubUrl} colors={colors} />
                    </div>
                </motion.div>
            </section>

            <footer style={{ padding: '80px 24px 40px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <p style={{ color: colors.textSec, fontWeight: 600 }}>
                    Created using <a href="/" style={{ color: colors.accent, textDecoration: 'none' }}>CareerCanvas</a>
                </p>
                <div style={{ marginTop: 20 }}>
                    <a href="https://github.com/PrasadSimhadri/CareerCanvas" target="_blank" style={{ color: colors.textSec, textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        <FaGithub /> GitHub
                    </a>
                </div>
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
                html { scroll-behavior: smooth; }
                ::selection { background: ${colors.accent}; color: white; }
                @media (max-width: 768px) {
                    nav { padding: 12px 16px; }
                }
            `}</style>
        </div>
    );
}

// Helper function for responsive values
function clamp(min: string, val: string, max: string) {
    return `clamp(${min}, ${val}, ${max})`;
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
