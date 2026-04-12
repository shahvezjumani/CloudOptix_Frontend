import { motion } from 'framer-motion'

export default function SubmitButton({ loading, loadingText, children, disabled, className = '', ...motionProps }) {
    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            {...motionProps}
            type="submit"
            disabled={loading || disabled}
            className={`btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
        >
            {loading ? (
                <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {loadingText}
                </>
            ) : children}
        </motion.button>
    )
}
