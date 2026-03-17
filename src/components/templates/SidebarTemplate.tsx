'use client';

import { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaExternalLinkAlt, FaTrophy, FaMapMarkerAlt, FaUser, FaBriefcase, FaCode, FaGraduationCap, FaStar, FaArrowUp, FaSun, FaMoon } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';

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

const navItems = [
    { id: 'about', icon: <FaUser />, label: 'About' },
    { id: 'experience', icon: <FaBriefcase />, label: 'Experience' },
    { id: 'education', icon: <FaGraduationCap />, label: 'Education' },
    { id: 'projects', icon: <FaCode />, label: 'Projects' },
    { id: 'skills', icon: <FaStar />, label: 'Skills' },
    { id: 'achievements', icon: <FaTrophy />, label: 'Achievements' },
    { id: 'contact', icon: <FaEnvelope />, label: 'Contact' },
];

export default function SidebarTemplate({ data, isPreview = false }: { data: PortfolioData, isPreview?: boolean }) {
    const { resolvedTheme, setTheme: setGlobalTheme } = useTheme();
    const [localTheme, setLocalTheme] = useState<'light' | 'dark' | null>(null);
    const [mounted, setMounted] = useState(false);
    const [activeSection, setActiveSection] = useState('about');

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPos = window.scrollY + 100;
            
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        bg: '#0F0F1A',
        sidebarBg: 'linear-gradient(180deg, #16162E, #0E0E20)',
        text: '#E8E6F0',
        textSec: 'rgba(232,230,240,0.6)',
        cardBg: 'rgba(255,255,255,0.02)',
        cardBorder: 'rgba(249,115,22,0.12)',
        hoverBg: 'rgba(249,115,22,0.1)',
        sidebarTextOff: 'rgba(232,230,240,0.5)',
        accent: '#F97316',
        accentLight: '#FB923C'
    } : {
        bg: '#F9FAFB',
        sidebarBg: '#FFFFFF',
        text: '#111827',
        textSec: '#374151',
        cardBg: '#FFFFFF',
        cardBorder: 'rgba(249,115,22,0.2)',
        hoverBg: 'rgba(249,115,22,0.15)',
        sidebarTextOff: 'rgba(17,24,39,0.6)',
        accent: '#F97316',
        accentLight: '#FB923C'
    };

    const scrollTo = (id: string) => {
        setActiveSection(id);
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -20;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif" }}>
            {/* Fixed Sidebar */}
            <aside className="hidden md:flex" style={{ position: 'fixed', left: 0, top: 0, width: 260, height: '100vh', background: colors.sidebarBg, borderRight: '1px solid rgba(249,115,22,0.1)', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', zIndex: 100, overflow: 'auto' }}>
                {/* Profile Photo */}
                {data.profileImageUrl && (
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, #EF4444)`, padding: 3, marginBottom: 16 }}>
                        <img src={data.profileImageUrl} alt={data.basicInfo.fullName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                )}
                
                {!data.profileImageUrl && <div style={{ height: 20 }} />}
                
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textAlign: 'center', marginBottom: 4 }}>{data.basicInfo.fullName}</h2>
                <p style={{ color: colors.accent, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', marginBottom: 24 }}>{data.basicInfo.tagline}</p>

                {/* Social Icons */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
                    {data.contact.linkedinUrl && <SidebarSocial colors={colors} href={data.contact.linkedinUrl} icon={<FaLinkedinIn />} />}
                    {data.contact.githubUrl && <SidebarSocial colors={colors} href={data.contact.githubUrl} icon={<FaGithub />} />}
                    {data.contact.email && <SidebarSocial colors={colors} href={`mailto:${data.contact.email}`} icon={<FaEnvelope />} />}
                </div>

                {/* Navigation */}
                <nav style={{ width: '100%' }}>
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => scrollTo(item.id)}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 12,
                                padding: '12px 16px',
                                borderRadius: 12,
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                fontWeight: 500,
                                marginBottom: 4,
                                transition: 'all 0.2s',
                                background: activeSection === item.id ? colors.hoverBg : 'transparent',
                                color: activeSection === item.id ? colors.accent : colors.sidebarTextOff,
                            }}
                        >
                            <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                    {mounted && (
                        <button
                            onClick={toggleTheme}
                            style={{
                                width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
                                borderRadius: 12, border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500,
                                marginTop: 16, background: 'transparent', color: colors.sidebarTextOff, transition: 'all 0.2s'
                            }}
                        >
                            <span style={{ fontSize: '1rem' }}>{isDark ? <FaSun /> : <FaMoon />}</span>
                            {isDark ? 'Light Mode' : 'Dark Mode'}
                        </button>
                    )}
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '40px 5%' }} className="md:ml-[260px]">
                {/* Mobile Header */}
                <div className="md:hidden" style={{ textAlign: 'center', marginBottom: 40 }}>
                    <div style={{ width: 80, height: 80, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, #EF4444)`, padding: 2, margin: '0 auto 12px' }}>
                        {data.profileImageUrl ? (
                            <img src={data.profileImageUrl} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: colors.cardBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 700, color: 'white' }}>
                                {data.basicInfo.fullName.charAt(0)}
                            </div>
                        )}
                    </div>
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{data.basicInfo.fullName}</h2>
                    <p style={{ color: colors.accent, fontSize: '0.8rem' }}>{data.basicInfo.tagline}</p>
                </div>

                {/* Hero / About */}
                <section id="about" style={{ marginBottom: 64 }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 style={{ fontSize: '3.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: 16 }}>{data.basicInfo.fullName}</h1>
                        <p style={{ color: colors.accent, fontSize: '1.3rem', fontWeight: 600, marginBottom: 24 }}>{data.basicInfo.tagline}</p>
                        <p style={{ color: colors.textSec, fontSize: '1.1rem', lineHeight: 1.8, marginBottom: 40, maxWidth: 800 }}>{data.basicInfo.description}</p>
                    </motion.div>

                    {data.about.description && (
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <SectionHeading accent={colors.accent}>About Me</SectionHeading>
                            <div style={{ background: colors.cardBg, borderRadius: 20, border: `1px solid ${colors.cardBorder}`, padding: 32, marginBottom: 32 }}>
                                {data.about.description.split('\n').map((p, i) => (
                                    <p key={i} style={{ color: colors.textSec, lineHeight: 1.8, marginBottom: 16 }}>{p}</p>
                                ))}
                                {data.about.interests?.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 24 }}>
                                        {data.about.interests.map((interest, i) => (
                                            <span key={i} style={{ background: colors.hoverBg, border: `1px solid ${colors.cardBorder}`, color: colors.accent, padding: '8px 16px', borderRadius: 10, fontSize: '0.85rem', fontWeight: 500 }}>{interest}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {data.about.cards?.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
                            {data.about.cards.map((card, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: colors.cardBg, borderRadius: 16, border: `1px solid ${colors.cardBorder}`, padding: 24 }}>
                                    <h4 style={{ color: colors.accent, fontWeight: 700, marginBottom: 10, fontSize: '1.1rem' }}>{card.title}</h4>
                                    <p style={{ color: colors.textSec, fontSize: '0.9rem', lineHeight: 1.6 }}>{card.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Experience */}
                {data.experience?.length > 0 && data.experience[0].company && (
                    <section id="experience" style={{ marginBottom: 64 }}>
                        <SectionHeading accent={colors.accent}>Experience</SectionHeading>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', gap: 20 }}>
                                    <div style={{ width: 4, borderRadius: 2, background: `linear-gradient(180deg, ${colors.accent}, #EF4444)`, flexShrink: 0 }} />
                                    <div style={{ background: colors.cardBg, borderRadius: 16, border: `1px solid ${colors.cardBorder}`, padding: 28, flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                                            <div>
                                                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{exp.role}</h3>
                                                <p style={{ color: colors.accent, fontWeight: 600 }}>{exp.company}</p>
                                            </div>
                                            <p style={{ color: colors.sidebarTextOff, fontSize: '0.9rem', fontWeight: 500 }}>{exp.startDate} — {exp.endDate}</p>
                                        </div>
                                        <p style={{ color: colors.sidebarTextOff, fontSize: '0.85rem', marginBottom: 16 }}>{exp.location}</p>
                                        {exp.skills.length > 0 && (
                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                                                {exp.skills.map((s, j) => (
                                                    <span key={j} style={{ background: colors.hoverBg, color: colors.accent, padding: '4px 12px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500 }}>{s}</span>
                                                ))}
                                            </div>
                                        )}
                                        <p style={{ color: colors.textSec, lineHeight: 1.7 }}>{exp.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {data.education?.length > 0 && data.education[0].institution && (
                    <section id="education" style={{ marginBottom: 64 }}>
                        <SectionHeading accent={colors.accent}>Education</SectionHeading>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                            {data.education.map((edu, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: colors.cardBg, borderRadius: 16, border: `1px solid ${colors.cardBorder}`, padding: 28 }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>{edu.institution}</h3>
                                    <p style={{ color: colors.accent, fontWeight: 600, marginBottom: 4 }}>{edu.degree}</p>
                                    <p style={{ color: colors.textSec, fontSize: '0.9rem', marginBottom: 12 }}>{edu.location}</p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: `1px solid ${colors.cardBorder}`, paddingTop: 12 }}>
                                        <span style={{ color: colors.sidebarTextOff, fontSize: '0.85rem' }}>{edu.startYear} — {edu.endYear}</span>
                                        {edu.grade && <span style={{ color: colors.accent, fontWeight: 600, fontSize: '0.85rem' }}>{edu.grade}</span>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects?.length > 0 && data.projects[0].title && (
                    <section id="projects" style={{ marginBottom: 64 }}>
                        <SectionHeading accent={colors.accent}>Worked Projects</SectionHeading>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
                            {data.projects.map((proj, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: colors.cardBg, borderRadius: 20, border: `1px solid ${colors.cardBorder}`, padding: 32, display: 'flex', flexDirection: 'column', transition: 'all 0.3s', cursor: 'default' }} whileHover={{ y: -5, boxShadow: '0 10px 30px -10px rgba(249,115,22,0.1)' }}>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>{proj.title}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                                        {proj.techStack.map((tech, j) => (
                                            <span key={j} style={{ background: colors.hoverBg, color: colors.accent, padding: '4px 12px', borderRadius: 8, fontSize: '0.75rem', fontWeight: 600 }}>{tech}</span>
                                        ))}
                                    </div>
                                    <p style={{ color: colors.textSec, fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 24, flex: 1 }}>{proj.description}</p>
                                    <div style={{ display: 'flex', gap: 16 }}>
                                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" style={{ color: colors.text, textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = colors.accent} onMouseLeave={e => e.currentTarget.style.color = colors.text}><FaGithub size={18} /> Code</a>}
                                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" style={{ color: colors.text, textDecoration: 'none', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = colors.accent} onMouseLeave={e => e.currentTarget.style.color = colors.text}><FaExternalLinkAlt size={16} /> Demo</a>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && data.skills[0].category && (
                    <section id="skills" style={{ marginBottom: 64 }}>
                        <SectionHeading accent={colors.accent}>Core Skills</SectionHeading>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                            {data.skills.map((group, i) => (
                                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} style={{ background: colors.cardBg, borderRadius: 16, border: `1px solid ${colors.cardBorder}`, padding: 24 }}>
                                    <h4 style={{ color: colors.accent, fontWeight: 700, fontSize: '1.1rem', marginBottom: 20, textAlign: 'center' }}>{group.category}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                        {group.skills.map((skill, j) => (
                                            <div key={j} style={{ padding: '10px 16px', background: colors.hoverBg, borderRadius: 10, fontSize: '0.9rem', color: colors.text, display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div style={{ width: 6, height: 6, borderRadius: '50%', background: colors.accent }} />
                                                {skill}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {data.achievements?.length > 0 && data.achievements[0].title && (
                    <section id="achievements" style={{ marginBottom: 64 }}>
                        <SectionHeading accent={colors.accent}>Achievements</SectionHeading>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                            {data.achievements.map((ach, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: colors.cardBg, borderRadius: 16, border: `1px solid ${colors.cardBorder}`, padding: 24, display: 'flex', gap: 20, alignItems: 'center' }}>
                                    <div style={{ width: 50, height: 50, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.accent}, #EF4444)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, fontSize: '1.2rem' }}>
                                        <FaTrophy />
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{ach.title}</h4>
                                        <p style={{ color: colors.accent, fontSize: '0.9rem', fontWeight: 600, marginBottom: 4 }}>{ach.organization}</p>
                                        <p style={{ color: colors.textSec, fontSize: '0.9rem' }}>{ach.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contact */}
                <section id="contact" style={{ marginBottom: 64 }}>
                    <SectionHeading accent={colors.accent}>Get In Touch</SectionHeading>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                        {data.contact.email && <ContactCard colors={colors} icon={<FaEnvelope />} title="Email" value={data.contact.email} href={`mailto:${data.contact.email}`} />}
                        {data.contact.phone && <ContactCard colors={colors} icon={<FaPhone />} title="Phone" value={data.contact.phone} href={`tel:${data.contact.phone}`} />}
                        {data.contact.linkedinUrl && <ContactCard colors={colors} icon={<FaLinkedinIn />} title="LinkedIn" value="Profile" href={data.contact.linkedinUrl} />}
                        {data.contact.githubUrl && <ContactCard colors={colors} icon={<FaGithub />} title="GitHub" value="Repositories" href={data.contact.githubUrl} />}
                        {data.contact.location && <ContactCard colors={colors} icon={<FaMapMarkerAlt />} title="Location" value={data.contact.location} />}
                    </div>
                </section>

                <footer style={{ padding: '40px 0', textAlign: 'center', borderTop: `1px solid ${colors.cardBorder}` }}>
                    <p style={{ color: colors.sidebarTextOff, fontSize: '0.9rem' }}>
                        &copy; {new Date().getFullYear()} {data.basicInfo.fullName}. Built with <a href="/" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 700 }}>CareerCanvas</a>
                    </p>
                </footer>

                {/* Scroll to Top */}
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    style={{ position: 'fixed', bottom: 30, right: 30, width: 50, height: 50, background: `linear-gradient(135deg, ${colors.accent}, #EF4444)`, color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99, border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(249,115,22,0.3)' }}
                >
                    <FaArrowUp />
                </button>
            </main>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                
                html {
                    scroll-behavior: smooth;
                }
                
                /* Selection color */
                ::selection {
                    background: rgba(249,115,22,0.2);
                    color: inherit;
                }
            `}</style>
        </div>
    );
}

function SectionHeading({ children, accent }: { children: React.ReactNode, accent: string }) {
    return (
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 32, position: 'relative', display: 'inline-block' }}>
            {children}
            <span style={{ display: 'block', width: '50px', height: '4px', background: `linear-gradient(90deg, ${accent}, #EF4444)`, borderRadius: '2px', marginTop: '10px' }} />
        </h2>
    );
}

function SidebarSocial({ href, icon, colors }: { href: string; icon: React.ReactNode; colors: any }) {
    return (
        <a 
            href={href} 
            target="_blank" 
            style={{ width: 40, height: 40, borderRadius: 10, background: colors.cardBg, border: `1px solid ${colors.cardBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent, textDecoration: 'none', fontSize: '1.1rem', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = colors.hoverBg; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = colors.cardBg; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
            {icon}
        </a>
    );
}

function ContactCard({ icon, title, value, href, colors }: { icon: React.ReactNode; title: string; value: string; href?: string; colors: any }) {
    const content = (
        <div style={{ background: colors.cardBg, borderRadius: 16, border: `1px solid ${colors.cardBorder}`, padding: 24, display: 'flex', alignItems: 'center', gap: 16, height: '100%', transition: 'all 0.2s' }} className="contact-card">
            <div style={{ width: 48, height: 48, borderRadius: 12, background: colors.hoverBg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent, fontSize: '1.2rem', flexShrink: 0 }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '0.8rem', color: colors.sidebarTextOff, marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{title}</p>
                <p style={{ fontSize: '1rem', color: colors.text, fontWeight: 500, wordBreak: 'break-all' }}>{value}</p>
            </div>
        </div>
    );

    if (href) {
        return (
            <a href={href} target="_blank" style={{ textDecoration: 'none', color: 'inherit' }}>
                {content}
            </a>
        );
    }
    return content;
}
