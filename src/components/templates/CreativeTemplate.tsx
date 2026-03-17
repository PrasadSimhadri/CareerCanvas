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
        pillBg: 'rgba(139,92,246,0.3)',
        iconBg: 'rgba(255,255,255,0.6)'
    };

    return (
        <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Poppins', sans-serif", minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Floating Background Blobs */}
            <div style={{ position: 'fixed', top: '10%', left: '10%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(139,92,246,0.15), transparent)', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 6s ease-in-out infinite', zIndex: 0 }} />
            <div style={{ position: 'fixed', bottom: '10%', right: '10%', width: 350, height: 350, background: 'radial-gradient(circle, rgba(236,72,153,0.12), transparent)', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulse 8s ease-in-out infinite', zIndex: 0 }} />
            <div style={{ position: 'fixed', top: '50%', left: '50%', width: 300, height: 300, background: 'radial-gradient(circle, rgba(245,158,11,0.08), transparent)', borderRadius: '50%', filter: 'blur(80px)', zIndex: 0 }} />

            {/* Navigation */}
            <nav style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100, background: colors.navBg, backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(139,92,246,0.15)' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {data.basicInfo.fullName.split(' ')[0]}.
                    </span>
                    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }} className="hidden md:flex">
                        {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: colors.textSec, textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.3s' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = '#EC4899')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSec)}>
                                {item}
                            </a>
                        ))}
                        {mounted && (
                            <button onClick={toggleTheme} style={{ background: 'none', border: 'none', color: colors.textSec, cursor: 'pointer', fontSize: '1.2rem', padding: 4, display: 'flex', alignItems: 'center' }}>
                                {isDark ? <FaSun /> : <FaMoon />}
                            </button>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', position: 'relative', zIndex: 1, paddingTop: 80 }}>
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
                    {data.profileImageUrl && (
                        <div style={{ width: 150, height: 150, borderRadius: '50%', margin: '0 auto 30px', background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', padding: 4 }}>
                            <img src={data.profileImageUrl} alt={data.basicInfo.fullName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                    )}
                    <h1 style={{ fontSize: '4rem', fontWeight: 900, lineHeight: 1.1, marginBottom: 16, background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        {data.basicInfo.fullName}
                    </h1>
                    <p style={{ fontSize: '1.3rem', color: '#EC4899', fontWeight: 600, marginBottom: 16 }}>
                        {data.basicInfo.tagline}
                    </p>
                    <p style={{ maxWidth: 550, margin: '0 auto', color: colors.textSec, fontSize: '1.1rem', lineHeight: 1.7, marginBottom: 30 }}>
                        {data.basicInfo.description}
                    </p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                        {data.contact.linkedinUrl && <SocialBtn href={data.contact.linkedinUrl} icon={<FaLinkedinIn />} gradient="linear-gradient(135deg, #8B5CF6, #6D28D9)" />}
                        {data.contact.githubUrl && <SocialBtn href={data.contact.githubUrl} icon={<FaGithub />} gradient="linear-gradient(135deg, #EC4899, #BE185D)" />}
                        {data.contact.email && <SocialBtn href={`mailto:${data.contact.email}`} icon={<FaEnvelope />} gradient="linear-gradient(135deg, #F59E0B, #D97706)" />}
                    </div>
                </motion.div>
            </section>

            {/* About Section */}
            {data.about.description && (
                <section id="about" style={{ padding: '100px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 900, margin: '0 auto' }}>
                        <motion.div {...fadeUp}>
                            <GradientTitle>About Me</GradientTitle>
                            <div style={{ background: colors.cardBg, backdropFilter: 'blur(20px)', borderRadius: 24, border: '1px solid rgba(139,92,246,0.15)', padding: 40 }}>
                                {data.about.description.split('\n').map((p, i) => (
                                    <p key={i} style={{ color: colors.textSec, lineHeight: 1.8, marginBottom: 16, fontSize: '1.05rem' }}>{p}</p>
                                ))}
                                {data.about.interests?.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                                        {data.about.interests.map((interest, i) => (
                                            <span key={i} style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.15))', border: '1px solid rgba(139,92,246,0.2)', color: '#C4B5FD', padding: '8px 18px', borderRadius: 50, fontSize: '0.85rem', fontWeight: 500 }}>{interest}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Experience */}
            {data.experience?.length > 0 && data.experience[0].company && (
                <section id="experience" style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 900, margin: '0 auto' }}>
                        <motion.div {...fadeUp}><GradientTitle>Experience</GradientTitle></motion.div>
                        {data.experience.map((exp, i) => (
                            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} style={{ background: colors.cardBg, backdropFilter: 'blur(20px)', borderRadius: 20, border: '1px solid rgba(139,92,246,0.15)', padding: 32, marginBottom: 24 }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>{exp.role}</h3>
                                <p style={{ color: '#EC4899', fontWeight: 600, marginBottom: 4 }}>{exp.company} • {exp.location}</p>
                                <p style={{ color: colors.textSec, fontSize: '0.9rem', marginBottom: 16 }}>{exp.startDate} — {exp.endDate}</p>
                                {exp.skills.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
                                        {exp.skills.map((s, j) => (
                                            <span key={j} style={{ background: colors.pillBg, color: '#C4B5FD', padding: '4px 12px', borderRadius: 6, fontSize: '0.8rem', fontWeight: 500 }}>{s}</span>
                                        ))}
                                    </div>
                                )}
                                <p style={{ color: colors.textSec, lineHeight: 1.7 }}>{exp.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {data.education?.length > 0 && data.education[0].institution && (
                <section style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 900, margin: '0 auto' }}>
                        <motion.div {...fadeUp}><GradientTitle>Education</GradientTitle></motion.div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                            {data.education.map((edu, i) => (
                                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} style={{ background: colors.cardBg, backdropFilter: 'blur(20px)', borderRadius: 20, border: '1px solid rgba(139,92,246,0.15)', padding: 28 }}>
                                    <p style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.85rem', marginBottom: 8 }}>{edu.startYear} — {edu.endYear}</p>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 6 }}>{edu.institution}</h3>
                                    <p style={{ color: colors.textSec, marginBottom: 4 }}>{edu.degree}</p>
                                    {edu.grade && <p style={{ color: '#EC4899', fontWeight: 600, fontSize: '0.9rem' }}>{edu.grade}</p>}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {data.projects?.length > 0 && data.projects[0].title && (
                <section id="projects" style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                        <motion.div {...fadeUp}><GradientTitle>Projects</GradientTitle></motion.div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                            {data.projects.map((proj, i) => (
                                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} style={{ background: colors.cardBg, backdropFilter: 'blur(20px)', borderRadius: 20, border: '1px solid rgba(139,92,246,0.15)', padding: 28, transition: 'all 0.3s' }}>
                                    <div style={{ height: 8, borderRadius: 4, background: `linear-gradient(90deg, #8B5CF6, #EC4899, #F59E0B)`, marginBottom: 20, opacity: 0.6 }} />
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>{proj.title}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                                        {proj.techStack.map((tech, j) => (
                                            <span key={j} style={{ background: colors.pillBg, color: '#C4B5FD', padding: '5px 12px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500 }}>{tech}</span>
                                        ))}
                                    </div>
                                    <p style={{ color: colors.textSec, marginBottom: 20, lineHeight: 1.7 }}>{proj.description}</p>
                                    <div style={{ display: 'flex', gap: 16 }}>
                                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" style={{ color: '#C4B5FD', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}><FaGithub /> Code</a>}
                                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" style={{ color: '#F9A8D4', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.9rem' }}><FaExternalLinkAlt /> Live</a>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills */}
            {data.skills?.length > 0 && data.skills[0].category && (
                <section id="skills" style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                        <motion.div {...fadeUp}><GradientTitle>Skills</GradientTitle></motion.div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 24 }}>
                            {data.skills.map((group, i) => (
                                <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} style={{ background: colors.cardBg, backdropFilter: 'blur(20px)', borderRadius: 20, border: '1px solid rgba(139,92,246,0.15)', padding: 28 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#EC4899', marginBottom: 20, textAlign: 'center' }}>{group.category}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                                        {group.skills.map((skill, j) => (
                                            <span key={j} style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.12), rgba(236,72,153,0.12))', border: '1px solid rgba(139,92,246,0.15)', color: '#E0D5FF', padding: '8px 16px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 500 }}>{skill}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Achievements */}
            {data.achievements?.length > 0 && data.achievements[0].title && (
                <section style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
                    <div style={{ maxWidth: 900, margin: '0 auto' }}>
                        <motion.div {...fadeUp}><GradientTitle>Achievements</GradientTitle></motion.div>
                        {data.achievements.map((ach, i) => (
                            <motion.div key={i} {...fadeUp} style={{ background: colors.cardBg, backdropFilter: 'blur(20px)', borderRadius: 20, border: '1px solid rgba(245,158,11,0.15)', padding: 28, marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}><FaTrophy /></div>
                                <div>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>{ach.title}</h3>
                                    <p style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.9rem', marginBottom: 6 }}>{ach.organization}</p>
                                    <p style={{ color: colors.textSec, lineHeight: 1.7 }}>{ach.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Contact */}
            <section id="contact" style={{ padding: '80px 24px', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
                    <motion.div {...fadeUp}>
                        <GradientTitle>Get In Touch</GradientTitle>
                        <p style={{ color: colors.textSec, marginBottom: 40, fontSize: '1.1rem' }}>Let&apos;s connect and create something amazing together.</p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16 }}>
                            {data.contact.email && <ContactPill colors={colors} icon={<FaEnvelope />} text={data.contact.email} href={`mailto:${data.contact.email}`} />}
                            {data.contact.phone && <ContactPill colors={colors} icon={<FaPhone />} text={data.contact.phone} href={`tel:${data.contact.phone}`} />}
                            {data.contact.linkedinUrl && <ContactPill colors={colors} icon={<FaLinkedinIn />} text="LinkedIn" href={data.contact.linkedinUrl} />}
                            {data.contact.githubUrl && <ContactPill colors={colors} icon={<FaGithub />} text="GitHub" href={data.contact.githubUrl} />}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '30px 24px', textAlign: 'center', borderTop: '1px solid rgba(139,92,246,0.1)', position: 'relative', zIndex: 1 }}>
                <p style={{ color: colors.textSec, fontSize: '0.9rem' }}>
                    Built with <a href="/" style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textDecoration: 'none', fontWeight: 700 }}>CareerCanvas</a>
                    {' • '}
                    <a href="https://github.com" target="_blank" style={{ color: colors.textSec, textDecoration: 'none' }}><FaGithub style={{ display: 'inline', marginRight: 4 }} />GitHub</a>
                </p>
            </footer>

            <a href="#" style={{ position: 'fixed', bottom: 30, right: 30, width: 45, height: 45, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99, textDecoration: 'none' }}><FaArrowUp /></a>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
                @keyframes pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    );
}

function GradientTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, textAlign: 'center', marginBottom: 48, background: 'linear-gradient(135deg, #8B5CF6, #EC4899, #F59E0B)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {children}
        </h2>
    );
}

function SocialBtn({ href, icon, gradient }: { href: string; icon: React.ReactNode; gradient: string }) {
    return (
        <a href={href} target="_blank" style={{ width: 50, height: 50, borderRadius: '50%', background: gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem', textDecoration: 'none', transition: 'transform 0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}>
            {icon}
        </a>
    );
}

function ContactPill({ icon, text, href, colors }: { icon: React.ReactNode; text: string; href: string; colors: any }) {
    return (
        <a href={href} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 10, background: colors.cardBg, border: '1px solid rgba(139,92,246,0.15)', borderRadius: 50, padding: '12px 24px', color: isDark ? '#E0D5FF' : colors.text, textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.3s', backdropFilter: 'blur(10px)' }}>
            <span style={{ color: '#EC4899' }}>{icon}</span>
            {text}
        </a>
    );
}
