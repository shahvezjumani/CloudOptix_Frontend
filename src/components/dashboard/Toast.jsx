import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X, AlertTriangle } from 'lucide-react'

const typeConfig = {
    success: { icon: CheckCircle, color: 'text-emerald-400', border: 'border-emerald-500/20' },
    error: { icon: AlertCircle, color: 'text-red-400', border: 'border-red-500/20' },
    info: { icon: Info, color: 'text-blue-400', border: 'border-blue-500/20' },
    warning: { icon: AlertTriangle, color: 'text-amber-400', border: 'border-amber-500/20' },
}

let _id = 0

export function useToast() {
    const [toasts, setToasts] = useState([])

    const addToast = useCallback((message, type = 'info', duration = 3500) => {
        const id = ++_id
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), duration)
    }, [])

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }, [])

    return { toasts, addToast, removeToast }
}

export default function Toast({ toasts, removeToast }) {
    return (
        <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 pointer-events-none">
            <AnimatePresence>
                {toasts.map(toast => {
                    const { icon: Icon, color, border } = typeConfig[toast.type] || typeConfig.info
                    return (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 60, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 60, scale: 0.9 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                            className={`pointer-events-auto flex items-center gap-3 bg-[#1a1a2e] border ${border} rounded-xl px-4 py-3 shadow-2xl min-w-64 max-w-sm`}
                        >
                            <Icon size={16} className={`${color} flex-shrink-0`} />
                            <span className="text-sm text-slate-300 flex-1">{toast.message}</span>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="text-slate-500 hover:text-white transition-colors flex-shrink-0"
                            >
                                <X size={14} />
                            </button>
                        </motion.div>
                    )
                })}
            </AnimatePresence>
        </div>
    )
}
