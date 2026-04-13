import { motion } from 'framer-motion'
import { FileText, Image, FileArchive, File, Download, Trash2, Share2 } from 'lucide-react'

const typeConfig = {
    pdf: { icon: FileText, color: 'text-red-400', bg: 'from-red-500/20 to-red-600/5' },
    image: { icon: Image, color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-600/5' },
    doc: { icon: FileText, color: 'text-indigo-400', bg: 'from-indigo-500/20 to-indigo-600/5' },
    excel: { icon: FileText, color: 'text-green-400', bg: 'from-green-500/20 to-green-600/5' },
    ppt: { icon: FileText, color: 'text-orange-400', bg: 'from-orange-500/20 to-orange-600/5' },
    zip: { icon: FileArchive, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-yellow-600/5' },
}

function FileIcon({ type, large }) {
    const cfg = typeConfig[type] || { icon: File, color: 'text-slate-400', bg: 'from-slate-500/20 to-slate-600/5' }
    const Icon = cfg.icon
    return (
        <div className={`${large ? 'w-12 h-12' : 'w-9 h-9'} rounded-xl bg-gradient-to-br ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
            <Icon size={large ? 22 : 17} className={cfg.color} />
        </div>
    )
}

const actions = [
    { icon: Download, label: 'Download' },
    { icon: Share2, label: 'Share' },
    { icon: Trash2, label: 'Delete' },
]

export function FileCardGrid({ file, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.04, duration: 0.3 }}
            whileHover={{ y: -4 }}
            className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-4 group hover:border-blue-500/20 transition-colors relative overflow-hidden cursor-pointer"
        >
            <div className="absolute inset-0 bg-[#08080f]/90 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                {actions.map(({ icon: Icon, label }) => (
                    <motion.button
                        key={label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-blue-500/30 transition-all"
                    >
                        <Icon size={15} />
                    </motion.button>
                ))}
            </div>
            <FileIcon type={file.type} large />
            <div className="mt-3">
                <p className="text-sm font-medium text-white truncate">{file.name}</p>
                <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-slate-500">{file.size}</span>
                    <span className="text-xs text-slate-600">{file.date}</span>
                </div>
            </div>
        </motion.div>
    )
}

export function FileCardList({ file, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.035, duration: 0.3 }}
            className="flex items-center gap-4 bg-[#0e0e1a] border border-white/5 rounded-xl px-4 py-3 group hover:border-blue-500/20 transition-colors cursor-pointer"
        >
            <FileIcon type={file.type} />
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate group-hover:text-blue-300 transition-colors">{file.name}</p>
                <p className="text-xs text-slate-500">{file.category}</p>
            </div>
            <span className="text-xs text-slate-500 w-14 text-right hidden sm:block">{file.size}</span>
            <span className="text-xs text-slate-600 w-24 text-right hidden md:block">{file.date}</span>
            <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                {actions.map(({ icon: Icon, label }) => (
                    <motion.button
                        key={label}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-500/20 transition-all"
                    >
                        <Icon size={13} />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    )
}
