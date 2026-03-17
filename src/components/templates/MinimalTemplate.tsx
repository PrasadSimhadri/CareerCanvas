'use client';

import { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaMapMarkerAlt, FaExternalLinkAlt, FaTrophy, FaArrowUp, FaSun, FaMoon } from 'react-icons/fa';
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

export default function MinimalTemplate({ data, isPreview = false }: { data: PortfolioData, isPreview?: boolean }) {
    const { resolvedTheme, setTheme: setGlobalTheme } = useTheme();
    const [localTheme, setLocalTheme] = useState<'light' | 'dark' | null>(null);
    const [mounted, setMounted] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 50);
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
    
    // Default to dark mode colors initially to prevent flash of unstyled content
    const colors = !mounted || isDark
        ? { bg: '#0a0a0a', bgSec: '#121212', card: '#1a1a1a', border: '#2d2d2d', text: '#f3f4f6', textSec: '#9ca3af', accent: '#00b8d4', accentHover: '#00e5ff', shadow: 'rgba(0,0,0,0.3)', accentBg: 'rgba(0,184,212,0.1)' }
        : { bg: '#f8f9fa', bgSec: '#ffffff', card: '#ffffff', border: '#e5e7eb', text: '#1f2937', textSec: '#374151', accent: '#0097a7', accentHover: '#00b8d4', shadow: 'rgba(0,0,0,0.1)', accentBg: 'rgba(0,151,167,0.1)' };

    const navItems = ['Home', 'About', 'Experience', 'Education', 'Projects', 'Skills', 'Achievements', 'Contact'];
    const firstName = data.basicInfo.fullName.split(' ')[0] || 'Portfolio';

    return (
        <div style={{ background: colors.bg, color: colors.text, fontFamily: "'Inter', sans-serif", lineHeight: 1.6, transition: 'background-color 0.3s, color 0.3s' }}>
            {/* Header */}
            <header style={{ position: 'fixed', top: 0, left: 0, width: '100%', background: isDark ? 'rgba(10,10,10,0.9)' : 'rgba(248,249,250,0.9)', backdropFilter: 'blur(10px)', zIndex: 1000, borderBottom: `1px solid ${colors.border}`, boxShadow: scrolled ? `0 5px 20px ${colors.shadow}` : 'none', transition: 'all 0.3s' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0' }}>
                        <a href="#home" style={{ fontSize: '1.8rem', fontWeight: 700, color: colors.text, textDecoration: 'none' }}>
                            {firstName}<span style={{ color: colors.accent }}>.</span>
                        </a>

                        {/* Desktop Links */}
                        <ul style={{ display: 'flex', listStyle: 'none', alignItems: 'center', gap: 25 }} className="hidden md:flex">
                            {navItems.map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase()}`} style={{ color: colors.text, textDecoration: 'none', fontWeight: 500, transition: 'color 0.3s' }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = colors.accent)}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = colors.text)}>
                                        {item}
                                    </a>
                                </li>
                            ))}
                            <li>
                                {mounted && (
                                    <button onClick={toggleTheme} style={{ width: 40, height: 40, borderRadius: '50%', background: colors.card, border: `1px solid ${colors.border}`, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.text, transition: 'all 0.3s' }}>
                                        {isDark ? <FaSun /> : <FaMoon />}
                                    </button>
                                )}
                            </li>
                        </ul>

                        {/* Mobile Menu Button */}
                        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 5 }}>
                            <div style={{ width: 25, height: 3, background: colors.text, margin: 5, transition: 'all 0.3s', transform: mobileMenu ? 'rotate(-45deg) translate(-5px, 6px)' : 'none' }} />
                            <div style={{ width: 25, height: 3, background: colors.text, margin: 5, transition: 'all 0.3s', opacity: mobileMenu ? 0 : 1 }} />
                            <div style={{ width: 25, height: 3, background: colors.text, margin: 5, transition: 'all 0.3s', transform: mobileMenu ? 'rotate(45deg) translate(-5px, -6px)' : 'none' }} />
                        </button>
                    </nav>

                    {/* Mobile Nav */}
                    {mobileMenu && (
                        <div className="md:hidden" style={{ padding: '20px 0', borderTop: `1px solid ${colors.border}` }}>
                            {navItems.map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenu(false)} style={{ display: 'block', padding: '10px 0', color: colors.text, textDecoration: 'none', textAlign: 'center' }}>{item}</a>
                            ))}
                        </div>
                    )}
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 80 }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', width: '100%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: data.profileImageUrl ? 'space-between' : 'center', gap: 50, flexWrap: 'wrap', textAlign: data.profileImageUrl ? 'left' : 'center' }}>
                        <motion.div initial={{ opacity: 0, x: data.profileImageUrl ? -30 : 0, y: data.profileImageUrl ? 0 : 30 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ duration: 0.8 }} style={{ flex: data.profileImageUrl ? 1 : 'none', minWidth: 300, maxWidth: 800 }}>
                            <h1 style={{ fontSize: '3.5rem', marginBottom: 15, lineHeight: 1.2 }}>{data.basicInfo.fullName}</h1>
                            <h2 style={{ fontSize: '1.5rem', color: colors.accent, marginBottom: 15, fontWeight: 600 }}>{data.basicInfo.tagline}</h2>
                            <p style={{ fontSize: '1.1rem', color: colors.textSec, marginBottom: 25, maxWidth: 600, margin: data.profileImageUrl ? '0 0 25px' : '0 auto 25px' }}>{data.basicInfo.description}</p>
                            <div style={{ display: 'flex', gap: 15, marginTop: 25, flexWrap: 'wrap', justifyContent: data.profileImageUrl ? 'flex-start' : 'center' }}>
                                {data.contact.email && <a href={`mailto:${data.contact.email}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.textSec, textDecoration: 'none' }}><FaEnvelope /> {data.contact.email}</a>}
                                {data.contact.phone && <a href={`tel:${data.contact.phone}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.textSec, textDecoration: 'none' }}><FaPhone /> {data.contact.phone}</a>}
                            </div>
                            <div style={{ display: 'flex', gap: 15, marginTop: 25, justifyContent: data.profileImageUrl ? 'flex-start' : 'center' }}>
                                {data.contact.linkedinUrl && <a href={data.contact.linkedinUrl} target="_blank" style={{ width: 40, height: 40, borderRadius: '50%', background: colors.card, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.text, textDecoration: 'none', transition: 'all 0.3s' }}><FaLinkedinIn /></a>}
                                {data.contact.githubUrl && <a href={data.contact.githubUrl} target="_blank" style={{ width: 40, height: 40, borderRadius: '50%', background: colors.card, border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.text, textDecoration: 'none', transition: 'all 0.3s' }}><FaGithub /></a>}
                            </div>
                            <div style={{ marginTop: 25 }}>
                                <a href="#contact" style={{ display: 'inline-block', background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, color: 'white', padding: '12px 30px', borderRadius: 5, fontWeight: 600, textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>Get In Touch</a>
                            </div>
                        </motion.div>
                        {data.profileImageUrl && (
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} style={{ flex: '0 0 auto', textAlign: 'center' }}>
                                <img src={data.profileImageUrl} alt={data.basicInfo.fullName} style={{ width: 300, height: 300, borderRadius: '10%', objectFit: 'cover', border: `5px solid ${colors.accent}`, boxShadow: `0 0 30px rgba(0,184,212,0.5)`, animation: 'float 8s ease-in-out infinite' }} />
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* About Section */}
            {(data.about.description || data.about.cards?.length > 0) && (
                <section id="about" style={{ background: colors.bgSec, padding: '70px 0' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                        <SectionTitle text="About Me" accent={colors.accent} />
                        <div style={{ display: 'flex', gap: 50, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                            <div style={{ flex: 1, minWidth: 300 }}>
                                {data.about.description.split('\n').map((p, i) => (
                                    <p key={i} style={{ marginBottom: 20, color: colors.textSec }}>{p}</p>
                                ))}
                            </div>
                            {data.about.cards?.length > 0 && (
                                <div style={{ flex: 1, minWidth: 300 }}>
                                    {data.about.cards.map((card, i) => (
                                        <div key={i} style={{ background: colors.card, borderRadius: 10, padding: 25, marginBottom: 20, border: `1px solid ${colors.border}`, transition: 'all 0.3s' }}>
                                            <h3 style={{ fontSize: '1.5rem', marginBottom: 10, color: colors.accent }}>{card.title}</h3>
                                            <p style={{ color: colors.textSec }}>{card.description}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Experience Section */}
            {data.experience?.length > 0 && data.experience[0].company && (
                <section id="experience" style={{ padding: '70px 0' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                        <SectionTitle text="Experience" accent={colors.accent} />
                        {data.experience.map((exp, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ display: 'flex', gap: 50, alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: 300 }}>
                                    <h2 style={{ color: colors.accent }}>{exp.role} at {exp.company}</h2>
                                    <h4 style={{ marginBottom: 15, color: colors.textSec }}>{exp.startDate} - {exp.endDate} • {exp.location}</h4>
                                    {exp.skills.length > 0 && (
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
                                            <h4 style={{ marginRight: 10 }}>Skills:</h4>
                                            <p style={{ color: colors.textSec }}>{exp.skills.join(', ')}</p>
                                        </div>
                                    )}
                                    <p style={{ color: colors.textSec }}>{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education Section */}
            {data.education?.length > 0 && data.education[0].institution && (
                <section id="education" style={{ background: colors.bgSec, padding: '70px 0' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                        <SectionTitle text="Education" accent={colors.accent} />
                        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
                            {/* Central Line */}
                            <div style={{ position: 'absolute', width: 4, background: colors.border, top: 0, bottom: 0, left: '50%', marginLeft: -2 }} className="hidden md:block" />
                            
                            {data.education.map((edu, i) => {
                                const isLeft = i % 2 === 0;
                                return (
                                    <motion.div 
                                        key={i} 
                                        initial={{ opacity: 0, x: isLeft ? -30 : 30 }} 
                                        whileInView={{ opacity: 1, x: 0 }} 
                                        viewport={{ once: true }} 
                                        style={{ 
                                            display: 'flex', 
                                            justifyContent: isLeft ? 'flex-start' : 'flex-end',
                                            width: '100%',
                                            marginBottom: 30,
                                            position: 'relative'
                                        }}
                                        className="flex-col md:flex-row"
                                    >
                                        {/* Dot on line */}
                                        <div style={{ 
                                            position: 'absolute', 
                                            width: 20, 
                                            height: 20, 
                                            background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, 
                                            borderRadius: '50%', 
                                            top: 20, 
                                            left: '50%', 
                                            marginLeft: -10,
                                            zIndex: 2
                                        }} className="hidden md:block shadow-lg" />

                                        <div style={{ 
                                            width: '100%',
                                            maxWidth: 'calc(50% - 40px)',
                                            background: colors.card,
                                            padding: 25,
                                            borderRadius: 15,
                                            border: `1px solid ${colors.border}`,
                                            textAlign: isLeft ? 'right' : 'left',
                                            boxShadow: `0 5px 15px ${colors.shadow}`,
                                            transition: 'all 0.3s'
                                        }} className="md:w-auto w-full mx-auto md:mx-0">
                                            <span style={{ color: colors.accent, fontWeight: 700, fontSize: '0.9rem' }}>{edu.startYear} - {edu.endYear}</span>
                                            <h3 style={{ color: colors.text, fontSize: '1.25rem', margin: '10px 0' }}>{edu.institution}</h3>
                                            <h4 style={{ color: colors.textSec, fontSize: '1rem', fontStyle: 'italic', marginBottom: 10 }}>{edu.location}</h4>
                                            <p style={{ color: colors.accent, fontWeight: 600, marginBottom: 5 }}>{edu.degree}</p>
                                            {edu.grade && <p style={{ color: colors.textSec, fontSize: '0.9rem' }}>Grade: {edu.grade}</p>}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {data.projects?.length > 0 && data.projects[0].title && (
                <section id="projects" style={{ padding: '70px 0' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                        <SectionTitle text="Projects" accent={colors.accent} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 30 }}>
                            {data.projects.map((proj, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: colors.card, borderRadius: 15, overflow: 'hidden', border: `1px solid ${colors.border}`, boxShadow: `0 5px 15px ${colors.shadow}`, transition: 'all 0.3s' }}>
                                    <div style={{ padding: 20 }}>
                                        <h3 style={{ fontSize: '1.5rem', marginBottom: 10, color: colors.text }}>{proj.title}</h3>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 15 }}>
                                            {proj.techStack.map((tech, j) => (
                                                <span key={j} style={{ background: colors.accentBg, color: colors.accent, padding: '5px 10px', borderRadius: 5, fontSize: '0.8rem', fontWeight: 600 }}>{tech}</span>
                                            ))}
                                        </div>
                                        <p style={{ color: colors.textSec, marginBottom: 20 }}>{proj.description}</p>
                                        <div style={{ display: 'flex', gap: 15 }}>
                                            {proj.githubUrl && <a href={proj.githubUrl} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 5, color: colors.textSec, fontSize: '0.9rem', textDecoration: 'none' }}><FaGithub /> GitHub</a>}
                                            {proj.liveUrl && <a href={proj.liveUrl} target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 5, color: colors.textSec, fontSize: '0.9rem', textDecoration: 'none' }}><FaExternalLinkAlt /> Live Demo</a>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills Section */}
            {data.skills?.length > 0 && data.skills[0].category && (
                <section id="skills" style={{ background: colors.bgSec, padding: '70px 0' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                        <SectionTitle text="Skills" accent={colors.accent} />
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 30 }}>
                            {data.skills.map((group, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: colors.card, borderRadius: 15, padding: 25, border: `1px solid ${colors.border}`, boxShadow: `0 5px 15px ${colors.shadow}`, transition: 'all 0.3s' }}>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: 20, color: colors.accent, textAlign: 'center', paddingBottom: 10, borderBottom: `3px solid ${colors.accent}` }}>{group.category}</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {group.skills.map((skill, j) => (
                                            <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: colors.accentBg, borderRadius: 8, transition: 'all 0.3s' }}>
                                                <span style={{ fontWeight: 600, color: colors.text }}>{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Achievements Section */}
            {data.achievements?.length > 0 && data.achievements[0].title && (
                <section id="achievements" style={{ padding: '70px 0' }}>
                    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                        <SectionTitle text="Achievements" accent={colors.accent} />
                        <div style={{ maxWidth: 900, margin: '0 auto' }}>
                            {data.achievements.map((ach, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: colors.card, borderRadius: 15, padding: 28, border: `1px solid ${colors.border}`, boxShadow: `0 5px 15px ${colors.shadow}`, marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 16, transition: 'all 0.3s' }}>
                                    <div style={{ width: 52, height: 52, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.accent, background: colors.accentBg, border: `1px solid ${colors.border}`, fontSize: '1.3rem', flexShrink: 0 }}><FaTrophy /></div>
                                    <div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: 8, color: colors.text }}>{ach.title}</h3>
                                        <p style={{ color: colors.accent, fontWeight: 600, marginBottom: 8 }}>{ach.organization}</p>
                                        <p style={{ color: colors.textSec }}>{ach.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" style={{ background: colors.bgSec, padding: '70px 0' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px' }}>
                    <SectionTitle text="Contact Me" accent={colors.accent} />
                    <div style={{ display: 'flex', gap: 50, justifyContent: 'center', flexWrap: 'wrap' }}>
                        {data.contact.email && <ContactItem icon={<FaEnvelope />} title="Email" value={data.contact.email} colors={colors} />}
                        {data.contact.phone && <ContactItem icon={<FaPhone />} title="Phone" value={data.contact.phone} colors={colors} />}
                        {data.contact.linkedinUrl && <ContactItem icon={<FaLinkedinIn />} title="LinkedIn" value="Profile" href={data.contact.linkedinUrl} colors={colors} />}
                        {data.contact.githubUrl && <ContactItem icon={<FaGithub />} title="GitHub" value="Repositories" href={data.contact.githubUrl} colors={colors} />}
                        {data.contact.location && <ContactItem icon={<FaMapMarkerAlt />} title="Location" value={data.contact.location} colors={colors} />}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: colors.bg, padding: '30px 0', textAlign: 'center', borderTop: `1px solid ${colors.border}` }}>
                <p style={{ color: colors.textSec }}>
                    Built with <a href="/" style={{ color: colors.accent, textDecoration: 'none', fontWeight: 600 }}>CareerCanvas</a> •{' '}
                    <a href="https://github.com/PrasadSimhadri/CareerCanvas" target="_blank" style={{ color: colors.textSec, textDecoration: 'none' }}>
                        <FaGithub style={{ display: 'inline', marginRight: 4 }} />GitHub
                    </a>
                </p>
            </footer>

            {/* Back to top */}
            {scrolled && (
                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ position: 'fixed', bottom: 30, right: 30, width: 45, height: 45, background: `linear-gradient(90deg, ${colors.accent}, ${colors.accentHover})`, color: 'white', borderRadius: '50%', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99, boxShadow: `0 4px 15px ${colors.shadow}` }}>
                    <FaArrowUp />
                </button>
            )}

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    );
}

function SectionTitle({ text, accent }: { text: string; accent: string }) {
    return (
        <h2 style={{ fontSize: '2.2rem', marginBottom: 40, textAlign: 'center', position: 'relative' }}>
            {text}
            <span style={{ display: 'block', width: 60, height: 4, background: `linear-gradient(90deg, ${accent}, ${accent}cc)`, borderRadius: 2, margin: '12px auto 0' }} />
        </h2>
    );
}

function ContactItem({ icon, title, value, href, colors }: { icon: React.ReactNode; title: string; value: string; href?: string; colors: Record<string, string> }) {
    const content = (
        <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
            <div style={{ width: 45, height: 45, background: colors.card, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: colors.accent, border: `1px solid ${colors.border}` }}>{icon}</div>
            <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: 2 }}>{title}</h3>
                <p style={{ color: colors.textSec, fontSize: '0.9rem' }}>{value}</p>
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
