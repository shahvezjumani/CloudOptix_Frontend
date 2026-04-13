import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Sparkles, TrendingUp, Clock } from 'lucide-react'
import AISearchInput from '../components/dashboard/AISearchInput'
import AISearchResults from '../components/dashboard/AISearchResults'
import { files, searchSuggestions } from '../data/mockData'

const trending = [
    { label: 'Invoices 2025', icon: TrendingUp },
    { label: 'Resume files', icon: TrendingUp },
    { label: 'Karachi photos', icon: TrendingUp },
    { label: 'Meeting notes', icon: Clock },
    { label: 'Budget sheets', icon: Clock },
    { label: 'Design mockups', icon: TrendingUp },
]

export default function AISearchPage() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const [thinking, setThinking] = useState(false)

    useEffect(() => {
        if (!query.trim()) { setResults([]); setThinking(false); return }
        setThinking(true)
        const t = setTimeout(() => {
            const match = files.filter(f =>
                f.name.toLowerCase().includes(query.toLowerCase()) ||
                f.category?.toLowerCase().includes(query.toLowerCase())
            )
            setResults(match.length ? match : files.slice(0, 5))
            setThinking(false)
        }, 750)
        return () => clearTimeout(t)
    }, [query])

    return (
        <div className="p-6 max-w-3xl mx-auto">
            {/* Hero */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-4"
                >
                    <Sparkles size={11} /> Powered by AI
                </motion.div>
                <h1 className="text-4xl font-bold text-white leading-tight mb-3">
                    Ask anything about<br />
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        your files
                    </span>
                </h1>
                <p className="text-slate-400">Natural language search across all your cloud storage</p>
            </motion.div>

            {/* Search Input */}
            <AISearchInput query={query} setQuery={setQuery} isThinking={thinking} />

            {/* Idle state / Results */}
            <AnimatePresence mode="wait">
                {!query ? (
                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -10 }} className="mt-8 space-y-6">
                        {/* Trending */}
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3">Trending</p>
                            <div className="flex flex-wrap gap-2">
                                {trending.map(({ label, icon: Icon }) => (
                                    <motion.button
                                        key={label}
                                        whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}
                                        onClick={() => setQuery(label)}
                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-slate-300 text-sm hover:border-blue-500/30 hover:text-white hover:bg-white/8 transition-all"
                                    >
                                        <Icon size={13} className="text-slate-500" /> {label}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Try asking */}
                        <div>
                            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3">Try asking</p>
                            <div className="space-y-1">
                                {searchSuggestions.slice(0, 5).map((s, i) => (
                                    <motion.button
                                        key={s}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.06 }}
                                        whileHover={{ x: 5 }}
                                        onClick={() => setQuery(s)}
                                        className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white text-sm transition-all group"
                                    >
                                        <Bot size={15} className="text-purple-400 flex-shrink-0" />
                                        <span className="text-slate-500 group-hover:text-slate-300 transition-colors">"{s}"</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <AISearchResults key="results" results={results} isThinking={thinking} query={query} />
                )}
            </AnimatePresence>
        </div>
    )
}
