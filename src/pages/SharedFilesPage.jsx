import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Image, Link, Copy, Share2, Users } from 'lucide-react'
import ToggleSwitch from '../components/dashboard/ToggleSwitch'
import Toast, { useToast } from '../components/dashboard/Toast'
import { sharedFiles } from '../data/mockData'

const typeConfig = {
    pdf: { icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10' },
    doc: { icon: FileText, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    excel: { icon: FileText, color: 'text-green-400', bg: 'bg-green-500/10' },
    image: { icon: Image, color: 'text-blue-400', bg: 'bg-blue-500/10' },
}

function SharedFileRow({ file, onCopy, index }) {
    const [perms, setPerms] = useState(file.permissions)
    const toggle = key => setPerms(p => ({ ...p, [key]: !p[key] }))
    const cfg = typeConfig[file.type] || typeConfig.pdf
    const Icon = cfg.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-5 hover:border-blue-500/15 transition-colors"
        >
            <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={20} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold">{file.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                        {file.size} · Shared with <span className="text-slate-400">{file.sharedWith}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-3 p-2.5 bg-white/[0.03] rounded-xl border border-white/5">
                        <Link size={12} className="text-slate-500 flex-shrink-0" />
                        <span className="text-xs text-slate-400 font-mono truncate flex-1">{file.link}</span>
                        <motion.button
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => onCopy(file.link)}
                            className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-all flex-shrink-0"
                        >
                            <Copy size={12} />
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="flex flex-wrap gap-6 mt-4 pt-4 border-t border-white/5">
                {[['view', 'View'], ['edit', 'Edit'], ['download', 'Download']].map(([key, label]) => (
                    <ToggleSwitch key={key} enabled={perms[key]} onChange={() => toggle(key)} label={label} />
                ))}
            </div>
        </motion.div>
    )
}

export default function SharedFilesPage() {
    const { toasts, addToast, removeToast } = useToast()

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <Toast toasts={toasts} removeToast={removeToast} />

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">Shared Files</h1>
                    <p className="text-slate-400 text-sm mt-0.5">{sharedFiles.length} files shared with others</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                    <Share2 size={15} /> Share New File
                </motion.button>
            </motion.div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
                {[
                    { icon: Share2, label: 'Total Shared', value: '8 files', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { icon: Users, label: 'Recipients', value: '4 people', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { icon: Link, label: 'Active Links', value: '4 links', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                ].map((s, i) => {
                    const Icon = s.icon
                    return (
                        <motion.div
                            key={s.label}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-4 flex items-center gap-3"
                        >
                            <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                                <Icon size={16} className={s.color} />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{s.value}</p>
                                <p className="text-xs text-slate-500">{s.label}</p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Shared file list */}
            <div className="space-y-4">
                {sharedFiles.map((file, i) => (
                    <SharedFileRow
                        key={file.id}
                        file={file}
                        onCopy={() => addToast('Link copied to clipboard!', 'success')}
                        index={i}
                    />
                ))}
            </div>
        </div>
    )
}
