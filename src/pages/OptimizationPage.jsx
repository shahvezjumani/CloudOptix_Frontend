import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Trash2, FileText, AlertTriangle, CheckCircle, TrendingDown, RefreshCw } from 'lucide-react'
import Toast, { useToast } from '../components/dashboard/Toast'
import { duplicateFiles } from '../data/mockData'

function CountUp({ to, suffix = '' }) {
    const [val, setVal] = useState(0)
    useEffect(() => {
        let curr = 0
        const inc = to / 50
        const t = setInterval(() => {
            curr = Math.min(curr + inc, to)
            setVal(Math.floor(curr))
            if (curr >= to) clearInterval(t)
        }, 24)
        return () => clearInterval(t)
    }, [to])
    return <>{val}{suffix}</>
}

const optCards = [
    { icon: AlertTriangle, label: 'Duplicates Found', value: 12, suffix: '', color: 'text-amber-400', bg: 'bg-amber-500/10', desc: 'Files taking up extra space' },
    { icon: TrendingDown, label: 'Potential Savings', value: 150, suffix: ' MB', color: 'text-emerald-400', bg: 'bg-emerald-500/10', desc: 'Storage you can recover' },
    { icon: Zap, label: 'Large Files', value: 8, suffix: '', color: 'text-blue-400', bg: 'bg-blue-500/10', desc: 'Above 10 MB threshold' },
]

export default function OptimizationPage() {
    const [removedIds, setRemovedIds] = useState([])
    const [removing, setRemoving] = useState(false)
    const { toasts, addToast, removeToast } = useToast()

    const visible = duplicateFiles.filter(f => !removedIds.includes(f.id))

    const removeOne = (id, name) => {
        setRemovedIds(prev => [...prev, id])
        addToast(`Removed "${name}"`, 'success')
    }

    const removeAll = () => {
        if (!visible.length) return
        setRemoving(true)
        visible.forEach((f, i) => {
            setTimeout(() => {
                setRemovedIds(prev => [...prev, f.id])
                if (i === visible.length - 1) {
                    setRemoving(false)
                    addToast('All duplicates removed! 150 MB freed.', 'success')
                }
            }, i * 300)
        })
    }

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <Toast toasts={toasts} removeToast={removeToast} />

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl font-bold text-white">AI Optimization</h1>
                <p className="text-slate-400 text-sm mt-1">Free up storage with AI-powered analysis and cleanup</p>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {optCards.map((c, i) => {
                    const Icon = c.icon
                    return (
                        <motion.div
                            key={c.label}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-5"
                        >
                            <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center mb-3`}>
                                <Icon size={18} className={c.color} />
                            </div>
                            <div className={`text-3xl font-bold ${c.color} mb-1 tabular-nums`}>
                                <CountUp to={c.value} suffix={c.suffix} />
                            </div>
                            <div className="text-sm text-white font-medium">{c.label}</div>
                            <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>
                        </motion.div>
                    )
                })}
            </div>

            {/* Duplicates Panel */}
            <div className="bg-[#0e0e1a] border border-white/5 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center">
                            <AlertTriangle size={15} className="text-amber-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-white">Duplicate Files</h3>
                            <p className="text-xs text-slate-500">{visible.length} duplicates remaining</p>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={removeAll}
                        disabled={!visible.length || removing}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/15 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {removing
                            ? <><RefreshCw size={14} className="animate-spin" /> Removing...</>
                            : <><Trash2 size={14} /> Remove All</>
                        }
                    </motion.button>
                </div>

                <div className="p-4 space-y-2">
                    <AnimatePresence>
                        {visible.map((file, i) => (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                                transition={{ delay: i * 0.04 }}
                                className="flex items-center gap-4 bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 group hover:border-amber-500/20 transition-colors"
                            >
                                <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                                    <FileText size={16} className="text-red-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-white font-medium truncate">{file.name}</p>
                                    <p className="text-xs text-slate-500">Duplicate of: <span className="text-slate-400">{file.original}</span></p>
                                </div>
                                <span className="text-xs text-slate-500">{file.size}</span>
                                <motion.button
                                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    onClick={() => removeOne(file.id, file.name)}
                                    className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={13} />
                                </motion.button>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {visible.length === 0 && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10 text-center">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-3">
                                <CheckCircle size={24} className="text-emerald-400" />
                            </div>
                            <p className="text-base font-semibold text-white">All clean!</p>
                            <p className="text-sm text-slate-500 mt-1">No duplicate files found. Great job keeping it tidy.</p>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}
