'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
    HiUser, HiAcademicCap, HiBriefcase, HiCode, HiStar,
    HiMail, HiChevronDown, HiPlus, HiTrash, HiSave,
    HiClipboardCopy, HiExternalLink, HiPhotograph, HiTemplate,
    HiInformationCircle, HiCheck
} from 'react-icons/hi';
import { FaRocket, FaPalette, FaColumns, FaTerminal, FaGem } from 'react-icons/fa';

interface PortfolioData {
    selectedTemplate: string;
    profileImageUrl: string;
    basicInfo: { fullName: string; tagline: string; description: string };
    about: { description: string; interests: string[] };
    education: { degree: string; institution: string; location: string; startYear: string; endYear: string; grade: string; description: string }[];
    experience: { role: string; company: string; location: string; startDate: string; endDate: string; skills: string[]; description: string }[];
    projects: { title: string; techStack: string[]; description: string; githubUrl: string; liveUrl: string }[];
    skills: { category: string; icon: string; skills: string[] }[];
    achievements: { title: string; organization: string; description: string }[];
    contact: { email: string; phone: string; linkedinUrl: string; githubUrl: string; websiteUrl: string; location: string };
    slug?: string;
}

const defaultPortfolio: PortfolioData = {
    selectedTemplate: 'minimal',
    profileImageUrl: '',
    basicInfo: { fullName: '', tagline: '', description: '' },
    about: { description: '', interests: [] },
    education: [{ degree: 'B.Tech', institution: '', location: '', startYear: '', endYear: '', grade: '', description: '' }],
    experience: [],
    projects: [{ title: '', techStack: [], description: '', githubUrl: '', liveUrl: '' }],
    skills: [{ category: 'Frontend', icon: 'code', skills: [] }],
    achievements: [{ title: '', organization: '', description: '' }],
    contact: { email: '', phone: '', linkedinUrl: '', githubUrl: '', websiteUrl: '', location: '' },
};

const templateOptions = [
    { id: 'minimal', name: 'Minimal', icon: <FaRocket />, color: 'from-[#00b8d4] to-[#00e5ff]', desc: 'Clean, recruiter-friendly' },
    { id: 'creative', name: 'Creative', icon: <FaPalette />, color: 'from-[#8B5CF6] to-[#EC4899]', desc: 'Bold, artistic, animated' },
    { id: 'sidebar', name: 'Sidebar', icon: <FaColumns />, color: 'from-[#F59E0B] to-[#EF4444]', desc: 'Premium, elegant sidebar' },
    { id: 'futuristic', name: 'Futuristic', icon: <FaTerminal />, color: 'from-[#00f0ff] to-[#ff003c]', desc: 'Cyberpunk, glowing tech' },
    { id: 'sleek', name: 'Sleek', icon: <FaGem />, color: 'from-[#111827] to-[#4B5563]', desc: 'Modern, glassmorphism UI' },
];

const degreeOptions = ['B.Tech', 'M.Tech', 'MBA', 'BBA', 'B.Sc', 'M.Sc', 'B.Com', 'M.Com', 'BCA', 'MCA', '12th', '10th', 'Other'];

