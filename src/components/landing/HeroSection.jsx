import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Play, CheckCircle2, FileText, Image, File } from 'lucide-react'
import ParticleField from '../ui/ParticleField'
import { Container } from './shared'
import useTypingEffect, { TYPING_PHRASES } from '../../hooks/useTypingEffect'

/* ─── Floating file cards ──────────────────────────────── */
const FILE_CARDS = [
    { icon: FileText, color: '#6c63ff', name: 'Resume_2026.pdf', type: 'PDF', size: '245 KB', top: '8%', left: '72%', delay: 0 },
    { icon: Image, color: '#06b6d4', name: 'Trip_Karachi.jpg', type: 'IMG', size: '3.2 MB', top: '38%', left: '80%', delay: 0.4 },
    { icon: File, color: '#8b5cf6', name: 'Invoice_March.xlsx', type: 'XLSX', size: '128 KB', top: '65%', left: '68%', delay: 0.2 },
    { icon: FileText, color: '#0ea5e9', name: 'Contract_2026.docx', type: 'DOC', size: '512 KB', top: '20%', left: '62%', delay: 0.6 },
    { icon: Image, color: '#10b981', name: 'Brand_Assets.png', type: 'PNG', size: '1.8 MB', top: '55%', left: '85%', delay: 0.8 },
]

function FloatingFileCards() {
    return (
        <div className="absolute inset-0 pointer-events-none hidden lg:block">
            {FILE_CARDS.map(({ icon: Icon, color, name, type, size, top, left, delay }) => (
                <motion.div
                    key={name}
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.8 + delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{ top, left, position: 'absolute' }}
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4 + delay * 0.8, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.5 }}
                        className="glass p-3 rounded-xl shadow-xl border border-white/[0.08] flex items-center gap-2.5 w-44"
                    >
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}20` }}>
                            <Icon size={16} style={{ color }} />
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs font-semibold text-white/90 truncate">{name}</div>
                            <div className="text-[10px] text-white/40">{type} · {size}</div>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    )
}

/* ─── Hero ─────────────────────────────────────────────── */
export default function HeroSection() {
    const typedText = useTypingEffect(TYPING_PHRASES)

    return (
        <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
            <ParticleField count={55} color="#6c63ff" />
            <FloatingFileCards />
            <div className="orb orb-purple w-[700px] h-[700px] top-[-200px] left-[-200px] animate-orb" />
            <div className="orb orb-cyan w-[500px] h-[500px] top-[30%] right-[-150px] animate-orb" style={{ animationDelay: '-5s' }} />

            <Container className="relative z-10">
                <div className="max-w-3xl mx-auto text-center lg:text-left lg:mx-0">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-white/60">Now with <span className="text-white font-semibold">GPT-4o</span> file intelligence</span>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
                    >
                        Your Files,{' '}
                        <span className="gradient-text">Organized by AI.</span>
                        <br />
                        <span className="text-white/90">Instantly.</span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
                        className="text-lg text-white/55 leading-relaxed mb-9 max-w-xl lg:mx-0 mx-auto"
                    >
                        CloudOptix automatically categorises, tags and retrieves your files using natural language so you spend less time searching and more time building.
                    </motion.p>

                    {/* Animated search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
                        className="relative mb-9 max-w-xl lg:mx-0 mx-auto"
                    >
                        <div className="glass-strong glow-border rounded-2xl p-1">
                            <div className="flex items-center gap-3 bg-white/[0.04] rounded-xl px-4 py-3.5">
                                <Search size={17} className="text-purple-400 shrink-0" />
                                <span className="text-white/80 text-base font-medium flex-1 text-left h-6 flex items-center">
                                    {typedText}
                                    <span className="inline-block w-0.5 h-5 bg-purple-400 ml-0.5 animate-pulse" />
                                </span>
                                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-primary text-sm py-1.5 px-4 shrink-0">
                                    Search
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-wrap gap-4 lg:justify-start justify-center mb-10"
                    >
                        <Link to="/signup">
                            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="btn-primary flex items-center gap-2 py-3.5 px-7 text-base">
                                Get Started Free <ArrowRight size={18} />
                            </motion.button>
                        </Link>
                        <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="btn-secondary flex items-center gap-2 py-3.5 px-7 text-base">
                            <div className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center">
                                <Play size={8} className="ml-0.5 fill-white text-white" />
                            </div>
                            Watch Demo
                        </motion.button>
                    </motion.div>

                    {/* Trust row */}
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                        className="flex flex-wrap items-center gap-5 lg:justify-start justify-center"
                    >
                        {['No credit card', 'Free 14-day trial', 'Cancel anytime'].map((t) => (
                            <div key={t} className="flex items-center gap-1.5 text-sm text-white/45">
                                <CheckCircle2 size={13} className="text-green-400" /> {t}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </Container>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1 h-1.5 rounded-full bg-white/40" />
                </div>
            </motion.div>
        </section>
    )
}
