'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
    FaGithub, FaLinkedinIn, FaEnvelope, FaPhone,
    FaMapMarkerAlt, FaExternalLinkAlt, FaRocket,
    FaChevronDown, FaSun, FaAward, FaLightbulb
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

const FloatingParticle = ({ delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
            y: [-20, -100],
            x: Math.random() * 40 - 20
        }}
        transition={{
            duration: 4,
            repeat: Infinity,
            delay,
            ease: "easeOut"
        }}
        className="absolute w-1 h-1 bg-amber-300 rounded-full blur-[2px] pointer-events-none"
    />
);

const MagneticElement = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Only trigger within radius
        const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
        if (distance < 150) {
            setPosition({ x: distanceX * 0.3, y: distanceY * 0.3 });
        } else {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.div
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
            transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
            {children}
        </motion.div>
    );
};

export default function AuroraTemplate({ data, isPreview }: { data: PortfolioData; isPreview?: boolean }) {
    const [mounted, setMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const bgOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    const sunScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

    useEffect(() => setMounted(true), []);

    const sections = [
        { id: 'about', label: 'ABOUT' },
        { id: 'experience', label: 'WORK' },
        { id: 'projects', label: 'LABS' },
        { id: 'achievements', label: 'WINS' },
        { id: 'contact', label: 'PING' }
    ];

    return (
        <div ref={containerRef} className="bg-[#fffdf0] text-[#422006] min-h-screen font-sans selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">
            {mounted && (
                <>
                    <div className="relative z-10">
                        {/* Sunbeam Background */}
                        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                            <motion.div
                                style={{ scale: sunScale }}
                                className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-gradient-to-br from-amber-100/50 via-yellow-50/30 to-transparent blur-[120px] rounded-full"
                            />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_100%,rgba(251,191,36,0.05),transparent_50%)]" />

                            {/* Randomly placed particles */}
                            {Array.from({ length: 30 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute"
                                    style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
                                >
                                    <FloatingParticle delay={Math.random() * 5} />
                                </div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 bg-white/40 backdrop-blur-xl border border-amber-100 rounded-full flex gap-8 items-center shadow-lg shadow-amber-900/5">
                            {sections.map(section => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="text-[10px] font-black tracking-widest text-amber-900/60 hover:text-amber-900 transition-colors"
                                >
                                    {section.label}
                                </a>
                            ))}
                        </nav>

                        <div className="relative z-10">
                            {/* Hero */}
                            <header className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <div className="mb-12 relative inline-block">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute -inset-4 border border-dashed border-amber-300 rounded-full"
                                        />
                                        {data.profileImageUrl ? (
                                            <div className="w-44 h-44 rounded-full p-2 bg-gradient-to-tr from-amber-200 to-yellow-50 shadow-xl overflow-hidden">
                                                <img src={data.profileImageUrl} alt="User" className="w-full h-full object-cover rounded-full" />
                                            </div>
                                        ) : (
                                            <div className="w-44 h-44 flex items-center justify-center bg-white rounded-full shadow-lg">
                                                <FaSun className="text-6xl text-amber-400" />
                                            </div>
                                        )}
                                    </div>

                                    <MagneticElement>
                                        <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter mb-4 leading-none text-[#78350f]">
                                            {data.basicInfo.fullName.split(' ')[0]}
                                            <motion.span
                                                className="inline-block w-4 h-4 md:w-8 md:h-8 bg-amber-400 rounded-full ml-4"
                                                animate={{ scale: [1, 1.5, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                            <br />
                                            <span className="text-amber-400/80">{data.basicInfo.fullName.split(' ')[1]}</span>
                                        </h1>
                                    </MagneticElement>

                                    <p className="text-xl md:text-2xl text-amber-900/70 max-w-2xl mx-auto mb-12 font-medium italic">
                                        "{data.basicInfo.tagline}"
                                    </p>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        className="flex justify-center gap-4"
                                    >
                                        <FaChevronDown className="animate-bounce text-amber-400" size={24} />
                                    </motion.div>
                                </motion.div>
                            </header>

                            {/* About & Skills */}
                            <section id="about" className="max-w-7xl mx-auto py-32 px-6 grid lg:grid-cols-2 gap-24 items-start">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-sm font-black text-amber-400 mb-8 tracking-[0.6em] uppercase flex items-center gap-4">
                                        <div className="w-8 h-[1px] bg-amber-400" /> WHO_I_AM
                                    </h2>
                                    <p className="text-3xl md:text-5xl font-bold text-amber-900 leading-[1.1] mb-12">
                                        {data.about.description}
                                    </p>
                                    <div className="flex flex-wrap gap-3">
                                        {data.about.interests.map((interest, i) => (
                                            <span key={i} className="px-5 py-2 bg-amber-100/50 text-amber-900 text-xs font-black rounded-full border border-amber-200 hover:bg-amber-200 transition-colors">
                                                {interest.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-12">
                                    {data.skills.map((group, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-8 bg-white/60 backdrop-blur-md rounded-[2.5rem] border border-amber-100 shadow-sm hover:shadow-xl hover:shadow-amber-900/5 transition-all group"
                                        >
                                            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 mb-6 group-hover:scale-110 transition-transform">
                                                <FaLightbulb />
                                            </div>
                                            <h3 className="text-lg font-black text-amber-900 mb-4">{group.category}</h3>
                                            <div className="space-y-2">
                                                {group.skills.map((skill, j) => (
                                                    <div key={j} className="flex items-center gap-2 text-sm text-amber-800/70 font-medium">
                                                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full" /> {skill}
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Lab/Projects - Interactive Stack */}
                            <section id="projects" className="py-32 bg-amber-50/50">
                                <div className="max-w-7xl mx-auto px-6">
                                    <h2 className="text-sm font-black text-amber-400 mb-20 tracking-[0.6em] uppercase text-center">PROJECT_LABS</h2>

                                    <div className="grid lg:grid-cols-3 gap-12">
                                        {data.projects.map((proj, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                whileHover={{ y: -10 }}
                                                className="group bg-white rounded-[3rem] p-10 border border-amber-100 shadow-sm relative overflow-hidden h-full flex flex-col"
                                            >
                                                <div className="absolute top-0 right-0 p-8">
                                                    <div className="text-6xl font-black text-amber-50 opacity-40 group-hover:opacity-100 transition-opacity">0{i + 1}</div>
                                                </div>

                                                <div className="relative z-10 flex-1">
                                                    <h3 className="text-3xl font-black text-amber-900 mb-6 group-hover:text-amber-500 transition-colors">{proj.title}</h3>
                                                    <p className="text-amber-800/60 leading-relaxed mb-8 font-medium">
                                                        {proj.description}
                                                    </p>
                                                    <div className="flex flex-wrap gap-2 mb-10">
                                                        {proj.techStack.map((tech, j) => (
                                                            <span key={j} className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-6 mt-auto">
                                                    <MagneticElement>
                                                        <a href={proj.githubUrl} className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-900 hover:bg-amber-900 hover:text-white transition-all">
                                                            <FaGithub size={20} />
                                                        </a>
                                                    </MagneticElement>
                                                    <MagneticElement>
                                                        <a href={proj.liveUrl} className="w-12 h-12 bg-amber-900 rounded-2xl flex items-center justify-center text-white hover:bg-amber-400 transition-all">
                                                            <FaExternalLinkAlt size={18} />
                                                        </a>
                                                    </MagneticElement>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Experience & Education */}
                            <section id="experience" className="py-32 max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_400px] gap-24">
                                <div className="space-y-20">
                                    <h2 className="text-sm font-black text-amber-400 tracking-[0.6em] uppercase">EXPERIENCE_LOG</h2>
                                    {data.experience.map((exp, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -30 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="group relative pl-12"
                                        >
                                            <div className="absolute left-0 top-0 w-1 h-full bg-amber-100 rounded-full" />
                                            <motion.div
                                                className="absolute left-[-4px] top-0 w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_#f59e0b]"
                                                whileInView={{ scale: [1, 1.5, 1] }}
                                            />
                                            <div className="text-xs font-black text-amber-400 mb-4 tracking-widest">{exp.startDate} — {exp.endDate}</div>
                                            <h3 className="text-4xl font-black text-[#78350f] mb-4 group-hover:translate-x-4 transition-transform">{exp.role}</h3>
                                            <p className="text-xl font-bold text-amber-900/60 mb-6">{exp.company} // {exp.location}</p>
                                            <p className="text-lg text-amber-800/70 leading-relaxed max-w-2xl">{exp.description}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="space-y-12 bg-white/40 p-12 rounded-[3.5rem] border border-amber-100">
                                    <h2 className="text-sm font-black text-amber-400 tracking-[0.6em] uppercase">ACADEMIC</h2>
                                    {data.education.map((edu, i) => (
                                        <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                                            <div className="text-[10px] font-black text-amber-500 mb-2">{edu.startYear} — {edu.endYear}</div>
                                            <h3 className="text-xl font-black text-amber-900 mb-1">{edu.degree}</h3>
                                            <p className="text-sm text-amber-800/60 font-bold mb-3">{edu.institution}</p>
                                            <div className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-700 inline-block rounded-lg">GRADE: {edu.grade}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>

                            {/* Achievements */}
                            {data.achievements?.length > 0 && (
                                <section id="achievements" className="py-24 px-6 bg-gradient-to-b from-transparent to-amber-100/30">
                                    <div className="max-w-7xl mx-auto flex flex-col items-center">
                                        <h2 className="text-sm font-black text-amber-400 mb-16 tracking-[0.6em] uppercase">SELECTED_WINS</h2>
                                        <div className="flex flex-wrap justify-center gap-8">
                                            {data.achievements.map((ach, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ scale: 1.02 }}
                                                    className="p-10 bg-white rounded-[2.5rem] border border-amber-100 shadow-sm max-w-sm"
                                                >
                                                    <FaAward className="text-4xl text-amber-400 mb-6" />
                                                    <h3 className="text-2xl font-black text-amber-900 mb-2">{ach.title}</h3>
                                                    <div className="text-[10px] font-black text-amber-500 mb-4 tracking-widest">{ach.organization.toUpperCase()}</div>
                                                    <p className="text-sm text-amber-800/60 leading-relaxed font-medium">{ach.description}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Footer */}
                            <footer id="contact" className="py-40 px-6 text-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-[#78350f] mb-16">
                                        SAY_<span className="text-amber-400">HELLO</span>
                                    </h2>

                                    <MagneticElement className="inline-block">
                                        <a href={`mailto:${data.contact.email}`} className="text-3xl md:text-5xl font-black text-amber-900 hover:text-amber-500 transition-colors border-b-8 border-amber-200 hover:border-amber-400 px-4 pb-2">
                                            {data.contact.email}
                                        </a>
                                    </MagneticElement>

                                    <div className="flex justify-center gap-8 mt-24">
                                        {data.contact.linkedinUrl && (
                                            <a href={data.contact.linkedinUrl} className="text-3xl text-amber-900/40 hover:text-amber-900 transition-all hover:scale-125">
                                                <FaLinkedinIn />
                                            </a>
                                        )}
                                        <a href={`tel:${data.contact.phone}`} className="text-3xl text-amber-900/40 hover:text-amber-900 transition-all hover:scale-125">
                                            <FaPhone />
                                        </a>
                                    </div>
                                    <div className="text-xl text-amber-900/40 hover:text-amber-900 transition-all mt-10 mb-32">{data.contact.location}</div>


                                    <div className="text-[10px] font-black text-amber-900/30 tracking-[0.5em] uppercase">
                                        © 2026 // <a href="/" className="hover:text-amber-900 transition-colors">BUILT WITH BUILDURSITE</a>
                                    </div>
                                </motion.div>
                            </footer>
                        </div>
                    </div>

                    <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
                html { scroll-behavior: smooth; }
                body { background-color: #fffdf0; }
            `}</style>
                </>
            )}
        </div>
    );
}
