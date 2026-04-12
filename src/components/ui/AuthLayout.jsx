import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Cloud } from 'lucide-react'
import ParticleField from './ParticleField'

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="relative min-h-screen aurora-bg overflow-hidden flex flex-col items-center justify-center px-4 py-12">

            {/* Particle background */}
            <ParticleField count={50} color="#6c63ff" />

            {/* Animated orbs */}
            <div className="orb orb-purple w-96 h-96 top-[-10%] left-[-10%] animate-orb" style={{ animationDelay: '0s' }} />
            <div className="orb orb-cyan   w-80 h-80 bottom-[-5%] right-[-8%] animate-orb" style={{ animationDelay: '-3s' }} />
            <div className="orb orb-pink   w-64 h-64 top-[60%]   left-[60%]  animate-orb" style={{ animationDelay: '-6s' }} />

            {/* Grid overlay */}
            <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

            {/* Card */}
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Logo */}
                <Link to="/" className="flex items-center justify-center gap-2 mb-8 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/40 transition-shadow duration-300">
                        <Cloud className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text-warm">CloudOptix</span>
                </Link>

                {/* Glowing card wrapper */}
                <div className="glow-border rounded-2xl">
                    <div className="glass-strong p-8 rounded-2xl">

                        {/* Header */}
                        <div className="text-center mb-7">
                            <h1 className="text-2xl font-bold text-white mb-1.5">{title}</h1>
                            {subtitle && <p className="text-sm text-white/50">{subtitle}</p>}
                        </div>

                        {children}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default AuthLayout
