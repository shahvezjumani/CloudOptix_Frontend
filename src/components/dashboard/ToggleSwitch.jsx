import { motion } from 'framer-motion'

export default function ToggleSwitch({ enabled, onChange, label }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div
                onClick={() => onChange(!enabled)}
                className={`relative flex-shrink-0 rounded-full transition-all duration-300 cursor-pointer
          ${enabled ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'bg-white/10'}`}
                style={{ width: 40, height: 22 }}
            >
                <motion.div
                    animate={{ x: enabled ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm"
                />
            </div>
            {label && (
                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {label}
                </span>
            )}
        </label>
    )
}
