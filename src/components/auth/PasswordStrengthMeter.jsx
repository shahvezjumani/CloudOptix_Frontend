import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export default function PasswordStrengthMeter({ password, strength, strengthColor, strengthLabel, rules }) {
    return (
        <AnimatePresence>
            {password && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2.5 overflow-hidden"
                >
                    <div className="flex gap-1 mb-2">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex-1 h-1 rounded-full overflow-hidden bg-white/10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: strength >= i ? '100%' : '0%' }}
                                    transition={{ duration: 0.3 }}
                                    className="h-full rounded-full"
                                    style={{ background: strengthColor }}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: strengthColor }}>{strengthLabel}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                        {rules.map(({ label, test }) => (
                            <div key={label} className="flex items-center gap-1.5">
                                <CheckCircle2 size={12} className={test(password) ? 'text-green-400' : 'text-white/20'} />
                                <span className={`text-[11px] ${test(password) ? 'text-white/60' : 'text-white/30'}`}>{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
