import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
})

export const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { duration: 0.7, delay },
})

export const Section = ({ id, className = '', children }) => (
    <section id={id} className={`relative z-10 py-24 ${className}`}>{children}</section>
)

export const Container = ({ children, className = '' }) => (
    <div className={`max-w-7xl mx-auto px-6 ${className}`}>{children}</div>
)

export const SectionLabel = ({ children }) => (
    <motion.div {...fadeIn(0)} className="flex justify-center mb-4">
        <span className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-white/60 uppercase tracking-widest border border-white/[0.08]">
            <Sparkles size={11} className="text-purple-400" />
            {children}
        </span>
    </motion.div>
)

export const SectionHeading = ({ children, className = '' }) => (
    <motion.h2 {...fadeUp(0.05)} className={`text-4xl lg:text-5xl font-extrabold text-center leading-tight mb-4 ${className}`}>
        {children}
    </motion.h2>
)
