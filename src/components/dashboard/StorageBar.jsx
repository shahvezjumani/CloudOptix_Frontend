import { motion } from 'framer-motion'
import { storageBreakdown } from '../../data/mockData'

export default function StorageBar({ used, total }) {
    const percent = Math.min((used / total) * 100, 100)
    const isWarning = percent > 80

    return (
        <div className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Storage Usage</h3>
                <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${isWarning ? 'bg-red-500/10 text-red-400' : 'bg-white/5 text-slate-400'
                        }`}
                >
                    {used} GB / {total} GB
                </span>
            </div>

            {/* Main progress bar */}
            <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-5">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                    className={`h-full rounded-full ${isWarning
                            ? 'bg-gradient-to-r from-red-500 to-orange-500'
                            : 'bg-gradient-to-r from-blue-500 to-purple-600'
                        }`}
                />
            </div>

            {/* Breakdown */}
            <div className="space-y-3">
                {storageBreakdown.map((item, i) => (
                    <div key={item.label} className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color} flex-shrink-0`} />
                        <span className="text-xs text-slate-400 flex-1">{item.label}</span>
                        <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${item.percent}%` }}
                                transition={{ duration: 0.8, delay: 0.5 + i * 0.08 }}
                                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                            />
                        </div>
                        <span className="text-xs text-slate-500 w-14 text-right">{item.size} GB</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
