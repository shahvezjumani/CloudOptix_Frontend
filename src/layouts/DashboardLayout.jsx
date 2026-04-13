import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '../components/dashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()

    return (
        <div className="min-h-screen bg-[#08080f]">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div
                className="transition-all duration-300 ease-in-out"
                style={{ marginLeft: collapsed ? 72 : 240 }}
            >
                <Navbar sidebarCollapsed={collapsed} />
                <main className="pt-16 min-h-screen">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    )
}
