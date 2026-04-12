import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { Section, Container, SectionLabel, SectionHeading, fadeUp } from './shared'

const PLANS = [
    { name: 'Starter', price: '$0', period: '/mo', highlight: false, features: ['5 GB storage', '2 users', 'Basic search', 'Auto-categorization'] },
    { name: 'Pro', price: '$19', period: '/mo', highlight: true, features: ['100 GB storage', '10 users', 'Smart AI search', 'Duplicate detection', 'Versioning'] },
    { name: 'Team', price: '$49', period: '/mo', highlight: false, features: ['1 TB storage', 'Unlimited users', 'All Pro features', 'Priority support', 'SSO'] },
]

export default function PricingSection() {
    return (
        <Section id="pricing" className="border-t border-white/[0.04]">
            <Container>
                <SectionLabel>Pricing</SectionLabel>
                <SectionHeading>Simple, <span className="gradient-text">Honest Pricing</span></SectionHeading>
                <motion.p {...fadeUp(0.1)} className="text-white/50 text-center max-w-md mx-auto mb-16">
                    Start free. Scale as your team grows. No hidden fees.
                </motion.p>

                <div className="grid md:grid-cols-3 gap-6 items-center max-w-4xl mx-auto">
                    {PLANS.map(({ name, price, period, highlight, features }, i) => (
                        <motion.div key={name} {...fadeUp(i * 0.1)}
                            className={`relative p-7 rounded-2xl flex flex-col gap-5 border ${highlight
                                    ? 'border-indigo-500/50 bg-gradient-to-b from-indigo-500/10 to-transparent shadow-2xl shadow-indigo-500/10 scale-105'
                                    : 'glass border-white/[0.06]'
                                }`}
                        >
                            {highlight && (
                                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                    <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold text-white whitespace-nowrap">Most Popular</span>
                                </div>
                            )}
                            <div>
                                <div className="text-sm font-medium text-white/50 mb-1">{name}</div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-extrabold text-white">{price}</span>
                                    {period && <span className="text-white/40 text-sm">{period}</span>}
                                </div>
                            </div>
                            <ul className="flex flex-col gap-2.5">
                                {features.map((f) => (
                                    <li key={f} className="flex items-center gap-2 text-sm text-white/65">
                                        <CheckCircle2 size={13} className="text-green-400 shrink-0" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/signup" className="mt-auto">
                                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                    className={`w-full py-2.5 rounded-xl font-semibold text-sm ${highlight ? 'btn-primary' : 'btn-secondary'}`}>
                                    Get Started
                                </motion.button>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    )
}
