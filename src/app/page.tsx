'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { HiSparkles, HiTemplate, HiShare, HiPencilAlt, HiArrowRight, HiX, HiCheck, HiStar } from 'react-icons/hi';
import { FaUserCircle, FaQuoteLeft } from 'react-icons/fa';
import { FaRocket, FaPalette, FaColumns, FaTerminal, FaGem } from 'react-icons/fa';

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
  {
    id: 'futuristic',
    name: 'Futuristic',
    icon: <FaTerminal className="text-2xl" />,
    color: 'from-[#00f0ff] to-[#ff003c]',
    tagline: 'Cyberpunk & Interactive',
    description: 'A neon-glowing, high-tech, cyberpunk-inspired theme with terminal vibes. Perfect for developers looking to make an impact with raw code aesthetics.',
    why: [
      'Neon glowing text and borders with a dark theme',
      'Cyberpunk color palette (cyan and pink)',
      'Digital grid and terminal-inspired UI',
      'Sleek framer motion scrolling animations',
      'Highly memorable, bold developer identity',
    ],
    preview: {
      bg: 'bg-[#050505]',
      accent: '#00f0ff',
    },
  },
  {
    id: 'sleek',
    name: 'Sleek',
    icon: <FaGem className="text-2xl" />,
    color: 'from-[#111827] to-[#4B5563]',
    tagline: 'Modern Glassmorphism',
    description: 'A premium, black-and-white minimalist template with soft glassmorphism effects, gorgeous oversized typography, and incredibly smooth scroll reveals.',
    why: [
      'Premium glassmorphism effects and blurs',
      'Elegant, oversized typography',
      'Smooth scroll-based fade ins',
      'Refined B&W aesthetics',
      'Perfect for modern designers and engineers',
    ],
    preview: {
      bg: 'bg-[#FAF9F6]',
      accent: '#111827',
    },
  },
];

