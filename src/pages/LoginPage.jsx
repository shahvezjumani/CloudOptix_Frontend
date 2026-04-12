import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import AuthLayout from '../components/ui/AuthLayout'
import InputField from '../components/auth/InputField'
import SocialButtons from '../components/auth/SocialButtons'
import FormError from '../components/auth/FormError'
import { fieldVariants } from '../utils/authAnimations'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!email || !password) { setError('Please fill in all fields.'); return }
        setLoading(true)
        // Simulated API call
        await new Promise(r => setTimeout(r, 1400))
        setLoading(false)
        // navigate('/dashboard')
    }

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to continue to CloudOptix">
            <SocialButtons dividerLabel="or continue with email" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <motion.div custom={2} initial="hidden" animate="visible" variants={fieldVariants}>
                    <InputField
                        icon={Mail}
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </motion.div>

                <motion.div custom={3} initial="hidden" animate="visible" variants={fieldVariants}>
                    <InputField
                        icon={Lock}
                        type={showPwd ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        rightEl={
                            <button
                                type="button"
                                onClick={() => setShowPwd(v => !v)}
                                className="text-white/30 hover:text-white/70 transition-colors"
                            >
                                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        }
                    />
                </motion.div>

                {/* Remember + Forgot */}
                <motion.div custom={4} initial="hidden" animate="visible" variants={fieldVariants} className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer group">
                        <div className="relative w-4 h-4">
                            <input type="checkbox" className="peer sr-only" />
                            <div className="w-4 h-4 rounded border border-white/15 peer-checked:border-purple-500 peer-checked:bg-purple-500 transition-all duration-200 group-hover:border-purple-400" />
                        </div>
                        <span className="text-xs text-white/50">Remember me</span>
                    </label>
                    <Link to="/forgot-password" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">
                        Forgot password?
                    </Link>
                </motion.div>

                <FormError error={error} />

                {/* Submit */}
                <motion.button
                    custom={5}
                    initial="hidden"
                    animate="visible"
                    variants={fieldVariants}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading}
                    className="btn-primary flex items-center justify-center gap-2 py-3.5 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Signing in…
                        </>
                    ) : (
                        <>Sign In <ArrowRight size={16} /></>
                    )}
                </motion.button>
            </form>

            {/* Sign up link */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-sm text-white/40 mt-6"
            >
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                    Create one free
                </Link>
            </motion.p>
        </AuthLayout>
    )
}
