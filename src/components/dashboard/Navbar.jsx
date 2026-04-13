import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search, ChevronDown, LogOut, User, Settings, Check } from 'lucide-react'

const notifications = [
    { id: 1, text: '12 duplicate files detected by AI', time: '2m ago', unread: true },
    { id: 2, text: 'Upload complete: Q1_Invoice.pdf', time: '1h ago', unread: true },
    { id: 3, text: 'Storage at 68% — consider optimizing', time: '3h ago', unread: false },
]

export default function Navbar({ sidebarCollapsed }) {
    const [showNotifs, setShowNotifs] = useState(false)
    const [showProfile, setShowProfile] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)

    return (
        <header
            className="fixed top-0 right-0 h-16 bg-[#08080f]/90 backdrop-blur-xl border-b border-white/5 z-30 flex items-center px-6 gap-4 transition-all duration-300"
            style={{ left: sidebarCollapsed ? 72 : 240 }}
        >
            {/* Search */}
            <div className={`flex-1 max-w-sm transition-all duration-300 ${searchFocused ? 'max-w-md' : ''}`}>
                <div className="relative">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search files..."
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setSearchFocused(false)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/40 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
                {/* Notifications */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                        onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false) }}
                        className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
                    >
                        <Bell size={16} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white text-[9px] flex items-center justify-center font-bold">2</span>
                    </motion.button>
                    <AnimatePresence>
                        {showNotifs && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                className="absolute right-0 top-11 w-80 bg-[#13131f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                            >
                                <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
                                    <h3 className="text-sm font-semibold text-white">Notifications</h3>
                                    <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                                        <Check size={10} /> Mark all read
                                    </button>
                                </div>
                                {notifications.map(n => (
                                    <div key={n.id} className={`px-4 py-3 border-b border-white/5 flex gap-3 hover:bg-white/5 cursor-pointer transition-colors ${!n.unread ? 'opacity-60' : ''}`}>
                                        {n.unread
                                            ? <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                                            : <div className="w-1.5 flex-shrink-0" />
                                        }
                                        <div>
                                            <p className="text-sm text-slate-300">{n.text}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{n.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Profile */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => { setShowProfile(!showProfile); setShowNotifs(false) }}
                        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all"
                    >
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
                        <span className="text-sm text-slate-300 font-medium hidden sm:block">Ahmed</span>
                        <ChevronDown size={13} className={`text-slate-500 transition-transform hidden sm:block ${showProfile ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                className="absolute right-0 top-11 w-44 bg-[#13131f] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                            >
                                {[
                                    { icon: User, label: 'Profile', danger: false },
                                    { icon: Settings, label: 'Settings', danger: false },
                                    { icon: LogOut, label: 'Log out', danger: true },
                                ].map(({ icon: Icon, label, danger }) => (
                                    <button
                                        key={label}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${danger ? 'text-red-400 hover:text-red-300' : 'text-slate-400 hover:text-white'}`}
                                    >
                                        <Icon size={14} /> {label}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    )
}
