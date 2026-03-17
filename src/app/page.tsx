'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HiSparkles, HiTemplate, HiShare, HiPencilAlt, HiArrowRight, HiX, HiCheck } from 'react-icons/hi';
import { FaRocket, FaPalette, FaColumns } from 'react-icons/fa';

const templates = [
  {
    id: 'minimal',
    name: 'Minimal',
    icon: <FaRocket className="text-2xl" />,
    color: 'from-[#00b8d4] to-[#00e5ff]',
    tagline: 'Clean & Professional',
    description: 'A clean, recruiter-friendly portfolio with a top navigation bar, dark/light theme toggle, and teal accent colors. Perfect for making a strong first impression.',
    why: [
      'Recruiter-friendly design that highlights your skills',
      'Dark/light theme toggle for versatility',
      'Timeline-based education section',
      'Categorized skill cards with icons',
      'Smooth scroll and floating animations',
    ],
    preview: {
      bg: 'bg-[#0a0a0a]',
      accent: '#00b8d4',
    },
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: <FaPalette className="text-2xl" />,
    color: 'from-[#8B5CF6] to-[#EC4899]',
    tagline: 'Bold & Artistic',
    description: 'A vibrant portfolio with animated gradients, glassmorphism cards, and bold typography. Perfect for designers, artists, and creative professionals.',
    why: [
      'Animated gradient backgrounds and floating particles',
      'Glassmorphism card design with hover effects',
      'Bold color scheme (purple → pink → orange)',
      'Masonry-style project grid',
      'Smooth reveal animations on scroll',
    ],
    preview: {
      bg: 'bg-[#0F0118]',
      accent: '#8B5CF6',
    },
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    icon: <FaColumns className="text-2xl" />,
    color: 'from-[#F59E0B] to-[#EF4444]',
    tagline: 'Premium & Elegant',
    description: 'A sophisticated layout with a fixed left sidebar navigation, premium dark palette with gold accents. Perfect for senior professionals and executives.',
    why: [
      'Fixed sidebar with profile photo and navigation',
      'Premium dark palette with gold accents',
      'Elegant card-based section layouts',
      'Smooth section scroll transitions',
      'Professional and executive feel',
    ],
    preview: {
      bg: 'bg-[#1a1a2e]',
      accent: '#F59E0B',
    },
  },
];

const features = [
  {
    icon: <HiTemplate className="text-3xl" />,
    title: '3 Stunning Templates',
    description: 'Choose from Minimal, Creative, or Sidebar layouts — each uniquely designed to showcase your work.',
  },
  {
    icon: <HiPencilAlt className="text-3xl" />,
    title: 'Easy Form Builder',
    description: 'Fill in your details through a structured, accordion-based form. Add education, projects, skills, and more.',
  },
  {
    icon: <HiShare className="text-3xl" />,
    title: 'Shareable Portfolio URL',
    description: 'Get a unique portfolio URL you can share with recruiters, colleagues, and on social media.',
  },
  {
    icon: <HiSparkles className="text-3xl" />,
    title: 'Beautiful Animations',
    description: 'Smooth Framer Motion animations, hover effects, and transitions make your portfolio come alive.',
  },
];

