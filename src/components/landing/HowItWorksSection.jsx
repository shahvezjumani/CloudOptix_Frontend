import { motion } from 'framer-motion'
import { Upload, Cpu, Tag, Search } from 'lucide-react'
import { Section, Container, SectionLabel, SectionHeading, fadeUp } from './shared'

const HOW_STEPS = [
    { num: '01', icon: Upload, color: '#6c63ff', title: 'Upload Files', desc: 'Drag & drop any format — PDFs, images, spreadsheets, videos. CloudOptix handles everything.' },
    { num: '02', icon: Cpu, color: '#06b6d4', title: 'AI Analyzes', desc: 'Our models read content, extract metadata, and understand context across every file you upload.' },
    { num: '03', icon: Tag, color: '#8b5cf6', title: 'Auto Categorization', desc: 'Files are instantly sorted into smart collections with auto-generated tags and descriptions.' },
    { num: '04', icon: Search, color: '#0ea5e9', title: 'Smart Search', desc: 'Ask in plain English. Get ranked results in milliseconds — like Google for your own files.' },
]

export default function HowItWorksSection() {
    return (
        <Section id="howitworks">
            <Container>
                <SectionLabel>How It Works</SectionLabel>
                <SectionHeading>Four Steps to <span className="gradient-text">AI-Powered Files</span></SectionHeading>
                <motion.p {...fadeUp(0.1)} className="text-white/50 text-center max-w-lg mx-auto mb-16">
                    From upload to instant retrieval — completely automated.
                </motion.p>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
                    <div className="hidden lg:block absolute top-[3.25rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent z-0" />

                    {HOW_STEPS.map(({ num, icon: Icon, color, title, desc }, i) => (
                        <motion.div key={num} {...fadeUp(i * 0.1)}
                            className="glass feature-card p-6 rounded-2xl border border-white/[0.06] flex flex-col items-center text-center relative z-10"
                        >
                            <div className="relative mb-5">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg" style={{ background: `${color}18`, boxShadow: `0 0 30px ${color}25` }}>
                                    <Icon size={26} style={{ color }} />
                                </div>
                                <span
                                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-black text-white"
                                    style={{ background: `linear-gradient(135deg, ${color}, #00d2ff)` }}
                                >
                                    {num}
                                </span>
                            </div>
                            <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                            <p className="text-sm text-white/50 leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
