import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react'
import AuthLayout from '../components/ui/AuthLayout'
import InputField from '../components/auth/InputField'
import SocialButtons from '../components/auth/SocialButtons'
import FormError from '../components/auth/FormError'
import PasswordStrengthMeter from '../components/auth/PasswordStrengthMeter'
import { fieldVariants } from '../utils/authAnimations'

const PASSWORD_RULES = [
    { label: 'At least 8 characters', test: (p) => p.length >= 8 },
    { label: 'One uppercase letter', test: (p) => /[A-Z]/.test(p) },
    { label: 'One number', test: (p) => /\d/.test(p) },
    { label: 'One special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
]

export default function SignupPage() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [agreed, setAgreed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [pwdFocus, setPwdFocus] = useState(false)

    const strength = PASSWORD_RULES.filter(r => r.test(password)).length
    const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength]
    const strengthColor = ['', '#ef4444', '#f97316', '#eab308', '#22c55e'][strength]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        if (!name || !email || !password) { setError('Please fill in all fields.'); return }
        if (strength < 2) { setError('Please choose a stronger password.'); return }
        if (!agreed) { setError('Please accept the terms to continue.'); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 1400))
        setLoading(false)
        navigate('/otp', { state: { email } })
    }

    return (
        <AuthLayout title="Create your account" subtitle="Start optimising your cloud in minutes">
            <SocialButtons dividerLabel="or with email" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <motion.div custom={2} initial="hidden" animate="visible" variants={fieldVariants}>
                    <InputField icon={User} type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
                </motion.div>
                <motion.div custom={3} initial="hidden" animate="visible" variants={fieldVariants}>
                    <InputField icon={Mail} type="email" placeholder="you@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                </motion.div>
                <motion.div custom={4} initial="hidden" animate="visible" variants={fieldVariants}>
                    <InputField
                        icon={Lock}
                        type={showPwd ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        rightEl={
                            <button type="button" onClick={() => setShowPwd(v => !v)} onFocus={() => setPwdFocus(true)} onBlur={() => setPwdFocus(false)} className="text-white/30 hover:text-white/70 transition-colors">
                                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        }
                    />
                    <PasswordStrengthMeter
                        password={password}
                        strength={strength}
                        strengthColor={strengthColor}
                        strengthLabel={strengthLabel}
                        rules={PASSWORD_RULES}
                    />
                </motion.div>

                {/* Terms */}
                <motion.div custom={5} initial="hidden" animate="visible" variants={fieldVariants}>
                    <label className="flex items-start gap-2.5 cursor-pointer group">
                        <div
                            onClick={() => setAgreed(v => !v)}
                            className={`mt-0.5 w-4 h-4 rounded shrink-0 border flex items-center justify-center transition-all duration-200 ${agreed ? 'bg-purple-500 border-purple-500' : 'border-white/20 group-hover:border-purple-400'
                                }`}
                        >
                            {agreed && <CheckCircle2 size={10} className="text-white" />}
                        </div>
                        <span className="text-xs text-white/50 leading-relaxed">
                            I agree to CloudOptix's{' '}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</a>
                        </span>
                    </label>
                </motion.div>

                <FormError error={error} />

                {/* Submit */}
                <motion.button
                    custom={6}
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
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account…</>
                    ) : (
                        <>Create Account <ArrowRight size={16} /></>
                    )}
                </motion.button>
            </form>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="text-center text-sm text-white/40 mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">Sign in</Link>
            </motion.p>
        </AuthLayout>
    )
}