export default function DashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [portfolio, setPortfolio] = useState<PortfolioData>(defaultPortfolio);
    const [activeSection, setActiveSection] = useState<string | null>('template');
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState('');
    const [uploading, setUploading] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!authLoading && !user) router.replace('/login');
    }, [user, authLoading, router]);

    const fetchPortfolio = useCallback(async () => {
        try {
            const res = await fetch('/api/portfolio');
            if (res.ok) {
                const data = await res.json();
                const p = data.portfolio;
                setPortfolio({
                    selectedTemplate: p.selectedTemplate || 'minimal',
                    profileImageUrl: p.profileImageUrl || '',
                    basicInfo: p.basicInfo || { fullName: '', tagline: '', description: '' },
                    about: p.about || { description: '', interests: [] },
                    education: p.education?.length ? p.education : defaultPortfolio.education,
                    experience: p.experience?.length ? p.experience : defaultPortfolio.experience,
                    projects: p.projects?.length ? p.projects : defaultPortfolio.projects,
                    skills: p.skills?.length ? p.skills : defaultPortfolio.skills,
                    achievements: p.achievements?.length ? p.achievements : defaultPortfolio.achievements,
                    contact: p.contact || defaultPortfolio.contact,
                    slug: p.slug,
                });
            }
        } catch (err) {
            console.error('Failed to load portfolio:', err);
        } finally {
            setDataLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (user) fetchPortfolio();
    }, [user, fetchPortfolio]);

    const handleSave = async () => {
        // Client-side Validation
        if (portfolio.contact.email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(portfolio.contact.email)) {
                setSaveMsg('Error: Invalid email format.');
                setTimeout(() => setSaveMsg(''), 4000);
                return;
            }
        }
        if (portfolio.contact.phone) {
            const digits = portfolio.contact.phone.replace(/\D/g, '');
            if (digits.length !== 10) {
                setSaveMsg('Error: Phone number must contain exactly 10 digits.');
                setTimeout(() => setSaveMsg(''), 4000);
                return;
            }
        }
        for (const edu of portfolio.education) {
            if (edu.grade) {
                const num = parseFloat(edu.grade);
                if (!isNaN(num) && (num < 0 || num > 10)) {
                    // Let's be lenient if they put percentage up to 100
                    if (num > 100) {
                        setSaveMsg(`Error: Grade/CGPA '${edu.grade}' must be between 0 and 10 (or up to 100 for %).`);
                        setTimeout(() => setSaveMsg(''), 4000);
                        return;
                    }
                }
            }
        }

        setSaving(true);
        setSaveMsg('');
        try {
            const res = await fetch('/api/portfolio', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(portfolio),
            });
            if (res.ok) {
                const data = await res.json();
                setPortfolio((prev) => ({ ...prev, slug: data.portfolio.slug }));
                setSaveMsg('Portfolio saved successfully!');
                setTimeout(() => setSaveMsg(''), 3000);
            } else {
                setSaveMsg('Failed to save. Please try again.');
            }
        } catch {
            setSaveMsg('Error saving portfolio.');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            if (res.ok) {
                const data = await res.json();
                setPortfolio((prev) => ({ ...prev, profileImageUrl: data.url }));
            }
        } catch (err) {
            console.error('Upload failed:', err);
        } finally {
            setUploading(false);
        }
    };

    const copyLink = () => {
        if (portfolio.slug) {
            navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/${portfolio.slug}`);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const toggleSection = (key: string) => {
        setActiveSection(activeSection === key ? null : key);
    };

    if (authLoading || !dataLoaded) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F1A] flex items-center justify-center">
                <div className="w-10 h-10 border-3 border-[#6C63FF] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const portfolioUrl = portfolio.slug ? `${process.env.NEXT_PUBLIC_BASE_URL}/${portfolio.slug}` : null;

    const sections = [
        { key: 'template', icon: <HiTemplate />, label: 'Template Selection' },
        { key: 'basic', icon: <HiUser />, label: 'Basic Info & Photo' },
        { key: 'about', icon: <HiInformationCircle />, label: 'About' },
        { key: 'education', icon: <HiAcademicCap />, label: 'Education' },
        { key: 'experience', icon: <HiBriefcase />, label: 'Experience' },
        { key: 'projects', icon: <HiCode />, label: 'Projects' },
        { key: 'skills', icon: <HiStar />, label: 'Skills' },
        { key: 'achievements', icon: <HiStar />, label: 'Achievements' },
        { key: 'contact', icon: <HiMail />, label: 'Contact' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F1A]">
            <Navbar />

            <div className="max-w-4xl mx-auto px-4 pt-32 sm:pt-24 pb-16">
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                    <h1 className="text-3xl font-bold font-[Poppins] mb-2">
                        Welcome, <span className="gradient-text">{user?.username}</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">Build and manage your portfolio below.</p>
                </motion.div>

                {/* Share Link */}
                {portfolioUrl && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-4 rounded-2xl bg-white/80 dark:bg-[#1E1E2E]/80 border border-gray-200 dark:border-[#3B3B52]/50 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Your portfolio link</p>
                            <p className="text-sm text-[#6C63FF] truncate">{portfolioUrl}</p>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={copyLink} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] text-sm font-medium hover:bg-[#6C63FF]/20 transition-colors">
                                {copied ? <HiCheck /> : <HiClipboardCopy />}
                                {copied ? 'Copied!' : 'Copy'}
                            </button>
                            <a href={`/${portfolio.slug}`} target="_blank" className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] text-sm font-medium hover:bg-[#06B6D4]/20 transition-colors">
                                <HiExternalLink /> View
                            </a>
                        </div>
                    </motion.div>
                )}

                {/* Accordion Sections */}
                <div className="space-y-3">
                    {sections.map((section) => (
                        <motion.div key={section.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-white/60 dark:bg-[#1E1E2E]/60 border border-gray-200 dark:border-[#3B3B52]/50 overflow-hidden">
                            <button onClick={() => toggleSection(section.key)} className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-100/50 dark:bg-[#2A2A3E]/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <span className="text-[#6C63FF] text-xl">{section.icon}</span>
                                    <span className="font-semibold font-[Poppins]">{section.label}</span>
                                </div>
                                <HiChevronDown className={`text-gray-600 dark:text-gray-400 transition-transform ${activeSection === section.key ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {activeSection === section.key && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pt-2 border-t border-gray-200 dark:border-[#3B3B52]/30">
                                            {section.key === 'template' && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {templateOptions.map((t) => (
                                                        <button
                                                            key={t.id}
                                                            onClick={() => setPortfolio((p) => ({ ...p, selectedTemplate: t.id }))}
                                                            className={`p-4 rounded-xl border-2 transition-all text-left ${portfolio.selectedTemplate === t.id
                                                                ? 'border-[#6C63FF] bg-[#6C63FF]/10'
                                                                : 'border-gray-200 dark:border-[#3B3B52]/50 hover:border-gray-200 dark:border-[#3B3B52]'
                                                                }`}
                                                        >
                                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${t.color} flex items-center justify-center text-gray-900 dark:text-white text-lg mb-3`}>
                                                                {t.icon}
                                                            </div>
                                                            <h4 className="font-semibold text-sm">{t.name}</h4>
                                                            <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{t.desc}</p>
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {section.key === 'basic' && (
                                                <div className="space-y-4">
                                                    {/* Profile Image */}
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-20 h-20 rounded-2xl bg-gray-100 dark:bg-[#2A2A3E] border border-gray-200 dark:border-[#3B3B52] overflow-hidden flex items-center justify-center">
                                                            {portfolio.profileImageUrl ? (
                                                                <img src={portfolio.profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <HiPhotograph className="text-3xl text-gray-400 dark:text-gray-500" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="flex gap-2">
                                                                <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#6C63FF]/10 border border-[#6C63FF]/20 text-[#6C63FF] text-sm font-medium cursor-pointer hover:bg-[#6C63FF]/20 transition-colors">
                                                                    <HiPhotograph />
                                                                    {uploading ? 'Uploading...' : 'Upload Photo'}
                                                                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                                                </label>
                                                                {portfolio.profileImageUrl && (
                                                                    <button
                                                                        onClick={() => setPortfolio(p => ({ ...p, profileImageUrl: '' }))}
                                                                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-red-500/30 text-red-500 text-sm font-medium hover:bg-red-500/10 transition-colors"
                                                                    >
                                                                        <HiTrash />
                                                                        Remove
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Max 5MB • JPEG, PNG, WebP</p>
                                                        </div>
                                                    </div>
                                                    <InputField label="Full Name" value={portfolio.basicInfo.fullName} onChange={(v) => setPortfolio((p) => ({ ...p, basicInfo: { ...p.basicInfo, fullName: v } }))} placeholder="John Doe" />
                                                    <InputField label="Tagline / Role" value={portfolio.basicInfo.tagline} onChange={(v) => setPortfolio((p) => ({ ...p, basicInfo: { ...p.basicInfo, tagline: v } }))} placeholder="Full Stack Developer" />
                                                    <TextAreaField label="Short Description" value={portfolio.basicInfo.description} onChange={(v) => setPortfolio((p) => ({ ...p, basicInfo: { ...p.basicInfo, description: v } }))} placeholder="A passionate developer..." />
                                                </div>
                                            )}

                                            {section.key === 'about' && (
                                                <div className="space-y-4">
                                                    <TextAreaField label="About Description" value={portfolio.about.description} onChange={(v) => setPortfolio((p) => ({ ...p, about: { ...p.about, description: v } }))} placeholder="Tell your story..." rows={5} />
                                                    <TagInput label="Interests" tags={portfolio.about.interests} onChange={(tags) => setPortfolio((p) => ({ ...p, about: { ...p.about, interests: tags } }))} placeholder="Add interest..." />
                                                </div>
                                            )}

                                            {section.key === 'education' && (
                                                <DynamicList
                                                    items={portfolio.education}
                                                    addLabel="Add Education"
                                                    onAdd={() => setPortfolio((p) => ({ ...p, education: [...p.education, { degree: 'B.Tech', institution: '', location: '', startYear: '', endYear: '', grade: '', description: '' }] }))}
                                                    onRemove={(i) => setPortfolio((p) => ({ ...p, education: p.education.filter((_, idx) => idx !== i) }))}
                                                    renderItem={(item, i) => (
                                                        <div className="space-y-3">
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <div>
                                                                    <label className="text-xs text-gray-600 dark:text-gray-400 mb-1 block">Degree</label>
                                                                    {!degreeOptions.includes(item.degree) || item.degree === 'Other' ? (
                                                                        <div className="flex gap-2">
                                                                            <input
                                                                                value={item.degree === 'Other' ? '' : item.degree}
                                                                                onChange={(e) => { const edu = [...portfolio.education]; edu[i].degree = e.target.value; setPortfolio((p) => ({ ...p, education: edu })); }}
                                                                                placeholder="Custom Degree"
                                                                                className="flex-1 bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#6C63FF]"
                                                                            />
                                                                            <button onClick={() => { const edu = [...portfolio.education]; edu[i].degree = 'B.Tech'; setPortfolio((p) => ({ ...p, education: edu })); }} className="px-3 py-2 bg-white dark:bg-[#1E1E2E] text-gray-600 dark:text-gray-400 rounded-xl hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-[#3B3B52]">✕</button>
                                                                        </div>
                                                                    ) : (
                                                                        <select value={item.degree} onChange={(e) => { const edu = [...portfolio.education]; edu[i].degree = e.target.value; setPortfolio((p) => ({ ...p, education: edu })); }} className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl px-4 py-2.5 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-[#6C63FF]">
                                                                            {degreeOptions.map((d) => <option key={d} value={d}>{d}</option>)}
                                                                        </select>
                                                                    )}
                                                                </div>
                                                                <InputField label="Grade/CGPA" value={item.grade} onChange={(v) => { const edu = [...portfolio.education]; edu[i].grade = v; setPortfolio((p) => ({ ...p, education: edu })); }} placeholder="8.5 CGPA" small />
                                                            </div>
                                                            <InputField label="Institution" value={item.institution} onChange={(v) => { const edu = [...portfolio.education]; edu[i].institution = v; setPortfolio((p) => ({ ...p, education: edu })); }} placeholder="University Name" small />
                                                            <InputField label="Location" value={item.location} onChange={(v) => { const edu = [...portfolio.education]; edu[i].location = v; setPortfolio((p) => ({ ...p, education: edu })); }} placeholder="City, Country" small />
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <InputField label="Start Year" value={item.startYear} onChange={(v) => { const edu = [...portfolio.education]; edu[i].startYear = v; setPortfolio((p) => ({ ...p, education: edu })); }} placeholder="2022" small />
                                                                <InputField label="End Year" value={item.endYear} onChange={(v) => { const edu = [...portfolio.education]; edu[i].endYear = v; setPortfolio((p) => ({ ...p, education: edu })); }} placeholder="2026" small />
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                            )}

                                            {section.key === 'experience' && (
                                                <DynamicList
                                                    items={portfolio.experience}
                                                    addLabel="Add Experience"
                                                    onAdd={() => setPortfolio((p) => ({ ...p, experience: [...p.experience, { role: '', company: '', location: '', startDate: '', endDate: '', skills: [], description: '' }] }))}
                                                    onRemove={(i) => setPortfolio((p) => ({ ...p, experience: p.experience.filter((_, idx) => idx !== i) }))}
                                                    renderItem={(item, i) => (
                                                        <div className="space-y-3">
                                                            <InputField label="Role" value={item.role} onChange={(v) => { const exp = [...portfolio.experience]; exp[i].role = v; setPortfolio((p) => ({ ...p, experience: exp })); }} placeholder="Full Stack Developer" small />
                                                            <InputField label="Company" value={item.company} onChange={(v) => { const exp = [...portfolio.experience]; exp[i].company = v; setPortfolio((p) => ({ ...p, experience: exp })); }} placeholder="Company Name" small />
                                                            <InputField label="Location" value={item.location} onChange={(v) => { const exp = [...portfolio.experience]; exp[i].location = v; setPortfolio((p) => ({ ...p, experience: exp })); }} placeholder="City, Country" small />
                                                            <div className="grid grid-cols-2 gap-3">
                                                                <InputField label="Start Date" value={item.startDate} onChange={(v) => { const exp = [...portfolio.experience]; exp[i].startDate = v; setPortfolio((p) => ({ ...p, experience: exp })); }} placeholder="June 2025" small />
                                                                <InputField label="End Date" value={item.endDate} onChange={(v) => { const exp = [...portfolio.experience]; exp[i].endDate = v; setPortfolio((p) => ({ ...p, experience: exp })); }} placeholder="Present" small />
                                                            </div>
                                                            <TagInput label="Skills Used" tags={item.skills} onChange={(tags) => { const exp = [...portfolio.experience]; exp[i].skills = tags; setPortfolio((p) => ({ ...p, experience: exp })); }} placeholder="Add skill..." small />
                                                            <TextAreaField label="Description" value={item.description} onChange={(v) => { const exp = [...portfolio.experience]; exp[i].description = v; setPortfolio((p) => ({ ...p, experience: exp })); }} placeholder="What you did..." rows={3} small />
                                                        </div>
                                                    )}
                                                />
                                            )}

                                            {section.key === 'projects' && (
                                                <div>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">💡 2-4 projects is ideal for showcasing your best work.</p>
                                                    <DynamicList
                                                        items={portfolio.projects}
                                                        addLabel="Add Project"
                                                        onAdd={() => setPortfolio((p) => ({ ...p, projects: [...p.projects, { title: '', techStack: [], description: '', githubUrl: '', liveUrl: '' }] }))}
                                                        onRemove={(i) => setPortfolio((p) => ({ ...p, projects: p.projects.filter((_, idx) => idx !== i) }))}
                                                        renderItem={(item, i) => (
                                                            <div className="space-y-3">
                                                                <InputField label="Project Title" value={item.title} onChange={(v) => { const proj = [...portfolio.projects]; proj[i].title = v; setPortfolio((p) => ({ ...p, projects: proj })); }} placeholder="My Project" small />
                                                                <TagInput label="Tech Stack" tags={item.techStack} onChange={(tags) => { const proj = [...portfolio.projects]; proj[i].techStack = tags; setPortfolio((p) => ({ ...p, projects: proj })); }} placeholder="Add tech..." small />
                                                                <TextAreaField label="Description" value={item.description} onChange={(v) => { const proj = [...portfolio.projects]; proj[i].description = v; setPortfolio((p) => ({ ...p, projects: proj })); }} placeholder="What does this project do?" rows={3} small />
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    <InputField label="GitHub URL" value={item.githubUrl} onChange={(v) => { const proj = [...portfolio.projects]; proj[i].githubUrl = v; setPortfolio((p) => ({ ...p, projects: proj })); }} placeholder="https://github.com/..." small />
                                                                    <InputField label="Live URL" value={item.liveUrl} onChange={(v) => { const proj = [...portfolio.projects]; proj[i].liveUrl = v; setPortfolio((p) => ({ ...p, projects: proj })); }} placeholder="https://..." small />
                                                                </div>
                                                            </div>
                                                        )}
                                                    />
                                                </div>
                                            )}

                                            {section.key === 'skills' && (
                                                <DynamicList
                                                    items={portfolio.skills}
                                                    addLabel="Add Skill Group"
                                                    onAdd={() => setPortfolio((p) => ({ ...p, skills: [...p.skills, { category: '', icon: 'code', skills: [] }] }))}
                                                    onRemove={(i) => setPortfolio((p) => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }))}
                                                    renderItem={(item, i) => (
                                                        <div className="space-y-3">
                                                            <InputField label="Category Name" value={item.category} onChange={(v) => { const sk = [...portfolio.skills]; sk[i].category = v; setPortfolio((p) => ({ ...p, skills: sk })); }} placeholder="Frontend, Backend, Cloud..." small />
                                                            <TagInput label="Skills" tags={item.skills} onChange={(tags) => { const sk = [...portfolio.skills]; sk[i].skills = tags; setPortfolio((p) => ({ ...p, skills: sk })); }} placeholder="Add skill..." small />
                                                        </div>
                                                    )}
                                                />
                                            )}

                                            {section.key === 'achievements' && (
                                                <DynamicList
                                                    items={portfolio.achievements}
                                                    addLabel="Add Achievement"
                                                    onAdd={() => setPortfolio((p) => ({ ...p, achievements: [...p.achievements, { title: '', organization: '', description: '' }] }))}
                                                    onRemove={(i) => setPortfolio((p) => ({ ...p, achievements: p.achievements.filter((_, idx) => idx !== i) }))}
                                                    renderItem={(item, i) => (
                                                        <div className="space-y-3">
                                                            <InputField label="Achievement Title" value={item.title} onChange={(v) => { const ach = [...portfolio.achievements]; ach[i].title = v; setPortfolio((p) => ({ ...p, achievements: ach })); }} placeholder="Hackathon Winner" small />
                                                            <InputField label="Organization" value={item.organization} onChange={(v) => { const ach = [...portfolio.achievements]; ach[i].organization = v; setPortfolio((p) => ({ ...p, achievements: ach })); }} placeholder="Organization Name" small />
                                                            <TextAreaField label="Description" value={item.description} onChange={(v) => { const ach = [...portfolio.achievements]; ach[i].description = v; setPortfolio((p) => ({ ...p, achievements: ach })); }} placeholder="What was the achievement?" rows={2} small />
                                                        </div>
                                                    )}
                                                />
                                            )}

                                            {section.key === 'contact' && (
                                                <div className="space-y-3">
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <InputField label="Email" value={portfolio.contact.email} onChange={(v) => setPortfolio((p) => ({ ...p, contact: { ...p.contact, email: v } }))} placeholder="you@example.com" small />
                                                        <InputField label="Phone" value={portfolio.contact.phone} onChange={(v) => setPortfolio((p) => ({ ...p, contact: { ...p.contact, phone: v } }))} placeholder="+91-9876543210" small />
                                                    </div>
                                                    <InputField label="LinkedIn URL" value={portfolio.contact.linkedinUrl} onChange={(v) => setPortfolio((p) => ({ ...p, contact: { ...p.contact, linkedinUrl: v } }))} placeholder="https://linkedin.com/in/..." small />
                                                    <InputField label="GitHub URL" value={portfolio.contact.githubUrl} onChange={(v) => setPortfolio((p) => ({ ...p, contact: { ...p.contact, githubUrl: v } }))} placeholder="https://github.com/..." small />
                                                    <InputField label="Website URL" value={portfolio.contact.websiteUrl} onChange={(v) => setPortfolio((p) => ({ ...p, contact: { ...p.contact, websiteUrl: v } }))} placeholder="https://..." small />
                                                    <InputField label="Location" value={portfolio.contact.location} onChange={(v) => setPortfolio((p) => ({ ...p, contact: { ...p.contact, location: v } }))} placeholder="City, Country" small />
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Save Button */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 flex items-center gap-4">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-gray-900 dark:text-white px-8 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all disabled:opacity-50 shadow-lg shadow-[#6C63FF]/25"
                    >
                        {saving ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <HiSave />}
                        {saving ? 'Saving...' : 'Save Portfolio'}
                    </button>
                    {saveMsg && <span className={`text-sm ${saveMsg.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{saveMsg}</span>}
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}

// ===== Reusable Components =====

function InputField({ label, value, onChange, placeholder, small }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; small?: boolean }) {
    return (
        <div>
            <label className={`block font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${small ? 'text-xs' : 'text-sm'}`}>{label}</label>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl px-4 py-2.5 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#6C63FF] transition-colors"
            />
        </div>
    );
}

function TextAreaField({ label, value, onChange, placeholder, rows = 4, small }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; rows?: number; small?: boolean }) {
    return (
        <div>
            <label className={`block font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${small ? 'text-xs' : 'text-sm'}`}>{label}</label>
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl px-4 py-2.5 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#6C63FF] transition-colors resize-y"
            />
        </div>
    );
}

function TagInput({ label, tags, onChange, placeholder, small }: { label: string; tags: string[]; onChange: (tags: string[]) => void; placeholder: string; small?: boolean }) {
    const [input, setInput] = useState('');

    const addTag = () => {
        const trimmed = input.trim();
        if (trimmed && !tags.includes(trimmed)) {
            onChange([...tags, trimmed]);
            setInput('');
        }
    };

    return (
        <div>
            <label className={`block font-medium text-gray-700 dark:text-gray-300 mb-1.5 ${small ? 'text-xs' : 'text-sm'}`}>{label}</label>
            <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag, i) => (
                    <span key={i} className="flex items-center gap-1.5 bg-[#6C63FF]/10 text-[#6C63FF] px-3 py-1 rounded-lg text-xs font-medium">
                        {tag}
                        <button onClick={() => onChange(tags.filter((_, idx) => idx !== i))} className="hover:text-red-400">×</button>
                    </span>
                ))}
            </div>
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag(); } }}
                    placeholder={placeholder}
                    className="flex-1 bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-xl px-4 py-2 text-gray-900 dark:text-white text-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-[#6C63FF]"
                />
                <button onClick={addTag} className="px-3 py-2 rounded-xl bg-[#6C63FF]/10 text-[#6C63FF] text-sm hover:bg-[#6C63FF]/20 transition-colors"><HiPlus /></button>
            </div>
        </div>
    );
}

function DynamicList<T>({ items, addLabel, onAdd, onRemove, renderItem }: {
    items: T[];
    addLabel: string;
    onAdd: () => void;
    onRemove: (i: number) => void;
    renderItem: (item: T, index: number) => React.ReactNode;
}) {
    return (
        <div className="space-y-4">
            {items.map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-[#0F0F1A]/50 dark:bg-[#0F0F1A]/50 border border-gray-200 dark:border-[#3B3B52]/30 relative">
                    {items.length > 0 && (
                        <button onClick={() => onRemove(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-sm"><HiTrash /></button>
                    )}
                    {renderItem(item, i)}
                </div>
            ))}
            <button onClick={onAdd} className="flex items-center gap-2 text-sm text-[#6C63FF] hover:text-[#8B83FF] font-medium">
                <HiPlus /> {addLabel}
            </button>
        </div>
    );
}
