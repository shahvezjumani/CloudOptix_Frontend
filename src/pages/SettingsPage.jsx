import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Bell, Palette, Shield, ChevronRight } from 'lucide-react'
import ToggleSwitch from '../components/dashboard/ToggleSwitch'
import StorageBar from '../components/dashboard/StorageBar'

function Section({ title, children, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="bg-[#0e0e1a] border border-white/5 rounded-2xl overflow-hidden"
        >
            <div className="px-5 py-4 border-b border-white/5">
                <h3 className="text-sm font-semibold text-white">{title}</h3>
            </div>
            <div className="p-5 space-y-4">{children}</div>
        </motion.div>
    )
}

function SettingRow({ icon: Icon, label, sub, children }) {
    return (
        <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-slate-400" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium">{label}</p>
                {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
            </div>
            <div className="flex-shrink-0">{children}</div>
        </div>
    )
}

export default function SettingsPage() {
    const [notifs, setNotifs] = useState({ uploads: true, ai: true, shared: false, storage: true })
    const [darkMode, setDarkMode] = useState(true)
    const [twoFA, setTwoFA] = useState(false)

    return (
        <div className="p-6 max-w-3xl mx-auto space-y-5">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 text-sm mt-1">Manage your account preferences and configuration</p>
            </motion.div>

            {/* Profile */}
            <Section title="Profile" delay={0.05}>
                <div className="flex items-center gap-4 pb-4 border-b border-white/5">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                        A
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-white">Ahmed Khan</h2>
                        <p className="text-sm text-slate-400">ahmed@cloudoptix.io</p>
                        <span className="mt-1 inline-block text-xs text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">Pro Plan</span>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all"
                    >
                        Edit Profile
                    </motion.button>
                </div>
                <SettingRow icon={Mail} label="Email" sub="ahmed@cloudoptix.io">
                    <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                        Change <ChevronRight size={12} />
                    </button>
                </SettingRow>
                <SettingRow icon={Lock} label="Password" sub="Last changed 3 months ago">
                    <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors">
                        Update <ChevronRight size={12} />
                    </button>
                </SettingRow>
            </Section>

            {/* Appearance */}
            <Section title="Appearance" delay={0.1}>
                <SettingRow icon={Palette} label="Dark Mode" sub="Use dark theme across the entire app">
                    <ToggleSwitch enabled={darkMode} onChange={setDarkMode} />
                </SettingRow>
            </Section>

            {/* Notifications */}
            <Section title="Notifications" delay={0.15}>
                {[
                    { key: 'uploads', label: 'Upload Alerts', sub: 'Notify when uploads finish' },
                    { key: 'ai', label: 'AI Insights', sub: 'Duplicate & optimization alerts' },
                    { key: 'shared', label: 'Shared File Activity', sub: 'When someone views your shared file' },
                    { key: 'storage', label: 'Storage Warnings', sub: 'Alert when storage exceeds 80%' },
                ].map(({ key, label, sub }) => (
                    <SettingRow key={key} icon={Bell} label={label} sub={sub}>
                        <ToggleSwitch
                            enabled={notifs[key]}
                            onChange={v => setNotifs(p => ({ ...p, [key]: v }))}
                        />
                    </SettingRow>
                ))}
            </Section>

            {/* Security */}
            <Section title="Security" delay={0.2}>
                <SettingRow icon={Shield} label="Two-Factor Authentication" sub="Add an extra layer of account security">
                    <ToggleSwitch enabled={twoFA} onChange={setTwoFA} />
                </SettingRow>
            </Section>

            {/* Storage */}
            <Section title="Storage Overview" delay={0.25}>
                <StorageBar used={68} total={100} />
            </Section>
        </div>
    )
}
