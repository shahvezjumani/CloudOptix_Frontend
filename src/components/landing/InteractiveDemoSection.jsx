import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Search, FileText, Image, Sparkles } from 'lucide-react'
import { Section, Container, SectionLabel, SectionHeading, fadeUp } from './shared'
import useTypingEffect from '../../hooks/useTypingEffect'

const DEMO_RESULTS = [
    { icon: FileText, color: '#6c63ff', name: 'FlightTicket_Karachi_Jan.pdf', tag: 'Travel', date: 'Jan 14 2026', size: '312 KB' },
    { icon: FileText, color: '#06b6d4', name: 'FlightTicket_Karachi_Mar.pdf', tag: 'Travel', date: 'Mar 2  2026', size: '289 KB' },
    { icon: Image, color: '#8b5cf6', name: 'Boarding_Pass_KHI_DXB.png', tag: 'Travel', date: 'Mar 2  2026', size: '1.1 MB' },
]

const DEMO_PHRASES = [
    'Show my flight tickets from Karachi',
    'Find invoices from last month',
    'Photos tagged "Dubai trip"',
]

export default function InteractiveDemoSection() {
    const demoText = useTypingEffect(DEMO_PHRASES, 70, 2000)
    const [visible, setVisible] = useState(false)
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    useEffect(() => {
        if (inView) setTimeout(() => setVisible(true), 900)
    }, [inView])

    return (
        <Section id="demo" className="border-t border-white/[0.04]">
            <Container>
                <SectionLabel>Live Demo</SectionLabel>
                <SectionHeading>Ask in <span className="gradient-text">Plain English</span></SectionHeading>
                <motion.p {...fadeUp(0.1)} className="text-white/50 text-center max-w-lg mx-auto mb-14">
                    Type any query like you would ask a colleague — CloudOptix understands context.
                </motion.p>

                <motion.div ref={ref} {...fadeUp(0.15)} className="max-w-2xl mx-auto">
                    <div className="glass-strong rounded-2xl border border-white/[0.1] overflow-hidden shadow-2xl shadow-black/30">
                        {/* Window chrome */}
                        <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.07] bg-white/[0.03]">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                            <span className="ml-3 text-xs text-white/30 font-medium">CloudOptix Search</span>
                        </div>

                        <div className="p-5">
                            {/* Input */}
                            <div className="flex items-center gap-3 bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 mb-5">
                                <Search size={15} className="text-indigo-400 shrink-0" />
                                <span className="text-white/75 text-sm flex-1 text-left h-5 flex items-center">
                                    {demoText}
                                    <span className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 animate-pulse" />
                                </span>
                                <span className="text-[10px] text-white/25 shrink-0">⌘K</span>
                            </div>

                            {/* Results */}
                            <div className="flex flex-col gap-2.5">
                                <AnimatePresence>
                                    {visible && DEMO_RESULTS.map(({ icon: Icon, color, name, tag, date, size }, i) => (
                                        <motion.div key={name}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.18, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                                            whileHover={{ x: 4 }}
                                            className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] cursor-pointer hover:bg-white/[0.04] transition-colors duration-200"
                                        >
                                            <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}18` }}>
                                                <Icon size={18} style={{ color }} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm font-medium text-white/90 truncate">{name}</div>
                                                <div className="text-xs text-white/35 mt-0.5">{date} · {size}</div>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0" style={{ background: `${color}18`, color }}>
                                                {tag}
                                            </span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>

                                {!visible && [0, 1, 2].map((i) => (
                                    <div key={i} className="h-14 rounded-xl bg-white/[0.03] shimmer-effect" />
                                ))}
                            </div>

                            {/* Footer */}
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }} transition={{ delay: 0.8 }}
                                className="mt-4 flex items-center justify-between text-xs text-white/30"
                            >
                                <span>3 results · 0.04s</span>
                                <span className="flex items-center gap-1"><Sparkles size={10} className="text-yellow-400" /> AI-ranked</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </Container>
        </Section>
    )
}
