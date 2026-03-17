'use client';

import { useState } from 'react';
import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaExternalLinkAlt, FaTrophy, FaMapMarkerAlt, FaUser, FaBriefcase, FaCode, FaGraduationCap, FaStar, FaArrowUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

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

export default function SidebarTemplate({ data }: { data: PortfolioData }) {
    const [activeSection, setActiveSection] = useState('about');

    const scrollTo = (id: string) => {
        setActiveSection(id);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#12122B', color: '#E8E6F0', fontFamily: "'Inter', sans-serif" }}>
            {/* Fixed Sidebar */}
            <aside className="hidden md:flex" style={{ position: 'fixed', left: 0, top: 0, width: 260, height: '100vh', background: 'linear-gradient(180deg, #16162E, #0E0E20)', borderRight: '1px solid rgba(245,158,11,0.1)', flexDirection: 'column', alignItems: 'center', padding: '40px 20px', zIndex: 100, overflow: 'auto' }}>
                {/* Profile Photo */}
                {data.profileImageUrl ? (
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', padding: 3, marginBottom: 16 }}>
                        <img src={data.profileImageUrl} alt={data.basicInfo.fullName} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                    </div>
                ) : (
                    <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: 'white', marginBottom: 16, fontWeight: 700 }}>
                        {data.basicInfo.fullName.charAt(0)}
                    </div>
                )}
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, textAlign: 'center', marginBottom: 4 }}>{data.basicInfo.fullName}</h2>
                <p style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', marginBottom: 24 }}>{data.basicInfo.tagline}</p>

                {/* Social Icons */}
                <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
                    {data.contact.linkedinUrl && <SidebarSocial href={data.contact.linkedinUrl} icon={<FaLinkedinIn />} />}
                    {data.contact.githubUrl && <SidebarSocial href={data.contact.githubUrl} icon={<FaGithub />} />}
                    {data.contact.email && <SidebarSocial href={`mailto:${data.contact.email}`} icon={<FaEnvelope />} />}
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
                                background: activeSection === item.id ? 'rgba(245,158,11,0.1)' : 'transparent',
                                color: activeSection === item.id ? '#F59E0B' : 'rgba(232,230,240,0.5)',
                            }}
                            onMouseEnter={(e) => {
                                if (activeSection !== item.id) {
                                    e.currentTarget.style.background = 'rgba(245,158,11,0.05)';
                                    e.currentTarget.style.color = '#F59E0B';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (activeSection !== item.id) {
                                    e.currentTarget.style.background = 'transparent';
                                    e.currentTarget.style.color = 'rgba(232,230,240,0.5)';
                                }
                            }}
                        >
                            <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main style={{ marginLeft: 0, flex: 1, padding: '40px 24px', maxWidth: 900 }} className="md:ml-[260px]">
                {/* Mobile Header */}
                <div className="md:hidden" style={{ textAlign: 'center', marginBottom: 40 }}>
                    {data.profileImageUrl && (
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', padding: 2, margin: '0 auto 12px' }}>
                            <img src={data.profileImageUrl} alt="" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        </div>
                    )}
                    <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{data.basicInfo.fullName}</h2>
                    <p style={{ color: '#F59E0B', fontSize: '0.8rem' }}>{data.basicInfo.tagline}</p>
                </div>

                {/* Hero / About */}
                <section id="about">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <h1 style={{ fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 8 }}>{data.basicInfo.fullName}</h1>
                        <p style={{ color: '#F59E0B', fontSize: '1.2rem', fontWeight: 600, marginBottom: 16 }}>{data.basicInfo.tagline}</p>
                        <p style={{ color: 'rgba(232,230,240,0.6)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: 32, maxWidth: 700 }}>{data.basicInfo.description}</p>
                    </motion.div>

                    {data.about.description && (
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                            <SectionHeading>About</SectionHeading>
                            <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(245,158,11,0.1)', padding: 32, marginBottom: 32 }}>
                                {data.about.description.split('\n').map((p, i) => (
                                    <p key={i} style={{ color: 'rgba(232,230,240,0.65)', lineHeight: 1.8, marginBottom: 12 }}>{p}</p>
                                ))}
                                {data.about.interests?.length > 0 && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                                        {data.about.interests.map((interest, i) => (
                                            <span key={i} style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', color: '#FCD34D', padding: '6px 14px', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500 }}>{interest}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {data.about.cards?.length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginBottom: 48 }}>
                            {data.about.cards.map((card, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(245,158,11,0.08)', padding: 24 }}>
                                    <h4 style={{ color: '#F59E0B', fontWeight: 700, marginBottom: 8, fontSize: '1rem' }}>{card.title}</h4>
                                    <p style={{ color: 'rgba(232,230,240,0.5)', fontSize: '0.85rem', lineHeight: 1.6 }}>{card.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Experience */}
                {data.experience?.length > 0 && data.experience[0].company && (
                    <section id="experience" style={{ marginBottom: 48 }}>
                        <SectionHeading>Experience</SectionHeading>
                        {data.experience.map((exp, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                                <div style={{ width: 4, borderRadius: 2, background: 'linear-gradient(180deg, #F59E0B, #EF4444)', flexShrink: 0 }} />
                                <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(245,158,11,0.08)', padding: 24, flex: 1 }}>
                                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 4 }}>{exp.role}</h3>
                                    <p style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>{exp.company}</p>
                                    <p style={{ color: 'rgba(232,230,240,0.4)', fontSize: '0.8rem', marginBottom: 12 }}>{exp.startDate} — {exp.endDate} • {exp.location}</p>
                                    {exp.skills.length > 0 && (
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                                            {exp.skills.map((s, j) => (
                                                <span key={j} style={{ background: 'rgba(245,158,11,0.08)', color: '#FCD34D', padding: '3px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 500 }}>{s}</span>
                                            ))}
                                        </div>
                                    )}
                                    <p style={{ color: 'rgba(232,230,240,0.55)', lineHeight: 1.7, fontSize: '0.9rem' }}>{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </section>
                )}

                {/* Education */}
                {data.education?.length > 0 && data.education[0].institution && (
                    <section id="education" style={{ marginBottom: 48 }}>
                        <SectionHeading>Education</SectionHeading>
                        <div style={{ display: 'grid', gap: 16 }}>
                            {data.education.map((edu, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(245,158,11,0.08)', padding: 24 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                                        <div>
                                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4 }}>{edu.institution}</h3>
                                            <p style={{ color: 'rgba(232,230,240,0.5)' }}>{edu.degree} • {edu.location}</p>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <p style={{ color: '#F59E0B', fontWeight: 600, fontSize: '0.85rem' }}>{edu.startYear} — {edu.endYear}</p>
                                            {edu.grade && <p style={{ color: 'rgba(232,230,240,0.5)', fontSize: '0.85rem' }}>{edu.grade}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {data.projects?.length > 0 && data.projects[0].title && (
                    <section id="projects" style={{ marginBottom: 48 }}>
                        <SectionHeading>Projects</SectionHeading>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                            {data.projects.map((proj, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(245,158,11,0.08)', padding: 24, transition: 'all 0.3s' }}>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 10 }}>{proj.title}</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                                        {proj.techStack.map((tech, j) => (
                                            <span key={j} style={{ background: 'rgba(245,158,11,0.08)', color: '#FCD34D', padding: '4px 10px', borderRadius: 6, fontSize: '0.75rem', fontWeight: 500 }}>{tech}</span>
                                        ))}
                                    </div>
                                    <p style={{ color: 'rgba(232,230,240,0.55)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>{proj.description}</p>
                                    <div style={{ display: 'flex', gap: 12 }}>
                                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" style={{ color: '#FCD34D', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}><FaGithub /> Code</a>}
                                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" style={{ color: '#F87171', textDecoration: 'none', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}><FaExternalLinkAlt /> Live</a>}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {data.skills?.length > 0 && data.skills[0].category && (
                    <section id="skills" style={{ marginBottom: 48 }}>
                        <SectionHeading>Skills</SectionHeading>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
                            {data.skills.map((group, i) => (
                                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(245,158,11,0.08)', padding: 20 }}>
                                    <h4 style={{ color: '#F59E0B', fontWeight: 700, fontSize: '0.95rem', marginBottom: 14, textAlign: 'center' }}>{group.category}</h4>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {group.skills.map((skill, j) => (
                                            <div key={j} style={{ padding: '8px 12px', background: 'rgba(245,158,11,0.05)', borderRadius: 8, fontSize: '0.85rem', color: 'rgba(232,230,240,0.7)' }}>{skill}</div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Achievements */}
                {data.achievements?.length > 0 && data.achievements[0].title && (
                    <section id="achievements" style={{ marginBottom: 48 }}>
                        <SectionHeading>Achievements</SectionHeading>
                        {data.achievements.map((ach, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(245,158,11,0.08)', padding: 24, marginBottom: 16, display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                                <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #F59E0B, #EF4444)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, fontSize: '0.9rem' }}><FaTrophy /></div>
                                <div>
                                    <h4 style={{ fontWeight: 700, marginBottom: 4 }}>{ach.title}</h4>
                                    <p style={{ color: '#F59E0B', fontSize: '0.85rem', fontWeight: 600, marginBottom: 6 }}>{ach.organization}</p>
                                    <p style={{ color: 'rgba(232,230,240,0.55)', fontSize: '0.9rem', lineHeight: 1.6 }}>{ach.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </section>
                )}

                {/* Contact */}
                <section id="contact" style={{ marginBottom: 48 }}>
                    <SectionHeading>Contact</SectionHeading>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 16 }}>
                        {data.contact.email && <ContactCard icon={<FaEnvelope />} title="Email" value={data.contact.email} />}
                        {data.contact.phone && <ContactCard icon={<FaPhone />} title="Phone" value={data.contact.phone} />}
                        {data.contact.linkedinUrl && <ContactCard icon={<FaLinkedinIn />} title="LinkedIn" value={data.contact.linkedinUrl} />}
                        {data.contact.githubUrl && <ContactCard icon={<FaGithub />} title="GitHub" value={data.contact.githubUrl} />}
                        {data.contact.location && <ContactCard icon={<FaMapMarkerAlt />} title="Location" value={data.contact.location} />}
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ padding: '24px 0', textAlign: 'center', borderTop: '1px solid rgba(245,158,11,0.08)' }}>
                    <p style={{ color: 'rgba(232,230,240,0.35)', fontSize: '0.85rem' }}>
                        Built with <a href="/" style={{ color: '#F59E0B', textDecoration: 'none', fontWeight: 700 }}>CareerCanvas</a>
                        {' • '}
                        <a href="https://github.com" target="_blank" style={{ color: 'rgba(232,230,240,0.35)', textDecoration: 'none' }}><FaGithub style={{ display: 'inline', marginRight: 4 }} />GitHub</a>
                    </p>
                </footer>

                <a href="#about" style={{ position: 'fixed', bottom: 30, right: 30, width: 45, height: 45, background: 'linear-gradient(135deg, #F59E0B, #EF4444)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99, textDecoration: 'none' }}><FaArrowUp /></a>
            </main>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
      `}</style>
        </div>
    );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 28, position: 'relative', display: 'inline-block' }}>
            {children}
            <span style={{ display: 'block', width: 40, height: 3, background: 'linear-gradient(90deg, #F59E0B, #EF4444)', borderRadius: 2, marginTop: 8 }} />
        </h2>
    );
}

function SidebarSocial({ href, icon }: { href: string; icon: React.ReactNode }) {
    return (
        <a href={href} target="_blank" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', textDecoration: 'none', fontSize: '0.9rem', transition: 'all 0.2s' }}>{icon}</a>
    );
}

function ContactCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
    return (
        <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 14, border: '1px solid rgba(245,158,11,0.08)', padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245,158,11,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '1rem', flexShrink: 0 }}>{icon}</div>
            <div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(232,230,240,0.4)', marginBottom: 2 }}>{title}</p>
                <p style={{ fontSize: '0.85rem', color: 'rgba(232,230,240,0.7)', wordBreak: 'break-all' }}>{value}</p>
            </div>
        </div>
    );
}
