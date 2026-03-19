'use client';

import { motion } from 'framer-motion';
import { 
    FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, 
    FaMapMarkerAlt, FaGlobe, FaArrowRight, FaHeart, FaRocket 
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

const bounce = {
    initial: { scale: 0.9, opacity: 0 },
    whileInView: { scale: 1, opacity: 1 },
    viewport: { once: true },
    transition: { type: "spring" as any, stiffness: 100, damping: 15 }
};

export default function PastelTemplate({ data, isPreview }: { data: PortfolioData; isPreview?: boolean }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="bg-[#f0f9ff] text-[#334155] min-h-screen font-sans selection:bg-[#fb7185] selection:text-white pb-20">
            {/* Animated Blobs */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <motion.div 
                    animate={{ 
                        x: [0, 100, 0], 
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1] 
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#dcfce7] rounded-full blur-[100px] opacity-60" 
                />
                <motion.div 
                    animate={{ 
                        x: [0, -80, 0], 
                        y: [0, 120, 0],
                        rotate: [0, 90, 0] 
                    }}
                    transition={{ duration: 25, repeat: Infinity }}
                    className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#fae8ff] rounded-full blur-[120px] opacity-60" 
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-[#fff1f2] rounded-full blur-[80px] opacity-50" 
                />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6">
                {/* Header */}
                <header className="pt-32 pb-20 text-center">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-10 inline-block"
                    >
                        {data.profileImageUrl ? (
                            <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-xl shadow-blue-200/50 rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img src={data.profileImageUrl} alt="User" className="w-full h-full object-cover" />
                            </div>
                        ) : (
                            <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-4xl text-white shadow-xl rotate-3">
                                {data.basicInfo.fullName.charAt(0)}
                            </div>
                        )}
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight text-[#1e293b] mb-6"
                    >
                        Hi, I&apos;m <motion.span 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ 
                                duration: 2,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                            className="text-[#6366f1]"
                        >
                            {data.basicInfo.fullName.split(' ')[0]}
                        </motion.span>!
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-10"
                    >
                        {data.basicInfo.tagline}
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap justify-center gap-4"
                    >
                        <a href="#contact" className="px-8 py-4 bg-[#6366f1] text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-[#4f46e5] hover:-translate-y-1 transition-all">
                            Let's Chat
                        </a>
                        <a href="#work" className="px-8 py-4 bg-white text-[#6366f1] rounded-2xl font-bold border-2 border-[#e0e7ff] hover:border-[#6366f1] transition-all">
                            View Work
                        </a>
                    </motion.div>
                </header>

                {/* About Section */}
                <section id="about" className="py-20 bg-white/40 backdrop-blur-xl rounded-[3rem] p-10 md:p-16 border border-white/60 shadow-xl shadow-blue-100/20 mb-20">
                    <div className="grid md:grid-cols-[1fr_250px] gap-12">
                        <div>
                            <h2 className="text-3xl font-bold text-[#1e293b] mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-lg">✨</span>
                                Story Time
                            </h2>
                            <p className="text-lg text-slate-600 leading-relaxed mb-8">
                                {data.about.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {data.about.interests.map((interest, i) => (
                                    <span key={i} className="px-5 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            {data.skills.map((group, i) => (
                                <div key={i}>
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">{group.category}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {group.skills.map((skill, j) => (
                                            <span key={j} className="text-sm font-medium text-slate-600 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-[#f43f5e] shadow-[0_0_8px_#f43f5e]" />
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section */}
                <section id="work" className="py-20">
                    <h2 className="text-4xl font-black text-[#1e293b] mb-12 text-center">Cool Stuff I've Built</h2>
                    <div className="grid md:grid-cols-2 gap-10">
                        {data.projects.map((proj, i) => (
                            <motion.div 
                                key={i} 
                                {...bounce}
                                className="group bg-white rounded-[2.5rem] p-8 border-b-8 border-indigo-100 hover:border-[#6366f1] transition-all flex flex-col h-full shadow-lg shadow-indigo-100/40"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-bold text-[#1e293b] group-hover:text-[#6366f1] transition-colors">{proj.title}</h3>
                                    <div className="flex gap-3">
                                        {proj.githubUrl && <a href={proj.githubUrl} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-[#6366f1] hover:bg-white transition-all"><FaGithub /></a>}
                                        {proj.liveUrl && <a href={proj.liveUrl} className="p-3 bg-slate-50 rounded-xl text-slate-400 hover:text-[#6366f1] hover:bg-white transition-all"><FaArrowRight className="-rotate-45" /></a>}
                                    </div>
                                </div>
                                <p className="text-slate-500 mb-8 flex-1 leading-relaxed">{proj.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {proj.techStack.map((tech, j) => (
                                        <span key={j} className="text-xs font-bold px-3 py-1 bg-indigo-50 text-indigo-500 rounded-lg">
                                            {tech.toUpperCase()}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Experience & Education */}
                <section className="py-20 grid md:grid-cols-2 gap-16">
                    <div className="space-y-12">
                        <h2 className="text-3xl font-black text-[#1e293b] flex items-center gap-4">
                            <span className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600 text-xl">💼</span>
                            Experience
                        </h2>
                        {data.experience.map((exp, i) => (
                            <motion.div key={i} {...bounce} className="relative pl-8 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-1 before:bg-orange-100 before:rounded-full">
                                <div className="text-sm font-bold text-orange-500 mb-1">{exp.startDate} - {exp.endDate}</div>
                                <h3 className="text-xl font-bold text-[#1e293b]">{exp.role}</h3>
                                <p className="text-slate-400 font-medium mb-4">{exp.company}</p>
                                <p className="text-slate-500 text-sm leading-relaxed">{exp.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="space-y-12">
                        <h2 className="text-3xl font-black text-[#1e293b] flex items-center gap-4">
                            <span className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl">🎓</span>
                            Education
                        </h2>
                        {data.education.map((edu, i) => (
                            <motion.div key={i} {...bounce} className="p-8 bg-white/60 rounded-3xl border-2 border-indigo-50 hover:border-indigo-100 transition-all">
                                <h3 className="text-xl font-bold text-[#1e293b] mb-1">{edu.degree}</h3>
                                <p className="text-slate-400 text-sm mb-4">{edu.institution} // {edu.location}</p>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="font-bold text-slate-500">{edu.startYear} - {edu.endYear}</span>
                                    <span className="bg-[#fdf2f8] text-[#db2777] px-3 py-1 rounded-lg font-bold">Grade: {edu.grade}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Achievements Section */}
                {data.achievements?.length > 0 && (
                    <section id="achievements" className="py-20">
                        <h2 className="text-4xl font-black text-[#1e293b] mb-12 text-center">Milestones & Wins</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {data.achievements.map((ach, i) => (
                                <motion.div 
                                    key={i} 
                                    {...bounce}
                                    className="p-8 bg-white/60 backdrop-blur-lg rounded-[2.5rem] border-2 border-emerald-50 hover:border-emerald-100 transition-all shadow-lg shadow-emerald-100/20"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl mb-6">
                                        <FaRocket />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#1e293b] mb-2">{ach.title}</h3>
                                    <p className="text-sm font-bold text-emerald-500 mb-4">{ach.organization}</p>
                                    <p className="text-slate-500 text-sm leading-relaxed">{ach.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Contact Footer */}
                <footer id="contact" className="mt-40 bg-[#1e293b] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#6366f1]/10 blur-[100px] rounded-full" />
                    
                    <motion.h2 
                        {...bounce}
                        className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight"
                    >
                        Ready to make magic <br/> happen? ✨
                    </motion.h2>

                    <motion.div {...bounce} className="flex flex-col items-center gap-10">
                        <a href={`mailto:${data.contact.email}`} className="text-2xl md:text-3xl text-indigo-300 font-bold hover:text-white transition-colors underline decoration-slate-600 hover:decoration-indigo-400 underline-offset-8">
                            {data.contact.email}
                        </a>

                        <div className="flex gap-6">
                            {data.contact.linkedinUrl && <a href={data.contact.linkedinUrl} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-xl hover:bg-[#6366f1] hover:scale-110 transition-all"><FaLinkedinIn /></a>}
                            {data.contact.githubUrl && <a href={data.contact.githubUrl} className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-xl hover:bg-[#6366f1] hover:scale-110 transition-all"><FaGithub /></a>}
                        </div>
                    </motion.div>

                    <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
                        <p>© 2026 Crafted with <FaHeart className="inline text-rose-500 mx-1" /> by {data.basicInfo.fullName}</p>
                        <p className="font-bold tracking-widest uppercase text-xs">BuildUrSite</p>
                        <p>{data.contact.location}</p>
                    </div>
                </footer>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    );
}
