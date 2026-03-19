import MinimalTemplate from '@/components/templates/MinimalTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import SidebarTemplate from '@/components/templates/SidebarTemplate';
import FuturisticTemplate from '@/components/templates/FuturisticTemplate';
import SleekTemplate from '@/components/templates/SleekTemplate';
import CyberTemplate from '@/components/templates/CyberTemplate';
import ObsidianTemplate from '@/components/templates/ObsidianTemplate';
import PastelTemplate from '@/components/templates/PastelTemplate';
import AuroraTemplate from '@/components/templates/AuroraTemplate';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;

    try {
        await connectDB();
        const user = await User.findOne({ slug }).select('basicInfo');

        if (!user) return { title: 'Portfolio Not Found' };

        return {
            title: `${user.basicInfo.fullName || 'Portfolio'} | BuildUrSite`,
            description: user.basicInfo.description || `${user.basicInfo.fullName}'s professional portfolio built with BuildUrSite.`,
        };
    } catch {
        return { title: 'Portfolio | BuildUrSite' };
    }
}

export default async function PortfolioPage({ params }: PageProps) {
    const { slug } = await params;

    try {
        await connectDB();
        const user = await User.findOne({ slug }).select('-passwordHash -email').lean();

        if (!user) {
            notFound();
        }

        const portfolioData = {
            profileImageUrl: user.profileImageUrl || '',
            basicInfo: {
                fullName: user.basicInfo?.fullName || 'Portfolio Owner',
                tagline: user.basicInfo?.tagline || '',
                description: user.basicInfo?.description || '',
            },
            about: {
                description: user.about?.description || '',
                interests: user.about?.interests || [],
            },
            education: user.education?.length ? JSON.parse(JSON.stringify(user.education)) : [],
            experience: user.experience?.length ? JSON.parse(JSON.stringify(user.experience)) : [],
            projects: user.projects?.length ? JSON.parse(JSON.stringify(user.projects)) : [],
            skills: user.skills?.length ? JSON.parse(JSON.stringify(user.skills)) : [],
            achievements: user.achievements?.length ? JSON.parse(JSON.stringify(user.achievements)) : [],
            contact: {
                email: user.contact?.email || '',
                phone: user.contact?.phone || '',
                linkedinUrl: user.contact?.linkedinUrl || '',
                githubUrl: user.contact?.githubUrl || '',
                websiteUrl: user.contact?.websiteUrl || '',
                location: user.contact?.location || '',
            },
        };

        const template = (user.selectedTemplate || 'minimal') as any;

        switch (template) {
            case 'creative':
                return <CreativeTemplate data={portfolioData} />;
            case 'sidebar':
                return <SidebarTemplate data={portfolioData} />;
            case 'future':
            case 'futuristic': // Fallback for old data
                return <FuturisticTemplate data={portfolioData} />;
            case 'sleek':
                return <SleekTemplate data={portfolioData} />;
            case 'neon':
            case 'cyber': // Fallback for old data
                return <CyberTemplate data={portfolioData} />;
            case 'dark':
            case 'obsidian': // Fallback for old data
                return <ObsidianTemplate data={portfolioData} />;
            case 'pastel':
                return <PastelTemplate data={portfolioData} />;
            case 'glow':
            case 'aurora': // Fallback for old data
                return <AuroraTemplate data={portfolioData} />;
            case 'minimal':
            default:
                return <MinimalTemplate data={portfolioData} />;
        }
    } catch (error) {
        console.error('Error loading portfolio:', error);
        notFound();
    }
}
