import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, Lock, Eye, EyeOff } from 'lucide-react'
import AuthLayout from '../components/ui/AuthLayout'
import InputField from '../components/auth/InputField'
import FormError from '../components/auth/FormError'
import StepDots from '../components/auth/StepDots'
import { fieldVariants as fv } from '../utils/authAnimations'

/* 3-step flow: email → new-password → done */
const STEPS = ['email', 'reset', 'done']

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [showPwd, setShowPwd] = useState(false)
    const [showCfm, setShowCfm] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    /* ── Step 0: send reset link ── */
    const handleSendLink = async (e) => {
        e.preventDefault()
        setError('')
        if (!email || !/\S+@\S+\.\S+/.test(email)) { setError('Please enter a valid email address.'); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 1400))
        setLoading(false)
        setStep(1)
    }

    /* ── Step 1: set new password (after link click) ── */
    const handleReset = async (e) => {
        e.preventDefault()
        setError('')
        if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
        if (password !== confirm) { setError('Passwords do not match.'); return }
        setLoading(true)
        await new Promise(r => setTimeout(r, 1400))
        setLoading(false)
        setStep(2)
    }

    const titles = ['Reset your password', 'Set new password', 'Password updated!']
    const subtitles = ["Enter your email and we'll send a reset link.",
        'Choose a strong new password for your account.',
        'Your password has been changed successfully.']

    return (
        <AuthLayout title={titles[step]} subtitle={subtitles[step]}>

            <StepDots steps={STEPS} current={step} />

            <AnimatePresence mode="wait">

                {/* ══ STEP 0: Enter email ══ */}
                {step === 0 && (
                    <motion.form
                        key="step-email"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35 }}
                        onSubmit={handleSendLink}
                        className="flex flex-col gap-4"
                    >
                        <motion.p custom={0} initial="hidden" animate="visible" variants={fv} className="text-sm text-white/50 text-center -mt-2 mb-2">
                            We'll email a secure link to reset your password.
                        </motion.p>

                        <motion.div custom={1} initial="hidden" animate="visible" variants={fv}>
                            <InputField
                                icon={Mail}
                                type="email"
                                placeholder="you@company.com"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setError('') }}
                                autoFocus
                            />
                        </motion.div>

                        <FormError error={error} />

                        <motion.button
                            custom={3}
                            initial="hidden"
                            animate="visible"
                            variants={fv}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending link…</>
                            ) : (
                                <>Send Reset Link <ArrowRight size={16} /></>
                            )}
                        </motion.button>
                    </motion.form>
                )}

                {/* ══ STEP 1: Set new password ══ */}
                {step === 1 && (
                    <motion.form
                        key="step-reset"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35 }}
                        onSubmit={handleReset}
                        className="flex flex-col gap-4"
                    >
                        {/* Email confirmation badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2.5 glass px-4 py-2.5 rounded-xl border border-green-500/20"
                        >
                            <CheckCircle2 size={15} className="text-green-400 shrink-0" />
                            <span className="text-sm text-white/60 truncate">Link sent to <span className="text-white font-medium">{email}</span></span>
                        </motion.div>

                        {/* New password */}
                        <motion.div custom={1} initial="hidden" animate="visible" variants={fv}>
                            <InputField
                                icon={Lock}
                                type={showPwd ? 'text' : 'password'}
                                placeholder="New password"
                                value={password}
                                onChange={e => { setPassword(e.target.value); setError('') }}
                                autoFocus
                                rightEl={
                                    <button type="button" onClick={() => setShowPwd(v => !v)} className="text-white/30 hover:text-white/70 transition-colors">
                                        {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                }
                            />
                        </motion.div>

                        {/* Confirm password */}
                        <motion.div custom={2} initial="hidden" animate="visible" variants={fv}>
                            <InputField
                                icon={Lock}
                                type={showCfm ? 'text' : 'password'}
                                placeholder="Confirm new password"
                                value={confirm}
                                onChange={e => { setConfirm(e.target.value); setError('') }}
                                style={confirm && confirm !== password ? { borderColor: 'rgba(239,68,68,0.4)' } : {}}
                                rightEl={
                                    <button type="button" onClick={() => setShowCfm(v => !v)} className="text-white/30 hover:text-white/70 transition-colors">
                                        {showCfm ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                }
                            />
                        </motion.div>

                        <FormError error={error} />

                        <motion.button
                            custom={4}
                            initial="hidden"
                            animate="visible"
                            variants={fv}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit"
                            disabled={loading}
                            className="btn-primary flex items-center justify-center gap-2 py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Updating password…</>
                            ) : (
                                <>Reset Password <ArrowRight size={16} /></>
                            )}
                        </motion.button>
                    </motion.form>
                )}

                {/* ══ STEP 2: Done ══ */}
                {step === 2 && (
                    <motion.div
                        key="step-done"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-6 py-4"
                    >
                        {/* Animated check */}
                        <div className="relative">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                                className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30"
                            >
                                <CheckCircle2 size={44} className="text-green-400" />
                            </motion.div>
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1.6, opacity: 0 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="absolute inset-0 rounded-full bg-green-500/20"
                            />
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">All good!</h3>
                            <p className="text-sm text-white/50">Your password has been reset. Sign in with your new credentials.</p>
                        </div>

                        <Link to="/login" className="w-full">
                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="btn-primary w-full flex items-center justify-center gap-2 py-3.5"
                            >
                                Back to Sign In <ArrowRight size={16} />
                            </motion.button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Back link (steps 0 & 1) */}
            {step < 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center mt-6"
                >
                    {step === 1 ? (
                        <button
                            onClick={() => { setStep(0); setError('') }}
                            className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        >
                            <ArrowLeft size={14} /> Use a different email
                        </button>
                    ) : (
                        <Link to="/login" className="flex items-center gap-1.5 text-sm text-purple-400 hover:text-purple-300 transition-colors">
                            <ArrowLeft size={14} /> Back to sign in
                        </Link>
                    )}
                </motion.div>
            )}
        </AuthLayout>
    )
}
