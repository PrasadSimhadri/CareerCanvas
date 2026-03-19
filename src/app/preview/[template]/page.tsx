import MinimalTemplate from '@/components/templates/MinimalTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import SidebarTemplate from '@/components/templates/SidebarTemplate';
import FuturisticTemplate from '@/components/templates/FuturisticTemplate';
import SleekTemplate from '@/components/templates/SleekTemplate';
import CyberTemplate from '@/components/templates/CyberTemplate';
import ObsidianTemplate from '@/components/templates/ObsidianTemplate';
import PastelTemplate from '@/components/templates/PastelTemplate';
import AuroraTemplate from '@/components/templates/AuroraTemplate';
import { notFound } from 'next/navigation';

export default async function PreviewPage({ params }: { params: Promise<{ template: string }> }) {
    const { template } = await params;
    
    // Comprehensive dummy data to show off all template features
    const dummyData = {
        profileImageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
        basicInfo: { 
            fullName: 'Alex Developer', 
            tagline: 'Senior Full Stack Engineer', 
            description: 'Passionate about building scalable applications and creating intuitive user experiences. Specialized in React, Node.js, and modern cloud architecture.' 
        },
        about: { 
            description: 'With over 5 years of experience in web development, I have a proven track record of delivering high-quality software solutions. I thrive in collaborative environments and am constantly learning new technologies to stay ahead of the curve.',
            interests: ['Web Development', 'UI/UX Design', 'Open Source', 'System Architecture', 'Machine Learning'],
        },
        education: [
            { degree: 'B.S. Computer Science', institution: 'University of Technology', location: 'San Francisco, CA', startYear: '2015', endYear: '2019', grade: '3.8 GPA', description: 'Focused on algorithms and systems architecture.' }
        ],
        experience: [
            { role: 'Senior Software Engineer', company: 'Tech Innovators Inc.', location: 'Remote', startDate: '2021', endDate: 'Present', skills: ['React', 'Next.js', 'Node.js', 'AWS'], description: 'Leading frontend development for enterprise SaaS products. Improved application performance by 40% and mentored junior developers.' },
            { role: 'Web Developer', company: 'Digital Solutions', location: 'New York, NY', startDate: '2019', endDate: '2021', skills: ['JavaScript', 'HTML/CSS', 'Vue.js'], description: 'Developed custom web applications for various high-profile clients. Collaborated closely with design and marketing teams.' }
        ],
        projects: [
            { title: 'E-Commerce Platform', techStack: ['Next.js', 'Stripe', 'MongoDB', 'Tailwind'], description: 'A full-stack e-commerce solution with real-time inventory, secure payment processing, and an intuitive admin dashboard.', githubUrl: '#', liveUrl: '#' },
            { title: 'Task Management App', techStack: ['React', 'Firebase', 'Framer Motion'], description: 'A collaborative task manager featuring real-time updates, drag-and-drop kanban boards, and sophisticated animations.', githubUrl: '#', liveUrl: '#' },
            { title: 'AI Content Generator', techStack: ['OpenAI API', 'React', 'Node.js'], description: 'An intelligent writing assistant that generates blog posts and marketing copy using advanced language models.', githubUrl: '#', liveUrl: '#' }
        ],
        skills: [
            { category: 'Frontend', icon: 'code', skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
            { category: 'Backend', icon: 'database', skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'] },
            { category: 'Tools & DevOps', icon: 'terminal', skills: ['Git', 'Docker', 'AWS', 'Figma', 'CI/CD'] }
        ],
        achievements: [
            { title: 'Best Innovation Award', organization: 'Global Tech Conference 2022', description: 'Awarded for developing an open-source accessibility tool that is now used by thousands of developers worldwide.' },
            { title: 'Hackathon Winner', organization: 'Code for Good 2021', description: 'First place out of 50 teams for building a platform that connects volunteers with local non-profits.' }
        ],
        contact: { email: 'alex@example.com', phone: '+1 (555) 123-4567', linkedinUrl: '#', githubUrl: '#', websiteUrl: '#', location: 'San Francisco, CA' }
    };

    if (template === 'minimal') return <MinimalTemplate data={dummyData} isPreview={true} />;
    if (template === 'creative') return <CreativeTemplate data={dummyData} isPreview={true} />;
    if (template === 'sidebar') return <SidebarTemplate data={dummyData} isPreview={true} />;
    if (template === 'future' || template === 'futuristic') return <FuturisticTemplate data={dummyData} isPreview={true} />;
    if (template === 'sleek') return <SleekTemplate data={dummyData} isPreview={true} />;
    if (template === 'neon' || template === 'cyber') return <CyberTemplate data={dummyData} isPreview={true} />;
    if (template === 'dark' || template === 'obsidian') return <ObsidianTemplate data={dummyData} isPreview={true} />;
    if (template === 'pastel') return <PastelTemplate data={dummyData} isPreview={true} />;
    if (template === 'glow' || template === 'aurora') return <AuroraTemplate data={dummyData} isPreview={true} />;

    notFound();
}
