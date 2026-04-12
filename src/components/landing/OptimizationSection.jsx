import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Copy, HardDrive, Tag, TrendingDown } from 'lucide-react'
import { Section, Container, SectionLabel, SectionHeading, fadeUp } from './shared'
import useCounter from '../../hooks/useCounter'

const STATS = [
    { target: 12, suffix: '', label: 'Duplicate Files Found', sublabel: 'Detected on first scan', color: '#6c63ff', icon: Copy, delay: 0 },
    { target: 150, suffix: 'MB', label: 'Storage Saved', sublabel: 'Avg. per 1,000 files', color: '#06b6d4', icon: HardDrive, delay: 0.1 },
    { target: 98, suffix: '%', label: 'Categorization Accuracy', sublabel: 'vs. manual tagging benchmarks', color: '#8b5cf6', icon: Tag, delay: 0.2 },
    { target: 40, suffix: '%', label: 'Time Saved Searching', sublabel: 'Self-reported by users', color: '#10b981', icon: TrendingDown, delay: 0.3 },
]

function StatCard({ target, suffix = '', label, sublabel, color, icon: Icon, delay: d }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const count = useCounter(target, 1800, inView)

    return (
        <motion.div ref={ref} {...fadeUp(d)} className="glass feature-card p-6 rounded-2xl border border-white/[0.06] text-center">
            <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center" style={{ background: `${color}18` }}>
                <Icon size={22} style={{ color }} />
            </div>
            <div className="text-4xl font-extrabold mb-1" style={{ color }}>{count}{suffix}</div>
            <div className="text-white font-semibold text-sm mb-1">{label}</div>
            <div className="text-xs text-white/40">{sublabel}</div>
        </motion.div>
    )
}

export default function OptimizationSection() {
    return (
        <Section id="optimization" className="border-t border-white/[0.04]">
            <Container>
                <SectionLabel>Optimization</SectionLabel>
                <SectionHeading>Real Results, <span className="gradient-text">Real Savings</span></SectionHeading>
                <motion.p {...fadeUp(0.1)} className="text-white/50 text-center max-w-lg mx-auto mb-16">
                    Measurable impact from the moment you connect your storage.
                </motion.p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {STATS.map((s) => <StatCard key={s.label} {...s} />)}
                </div>
            </Container>
        </Section>
    )
}
