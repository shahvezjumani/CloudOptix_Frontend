import { motion } from 'framer-motion'
import { Sparkles, AlertTriangle, Tag, Zap, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const insights = [
    {
        id: 1,
        icon: AlertTriangle,
        label: '12 duplicate files found',
        sub: 'Recover up to 150 MB of storage',
        color: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'hover:border-amber-500/20',
        path: '/dashboard/optimization',
    },
    {
        id: 2,
        icon: Tag,
        label: '20 uncategorized files',
        sub: 'Let AI organize them for you',
        color: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'hover:border-purple-500/20',
        path: '/dashboard/ai-search',
    },
    {
        id: 3,
        icon: Zap,
        label: '8 large files detected',
        sub: 'Compress to save 2.1 GB',
        color: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'hover:border-blue-500/20',
        path: '/dashboard/optimization',
    },
]

export default function AIInsights() {
    const navigate = useNavigate()

    return (
        <div className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-5 h-full">
            <div className="flex items-center gap-2 mb-4">
                <Sparkles size={14} className="text-purple-400" />
                <h3 className="text-sm font-semibold text-white">AI Insights</h3>
                <span className="ml-auto text-xs text-slate-500">3 actions</span>
            </div>
            <div className="space-y-2.5">
                {insights.map((item, i) => {
                    const Icon = item.icon
                    return (
                        <motion.button
                            key={item.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 + 0.3 }}
                            whileHover={{ x: 3 }}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 ${item.border} transition-all group text-left`}
                        >
                            <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                                <Icon size={16} className={item.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-white font-medium">{item.label}</p>
                                <p className="text-xs text-slate-500">{item.sub}</p>
                            </div>
                            <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0" />
                        </motion.button>
                    )
                })}
            </div>
        </div>
    )
}
