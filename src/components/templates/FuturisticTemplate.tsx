'use client';

import { HiLightningBolt, HiCode, HiSparkles, HiTerminal, HiOutlineGlobeAlt, HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';
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

const glitchVariants: any = {
    initial: { x: 0 },
    animate: {
        x: [-2, 2, -2, 2, 0],
        transition: { duration: 0.4, ease: "linear", repeat: Infinity, repeatType: "mirror", repeatDelay: 5 }
    }
};

const containerVariants: any = {
    initial: {},
    whileInView: { transition: { staggerChildren: 0.1 } },
    viewport: { once: true, margin: "-100px" }
};

const itemVariants: any = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function FuturisticTemplate({ data, isPreview = false }: { data: PortfolioData, isPreview?: boolean }) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const hasPhoto = !!data.profileImageUrl;

    return (
        <div className="bg-[#050505] text-[#e0e0e0] min-h-screen font-mono relative overflow-x-hidden selection:bg-[#00f0ff] selection:text-black">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20 z-0 bg-[linear-gradient(rgba(0,240,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,240,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]"></div>

            {/* Glowing Orbs */}
            <motion.div animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity }} className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#00f0ff] blur-[150px] opacity-20 z-0 pointer-events-none" />
            <motion.div animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.5, 1] }} transition={{ duration: 12, repeat: Infinity }} className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#ff003c] blur-[180px] opacity-10 z-0 pointer-events-none" />

            {/* Navigation Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-[#00f0ff]/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <motion.div variants={glitchVariants} initial="initial" animate="animate" className="text-[#00f0ff] font-bold text-xl tracking-widest flex items-center gap-2">
                        <HiTerminal className="text-2xl" /> SYS.IO // {data.basicInfo.fullName.split(' ')[0].toUpperCase()}
                    </motion.div>
                    <div className="hidden md:flex gap-8 text-sm tracking-widest font-bold">
                        {['ABOUT', 'EXP', 'PROJECTS', 'SKILLS', 'CONTACT'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-[#a0a0a0] hover:text-[#00f0ff] hover:drop-shadow-[0_0_8px_#00f0ff] transition-all">
                                [ {item} ]
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center pt-24 pb-16 relative z-10 px-6">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="space-y-6">
                        <div className="inline-block px-4 py-1 border border-[#00f0ff]/50 bg-[#00f0ff]/10 text-[#00f0ff] text-sm font-bold tracking-widest uppercase">
                            STATUS: ONLINE
                        </div>
                        <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            {data.basicInfo.fullName.split(' ').map((n, i) => (
                                <span key={i} className={i % 2 !== 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#ff003c]" : ""}>
                                    {n}{' '}
                                </span>
                            ))}
                        </h1>
                        <h2 className="text-2xl text-[#00f0ff] font-bold tracking-widest">
                            &gt; {data.basicInfo.tagline}
                        </h2>
                        <p className="text-[#a0a0a0] text-lg max-w-xl leading-relaxed border-l-2 border-[#ff003c] pl-6">
                            {data.basicInfo.description}
                        </p>

                        <div className="flex gap-4 pt-6">
                            {data.contact.githubUrl && <SocialLink href={data.contact.githubUrl} icon={<FaGithub />} text="GITHUB" />}
                            {data.contact.linkedinUrl && <SocialLink href={data.contact.linkedinUrl} icon={<FaLinkedinIn />} text="LINKEDIN" />}
                        </div>
                    </motion.div>

                    {hasPhoto && (
                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative mx-auto w-full max-w-md aspect-square">
                            <div className="absolute inset-0 border-2 border-[#00f0ff]/30 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-4 border border-[#ff003c]/30 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                            <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-[#050505] shadow-[0_0_30px_#00f0ff80]">
                                <img src={data.profileImageUrl} alt="Profile" className="w-full h-full object-cover filter contrast-125 saturate-50" />
                                <div className="absolute inset-0 bg-[#00f0ff]/10 mix-blend-overlay" />
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* About Section */}
            {data.about.description && (
                <section id="about" className="py-24 relative z-10 px-6 border-t border-[#00f0ff]/10 bg-gradient-to-b from-[#050505] to-[#0a0f14]">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeader title="ABOUT_DATA" />
                        <motion.div variants={containerVariants} initial="initial" whileInView="whileInView" className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <motion.div variants={itemVariants} className="col-span-2 space-y-6 text-[#a0a0a0] leading-relaxed text-lg bg-[#00f0ff]/5 border border-[#00f0ff]/20 p-8">
                                {data.about.description.split('\n').map((p, i) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </motion.div>
                            <motion.div variants={itemVariants} className="space-y-6">
                                <div className="p-6 border border-[#ff003c]/30 bg-[#ff003c]/5">
                                    <h3 className="text-[#ff003c] font-bold tracking-widest mb-4">/// DIRECTIVES</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {data.about.interests.map((interest, i) => (
                                            <span key={i} className="px-3 py-1 bg-[#ff003c]/10 text-[#ff003c] text-sm font-bold border border-[#ff003c]/50">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Experience Section */}
            {(data.experience?.length > 0) && (
                <section id="exp" className="py-24 relative z-10 px-6 border-t border-[#00f0ff]/10">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeader title="EXPERIENCE_LOG" />
                        <motion.div variants={containerVariants} initial="initial" whileInView="whileInView" className="space-y-12">
                            {data.experience.map((exp, i) => (
                                <motion.div key={i} variants={itemVariants} className="group relative pl-8 border-l-2 border-[#00f0ff]/30 hover:border-[#00f0ff] transition-colors">
                                    <div className="absolute w-4 h-4 bg-[#050505] border-2 border-[#00f0ff] rounded-full -left-[9px] top-0 group-hover:bg-[#00f0ff] transition-colors shadow-[0_0_10px_#00f0ff]" />
                                    <div className="mb-2 text-[#ff003c] font-bold text-sm tracking-widest">
                                        [{exp.startDate} :: {exp.endDate}]
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#00f0ff] transition-colors">{exp.role}</h3>
                                    <div className="text-[#00f0ff]/80 text-lg mb-4 flex items-center gap-2">
                                        <HiOutlineGlobeAlt /> {exp.company}
                                    </div>
                                    <p className="text-[#a0a0a0] mb-6">{exp.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((s, j) => (
                                            <span key={j} className="text-xs font-bold text-[#00f0ff] bg-[#00f0ff]/10 px-2 py-1 border border-[#00f0ff]/30">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Education Section */}
            {(data.education?.length > 0) && (
                <section id="education" className="py-24 relative z-10 px-6 border-t border-[#00f0ff]/10 bg-gradient-to-b from-[#0a0f14] to-[#050505]">
                    <div className="max-w-4xl mx-auto">
                        <SectionHeader title="ACADEMIC_RECORD" />
                        <motion.div variants={containerVariants} initial="initial" whileInView="whileInView" className="space-y-12">
                            {data.education.map((edu, i) => (
                                <motion.div key={i} variants={itemVariants} className="group relative pl-8 border-l-2 border-[#ff003c]/30 hover:border-[#ff003c] transition-colors">
                                    <div className="absolute w-4 h-4 bg-[#050505] border-2 border-[#ff003c] rounded-full -left-[9px] top-0 group-hover:bg-[#ff003c] transition-colors shadow-[0_0_10px_#ff003c]" />
                                    <div className="mb-2 text-[#00f0ff] font-bold text-sm tracking-widest">
                                        [{edu.startYear} :: {edu.endYear}]
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#ff003c] transition-colors">{edu.degree}</h3>
                                    <div className="text-[#ff003c]/80 text-lg mb-4 flex items-center gap-2">
                                        <HiOutlineGlobeAlt /> {edu.institution} - {edu.location}
                                    </div>
                                    {edu.description && <p className="text-[#a0a0a0] mb-4">{edu.description}</p>}
                                    <div className="inline-block px-3 py-1 bg-[#ff003c]/10 text-[#ff003c] border border-[#ff003c]/30 text-sm font-bold">
                                        GRADE: {edu.grade}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Projects Section */}
            {(data.projects?.length > 0) && (
                <section id="projects" className="py-24 relative z-10 px-6 border-t border-[#00f0ff]/10 bg-[#0a0f14]/80">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeader title="EXECUTABLES" />
                        <motion.div variants={containerVariants} initial="initial" whileInView="whileInView" className={`grid gap-8 ${
                            data.projects.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 md:grid-cols-2'
                        }`}>
                            {data.projects.map((proj, i) => (
                                <motion.div key={i} variants={itemVariants} className="group relative border border-[#00f0ff]/20 bg-[#050505] p-8 overflow-hidden hover:border-[#00f0ff] transition-all hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00f0ff] to-[#ff003c] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-between">
                                        {proj.title}
                                        <HiCode className="text-[#00f0ff] opacity-50 text-3xl" />
                                    </h3>
                                    <div className="flex gap-4 mb-6">
                                        {proj.githubUrl && <a href={proj.githubUrl} target="_blank" className="text-[#a0a0a0] hover:text-[#00f0ff] text-sm tracking-widest">[ GITHUB ]</a>}
                                        {proj.liveUrl && <a href={proj.liveUrl} target="_blank" className="text-[#a0a0a0] hover:text-[#ff003c] text-sm tracking-widest">[ DEPLOY ]</a>}
                                    </div>
                                    <p className="text-[#a0a0a0] mb-8 min-h-[80px]">{proj.description}</p>
                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {proj.techStack.map((tech, j) => (
                                            <span key={j} className="text-xs font-mono text-white/70 bg-white/5 px-2 py-1 border border-white/10 group-hover:border-[#00f0ff]/50 transition-colors">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

             {/* Skills Section */}
             {(data.skills?.length > 0) && (
                <section id="skills" className="py-24 relative z-10 px-6 border-t border-[#00f0ff]/10">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeader title="MODULE_DEPENDENCIES" />
                        <motion.div variants={containerVariants} initial="initial" whileInView="whileInView" className={`grid gap-8 ${
                            data.skills.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
                            data.skills.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto' :
                            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                            {data.skills.map((skillGroup, i) => (
                                <motion.div key={i} variants={itemVariants} className="border border-[#ff003c]/20 bg-[#ff003c]/5 p-6">
                                    <h3 className="text-[#ff003c] font-bold text-lg tracking-widest mb-6 flex items-center gap-3 border-b border-[#ff003c]/20 pb-4">
                                        <HiLightningBolt /> {skillGroup.category.toUpperCase()}
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {skillGroup.skills.map((skill, j) => (
                                            <span key={j} className="text-[#e0e0e0] bg-[#050505] border border-[#ff003c]/30 px-3 py-1.5 text-sm hover:bg-[#ff003c]/20 transition-colors cursor-default">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Achievements Section */}
            {(data.achievements?.length > 0) && (
                <section id="achievements" className="py-24 relative z-10 px-6 border-t border-[#00f0ff]/10 bg-[#0a0f14]">
                    <div className="max-w-7xl mx-auto">
                        <SectionHeader title="AWARDS_&_RECOGNITION" />
                        <motion.div variants={containerVariants} initial="initial" whileInView="whileInView" className={`grid gap-8 ${
                            data.achievements.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 md:grid-cols-2'
                        }`}>
                            {data.achievements.map((achievement, i) => (
                                <motion.div key={i} variants={itemVariants} className="border border-[#00f0ff]/20 bg-[#050505] p-8 hover:border-[#ff003c] transition-all relative overflow-hidden group">
                                     <div className="absolute top-0 right-0 w-16 h-16 bg-[#00f0ff]/5 rounded-bl-full group-hover:bg-[#ff003c]/10 transition-colors" />
                                     <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff003c] transition-colors">{achievement.title}</h3>
                                     <div className="text-[#00f0ff] text-sm font-bold tracking-widest mb-4">{achievement.organization}</div>
                                     <p className="text-[#a0a0a0]">{achievement.description}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            <section id="contact" className="py-32 relative z-10 px-6 border-t-2 border-[#00f0ff]/30 bg-gradient-to-t from-[#00f0ff]/5 to-[#050505]">
                <div className="max-w-4xl mx-auto text-center border border-[#00f0ff]/20 bg-[#050505]/80 backdrop-blur-md p-12 lg:p-20 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
                    <motion.div variants={glitchVariants} initial="initial" whileInView="animate" className="inline-block mb-6">
                        <HiTerminal className="text-[#00f0ff] text-5xl mx-auto mb-4" />
                        <h2 className="text-4xl text-white font-black tracking-widest uppercase">INIT_CONNECTION</h2>
                    </motion.div>
                    <p className="text-[#a0a0a0] text-lg mb-12">System standing by for transmissions.</p>
                    
                    <a href={`mailto:${data.contact.email}`} className="inline-block border-2 border-[#00f0ff] text-[#00f0ff] font-bold tracking-widest text-xl px-12 py-5 hover:bg-[#00f0ff] hover:text-black transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)] mb-16">
                        SEND_MESSAGE
                    </a>

                    <div className="flex justify-center gap-8 text-[#a0a0a0]">
                        {data.contact.linkedinUrl && <a href={data.contact.linkedinUrl} className="hover:text-[#00f0ff] transition-colors"><FaLinkedinIn className="text-3xl" /></a>}
                        {data.contact.githubUrl && <a href={data.contact.githubUrl} className="hover:text-[#00f0ff] transition-colors"><FaGithub className="text-3xl" /></a>}
                        {data.contact.phone && <a href={`tel:${data.contact.phone}`} className="hover:text-[#00f0ff] transition-colors"><HiOutlinePhone className="text-3xl" /></a>}
                    </div>
                </div>
            </section>
            
            <footer className="py-8 text-center border-t border-[#00f0ff]/20 bg-[#050505] relative z-10">
                <p className="text-[#666] text-sm tracking-widest font-mono">
                    SYS.RENDER // {' '}
                    <a href="/" className="text-[#00f0ff] hover:text-[#ff003c] transition-colors">
                        BUILDURSITE
                    </a>{' '}
                    &copy; {new Date().getFullYear()}
                </p>
            </footer>

            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
                html { scroll-behavior: smooth; }
                body { font-family: 'Space Mono', monospace; }
            `}</style>
        </div>
    );
}

function SectionHeader({ title }: { title: string }) {
    return (
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="mb-16 flex items-center gap-4">
            <div className="h-px bg-gradient-to-r from-transparent to-[#00f0ff] w-12" />
            <h2 className="text-3xl font-black text-white tracking-widest">{title}</h2>
            <div className="h-px bg-gradient-to-r from-[#00f0ff] to-transparent flex-1" />
        </motion.div>
    );
}

function SocialLink({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) {
    return (
        <a href={href} target="_blank" className="flex items-center gap-2 border border-[#00f0ff]/30 text-[#00f0ff] px-4 py-2 text-sm font-bold tracking-widest hover:bg-[#00f0ff]/10 hover:border-[#00f0ff] transition-all">
            {icon} {text}
        </a>
    );
}