const features = [
  {
    icon: <HiTemplate className="text-3xl" />,
    title: '5 Stunning Templates',
    description: 'Choose from Minimal, Creative, Sidebar, Futuristic, or Sleek layouts — each uniquely designed to showcase your work.',
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

const ReviewCard = ({ rev, i }: { rev: any; i: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.1 }}
    className="p-6 rounded-2xl bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-[#3B3B52]/50 shadow-sm hover:shadow-md transition-all group h-full"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-full bg-[#6C63FF]/10 flex items-center justify-center text-[#6C63FF]">
        <FaUserCircle className="text-2xl" />
      </div>
      <div>
        <h4 className="font-bold text-sm text-gray-900 dark:text-white">{rev.username}</h4>
        <div className="flex text-yellow-400 text-xs">
          {[...Array(5)].map((_, idx) => (
            <HiStar key={idx} className={idx < rev.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-600'} />
          ))}
        </div>
      </div>
      {rev.isSuggestion && (
        <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border border-blue-200 dark:border-blue-500/30 font-[Poppins]">
          Suggestion
        </span>
      )}
    </div>
    <div className="relative">
      <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-100 dark:text-gray-800 text-3xl z-0" />
      <p className="relative z-10 text-gray-600 dark:text-gray-400 text-sm italic leading-relaxed">
        &quot;{rev.comment}&quot;
      </p>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const { user } = useAuth();
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSuggestion, setIsSuggestion] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment) return;
    setSubmitting(true);
    setMsg('');
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, isSuggestion }),
      });
      if (res.ok) {
        setMsg('Thanks for your feedback!');
        setComment('');
        setRating(0);
        setIsSuggestion(false);
        fetchReviews();
        setTimeout(() => setMsg(''), 5000);
      } else {
        setMsg('Failed to submit. Please try again.');
      }
    } catch (err) {
      setMsg('Error submitting review.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0F0F1A] transition-colors duration-300">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6C63FF]/10 rounded-full blur-[128px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#06B6D4]/10 rounded-full blur-[128px] animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F59E0B]/5 rounded-full blur-[128px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(108,99,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(108,99,255,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(108,99,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(108,99,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

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

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-[Poppins] leading-tight mb-6 text-gray-900 dark:text-white">
              Create Your Professional
              <br />
              <span className="gradient-text">Portfolio in Minutes</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
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
              <a
                href="#templates"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-8 py-4 rounded-2xl font-medium border border-gray-200 dark:border-[#3B3B52] hover:border-[#6C63FF]/50 transition-all"
              >
                Browse Templates
              </a>
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
            <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4 text-gray-900 dark:text-white">
              Everything You Need to <span className="gradient-text">Stand Out</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
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
                className="group p-6 rounded-2xl bg-white/50 dark:bg-[#1E1E2E]/50 border border-gray-200 dark:border-[#3B3B52]/50 hover:border-[#6C63FF]/30 transition-all hover:bg-white dark:hover:bg-[#1E1E2E] shadow-sm hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#6C63FF]/20 to-[#06B6D4]/20 flex items-center justify-center text-[#6C63FF] mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold font-[Poppins] mb-2 text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4 text-gray-900 dark:text-white">
              Choose Your <span className="gradient-text">Template</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Five uniquely designed templates — each crafted to make your portfolio shine.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="group relative"
              >
                <div className="rounded-2xl border border-gray-200 dark:border-[#3B3B52]/50 bg-white dark:bg-[#1E1E2E]/50 overflow-hidden hover:border-[#6C63FF]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#6C63FF]/10 shadow-sm">
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
                        <h3 className="text-lg font-bold font-[Poppins] text-gray-900 dark:text-white">{template.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{template.tagline}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>

                    {/* Why Choose Section */}
                    <div className="mb-5">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-300 uppercase tracking-wider mb-3">
                        Why Choose This Template
                      </h4>
                      <ul className="space-y-2">
                        {template.why.map((reason, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
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

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-gray-50/50 dark:bg-[#0F0F1A]/50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-4 text-gray-900 dark:text-white">
              What Our <span className="gradient-text">Users Say</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Real feedback from students and professionals using CareerCanvas.
            </p>
          </motion.div>

          <div className="mb-16 pb-10 overflow-hidden relative">
            {reviews.length > 0 ? (
              reviews.length > 4 ? (
                /* Scrolling Marquee for > 4 reviews */
                <div className="pause-on-hover">
                  <div className="animate-marquee gap-8 py-4">
                    {[...reviews, ...reviews].map((rev, i) => (
                      <div key={`${rev._id}-${i}`} className="w-[350px] flex-shrink-0">
                        <ReviewCard rev={rev} i={i} />
                      </div>
                    ))}
                  </div>
                  {/* Gradient masks for smooth edges */}
                  <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-[#0F0F1A] to-transparent z-10" />
                  <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-[#0F0F1A] to-transparent z-10" />
                </div>
              ) : (
                /* Static Grid for <= 4 reviews */
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${reviews.length} gap-8`}>
                  {reviews.map((rev, i) => (
                    <ReviewCard key={rev._id} rev={rev} i={i} />
                  ))}
                </div>
              )
            ) : (
              <div className="text-center text-gray-500 py-10">
                Be the first to share your experience!
              </div>
            )}
          </div>

          {/* Review Form (Only for logged in users) */}
          {user ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-[#3B3B52]/50 shadow-xl"
            >
              <h3 className="text-2xl font-bold font-[Poppins] mb-6 text-center text-gray-900 dark:text-white">Share Your <span className="gradient-text">Feedback</span></h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rating:</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className={`text-2xl transition-colors ${s <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                        >
                          <HiStar className="fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSuggestion}
                      onChange={(e) => setIsSuggestion(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-[#6C63FF] focus:ring-[#6C63FF]"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">This is a suggestion</span>
                  </label>
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="How was your experience? Any suggestions for improvement?"
                  rows={4}
                  className="w-full bg-gray-50 dark:bg-[#0F0F1A] border border-gray-200 dark:border-[#3B3B52] rounded-2xl px-5 py-4 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6C63FF]/50 transition-all resize-none"
                  required
                />

                <div className="flex flex-col items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-12 py-4 rounded-2xl bg-gradient-to-r from-[#6C63FF] to-[#06B6D4] text-white font-bold hover:opacity-90 transition-all shadow-lg shadow-[#6C63FF]/25 disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Post Feedback'}
                  </button>
                  {msg && (
                    <p className={`text-sm font-medium ${msg.includes('Thanks') ? 'text-green-500' : 'text-red-500'}`}>
                      {msg}
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="text-center">
              <p className="text-gray-500 mb-4">Want to leave a review or suggestion?</p>
              <Link href="/login" className="text-[#6C63FF] font-bold hover:underline">Log in to share your thoughts</Link>
            </div>
          )}
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
            <h2 className="text-3xl sm:text-4xl font-bold font-[Poppins] mb-6 text-gray-900 dark:text-white">
              Ready to Build Your <span className="gradient-text">Portfolio</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg">
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
  const { user } = useAuth();
  const template = templates.find((t) => t.id === templateId);
  if (!template) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 dark:bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl max-h-[95vh] rounded-3xl overflow-hidden bg-white dark:bg-[#1E1E2E] border border-gray-200 dark:border-[#3B3B52]/70 flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200 dark:border-[#3B3B52]/50 shrink-0">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${template.color} flex items-center justify-center text-white shadow-lg`}>
              {template.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold font-[Poppins] text-gray-900 dark:text-white leading-none mb-1">{template.name} Template</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{template.tagline}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-[#2A2A3E] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-[#3B3B52] transition-colors"
          >
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 relative bg-gray-100 dark:bg-black min-h-[400px]">
          <TemplatePreviewContent templateId={templateId} />
        </div>

        {/* Modal Footer */}
        <div className="px-8 py-6 border-t border-gray-200 dark:border-[#3B3B52]/50 flex items-center justify-between shrink-0 bg-gray-50/50 dark:bg-[#1E1E2E]/80 backdrop-blur-md">
          <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
            {user ? 'Ready to use this template?' : 'Sign up to use this template'}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3.5 rounded-2xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-semibold"
            >
              Cancel
            </button>
            <Link
              href={user ? "/dashboard" : "/signup"}
              className={`px-10 py-4 rounded-2xl bg-gradient-to-r ${template.color} text-white font-bold text-base hover:opacity-90 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-[#6366F1]/20 flex-shrink-0 flex items-center gap-2`}
            >
              {user ? 'Go to Dashboard' : 'Use This Template'}
              <HiArrowRight className="text-xl" />
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TemplatePreviewContent({ templateId }: { templateId: string }) {
  return (
    <iframe
      src={`/preview/${templateId}`}
      className="absolute inset-0 w-full h-full border-none"
      title={`${templateId} preview`}
    />
  );
}
