'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { 
    FaGithub, FaLinkedinIn, FaEnvelope, FaPhone, 
    FaMapMarkerAlt, FaExternalLinkAlt, FaTerminal, 
    FaCode, FaMicrochip, FaRocket, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface PortfolioData {
    profileImageUrl: string;
    basicInfo: { fullName: string; tagline: string; description: string };
    about: { description: string; interests: string[] };
    education: { degree: string; institution: string; location: string; startYear: string; endYear: string; grade: string; description: string }[];
    experience: { role: string; company: string; location: string; startDate: string; endDate: string; skills: string[]; description: string }[];
    projects: { title: string; techStack: string[]; description: string; githubUrl: string; liveUrl: string }[];
    skills: { category: string; icon: string; skills: string[] }[];
    achievements: { title: string; organization: string; description: string }[];
    contact: { email: string; phone: string; linkedinUrl: string; githubUrl: string; websiteUrl: string; location: string };
}

export default function CyberTemplate({ data, isPreview }: { data: PortfolioData; isPreview?: boolean }) {
    const [mounted, setMounted] = useState(false);
    const [expandedProject, setExpandedProject] = useState<number | null>(null);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="bg-[#0a0f1e] text-[#e2e8f0] min-h-screen font-mono selection:bg-[#00f2ff] selection:text-[#0a0f1e] overflow-x-hidden">
            {/* Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,242,255,0.05),transparent_70%)]" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#1e293b 0.5px, transparent 0.5px)', backgroundSize: '30px 30px', opacity: 0.2 }} />
                
                {/* Floating Circuit Patterns */}
                <motion.div 
                    animate={{ 
                        opacity: [0.1, 0.3, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-1/4 -left-20 w-96 h-96 border border-[#00f2ff]/10 rounded-full blur-3xl"
                />
                <motion.div 
                    animate={{ 
                        opacity: [0.1, 0.2, 0.1],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] border border-[#bf00ff]/10 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10">
                {/* Header / Hero */}
                <header className="min-h-screen flex flex-col items-center justify-center p-6 relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="text-center"
                    >
                        <div className="mb-12 relative flex justify-center">
                            {data.profileImageUrl ? (
                                <div className="relative w-48 h-48">
                                    <div className="absolute inset-0 border-2 border-[#00f2ff] rotate-45 animate-pulse" />
                                    <div className="absolute inset-0 border-2 border-[#bf00ff] -rotate-45" />
                                    <img src={data.profileImageUrl} alt="User" className="w-full h-full object-cover relative z-10 border-2 border-[#1e293b]" />
                                </div>
                            ) : (
                                <div className="w-48 h-48 flex items-center justify-center border-2 border-[#00f2ff]/30 relative group">
                                    <div className="absolute inset-0 bg-[#00f2ff]/5 group-hover:bg-[#00f2ff]/10 transition-colors" />
                                    <FaTerminal className="text-6xl text-[#00f2ff]" />
                                </div>
                            )}
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="inline-block py-1 px-4 border border-[#00f2ff]/30 bg-[#00f2ff]/5 text-[#00f2ff] text-xs mb-8 tracking-[0.5em]"
                        >
                            UPLINK_ESTABLISHED // {data.basicInfo.fullName.toUpperCase().replace(/\s/g, '_')}
                        </motion.div>

                        <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter leading-none">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2ff] via-[#e2e8f0] to-[#bf00ff]">
                                {data.basicInfo.fullName}
                            </span>
                        </h1>

                        <p className="text-xl md:text-2xl text-[#94a3b8] max-w-2xl mx-auto mb-12 font-light border-l-4 border-[#bf00ff] pl-6">
                            {data.basicInfo.tagline}
                        </p>

                        <button 
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative px-10 py-4 bg-transparent border-2 border-[#00f2ff] text-[#00f2ff] font-bold overflow-hidden transition-all hover:text-[#0a0f1e]"
                        >
                            <span className="relative z-10">INITIALIZE_CONTACT</span>
                            <div className="absolute inset-0 bg-[#00f2ff] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                    </motion.div>

                    <motion.div 
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute bottom-10 text-[#00f2ff]/50"
                    >
                        <FaChevronDown size={24} />
                    </motion.div>
                </header>

                {/* Main Content */}
                <main className="max-w-7xl mx-auto px-6">
                    {/* About Section */}
                    <section id="about" className="py-32 grid lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={itemVariants}
                        >
                            <h2 className="text-sm font-black text-[#00f2ff] mb-8 tracking-[0.8em] uppercase border-b border-[#00f2ff]/20 pb-4">01 / PERSISTENT_DATA</h2>
                            <p className="text-2xl md:text-3xl text-[#e2e8f0] leading-tight font-light mb-8">
                                {data.about.description}
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {data.about.interests.map((interest, i) => (
                                    <span key={i} className="text-xs text-[#64748b] border border-[#1e293b] px-4 py-1 hover:border-[#00f2ff]/50 transition-colors">
                                        #{interest.toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            {data.skills.map((group, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 bg-[#111827]/50 border border-[#1e293b] hover:border-[#00f2ff]/30 transition-all group"
                                >
                                    <h3 className="text-[10px] font-black text-[#64748b] mb-4 tracking-widest group-hover:text-[#00f2ff] transition-colors">{group.category.toUpperCase()}</h3>
                                    <div className="space-y-3">
                                        {group.skills.map((skill, j) => (
                                            <div key={j} className="flex items-center gap-3">
                                                <div className="w-1 h-1 bg-[#bf00ff]" />
                                                <span className="text-sm text-[#94a3b8]">{skill}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Projects Section */}
                    <section id="projects" className="py-32">
                        <h2 className="text-sm font-black text-[#00f2ff] mb-16 tracking-[0.8em] uppercase border-b border-[#00f2ff]/20 pb-4">02 / COMPILED_WORKS</h2>
                        
                        <div className="grid gap-6">
                            {data.projects.map((proj, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className={`group border border-[#1e293b] transition-all overflow-hidden ${expandedProject === i ? 'bg-[#111827] border-[#00f2ff]/50' : 'bg-transparent hover:border-[#1e293b]'}`}
                                >
                                    <div 
                                        onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                                        className="p-8 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer gap-6"
                                    >
                                        <div className="flex items-center gap-8">
                                            <span className="text-4xl font-black text-[#1e293b] group-hover:text-[#00f2ff]/10 transition-colors">0{i + 1}</span>
                                            <div>
                                                <h3 className="text-3xl font-black text-[#e2e8f0] group-hover:text-[#00f2ff] transition-colors">{proj.title}</h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    {proj.techStack.slice(0, 3).map((tech, j) => (
                                                        <span key={j} className="text-[10px] text-[#64748b] border border-[#1e293b] px-2 py-0.5">{tech}</span>
                                                    ))}
                                                    {proj.techStack.length > 3 && <span className="text-[10px] text-[#64748b] px-2 py-0.5">+{proj.techStack.length - 3}</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-[#00f2ff]">
                                            {expandedProject === i ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {expandedProject === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="px-8 pb-8"
                                            >
                                                <div className="pt-8 border-t border-[#1e293b] grid md:grid-cols-3 gap-12">
                                                    <div className="md:col-span-2">
                                                        <h4 className="text-[10px] text-[#64748b] uppercase mb-4 tracking-widest">Description</h4>
                                                        <p className="text-lg text-[#94a3b8] leading-relaxed mb-8">{proj.description}</p>
                                                        <div className="flex gap-6">
                                                            {proj.githubUrl && (
                                                                <a href={proj.githubUrl} className="flex items-center gap-2 text-[#00f2ff] hover:text-[#bf00ff] transition-colors">
                                                                    <FaGithub /> SOURCE_CODE
                                                                </a>
                                                            )}
                                                            {proj.liveUrl && (
                                                                <a href={proj.liveUrl} className="flex items-center gap-2 text-[#00f2ff] hover:text-[#bf00ff] transition-colors">
                                                                    <FaExternalLinkAlt /> LIVE_DEPLOY
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-[10px] text-[#64748b] uppercase mb-4 tracking-widest">Stack</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {proj.techStack.map((tech, j) => (
                                                                <span key={j} className="text-xs text-[#e2e8f0] bg-[#1e293b] px-3 py-1">{tech}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Timeline Section */}
                    <section className="py-32 grid lg:grid-cols-2 gap-24">
                        <div>
                            <h2 className="text-sm font-black text-[#00f2ff] mb-12 tracking-[0.8em] uppercase">03 / EXPERIENCE</h2>
                            <div className="space-y-12">
                                {data.experience.map((exp, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="relative pl-8 border-l border-[#1e293b]"
                                    >
                                        <div className="absolute -left-[5px] top-0 w-2 h-2 bg-[#00f2ff] shadow-[0_0_10px_#00f2ff]" />
                                        <div className="text-[10px] text-[#bf00ff] mb-2">{exp.startDate} — {exp.endDate}</div>
                                        <h3 className="text-xl font-black text-[#e2e8f0] mb-1">{exp.role}</h3>
                                        <p className="text-[#64748b] mb-4">{exp.company} // {exp.location}</p>
                                        <p className="text-sm text-[#94a3b8] leading-relaxed">{exp.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-sm font-black text-[#00f2ff] mb-12 tracking-[0.8em] uppercase">04 / EDUCATION</h2>
                            <div className="grid gap-6">
                                {data.education.map((edu, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        className="p-8 border border-[#1e293b] bg-[#111827]/30 group hover:border-[#bf00ff]/30 transition-all"
                                    >
                                        <div className="flex justify-between items-start mb-6">
                                            <span className="text-[10px] text-[#64748b]">{edu.startYear} — {edu.endYear}</span>
                                            <span className="px-3 py-1 bg-[#bf00ff]/10 text-[#bf00ff] text-xs font-black">GRADE: {edu.grade}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-[#e2e8f0] mb-1 group-hover:text-[#00f2ff] transition-colors">{edu.degree}</h3>
                                        <p className="text-[#64748b]">{edu.institution}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Achievements */}
                    {data.achievements?.length > 0 && (
                        <section className="py-32">
                            <h2 className="text-sm font-black text-[#00f2ff] mb-16 tracking-[0.8em] uppercase border-b border-[#00f2ff]/20 pb-4 text-center">05 / ACHIEVEMENTS</h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {data.achievements.map((ach, i) => (
                                    <motion.div 
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="p-8 border border-[#1e293b] bg-gradient-to-br from-[#111827] to-transparent hover:border-[#00f2ff]/30 transition-all relative overflow-hidden group"
                                    >
                                        <FaRocket className="text-3xl text-[#bf00ff] mb-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                                        <h3 className="text-xl font-black text-[#e2e8f0] mb-2">{ach.title}</h3>
                                        <div className="text-[10px] text-[#00f2ff] mb-4 tracking-widest">{ach.organization.toUpperCase()}</div>
                                        <p className="text-sm text-[#64748b] leading-relaxed">{ach.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                {/* Footer / Contact */}
                <footer id="contact" className="py-32 mt-32 border-t border-[#1e293b] bg-black/40">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter">
                                ESTABLISH_<span className="text-[#00f2ff] drop-shadow-[0_0_20px_#00f2ff]">CONNECTION</span>
                            </h2>
                            <div className="flex flex-col md:flex-row justify-center items-center gap-12 mb-20 text-xl font-light">
                                <a href={`mailto:${data.contact.email}`} className="group flex items-center gap-4 hover:text-[#00f2ff] transition-colors">
                                    <FaEnvelope className="text-[#bf00ff]" /> {data.contact.email}
                                </a>
                                {data.contact.phone && (
                                    <div className="flex items-center gap-4">
                                        <FaPhone className="text-[#bf00ff]" /> {data.contact.phone}
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-center gap-6 mb-32">
                                {data.contact.githubUrl && (
                                    <a href={data.contact.githubUrl} className="w-16 h-16 border border-[#1e293b] flex items-center justify-center text-2xl hover:border-[#00f2ff] hover:text-[#00f2ff] hover:-translate-y-2 transition-all">
                                        <FaGithub />
                                    </a>
                                )}
                                {data.contact.linkedinUrl && (
                                    <a href={data.contact.linkedinUrl} className="w-16 h-16 border border-[#1e293b] flex items-center justify-center text-2xl hover:border-[#bf00ff] hover:text-[#bf00ff] hover:-translate-y-2 transition-all">
                                        <FaLinkedinIn />
                                    </a>
                                )}
                            </div>
                        </motion.div>

                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-[#334155] tracking-[0.5em]">
                            <a href="/" className="hover:text-blue-400">BUILT_BY_BUILD_UR_SITE_CORE</a>
                            <span className="text-[#475569]">{data.contact.location || 'PLANET_EARTH'}</span>
                        </div>
                    </div>
                </footer>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
                html { scroll-behavior: smooth; }
                body { background-color: #0a0f1e; }
            `}</style>
        </div>
    );
}
