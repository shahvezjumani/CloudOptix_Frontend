import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { Section, Container, SectionLabel, SectionHeading, fadeUp } from './shared'

const TESTIMONIALS = [
    { name: 'Aisha Siddiqui', role: 'Head of Ops, LaunchPad', text: '"We recovered 2 GB of duplicates on day one. The AI tagging alone saves our team hours every week."', avatar: 'AS' },
    { name: 'Marco Ricci', role: 'CTO, NovaTech', text: '"Natural-language search is genuinely magical. Our legal team can find anything in seconds."', avatar: 'MR' },
    { name: 'Sara Williams', role: 'Founder, ClearEdge', text: '"Onboarding took 5 minutes. The auto-categories were 95% accurate right out of the box."', avatar: 'SW' },
]

export default function TestimonialsSection() {
    return (
        <Section className="border-t border-white/[0.04]">
            <Container>
                <SectionLabel>Testimonials</SectionLabel>
                <SectionHeading>Loved by <span className="gradient-text">10,000+ Teams</span></SectionHeading>
                <div className="grid md:grid-cols-3 gap-5 mt-14">
                    {TESTIMONIALS.map(({ name, role, text, avatar }, i) => (
                        <motion.div key={name} {...fadeUp(i * 0.1)} whileHover={{ y: -6 }}
                            className="glass feature-card p-6 rounded-2xl border border-white/[0.06]"
                        >
                            <div className="flex gap-0.5 mb-4">
                                {[...Array(5)].map((_, j) => <Star key={j} size={13} className="text-yellow-400 fill-yellow-400" />)}
                            </div>
                            <p className="text-sm text-white/65 leading-relaxed mb-5 italic">{text}</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/40 to-cyan-500/40 flex items-center justify-center text-xs font-bold">
                                    {avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-white">{name}</div>
                                    <div className="text-xs text-white/40">{role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
