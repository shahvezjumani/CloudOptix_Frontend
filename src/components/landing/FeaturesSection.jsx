import { motion } from 'framer-motion'
import { Tag, Search, Copy, GitBranch, Shield, Sparkles } from 'lucide-react'
import { Section, Container, SectionLabel, SectionHeading, fadeUp } from './shared'

const FEATURES = [
    { icon: Tag, color: '#6c63ff', title: 'Auto Categorization', desc: 'AI reads file content and groups files into smart folders — no manual sorting ever again.' },
    { icon: Search, color: '#06b6d4', title: 'Smart Search', desc: 'Natural-language queries that understand context, synonyms and related concepts.' },
    { icon: Copy, color: '#8b5cf6', title: 'Duplicate Detection', desc: 'Scans for byte-identical and visually similar duplicates to reclaim wasted storage.' },
    { icon: GitBranch, color: '#0ea5e9', title: 'File Versioning', desc: 'Every save creates a snapshot. Roll back to any previous version with one click.' },
    { icon: Shield, color: '#10b981', title: 'Secure Sharing', desc: 'Send time-limited, permission-controlled links with optional password protection.' },
    { icon: Sparkles, color: '#f59e0b', title: 'AI Summaries', desc: 'Get plain-language summaries of long documents, contracts, and reports instantly.' },
]

export default function FeaturesSection() {
    return (
        <Section id="features" className="border-t border-white/[0.04]">
            <Container>
                <SectionLabel>Features</SectionLabel>
                <SectionHeading>Everything Your Team <span className="gradient-text">Actually Needs</span></SectionHeading>
                <motion.p {...fadeUp(0.1)} className="text-white/50 text-center max-w-lg mx-auto mb-16">
                    Purpose-built tools that eliminate busywork and make your files work for you.
                </motion.p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {FEATURES.map(({ icon: Icon, color, title, desc }, i) => (
                        <motion.div key={title} {...fadeUp(i * 0.07)}
                            whileHover={{ y: -6, scale: 1.01 }}
                            className="glass p-6 rounded-2xl border border-white/[0.06] group cursor-default transition-all duration-300"
                        >
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                                style={{ background: `${color}18` }}
                            >
                                <Icon size={22} style={{ color }} />
                            </div>
                            <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                            <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
