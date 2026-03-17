import MinimalTemplate from '@/components/templates/MinimalTemplate';
import CreativeTemplate from '@/components/templates/CreativeTemplate';
import SidebarTemplate from '@/components/templates/SidebarTemplate';
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
            title: `${user.basicInfo.fullName || 'Portfolio'} | CareerCanvas`,
            description: user.basicInfo.description || `${user.basicInfo.fullName}'s professional portfolio built with CareerCanvas.`,
        };
    } catch {
        return { title: 'Portfolio | CareerCanvas' };
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
            basicInfo: user.basicInfo || { fullName: '', tagline: '', description: '' },
            about: user.about || { description: '', interests: [], cards: [] },
            education: user.education || [],
            experience: user.experience || [],
            projects: user.projects || [],
            skills: user.skills || [],
            achievements: user.achievements || [],
            contact: user.contact || { email: '', phone: '', linkedinUrl: '', githubUrl: '', location: '' },
        };

        const template = user.selectedTemplate || 'minimal';

        switch (template) {
            case 'creative':
                return <CreativeTemplate data={portfolioData} />;
            case 'sidebar':
                return <SidebarTemplate data={portfolioData} />;
            case 'minimal':
            default:
                return <MinimalTemplate data={portfolioData} />;
        }
    } catch (error) {
        console.error('Error loading portfolio:', error);
        notFound();
    }
}
