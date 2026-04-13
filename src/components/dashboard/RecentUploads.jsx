import { motion } from 'framer-motion'
import { FileText, Image, File, ArrowUpRight } from 'lucide-react'
import { recentUploads } from '../../data/mockData'
import { useNavigate } from 'react-router-dom'

const iconMap = {
    pdf: { icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10' },
    image: { icon: Image, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    doc: { icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    excel: { icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
}

export default function RecentUploads() {
    const navigate = useNavigate()

    return (
        <div className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-5 h-full">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">Recent Uploads</h3>
                <button
                    onClick={() => navigate('/dashboard/files')}
                    className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
                >
                    View all <ArrowUpRight size={12} />
                </button>
            </div>
            <div className="space-y-1">
                {recentUploads.map((file, i) => {
                    const cfg = iconMap[file.type] || { icon: File, color: 'text-slate-400', bg: 'bg-slate-500/10' }
                    const Icon = cfg.icon
                    return (
                        <motion.div
                            key={file.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group"
                        >
                            <div className={`w-9 h-9 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                                <Icon size={16} className={cfg.color} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm text-white truncate font-medium group-hover:text-blue-300 transition-colors">
                                    {file.name}
                                </p>
                                <p className="text-xs text-slate-500">{file.size}</p>
                            </div>
                            <span className="text-xs text-slate-500 whitespace-nowrap">{file.date}</span>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
