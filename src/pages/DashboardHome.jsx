import { motion } from 'framer-motion'
import { Files, HardDrive, Share2, Zap, Upload, FolderPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import StatCard from '../components/dashboard/StatCard'
import StorageBar from '../components/dashboard/StorageBar'
import RecentUploads from '../components/dashboard/RecentUploads'
import AIInsights from '../components/dashboard/AIInsights'
import { stats } from '../data/mockData'

const statCards = [
    { icon: Files, label: 'Total Files', value: 124, sub: '+8 this week', gradient: 'from-blue-500/15', iconColor: 'text-blue-400', delay: 0 },
    { icon: HardDrive, label: 'Storage Used', value: '68 GB', sub: '32 GB remaining', gradient: 'from-purple-500/15', iconColor: 'text-purple-400', delay: 0.1 },
    { icon: Share2, label: 'Shared Files', value: 8, sub: '3 with edit access', gradient: 'from-emerald-500/15', iconColor: 'text-emerald-400', delay: 0.2 },
    { icon: Zap, label: 'AI Saves', value: 32, sub: '150 MB recovered', gradient: 'from-amber-500/15', iconColor: 'text-amber-400', delay: 0.3 },
]

export default function DashboardHome() {
    const navigate = useNavigate()

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">
            {/* Greeting */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold text-white">Good morning, Ahmed 👋</h1>
                <p className="text-slate-400 text-sm mt-1">Here's what's happening with your cloud storage today.</p>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {statCards.map(card => <StatCard key={card.label} {...card} />)}
            </div>

            {/* Storage + AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <StorageBar used={stats.storageUsed} total={stats.storageTotal} />
                </div>
                <AIInsights />
            </div>

            {/* Recent Uploads + Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <RecentUploads />
                </div>

                <div className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-5">
                    <h3 className="text-sm font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/dashboard/upload')}
                            className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all group"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                                <Upload size={14} className="text-white" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium text-white">Upload Files</p>
                                <p className="text-xs text-slate-400">Drag & drop or browse</p>
                            </div>
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all"
                        >
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                                <FolderPlus size={14} className="text-slate-400" />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium text-slate-300">Create Folder</p>
                                <p className="text-xs text-slate-500">Organize your files</p>
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}