export default function LandingPage() {
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0F0F1A]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[128px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/5 rounded-full blur-[128px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(108,99,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(108,99,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#6C63FF]/10 border border-[#6C63FF]/20 rounded-full px-5 py-2 mb-8"
            >
              <HiSparkles className="text-[#6C63FF]" />
              <span className="text-sm text-[#6C63FF] font-medium">Build. Customize. Share.</span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[Poppins] leading-tight mb-6">
              Create Your Professional
              <br />
              <span className="gradient-text">Portfolio in Minutes</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Choose from beautiful templates, fill in your details, and get a stunning
              portfolio website with a shareable link — no coding required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/signup"
                className="group flex items-center gap-2 bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all shadow-xl shadow-[#6C63FF]/25 hover:shadow-[#6C63FF]/40"
              >
                Get Started Free
                <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#templates"
                className="flex items-center gap-2 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-medium border border-[#3B3B52] hover:border-[#6C63FF]/50 transition-all"
              >
                Browse Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4">
              Everything You Need to <span className="gradient-text">Stand Out</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              From template selection to portfolio sharing — we&apos;ve got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 rounded-2xl bg-[#1E1E2E]/50 border border-[#3B3B52]/50 hover:border-[#6C63FF]/30 transition-all hover:bg-[#1E1E2E]"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6C63FF]/20 to-[#06B6D4]/20 flex items-center justify-center text-[#6C63FF] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold font-[Poppins] mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#6C63FF]/5 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4">
              Choose Your <span className="gradient-text">Template</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Three uniquely designed templates — each crafted to make your portfolio shine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative"
              >
                <div className="rounded-2xl border border-[#3B3B52]/50 bg-[#1E1E2E]/50 overflow-hidden hover:border-[#6C63FF]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#6C63FF]/10">
                  {/* Template Preview Area */}
                  <div className={`h-48 ${template.preview.bg} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-24 h-24 rounded-2xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white opacity-80 group-hover:scale-110 transition-transform`}>
                        {template.icon}
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className={`absolute top-4 left-4 w-20 h-2 rounded bg-gradient-to-r ${template.color} opacity-30`} />
                    <div className="absolute top-4 right-4 w-8 h-8 rounded-full border-2 border-white/10" />
                    <div className="absolute bottom-4 left-4 right-4 h-2 bg-white/5 rounded" />
                  </div>

                  {/* Template Info */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white`}>
                        {template.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold font-[Poppins]">{template.name}</h3>
                        <p className="text-xs text-gray-400">{template.tagline}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                      {template.description}
                    </p>

                    {/* Why Choose Section */}
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-3">
                        Why Choose This Template
                      </h4>
                      <ul className="space-y-2">
                        {template.why.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-400">
                            <HiCheck className="text-[#10B981] mt-0.5 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => setPreviewTemplate(template.id)}
                      className={`w-full py-3 rounded-xl bg-gradient-to-r ${template.color} text-white font-semibold text-sm hover:opacity-90 transition-all shadow-lg`}
                    >
                      Preview Template
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-6">
              Ready to Build Your <span className="gradient-text">Portfolio</span>?
            </h2>
            <p className="text-gray-400 mb-10 text-lg">
              Join students who are already showcasing their work with CareerCanvas.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition-all shadow-xl shadow-[#6C63FF]/25"
            >
              Get Started — It&apos;s Free
              <HiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Template Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <TemplatePreviewModal
            templateId={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TemplatePreviewModal({ templateId, onClose }: { templateId: string; onClose: () => void }) {
  const template = templates.find((t) => t.id === templateId);
  if (!template) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden bg-[#1E1E2E] border border-[#3B3B52]/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3B3B52]/50">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white`}>
              {template.icon}
            </div>
            <div>
              <h3 className="font-bold font-[Poppins]">{template.name} Template</h3>
              <p className="text-xs text-gray-400">{template.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-[#2A2A3E] flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#3B3B52] transition-colors"
          >
            <HiX className="text-xl" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          <TemplatePreviewContent templateId={templateId} />
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#3B3B52]/50 flex items-center justify-between">
          <p className="text-sm text-gray-400">
            Sign up to use this template
          </p>
          <Link
            href="/signup"
            className={`px-6 py-2.5 rounded-xl bg-gradient-to-r ${template.color} text-white font-semibold text-sm hover:opacity-90 transition-all`}
          >
            Use This Template
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TemplatePreviewContent({ templateId }: { templateId: string }) {
  if (templateId === 'minimal') {
    return (
      <div className="bg-[#0a0a0a] text-white p-8">
        {/* Mini Navbar */}
        <div className="flex items-center justify-between mb-16 pb-4 border-b border-[#2d2d2d]">
          <span className="text-xl font-bold">John<span className="text-[#00b8d4]">.</span></span>
          <div className="flex gap-6 text-sm text-gray-400">
            <span className="hover:text-[#00b8d4] cursor-pointer">Home</span>
            <span className="hover:text-[#00b8d4] cursor-pointer">About</span>
            <span className="hover:text-[#00b8d4] cursor-pointer">Projects</span>
            <span className="hover:text-[#00b8d4] cursor-pointer">Skills</span>
            <span className="hover:text-[#00b8d4] cursor-pointer">Contact</span>
          </div>
        </div>
        {/* Hero */}
        <div className="flex items-center gap-12 mb-16">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-3">John Doe</h1>
            <h2 className="text-xl text-[#00b8d4] font-semibold mb-3">Full Stack Developer</h2>
            <p className="text-gray-400 mb-6">A passionate developer with interests in web development, data science, and creating impactful solutions.</p>
            <div className="flex gap-3">
              <div className="px-5 py-2 bg-gradient-to-r from-[#00b8d4] to-[#00e5ff] rounded text-sm font-semibold text-black">Get In Touch</div>
            </div>
          </div>
          <div className="w-40 h-40 rounded-xl bg-gradient-to-br from-[#00b8d4] to-[#00e5ff] flex items-center justify-center text-4xl">👤</div>
        </div>
        {/* Skills Preview */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {['Frontend', 'Backend', 'Tools'].map((cat) => (
            <div key={cat} className="p-4 rounded-xl bg-[#1a1a1a] border border-[#2d2d2d]">
              <h4 className="text-[#00b8d4] font-semibold mb-3 text-center text-sm">{cat}</h4>
              <div className="space-y-2">
                {['React', 'Node.js', 'Git'].map((s) => (
                  <div key={s} className="text-xs px-3 py-1.5 bg-[#00b8d4]/10 rounded text-gray-300">{s}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (templateId === 'creative') {
    return (
      <div className="bg-[#0F0118] text-white p-8 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#8B5CF6]/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#EC4899]/20 rounded-full blur-[80px]" />
        {/* Hero */}
        <div className="text-center mb-16 relative z-10">
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] mx-auto mb-6 flex items-center justify-center text-3xl">👤</div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] bg-clip-text text-transparent">Jane Creative</h1>
          <p className="text-[#EC4899] text-lg font-medium mb-4">UI/UX Designer & Developer</p>
          <p className="text-gray-400 max-w-md mx-auto text-sm">Creating beautiful digital experiences that merge art with functionality.</p>
        </div>
        {/* Projects */}
        <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
          {['Design System', 'Mobile App', 'SaaS Platform', 'Portfolio'].map((p) => (
            <div key={p} className="p-4 rounded-2xl bg-white/5 backdrop-blur border border-white/10 hover:border-[#8B5CF6]/30 transition-all">
              <div className="h-20 rounded-xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#EC4899]/20 mb-3" />
              <h4 className="font-semibold text-sm">{p}</h4>
              <p className="text-xs text-gray-400 mt-1">React • TypeScript • Figma</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (templateId === 'sidebar') {
    return (
      <div className="flex bg-[#1a1a2e] text-white">
        {/* Sidebar */}
        <div className="w-56 bg-[#16162a] p-6 border-r border-[#2a2a45] min-h-[400px]">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#F59E0B] to-[#EF4444] mx-auto mb-4 flex items-center justify-center text-2xl">👤</div>
          <h3 className="text-center font-bold text-sm mb-1">Alex Premium</h3>
          <p className="text-center text-[#F59E0B] text-xs mb-6">Senior Engineer</p>
          <div className="space-y-3">
            {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
              <div key={item} className="text-xs text-gray-400 hover:text-[#F59E0B] cursor-pointer py-1.5 px-3 rounded-lg hover:bg-[#F59E0B]/10 transition-all">{item}</div>
            ))}
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-2">Alex Premium</h1>
          <p className="text-[#F59E0B] font-medium mb-4">Senior Software Engineer</p>
          <p className="text-gray-400 text-sm mb-8">Building scalable systems with 8+ years of experience in distributed computing and cloud architecture.</p>
          <div className="grid grid-cols-2 gap-4">
            {['Google', 'Amazon', 'Microsoft', 'Meta'].map((c) => (
              <div key={c} className="p-4 rounded-xl bg-[#16162a] border border-[#2a2a45]">
                <h4 className="text-[#F59E0B] font-semibold text-sm">{c}</h4>
                <p className="text-xs text-gray-400 mt-1">Senior Engineer • 2020-Present</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
}
