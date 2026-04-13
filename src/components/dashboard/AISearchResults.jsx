import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Image, FileArchive, File, Bot, Download, Share2, ExternalLink, Sparkles } from 'lucide-react'

const typeConfig = {
    pdf: { icon: FileText, color: 'text-red-400', bg: 'from-red-500/20 to-transparent' },
    image: { icon: Image, color: 'text-blue-400', bg: 'from-blue-500/20 to-transparent' },
    doc: { icon: FileText, color: 'text-indigo-400', bg: 'from-indigo-500/20 to-transparent' },
    excel: { icon: FileText, color: 'text-green-400', bg: 'from-green-500/20 to-transparent' },
    zip: { icon: FileArchive, color: 'text-yellow-400', bg: 'from-yellow-500/20 to-transparent' },
}

function relevanceBadge(score) {
    if (score >= 90) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    if (score >= 75) return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
    return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
}

const scores = [98, 93, 88, 82, 76, 70]

export default function AISearchResults({ results, isThinking, query }) {
    if (isThinking) {
        return (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex flex-col items-center gap-4 py-10">
                <div className="relative w-14 h-14">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-purple-500"
                    />
                    <div className="absolute inset-[5px] rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                        <Bot size={18} className="text-purple-400" />
                    </div>
                </div>
                <div className="text-center">
                    <motion.p
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-white font-semibold text-lg"
                    >
                        AI is searching your files...
                    </motion.p>
                    <p className="text-slate-500 text-sm mt-1">Analyzing content and semantic context</p>
                </div>
                <div className="w-full mt-2 space-y-3">
                    {[1, 2, 3].map(i => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                            className="h-24 bg-white/5 rounded-2xl"
                        />
                    ))}
                </div>
            </motion.div>
        )
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
            <div className="flex items-center gap-2 mb-5">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-sm text-slate-400">{results.length} AI results for</span>
                <span className="text-sm text-white font-semibold">"{query}"</span>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {results.map((file, i) => {
                        const cfg = typeConfig[file.type] || { icon: File, color: 'text-slate-400', bg: 'from-slate-500/20 to-transparent' }
                        const Icon = cfg.icon
                        const score = scores[Math.min(i, scores.length - 1)]
                        return (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, y: 18, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: i * 0.08, type: 'spring', stiffness: 220, damping: 22 }}
                                whileHover={{ scale: 1.01, y: -2 }}
                                className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-5 hover:border-blue-500/25 transition-all group cursor-pointer relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/4 group-hover:to-purple-500/4 transition-all rounded-2xl" />
                                <div className="relative flex items-start gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                                        <Icon size={22} className={cfg.color} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-3 mb-1">
                                            <p className="text-white font-semibold text-base">{file.name}</p>
                                            <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border flex-shrink-0 ${relevanceBadge(score)}`}>
                                                {score}% match
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500">{file.size} · {file.date} · {file.category}</p>
                                        <div className="flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {[{ icon: ExternalLink, l: 'Open' }, { icon: Download, l: 'Download' }, { icon: Share2, l: 'Share' }].map(({ icon: Ic, l }) => (
                                                <motion.button
                                                    key={l}
                                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-all"
                                                >
                                                    <Ic size={12} /> {l}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
