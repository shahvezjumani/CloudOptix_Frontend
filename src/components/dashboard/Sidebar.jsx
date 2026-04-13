import { motion, AnimatePresence } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard, FolderOpen, Upload, Bot, Zap,
    Share2, Settings, ChevronLeft, CloudLightning,
} from 'lucide-react'

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', end: true },
    { icon: FolderOpen, label: 'My Files', path: '/dashboard/files' },
    { icon: Upload, label: 'Upload', path: '/dashboard/upload' },
    { icon: Bot, label: 'AI Search', path: '/dashboard/ai-search' },
    { icon: Zap, label: 'Optimization', path: '/dashboard/optimization' },
    { icon: Share2, label: 'Shared', path: '/dashboard/shared' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
]

export default function Sidebar({ collapsed, setCollapsed }) {
    return (
        <motion.aside
            animate={{ width: collapsed ? 72 : 240 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-0 h-screen bg-[#0e0e1a] border-r border-white/5 flex flex-col z-40 overflow-hidden"
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 h-16 border-b border-white/5 flex-shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/25">
                    <CloudLightning size={15} className="text-white" />
                </div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.2 }}
                            className="text-white font-bold text-lg whitespace-nowrap"
                        >
                            CloudOptix
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map(({ icon: Icon, label, path, end }) => (
                    <NavLink
                        key={path}
                        to={path}
                        end={end}
                        className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative group
              ${isActive
                                ? 'bg-gradient-to-r from-blue-500/15 to-purple-500/15 text-white border border-blue-500/20'
                                : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                            }`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <Icon size={18} className={`flex-shrink-0 transition-colors ${isActive ? 'text-blue-400' : ''}`} />
                                <AnimatePresence>
                                    {!collapsed && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -6 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -6 }}
                                            transition={{ duration: 0.15 }}
                                            className="text-sm font-medium whitespace-nowrap"
                                        >
                                            {label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {collapsed && (
                                    <div className="absolute left-full ml-3 px-2.5 py-1.5 bg-[#1a1a2e] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap border border-white/10 shadow-xl z-50 transition-opacity duration-150">
                                        {label}
                                    </div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Collapse button */}
            <div className="p-3 border-t border-white/5 flex-shrink-0">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                    <motion.div animate={{ rotate: collapsed ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronLeft size={18} />
                    </motion.div>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-sm"
                            >
                                Collapse
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </motion.aside>
    )
}
