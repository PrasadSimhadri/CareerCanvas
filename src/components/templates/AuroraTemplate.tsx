'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { 
    FaMapMarkerAlt, FaExternalLinkAlt, FaChevronDown, FaRocket, FaGithub, FaLinkedinIn
} from 'react-icons/fa';
import { useEffect, useState, useRef } from 'react';

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

export default function AuroraTemplate({ data }: { data: PortfolioData }) {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="bg-[#fdfbf7] text-slate-900 min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-600 overflow-x-hidden">
            {/* Dynamic Aurora Background */}
            <div className="fixed inset-0 z-0">
                <motion.div 
                    animate={{ 
                        scale: [1, 1.2, 1],
                        x: [0, 80, 0],
                        y: [0, 40, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity }}
                    className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] bg-sky-100/50 rounded-full blur-[120px]" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.4, 1],
                        x: [0, -60, 0],
                        y: [0, 80, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] bg-indigo-50/50 rounded-full blur-[150px]" 
                />
                <motion.div 
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ duration: 12, repeat: Infinity }}
                    className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-[#fffbeb] rounded-full blur-[100px]" 
                />
                <div className="absolute inset-0 bg-[#fdfbf7]/40 backdrop-blur-[30px]" />
            </div>

            <div className="relative z-10">
                {/* Modern Hero */}
                <header className="h-screen flex flex-col items-center justify-center px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {data.profileImageUrl && (
                            <div className="mb-10 relative inline-block group">
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
                                    <img src={data.profileImageUrl} alt="User" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                            Hi, I&apos;m <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            >
                                {data.basicInfo.fullName.split(' ')[0]}
                            </motion.span>
                        </h1>
                        <p className="text-xl md:text-3xl text-slate-500 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
                            {data.basicInfo.tagline}
                        </p>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col items-center gap-12"
                        >
                            <a href="#about" className="group flex flex-col items-center gap-4 text-slate-400 hover:text-indigo-600 transition-colors">
                                <span className="text-sm font-bold tracking-[0.3em] uppercase">Scroll to explore</span>
                                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                                    <FaChevronDown />
                                </motion.div>
                            </a>
                        </motion.div>
                    </motion.div>
                </header>

                {/* About & Skills */}
                <section id="about" className="py-40 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-start">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-xs font-bold tracking-[0.4em] text-indigo-500 uppercase mb-6">Discovery</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 leading-tight">
                            Building better <br/> through innovation.
                        </h3>
                        <p className="text-xl text-slate-600 leading-relaxed font-light">
                            {data.about.description}
                        </p>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 gap-8">
                        {data.skills.map((group, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-white/80 shadow-2xl shadow-indigo-100/20"
                            >
                                <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">{group.category}</h4>
                                <div className="flex flex-wrap gap-2">
                                    {group.skills.map((skill, j) => (
                                        <span key={j} className="text-sm font-bold text-indigo-600 px-4 py-1.5 bg-indigo-50 rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Parallax Projects Section */}
                <section id="work" className="py-40 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="mb-24 text-center">
                            <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">Works</h2>
                            <p className="text-slate-500 text-lg">A selection of recent masterpieces</p>
                        </div>

                        <div className="space-y-32">
                            {data.projects.map((proj, i) => (
                                <TiltCard key={i}>
                                    <motion.div 
                                        initial={{ opacity: 0, y: 50 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                                    >
                                        <div className="w-full lg:w-1/2 group relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-[3rem] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                            <div className="relative aspect-video bg-white rounded-[3rem] border border-white p-8 shadow-2xl flex flex-col justify-center items-center overflow-hidden">
                                                <div className="text-7xl font-black text-slate-100/50 absolute -right-4 -top-4">{i + 1}</div>
                                                <h4 className="text-4xl font-black text-slate-200 uppercase tracking-[0.2em]">{proj.title.split(' ')[0]}</h4>
                                            </div>
                                        </div>
                                        <div className="w-full lg:w-1/2 space-y-6">
                                            <div className="flex flex-wrap gap-3">
                                                {proj.techStack.map((tech, j) => (
                                                    <span key={j} className="text-[10px] font-black uppercase tracking-widest text-slate-400 py-1 px-3 border border-slate-200 rounded-full">{tech}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-3xl font-black text-slate-900">{proj.title}</h3>
                                            <p className="text-lg text-slate-500 leading-relaxed">{proj.description}</p>
                                            <div className="flex gap-6 pt-6">
                                                {proj.githubUrl && <a href={proj.githubUrl} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-blue-600 transition-colors"><FaGithub size={20} /> GITHUB</a>}
                                                {proj.liveUrl && <a href={proj.liveUrl} className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-purple-600 transition-colors"><FaExternalLinkAlt size={18} /> LIVE PREVIEW</a>}
                                            </div>
                                        </div>
                                    </motion.div>
                                </TiltCard>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Achievements Section */}
                {data.achievements?.length > 0 && (
                    <section id="achievements" className="py-40 px-6 max-w-7xl mx-auto">
                        <div className="mb-24 flex items-end justify-between">
                            <div className="text-left">
                                <h2 className="text-xs font-bold tracking-[0.4em] text-indigo-500 uppercase mb-4">Accolades</h2>
                                <h3 className="text-5xl font-black text-slate-900 leading-tight">Recognition & <br/> Milestones.</h3>
                            </div>
                            <div className="hidden md:block w-32 h-px bg-slate-200 mb-6" />
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {data.achievements.map((ach, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -10 }}
                                    className="p-10 bg-white/40 backdrop-blur-xl border border-white/80 rounded-[3rem] shadow-xl hover:shadow-2xl hover:shadow-indigo-100/40 transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-8 shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
                                        <FaRocket />
                                    </div>
                                    <h4 className="text-xl font-black text-slate-900 mb-2">{ach.title}</h4>
                                    <p className="text-sm font-bold text-indigo-500 tracking-widest uppercase mb-4">{ach.organization}</p>
                                    <p className="text-slate-500 leading-relaxed font-light">{ach.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience & Education */}
                <section className="py-40 px-6 max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-24">
                        <div>
                            <h2 className="text-4xl font-black mb-16 text-slate-900 border-l-8 border-blue-500 pl-8">Journey</h2>
                            <div className="space-y-16">
                                {data.experience.map((exp, i) => (
                                    <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>
                                        <div className="text-sm font-black text-blue-500 mb-2">{exp.startDate} - {exp.endDate}</div>
                                        <h3 className="text-2xl font-black text-slate-900 mb-1">{exp.role}</h3>
                                        <div className="text-slate-500 font-medium mb-6">{exp.company} // {exp.location}</div>
                                        <p className="text-slate-600 leading-relaxed border-l-2 border-slate-100 pl-6">{exp.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-4xl font-black mb-16 text-slate-900 border-l-8 border-purple-500 pl-8">Knowledge</h2>
                            <div className="grid grid-cols-1 gap-8">
                                {data.education.map((edu, i) => (
                                    <motion.div key={i} whileHover={{ x: 10 }} className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-xl shadow-purple-100/20 group">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="text-xs font-black text-purple-500 tracking-widest">{edu.startYear} - {edu.endYear}</div>
                                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                                <span className="text-xs font-bold leading-none">{edu.grade}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-1">{edu.degree}</h3>
                                        <p className="text-slate-500 font-medium">{edu.institution}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Footer */}
                <footer id="contact" className="py-24 px-6 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                        <div className="text-center md:text-left">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 underline decoration-blue-500 decoration-8 underline-offset-8">
                                Connect?
                            </h2>
                            <p className="text-slate-500 text-lg">I&apos;m always open to new adventures.</p>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-8">
                            <a href={`mailto:${data.contact.email}`} className="text-3xl md:text-4xl font-black text-slate-900 hover:text-blue-600 transition-colors">
                                {data.contact.email}
                            </a>
                            <div className="flex gap-4">
                                {data.contact.linkedinUrl && <a href={data.contact.linkedinUrl} className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-blue-600 hover:-translate-y-2 transition-all"><FaLinkedinIn /></a>}
                                {data.contact.githubUrl && <a href={data.contact.githubUrl} className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-purple-600 hover:-translate-y-2 transition-all"><FaGithub /></a>}
                            </div>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
                        <span>Powered by BuildUrSite</span>
                        <span>{data.basicInfo.fullName} © 2026</span>
                        <span>{data.contact.location || 'Earth'}</span>
                    </div>
                </footer>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');
                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    );
}

function TiltCard({ children }: { children: React.ReactNode }) {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        setRotateX(rotateX);
        setRotateY(rotateY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            style={{ perspective: 1000 }}
        >
            {children}
        </motion.div>
    );
}
