import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function useCountUp(target, duration = 1500) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        if (!target) return
        let start = 0
        const increment = target / (duration / 16)
        const timer = setInterval(() => {
            start += increment
            if (start >= target) {
                setCount(target)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)
        return () => clearInterval(timer)
    }, [target, duration])
    return count
}

export default function StatCard({
    icon: Icon,
    label,
    value,
    sub,
    gradient = 'from-blue-500/15',
    iconColor = 'text-blue-400',
    delay = 0,
}) {
    const isNumber = typeof value === 'number'
    const count = useCountUp(isNumber ? value : 0)

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="relative bg-[#0e0e1a] border border-white/5 rounded-2xl p-5 overflow-hidden group cursor-default"
        >
            <div
                className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${gradient} to-transparent rounded-full translate-x-10 -translate-y-10 group-hover:scale-125 transition-transform duration-700`}
            />
            <div className="relative z-10">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4`}>
                    <Icon size={18} className={iconColor} />
                </div>
                <div className="text-3xl font-bold text-white mb-1 tabular-nums">
                    {isNumber ? count : value}
                </div>
                <div className="text-sm text-slate-400 font-medium">{label}</div>
                {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
            </div>
        </motion.div>
    )
}
