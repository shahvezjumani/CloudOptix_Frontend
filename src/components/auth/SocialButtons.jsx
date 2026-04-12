import { Globe, GitFork } from 'lucide-react'
import { motion } from 'framer-motion'

const PROVIDERS = [
    { Icon: Globe, label: 'Google' },
    { Icon: GitFork, label: 'GitHub' },
]

const btnVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
}

export default function SocialButtons({ dividerLabel = 'or continue with email' }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-3 mb-6">
                {PROVIDERS.map(({ Icon, label }, i) => (
                    <motion.button
                        key={label}
                        custom={i}
                        initial="hidden"
                        animate="visible"
                        variants={btnVariants}
                        whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                        whileTap={{ scale: 0.98 }}
                        type="button"
                        className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium text-white/70 hover:text-white border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-200"
                    >
                        <Icon size={15} /> {label}
                    </motion.button>
                ))}
            </div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="flex items-center gap-3 mb-5"
            >
                <div className="flex-1 h-px bg-white/8" />
                <span className="text-xs text-white/30">{dividerLabel}</span>
                <div className="flex-1 h-px bg-white/8" />
            </motion.div>
        </>
    )
}
