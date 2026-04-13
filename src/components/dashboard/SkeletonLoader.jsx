import { motion } from 'framer-motion'

function Pulse({ className }) {
    return (
        <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className={`bg-white/5 rounded-lg ${className}`}
        />
    )
}

export function StatCardSkeleton() {
    return (
        <div className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-5">
            <Pulse className="w-10 h-10 rounded-xl mb-4" />
            <Pulse className="w-16 h-8 mb-2" />
            <Pulse className="w-28 h-4 mb-1" />
            <Pulse className="w-20 h-3" />
        </div>
    )
}

export function FileCardSkeleton({ count = 6 }) {
    return Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-[#0e0e1a] border border-white/5 rounded-2xl p-4">
            <Pulse className="w-12 h-12 rounded-xl mb-3" />
            <Pulse className="w-full h-4 mb-2" />
            <div className="flex justify-between gap-2">
                <Pulse className="w-12 h-3" />
                <Pulse className="w-16 h-3" />
            </div>
        </div>
    ))
}

export function ListItemSkeleton({ count = 4 }) {
    return Array.from({ length: count }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 bg-[#0e0e1a] border border-white/5 rounded-xl px-4 py-3">
            <Pulse className="w-9 h-9 rounded-xl flex-shrink-0" />
            <div className="flex-1 space-y-2">
                <Pulse className="w-48 h-4" />
                <Pulse className="w-24 h-3" />
            </div>
            <Pulse className="w-12 h-3" />
        </div>
    ))
}
