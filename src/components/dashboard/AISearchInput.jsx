import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Sparkles, X } from 'lucide-react'
import { searchSuggestions } from '../../data/mockData'

export default function AISearchInput({ query, setQuery, isThinking }) {
    const [phIndex, setPhIndex] = useState(0)
    const [phText, setPhText] = useState('')
    const [cursorOn, setCursorOn] = useState(true)

    // Cursor blink
    useEffect(() => {
        const t = setInterval(() => setCursorOn(v => !v), 530)
        return () => clearInterval(t)
    }, [])

    // Typing + erasing animation for placeholder
    useEffect(() => {
        if (query) return
        const target = searchSuggestions[phIndex]
        let i = 0
        setPhText('')

        const typeTimer = setInterval(() => {
            if (i < target.length) {
                setPhText(target.slice(0, ++i))
            } else {
                clearInterval(typeTimer)
                setTimeout(() => {
                    let j = target.length
                    const eraseTimer = setInterval(() => {
                        if (j > 0) {
                            setPhText(target.slice(0, --j))
                        } else {
                            clearInterval(eraseTimer)
                            setPhIndex(p => (p + 1) % searchSuggestions.length)
                        }
                    }, 25)
                }, 2200)
            }
        }, 55)

        return () => clearInterval(typeTimer)
    }, [phIndex, query])

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="relative"
        >
            {/* Glow halo */}
            <div
                className={`absolute inset-0 rounded-2xl blur-xl -z-10 bg-gradient-to-r from-blue-500/20 to-purple-600/20 transition-opacity duration-500 ${query ? 'opacity-100' : 'opacity-50'}`}
            />

            <div
                className={`flex items-center gap-4 bg-[#0e0e1a] border-2 rounded-2xl px-5 py-4 transition-all duration-300
          ${query ? 'border-blue-500/60 shadow-2xl shadow-blue-500/10' : 'border-white/10 hover:border-white/20'}`}
            >
                {isThinking ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <Sparkles size={22} className="text-purple-400 flex-shrink-0" />
                    </motion.div>
                ) : (
                    <Search size={22} className={`flex-shrink-0 transition-colors duration-300 ${query ? 'text-blue-400' : 'text-slate-500'}`} />
                )}

                {/* Input + animated placeholder */}
                <div className="flex-1 relative h-7 flex items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className="w-full bg-transparent text-white text-lg focus:outline-none relative z-10 caret-blue-400"
                        autoFocus
                    />
                    {!query && (
                        <div className="absolute inset-0 flex items-center pointer-events-none select-none">
                            <span className="text-slate-500 text-lg">
                                {phText}
                                <span className={`ml-0.5 inline-block w-[2px] h-5 bg-blue-400 align-middle transition-opacity ${cursorOn ? 'opacity-100' : 'opacity-0'}`} />
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                    {query && (
                        <motion.button
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setQuery('')}
                            className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={12} />
                        </motion.button>
                    )}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                        <Sparkles size={11} className="text-purple-400" />
                        <span className="text-xs text-blue-400 font-semibold">AI</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
