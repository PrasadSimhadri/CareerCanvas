import mongoose, { Schema, Document, Model } from 'mongoose';

// ===== Sub-document interfaces =====

export interface IEducation {
    degree: string;
    institution: string;
    location: string;
    startYear: string;
    endYear: string;
    grade: string;
    description: string;
}

export interface IExperience {
    role: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    skills: string[];
    description: string;
}

export interface IProject {
    title: string;
    techStack: string[];
    description: string;
    githubUrl: string;
    liveUrl: string;
}

export interface ISkillGroup {
    category: string;
    icon: string;
    skills: string[];
}

export interface IAchievement {
    title: string;
    organization: string;
    description: string;
}

export interface IContact {
    email: string;
    phone: string;
    linkedinUrl: string;
    githubUrl: string;
    websiteUrl: string;
    location: string;
}

// ===== Main User interface =====

export interface IUser extends Document {
    username: string;
    email: string;
    passwordHash?: string;
    googleId?: string;
    slug: string;
    selectedTemplate: 'minimal' | 'creative' | 'sidebar';
    profileImageUrl: string;

    // Portfolio sections
    basicInfo: {
        fullName: string;
        tagline: string;
        description: string;
    };
    about: {
        description: string;
        interests: string[];
        cards: { title: string; description: string }[];
    };
    education: IEducation[];
    experience: IExperience[];
    projects: IProject[];
    skills: ISkillGroup[];
    achievements: IAchievement[];
    contact: IContact;

    createdAt: Date;
    updatedAt: Date;
}

// ===== Sub-schemas =====

const EducationSchema = new Schema<IEducation>({
    degree: { type: String, default: '' },
    institution: { type: String, default: '' },
    location: { type: String, default: '' },
    startYear: { type: String, default: '' },
    endYear: { type: String, default: '' },
    grade: { type: String, default: '' },
    description: { type: String, default: '' },
});

const ExperienceSchema = new Schema<IExperience>({
    role: { type: String, default: '' },
    company: { type: String, default: '' },
    location: { type: String, default: '' },
    startDate: { type: String, default: '' },
    endDate: { type: String, default: '' },
    skills: [{ type: String }],
    description: { type: String, default: '' },
});

const ProjectSchema = new Schema<IProject>({
    title: { type: String, default: '' },
    techStack: [{ type: String }],
    description: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    liveUrl: { type: String, default: '' },
});

const SkillGroupSchema = new Schema<ISkillGroup>({
    category: { type: String, default: '' },
    icon: { type: String, default: 'code' },
    skills: [{ type: String }],
});

const AchievementSchema = new Schema<IAchievement>({
    title: { type: String, default: '' },
    organization: { type: String, default: '' },
    description: { type: String, default: '' },
});

const ContactSchema = new Schema<IContact>({
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    location: { type: String, default: '' },
});

// ===== Main User Schema =====

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            lowercase: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters'],
            maxlength: [30, 'Username must be at most 30 characters'],
            match: [/^[a-z0-9_-]+$/, 'Username can only contain lowercase letters, numbers, hyphens, and underscores'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        passwordHash: {
            type: String,
            required: false,
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        selectedTemplate: {
            type: String,
            enum: ['minimal', 'creative', 'sidebar'],
            default: 'minimal',
        },
        profileImageUrl: {
            type: String,
            default: '',
        },

        // Portfolio sections
        basicInfo: {
            fullName: { type: String, default: '' },
            tagline: { type: String, default: '' },
            description: { type: String, default: '' },
        },
        about: {
            description: { type: String, default: '' },
            interests: [{ type: String }],
            cards: [
                {
                    title: { type: String, default: '' },
                    description: { type: String, default: '' },
                },
            ],
        },
        education: [EducationSchema],
        experience: [ExperienceSchema],
        projects: [ProjectSchema],
        skills: [SkillGroupSchema],
        achievements: [AchievementSchema],
        contact: ContactSchema,
    },
    {
        timestamps: true,
    }
);

// Generate slug before saving (if not already set)
UserSchema.pre('save', function (this: any) {
    if (!this.slug && this.username) {
        const randomNum = Math.floor(10000 + Math.random() * 90000); // 5-digit random
        this.slug = `${this.username}-${randomNum}`;
    }
});

// Prevent model recompilation in development (Next.js hot reload)
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
