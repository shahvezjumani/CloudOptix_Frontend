import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Cloud, Menu, X } from 'lucide-react'
import { Container } from './shared'

const NAV_LINKS = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#howitworks' },
    { label: 'Pricing', href: '#pricing' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24)
        window.addEventListener('scroll', fn)
        return () => window.removeEventListener('scroll', fn)
    }, [])

    return (
        <motion.nav
            initial={{ y: -64, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-black/50 backdrop-blur-2xl border-b border-white/[0.06] shadow-xl shadow-black/20' : 'py-5'
                }`}
        >
            <Container className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/40 transition-shadow duration-300">
                        <Cloud size={18} className="text-white" />
                    </div>
                    <span className="text-lg font-bold gradient-text-warm">CloudOptix</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(({ label, href }) => (
                        <a key={label} href={href} className="nav-link text-sm font-medium">{label}</a>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    <Link to="/login">
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-secondary text-sm py-2 px-5">Log In</motion.button>
                    </Link>
                    <Link to="/signup">
                        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="btn-primary text-sm py-2 px-5">Get Started</motion.button>
                    </Link>
                </div>

                <button className="md:hidden text-white/60 hover:text-white transition-colors" onClick={() => setMobileOpen(o => !o)}>
                    {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </Container>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28 }}
                        className="md:hidden overflow-hidden bg-black/70 backdrop-blur-2xl border-b border-white/[0.06]"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            {NAV_LINKS.map(({ label, href }) => (
                                <a key={label} href={href} className="text-sm text-white/60 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>{label}</a>
                            ))}
                            <div className="flex flex-col gap-2.5 pt-3 border-t border-white/[0.08]">
                                <Link to="/login" onClick={() => setMobileOpen(false)}><button className="btn-secondary w-full text-sm py-2">Log In</button></Link>
                                <Link to="/signup" onClick={() => setMobileOpen(false)}><button className="btn-primary  w-full text-sm py-2">Get Started</button></Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}
