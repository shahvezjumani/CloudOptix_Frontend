import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, CheckCircle, FileText, Image, FileArchive, File, Sparkles, CloudLightning } from 'lucide-react'

const stages = ['Uploading...', 'AI analyzing content...', 'Auto-categorizing...', 'Complete!']

function getIconCfg(type) {
    if (type?.startsWith('image')) return { icon: Image, color: 'text-blue-400', bg: 'bg-blue-500/10' }
    if (type?.includes('pdf')) return { icon: FileText, color: 'text-red-400', bg: 'bg-red-500/10' }
    if (type?.includes('zip') || type?.includes('rar')) return { icon: FileArchive, color: 'text-yellow-400', bg: 'bg-yellow-500/10' }
    return { icon: File, color: 'text-slate-400', bg: 'bg-slate-500/10' }
}

export default function UploadPage() {
    const [isDragging, setIsDragging] = useState(false)
    const [fileList, setFileList] = useState([])
    const [uploading, setUploading] = useState(false)
    const [stageIdx, setStageIdx] = useState(0)
    const [progress, setProgress] = useState(0)
    const [done, setDone] = useState(false)
    const inputRef = useRef()

    const addFiles = (newFiles) => {
        const arr = Array.from(newFiles).map((f, i) => ({
            id: Date.now() + i,
            name: f.name,
            size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
            type: f.type,
        }))
        setFileList(prev => [...prev, ...arr])
        setDone(false); setProgress(0); setStageIdx(0); setUploading(false)
    }

    const simulate = () => {
        if (!fileList.length) return
        setUploading(true); setProgress(0); setStageIdx(0); setDone(false)
        const iv = setInterval(() => {
            setProgress(p => {
                const next = Math.min(p + Math.random() * 6 + 2, 100)
                if (next >= 33) setStageIdx(1)
                if (next >= 66) setStageIdx(2)
                if (next >= 100) { clearInterval(iv); setStageIdx(3); setDone(true) }
                return next
            })
        }, 80)
    }

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h1 className="text-2xl font-bold text-white">Upload Files</h1>
                <p className="text-slate-400 text-sm mt-1">AI automatically analyzes, categorizes and organizes your files</p>
            </motion.div>

            {/* Drop Zone */}
            <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => { e.preventDefault(); setIsDragging(false); addFiles(e.dataTransfer.files) }}
                onClick={() => !uploading && inputRef.current?.click()}
                className={`border-2 border-dashed rounded-3xl p-14 flex flex-col items-center justify-center cursor-pointer transition-all duration-300
          ${isDragging ? 'border-blue-500 bg-blue-500/5 scale-[1.01]' : 'border-white/10 hover:border-white/20 hover:bg-white/[0.02]'}`}
            >
                <input ref={inputRef} type="file" multiple className="hidden" onChange={e => addFiles(e.target.files)} />
                <motion.div
                    animate={{ y: isDragging ? -8 : 0, scale: isDragging ? 1.08 : 1 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-5"
                >
                    <Upload size={28} className={`transition-colors ${isDragging ? 'text-blue-400' : 'text-slate-400'}`} />
                </motion.div>
                <p className="text-white font-semibold text-xl mb-2">Drop files here or click to browse</p>
                <p className="text-slate-500 text-sm">PDF, Images, DOCX, XLSX, ZIP — up to 500 MB each</p>
            </motion.div>

            {/* File List */}
            <AnimatePresence>
                {fileList.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-2">
                        {fileList.map(file => {
                            const { icon: Icon, color, bg } = getIconCfg(file.type)
                            return (
                                <motion.div
                                    key={file.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex items-center gap-3 bg-[#0e0e1a] border border-white/5 rounded-xl px-4 py-3"
                                >
                                    <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                                        <Icon size={16} className={color} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white truncate">{file.name}</p>
                                        <p className="text-xs text-slate-500">{file.size}</p>
                                    </div>
                                    {!uploading && (
                                        <button onClick={() => setFileList(f => f.filter(x => x.id !== file.id))} className="text-slate-500 hover:text-red-400 transition-colors">
                                            <X size={15} />
                                        </button>
                                    )}
                                </motion.div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Progress */}
            <AnimatePresence>
                {uploading && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 bg-[#0e0e1a] border border-white/5 rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                                <Sparkles size={15} className="text-purple-400" />
                            </motion.div>
                            <motion.p key={stageIdx} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-sm font-medium text-white">
                                {stages[stageIdx]}
                            </motion.p>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                            <motion.div animate={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
                        </div>
                        <p className="text-xs text-slate-500 mt-2 text-right">{Math.round(progress)}%</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CTA Button */}
            <AnimatePresence mode="wait">
                {!done ? (
                    <motion.button
                        key="upload-btn"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        whileHover={!uploading ? { scale: 1.01 } : {}}
                        whileTap={!uploading ? { scale: 0.99 } : {}}
                        onClick={simulate}
                        disabled={!fileList.length || uploading}
                        className="mt-4 w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-blue-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {uploading ? 'Processing...' : 'Upload Files'}
                    </motion.button>
                ) : (
                    <motion.div
                        key="done-state"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold"
                    >
                        <CheckCircle size={18} /> All files uploaded and organized by AI!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
