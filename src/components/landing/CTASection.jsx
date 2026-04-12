import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import { Section, Container, fadeUp, fadeIn } from './shared'

export default function CTASection() {
    return (
        <Section className="border-t border-white/[0.04]">
            <Container>
                <motion.div {...fadeUp()}
                    className="relative glass rounded-3xl p-14 border border-white/[0.08] text-center overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/8 to-cyan-500/8 rounded-3xl pointer-events-none" />
                    <div className="orb orb-purple w-80 h-80 -top-20 -left-20 animate-orb opacity-60" />
                    <div className="orb orb-cyan   w-60 h-60 -bottom-10 -right-10 animate-orb opacity-50" style={{ animationDelay: '-4s' }} />

                    <div className="relative z-10">
                        <motion.div {...fadeIn(0.05)} className="flex justify-center mb-6">
                            <span className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-white/50 uppercase tracking-widest border border-white/[0.08]">
                                <Sparkles size={11} className="text-yellow-400" /> Free Forever Plan Available
                            </span>
                        </motion.div>

                        <motion.h2 {...fadeUp(0.05)} className="text-5xl lg:text-6xl font-extrabold mb-5 leading-tight">
                            Stop Managing Files.<br className="hidden sm:block" />
                            {' '}<span className="gradient-text">Let AI Do It.</span>
                        </motion.h2>

                        <motion.p {...fadeUp(0.1)} className="text-white/50 text-lg mb-10 max-w-lg mx-auto">
                            Join 10,000+ teams that have automated their file chaos with CloudOptix.
                        </motion.p>

                        <motion.div {...fadeUp(0.15)} className="flex flex-wrap items-center justify-center gap-4">
                            <Link to="/signup">
                                <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                                    className="btn-primary flex items-center gap-2 py-4 px-9 text-base">
                                    Start Free <ArrowRight size={18} />
                                </motion.button>
                            </Link>
                            <a href="mailto:hello@cloudoptix.io">
                                <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}
                                    className="btn-secondary flex items-center gap-2 py-4 px-9 text-base">
                                    <Mail size={16} /> Talk to Sales
                                </motion.button>
                            </a>
                        </motion.div>

                        <motion.p {...fadeUp(0.2)} className="text-white/30 text-sm mt-7">
                            No credit card required · Up and running in 2 minutes · Cancel any time
                        </motion.p>
                    </div>
                </motion.div>
            </Container>
        </Section>
    )
}
