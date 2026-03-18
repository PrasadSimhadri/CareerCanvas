'use client';

import { FaLinkedinIn, FaGithub, FaEnvelope, FaPhone, FaArrowRight, FaMapMarkerAlt, FaGlobe } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
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

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-50px" },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: "-50px" }
};

export default function SleekTemplate({ data, isPreview = false }: { data: PortfolioData, isPreview?: boolean }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const { scrollYProgress } = useScroll();
    const yTransform = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

    if (!mounted) return null;

    const hasPhoto = !!data.profileImageUrl;

    return (
        <div className="bg-[#FAF9F6] text-[#111] min-h-screen font-sans selection:bg-[#111] selection:text-white">
            {/* Elegant Noise Overlay & Gradient Orbs */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            <div className="fixed top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-indigo-100 blur-[120px] opacity-70 z-0 pointer-events-none"></div>
            <div className="fixed bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-rose-100 blur-[120px] opacity-60 z-0 pointer-events-none"></div>

            {/* Glass Navigation */}
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-full px-8 py-3 flex items-center gap-8 text-[13px] font-medium tracking-wide uppercase">
                    <span className="font-bold tracking-tighter text-[15px]">{data.basicInfo.fullName.split(' ')[0]}</span>
                    <div className="hidden md:flex items-center gap-8">
                        {['EXPERIENCE', 'WORK', 'SKILLS', 'CONTACT'].map(item => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[#666] hover:text-[#111] transition-colors">{item}</a>
                        ))}
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center pt-24 pb-12 relative z-10 px-6 overflow-hidden">
                <motion.div style={{ y: yTransform, opacity: opacityTransform }} className="max-w-5xl mx-auto w-full flex flex-col items-center text-center">
                    
                    {hasPhoto && (
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="mb-10 relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden shadow-2xl shadow-indigo-200 ring-4 ring-white">
                                <img src={data.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                            </div>
                        </motion.div>
                    )}

                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} className="px-5 py-2 rounded-full border border-black/5 bg-black/[0.02] backdrop-blur-sm text-sm font-medium mb-8">
                        {data.basicInfo.tagline}
                    </motion.div>

                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-medium tracking-[-0.04em] leading-[0.95] text-[#111] mb-8 max-w-4xl">
                        {data.basicInfo.fullName.split(' ').map((word, i) => (
                            <motion.span key={i} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 + (i * 0.1), ease: [0.22, 1, 0.36, 1] }} className="inline-block mr-4 last:mr-0 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                                {word}
                            </motion.span>
                        ))}
                    </h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }} className="text-xl sm:text-2xl text-gray-500 font-light max-w-2xl leading-relaxed">
                        {data.basicInfo.description}
                    </motion.p>
                    
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-12 flex items-center gap-6">
                        <a href="#contact" className="group flex items-center gap-2 bg-[#111] text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-all">
                            Let&apos;s talk <FaArrowRight className="group-hover:translate-x-1 duration-300" />
                        </a>
                        <div className="flex gap-4">
                            {data.contact.githubUrl && <a href={data.contact.githubUrl} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"><FaGithub /></a>}
                            {data.contact.linkedinUrl && <a href={data.contact.linkedinUrl} className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"><FaLinkedinIn /></a>}
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* About & Experience */}
            <section id="experience" className="py-24 relative z-10 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-5 relative">
                        <div className="sticky top-32">
                            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-6">Experience</h2>
                            <p className="text-gray-500 text-lg leading-relaxed mb-8">
                                {data.about.description || "A track record of building and delivering high-quality solutions."}
                            </p>
                            {data.about.interests.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {data.about.interests.map((interest, i) => (
                                        <span key={i} className="px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-600">
                                            {interest}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-8">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} variants={fadeUp} className="group p-8 rounded-3xl bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                        <div>
                                            <h3 className="text-2xl font-medium text-[#111]">{exp.role}</h3>
                                            <p className="text-lg text-gray-500">{exp.company}</p>
                                        </div>
                                        <div className="px-4 py-2 rounded-full bg-gray-100/80 text-sm font-medium text-gray-600 self-start sm:self-auto">
                                            {exp.startDate} — {exp.endDate}
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed mb-6">{exp.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill, j) => (
                                            <span key={j} className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Selected Work */}
            {data.projects?.length > 0 && (
                <section id="work" className="py-24 relative z-10 px-6 bg-white/20 backdrop-blur-lg border-y border-white/40">
                    <div className="max-w-6xl mx-auto">
                        <motion.div {...fadeUp.whileInView} initial="initial" className="mb-16 flex items-end justify-between">
                            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight">Selected Work</h2>
                        </motion.div>

                        <div className={`grid gap-8 ${
                            data.projects.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'
                        }`}>
                            {data.projects.map((proj, i) => (
                                <motion.div key={i} variants={fadeUp} initial="initial" whileInView="whileInView" className="group rounded-3xl bg-white/60 p-2 border border-white/80 shadow-[0_8px_40px_rgba(0,0,0,0.02)] overflow-hidden">
                                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-[1.25rem] p-8 h-full flex flex-col transition-colors group-hover:from-indigo-50/50 group-hover:to-rose-50/50">
                                        <div className="flex justify-between items-start mb-6">
                                            <h3 className="text-3xl font-medium tracking-tight">{proj.title}</h3>
                                            <div className="flex gap-2">
                                                {proj.githubUrl && <a href={proj.githubUrl} target="_blank" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm transform hover:scale-110 transition-all"><FaGithub /></a>}
                                                {proj.liveUrl && <a href={proj.liveUrl} target="_blank" className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-500 hover:text-black shadow-sm transform hover:scale-110 transition-all"><FaExternalLink /></a>}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-lg mb-8 leading-relaxed flex-1">{proj.description}</p>
                                        <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-200">
                                            {proj.techStack.map((tech, j) => (
                                                <span key={j} className="text-sm font-medium text-gray-600">
                                                    {tech}{j < proj.techStack.length - 1 ? ' • ' : ''}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Skills & Education */}
            <section id="skills" className="py-32 relative z-10 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
                    
                    <div>
                        <motion.h2 variants={fadeUp} initial="initial" whileInView="whileInView" className="text-4xl font-medium tracking-tight mb-12">Expertise</motion.h2>
                        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-8">
                            {data.skills.map((group, i) => (
                                <motion.div key={i} variants={fadeUp} className="border-b border-gray-200 pb-8 last:border-0">
                                    <h3 className="text-xl font-medium mb-4">{group.category}</h3>
                                    <div className="flex flex-wrap gap-x-6 gap-y-3 text-gray-500 text-lg">
                                        {group.skills.map((skill, j) => (
                                            <span key={j}>{skill}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    <div>
                        <motion.h2 variants={fadeUp} initial="initial" whileInView="whileInView" className="text-4xl font-medium tracking-tight mb-12">Education</motion.h2>
                        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="space-y-8">
                            {data.education.map((edu, i) => (
                                <motion.div key={i} variants={fadeUp} className="relative pl-8 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-gray-200 after:absolute after:top-2 after:left-[-4px] after:w-2 after:h-2 after:bg-gray-400 after:rounded-full">
                                    <div className="text-sm font-bold tracking-wider text-gray-400 uppercase mb-2">{edu.startYear} — {edu.endYear}</div>
                                    <h3 className="text-2xl font-medium mb-1">{edu.degree}</h3>
                                    <p className="text-lg text-gray-500 mb-2">{edu.institution}</p>
                                    <div className="inline-block px-3 py-1 bg-gray-100 rounded-lg text-sm font-medium">{edu.grade}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Achievements Section */}
            {data.achievements?.length > 0 && (
                <section id="achievements" className="py-24 relative z-10 px-6 border-t border-gray-100">
                    <div className="max-w-6xl mx-auto">
                        <motion.h2 variants={fadeUp} initial="initial" whileInView="whileInView" className="text-4xl font-medium tracking-tight mb-16 text-center">Recognition</motion.h2>
                        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className={`grid gap-8 ${
                            data.achievements.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 
                            data.achievements.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto' : 
                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                            {data.achievements.map((achievement, i) => (
                                <motion.div key={i} variants={fadeUp} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all">
                                    <h3 className="text-xl font-medium text-gray-900 mb-2">{achievement.title}</h3>
                                    <p className="text-sm font-bold tracking-wider text-indigo-600 uppercase mb-4">{achievement.organization}</p>
                                    <p className="text-gray-500 leading-relaxed">{achievement.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Contact Footer */}
            <section id="contact" className="pt-32 pb-16 relative z-10 px-6 bg-[#111] text-white overflow-hidden rounded-t-[3rem] lg:rounded-t-[5rem]">
                <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_right,white_0%,transparent_60%)]" />
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.h2 variants={fadeUp} initial="initial" whileInView="whileInView" className="text-5xl sm:text-7xl font-medium tracking-[-0.04em] mb-12">
                        Got a project? <br/>
                        <span className="text-gray-500">Let's collaborate.</span>
                    </motion.h2>
                    
                    <motion.div variants={fadeUp} initial="initial" whileInView="whileInView" className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24">
                        <a href={`mailto:${data.contact.email}`} className="bg-white text-black px-10 py-5 rounded-full text-lg font-medium hover:scale-105 transition-transform">
                            {data.contact.email}
                        </a>
                    </motion.div>

                    <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-white/10 text-left">
                        <motion.div variants={fadeUp}>
                            <h4 className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">Location</h4>
                            <p className="flex items-center gap-2"><FaMapMarkerAlt /> {data.contact.location || "Earth"}</p>
                        </motion.div>
                        <motion.div variants={fadeUp}>
                            <h4 className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">Socials</h4>
                            <div className="flex flex-col gap-2">
                                {data.contact.linkedinUrl && <a href={data.contact.linkedinUrl} className="hover:text-gray-300">LinkedIn</a>}
                                {data.contact.githubUrl && <a href={data.contact.githubUrl} className="hover:text-gray-300">GitHub</a>}
                            </div>
                        </motion.div>
                        <motion.div variants={fadeUp}>
                            <h4 className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">Direct</h4>
                            <div className="flex flex-col gap-2">
                                <a href={`mailto:${data.contact.email}`} className="hover:text-gray-300">Email</a>
                                {data.contact.phone && <a href={`tel:${data.contact.phone}`} className="hover:text-gray-300">Phone</a>}
                            </div>
                        </motion.div>
                        <motion.div variants={fadeUp} className="text-right">
                            <h4 className="text-gray-500 text-sm font-bold tracking-widest uppercase mb-4">Platform</h4>
                            <p className="text-gray-400">
                                Powered by <br/>
                                <a href="/" className="text-white font-medium hover:text-indigo-400 transition-colors">
                                    BuildUrSite
                                </a>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&display=swap');
                html { scroll-behavior: smooth; font-family: 'Outfit', sans-serif; }
            `}</style>
        </div>
    );
}

function FaExternalLink() {
    return (
        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
    );
}
