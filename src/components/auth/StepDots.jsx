import { motion } from 'framer-motion'

/** Animated step-progress dots for multi-step forms. */
export default function StepDots({ steps, current }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2 mb-7"
        >
            {steps.map((_, i) => (
                <div
                    key={i}
                    className={`rounded-full transition-all duration-500 ${
                        i === current
                            ? 'w-8 h-2 bg-gradient-to-r from-purple-500 to-cyan-500'
                            : i < current
                                ? 'w-2 h-2 bg-purple-500/50'
                                : 'w-2 h-2 bg-white/15'
                    }`}
                />
            ))}
        </motion.div>
    )
}
