import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Upload, Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { FileCardGrid, FileCardList } from '../components/dashboard/FileCard'
import { files } from '../data/mockData'

const categories = ['All', 'Documents', 'Images', 'Finance', 'Design', 'Work', 'Backup', 'Personal']

export default function MyFilesPage() {
    const [viewMode, setViewMode] = useState('grid')
    const [activeCategory, setActiveCategory] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [isDragging, setIsDragging] = useState(false)
    const navigate = useNavigate()

    const filtered = files.filter(f => {
        const matchCat = activeCategory === 'All' || f.category === activeCategory
        const matchSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase())
        return matchCat && matchSearch
    })

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white">My Files</h1>
                    <p className="text-slate-400 text-sm mt-0.5">{filtered.length} of {files.length} files</p>
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/dashboard/upload')}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                >
                    <Upload size={15} /> Upload
                </motion.button>
            </motion.div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3 mb-5 flex-wrap">
                <div className="relative flex-shrink-0">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search files..."
                        className="w-56 bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/40 transition-all"
                    />
                </div>
                <div className="flex gap-2 flex-wrap flex-1">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap
                ${activeCategory === cat
                                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30'
                                    : 'bg-white/5 text-slate-400 border border-white/5 hover:text-white hover:bg-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex gap-1 ml-auto">
                    {[{ m: 'grid', I: Grid }, { m: 'list', I: List }].map(({ m, I }) => (
                        <button
                            key={m}
                            onClick={() => setViewMode(m)}
                            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                ${viewMode === m ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                        >
                            <I size={16} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Drop zone banner */}
            <motion.div
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false) }}
                animate={{
                    borderColor: isDragging ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.06)',
                    backgroundColor: isDragging ? 'rgba(99,102,241,0.05)' : 'transparent',
                }}
                className="border-2 border-dashed rounded-2xl py-3 mb-5 flex items-center justify-center gap-2 text-slate-500 text-sm cursor-pointer hover:border-white/10 transition-colors"
            >
                <Upload size={14} /> Drop files anywhere to upload
            </motion.div>

            {/* Files Grid / List */}
            <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                    <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-20">
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                            <Search size={24} className="text-slate-500" />
                        </div>
                        <p className="text-base font-medium text-slate-400">No files found</p>
                        <p className="text-sm text-slate-500 mt-1">Try adjusting your search or category filter</p>
                    </motion.div>
                ) : viewMode === 'grid' ? (
                    <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {filtered.map((file, i) => <FileCardGrid key={file.id} file={file} index={i} />)}
                    </motion.div>
                ) : (
                    <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                        {filtered.map((file, i) => <FileCardList key={file.id} file={file} index={i} />)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
