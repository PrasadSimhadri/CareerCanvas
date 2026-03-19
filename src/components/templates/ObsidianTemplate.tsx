'use client';

import { motion } from 'framer-motion';
import { 
    FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, 
    FaArrowRight, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaTrophy 
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

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: "easeOut" as any }
};

export default function ObsidianTemplate({ data }: { data: PortfolioData }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="bg-[#0A0A0A] text-gray-200 min-h-screen font-sans selection:bg-white selection:text-black">
            {/* Soft Ambient Glows */}
            <div className="fixed top-[-10%] left-0 w-full h-[50vh] bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
            <div className="fixed bottom-0 left-[20%] w-[40vw] h-[40vh] bg-purple-500/5 blur-[120px] pointer-events-none rounded-full" />
            
            <div className="relative z-10 max-w-6xl mx-auto px-6">
                {/* Minimal Header */}
                <nav className="py-10 flex justify-between items-center">
                    <motion.span 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        className="text-xl font-bold tracking-tighter"
                    >
                        {data.basicInfo.fullName.toUpperCase()}
                    </motion.span>
                    <div className="flex gap-8 text-xs font-medium tracking-widest text-gray-500">
                        <a href="#work" className="hover:text-white transition-colors">WORK</a>
                        <a href="#about" className="hover:text-white transition-colors">ABOUT</a>
                        <a href="#contact" className="hover:text-white transition-colors">CONTACT</a>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="min-h-[80vh] flex flex-col justify-center py-20">
                    <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-[0.95] text-white mb-8">
                                {data.basicInfo.fullName}
                            </h1>
                            <p className="text-2xl md:text-3xl text-gray-400 font-light max-w-2xl leading-relaxed mb-12">
                                {data.basicInfo.tagline}
                            </p>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-block"
                            >
                                <a href="#work" className="flex items-center gap-4 bg-white text-black px-10 py-5 rounded-full font-semibold transition-all hover:bg-gray-200">
                                    SEE EXPERIENCE <FaArrowRight />
                                </a>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="hidden lg:block"
                        >
                            {data.profileImageUrl ? (
                                <div className="aspect-[4/5] bg-gray-900 overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 rounded-3xl border border-white/10">
                                    <img src={data.profileImageUrl} alt="User" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="aspect-[4/5] bg-white text-black flex items-center justify-center text-8xl font-bold rounded-3xl">
                                    {data.basicInfo.fullName.charAt(0)}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="py-32 grid lg:grid-cols-2 gap-20">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-xs font-bold tracking-[0.3em] text-gray-500 mb-8 uppercase">A bit about me</h2>
                        <p className="text-2xl text-gray-300 leading-relaxed font-light">
                            {data.about.description}
                        </p>
                    </motion.div>
                    <motion.div {...fadeInUp} className="space-y-12">
                        {data.skills.map((group, i) => (
                            <div key={i}>
                                <h3 className="text-white font-medium mb-4">{group.category}</h3>
                                <div className="flex flex-wrap gap-3">
                                    {group.skills.map((skill, j) => (
                                        <span key={j} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </section>

                {/* Experience Section */}
                <section id="work" className="py-32 border-t border-white/5">
                    <h2 className="text-4xl font-medium text-white mb-20 tracking-tight text-center">Professional Path</h2>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <motion.div 
                                key={i} 
                                {...fadeInUp}
                                className="group p-8 rounded-3xl hover:bg-white/[0.03] transition-all border border-transparent hover:border-white/5"
                            >
                                <div className="grid md:grid-cols-[1fr_200px_1.5fr] gap-8 items-start">
                                    <div>
                                        <h3 className="text-2xl font-medium text-white group-hover:text-purple-400 transition-colors">{exp.role}</h3>
                                        <p className="text-gray-500 mt-1">{exp.company}</p>
                                    </div>
                                    <div className="text-sm font-medium tracking-wider text-gray-600">
                                        {exp.startDate} — {exp.endDate}
                                    </div>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Projects Section */}
                <section className="py-32">
                    <div className="flex justify-between items-end mb-20">
                        <h2 className="text-4xl font-medium text-white tracking-tight">Selected Projects</h2>
                        <span className="text-gray-500 text-sm font-medium">({data.projects.length})</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {data.projects.map((proj, i) => (
                            <motion.div 
                                key={i} 
                                {...fadeInUp}
                                whileHover={{ y: -10 }}
                                className="p-8 bg-[#111] rounded-[2rem] border border-white/5 hover:border-white/10 transition-all flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-medium text-white">{proj.title}</h3>
                                    <div className="flex gap-4 text-gray-500">
                                        {proj.githubUrl && <a href={proj.githubUrl} className="hover:text-white transition-colors"><FaGithub size={20} /></a>}
                                        {proj.liveUrl && <a href={proj.liveUrl} className="hover:text-white transition-colors"><FaArrowRight size={18} className="-rotate-45" /></a>}
                                    </div>
                                </div>
                                <p className="text-gray-400 mb-10 flex-1 font-light leading-relaxed">{proj.description}</p>
                                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                                    {proj.techStack.map((tech, j) => (
                                        <span key={j} className="text-xs tracking-widest text-gray-500 uppercase">{tech}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Education & Achievements */}
                <section className="py-32 border-t border-white/5 grid md:grid-cols-2 gap-20">
                    <div>
                        <h2 className="text-2xl font-medium text-white mb-12">Knowledge</h2>
                        <div className="space-y-12">
                            {data.education.map((edu, i) => (
                                <motion.div key={i} {...fadeInUp} className="relative pl-10 border-l border-white/10">
                                    <div className="absolute left-[-5px] top-2 w-[10px] h-[10px] rounded-full bg-white" />
                                    <span className="text-xs font-bold text-gray-500 tracking-[0.2em] mb-2 block">{edu.startYear} — {edu.endYear}</span>
                                    <h3 className="text-xl font-medium text-white">{edu.degree}</h3>
                                    <p className="text-gray-400 font-light mt-1">{edu.institution} // {edu.location}</p>
                                    <div className="mt-2 text-sm text-purple-400">CGPA: {edu.grade}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-medium text-white mb-12">Awards</h2>
                        <div className="space-y-8">
                            {data.achievements.map((ach, i) => (
                                <motion.div key={i} {...fadeInUp} className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                    <h3 className="text-white font-medium mb-2">{ach.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{ach.organization.toUpperCase()}</p>
                                    <p className="text-sm text-gray-400 font-light leading-relaxed">{ach.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Footer */}
                <footer id="contact" className="py-40 text-center border-t border-white/5">
                    <motion.div {...fadeInUp}>
                        <h2 className="text-6xl md:text-9xl font-medium tracking-tighter text-white mb-16 px-4">
                            Let's build something <span className="text-gray-600">extraordinary.</span>
                        </h2>
                        <a href={`mailto:${data.contact.email}`} className="text-2xl md:text-4xl text-white font-light underline underline-offset-[12px] decoration-1 decoration-white/30 hover:decoration-white transition-all">
                            {data.contact.email}
                        </a>
                        
                        <div className="mt-32 flex flex-wrap justify-center gap-x-12 gap-y-6 text-sm font-medium tracking-widest text-gray-500 uppercase">
                            {data.contact.linkedinUrl && <a href={data.contact.linkedinUrl} className="hover:text-white transition-colors">LinkedIn</a>}
                            {data.contact.githubUrl && <a href={data.contact.githubUrl} className="hover:text-white transition-colors">GitHub</a>}
                            <span className="text-gray-700">/</span>
                            <span>{data.contact.location}</span>
                            <span className="text-gray-700">/</span>
                            <span>{data.contact.phone}</span>
                        </div>
                        
                        <div className="mt-20 pt-10 border-t border-white/5 text-[10px] text-gray-600 tracking-[0.4em] uppercase">
                            © 2026 OBSIDIAN_LAYOUT // POWERED BY BUILDURSITE
                        </div>
                    </motion.div>
                </footer>
            </div>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                html { scroll-behavior: smooth; }
            `}</style>
        </div>
    );
}
