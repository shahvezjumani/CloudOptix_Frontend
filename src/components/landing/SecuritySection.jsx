import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Sparkles, Download, CheckCircle2, Lock, AlertTriangle, FileText } from 'lucide-react'
import { Section, Container, fadeUp } from './shared'

const PERMISSIONS = [
    { label: 'View', icon: Eye, enabled: true },
    { label: 'Edit', icon: Sparkles, enabled: false },
    { label: 'Download', icon: Download, enabled: true },
]

function PermissionToggle({ label, icon: Icon, enabled: init }) {
    const [on, setOn] = useState(init)

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-3.5 glass rounded-xl border border-white/[0.07] cursor-pointer select-none"
            onClick={() => setOn(v => !v)}
        >
            <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${on ? 'bg-indigo-500/20' : 'bg-white/[0.04]'}`}>
                    <Icon size={14} className={on ? 'text-indigo-400' : 'text-white/30'} />
                </div>
                <span className={`text-sm font-medium transition-colors duration-300 ${on ? 'text-white' : 'text-white/40'}`}>{label}</span>
            </div>
            <div className={`w-10 h-5 rounded-full transition-all duration-300 relative ${on ? 'bg-indigo-500' : 'bg-white/10'}`}>
                <motion.div
                    animate={{ x: on ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm"
                />
            </div>
        </motion.div>
    )
}

export default function SecuritySection() {
    return (
        <Section id="security" className="border-t border-white/[0.04]">
            <Container>
                <div className="grid lg:grid-cols-2 gap-14 items-center">
                    {/* Left copy */}
                    <div>
                        <div className="flex mb-4">
                            <span className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-white/60 uppercase tracking-widest border border-white/[0.08]">
                                <Sparkles size={11} className="text-purple-400" /> Security & Privacy
                            </span>
                        </div>
                        <motion.h2 {...fadeUp(0.05)} className="text-4xl lg:text-5xl font-extrabold leading-tight mb-5">
                            Share Files with <span className="gradient-text">Confidence</span>
                        </motion.h2>
                        <motion.p {...fadeUp(0.1)} className="text-white/50 leading-relaxed mb-8">
                            Granular permission controls, end-to-end encryption, and AI-powered threat detection keep your data safe at every step.
                        </motion.p>
                        <motion.div {...fadeUp(0.15)} className="flex flex-col gap-3">
                            {['AES-256 encryption at rest', 'Zero-knowledge architecture', 'SOC 2 Type II certified'].map((t) => (
                                <div key={t} className="flex items-center gap-2.5 text-sm text-white/65">
                                    <CheckCircle2 size={15} className="text-green-400 shrink-0" /> {t}
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: interactive panel */}
                    <motion.div {...fadeUp(0.2)}>
                        <div className="glass-strong rounded-2xl border border-white/[0.1] overflow-hidden shadow-2xl shadow-black/30">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] bg-white/[0.03]">
                                <div className="flex items-center gap-2.5">
                                    <Lock size={14} className="text-indigo-400" />
                                    <span className="text-sm font-semibold text-white/80">Share Permissions</span>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/15 text-green-400 font-semibold">Active Link</span>
                            </div>

                            <div className="p-5 flex flex-col gap-3">
                                {/* File being shared */}
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-500/[0.08] border border-indigo-500/20 mb-1">
                                    <div className="w-9 h-9 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                        <FileText size={16} className="text-indigo-400" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-white/90">Contract_2026_Final.pdf</div>
                                        <div className="text-xs text-white/35">1.2 MB · Shared with 3 people</div>
                                    </div>
                                </div>

                                {PERMISSIONS.map((p) => <PermissionToggle key={p.label} {...p} />)}

                                {/* AI Warning */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ delay: 0.5 }}
                                    className="flex items-start gap-2.5 mt-1 p-3.5 rounded-xl bg-yellow-500/[0.08] border border-yellow-500/20"
                                >
                                    <AlertTriangle size={15} className="text-yellow-400 mt-0.5 shrink-0" />
                                    <div>
                                        <div className="text-xs font-semibold text-yellow-300 mb-0.5">AI Security Notice</div>
                                        <div className="text-xs text-white/50 leading-relaxed">
                                            This file contains personally identifiable information. Consider restricting Download access before sharing externally.
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    )
}
