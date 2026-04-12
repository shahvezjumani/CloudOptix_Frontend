import { motion, AnimatePresence } from 'framer-motion'

export default function FormError({ error, className = '' }) {
    return (
        <AnimatePresence>
            {error && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5 text-center ${className}`}
                >
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
