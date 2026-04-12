import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react'
import AuthLayout from '../components/ui/AuthLayout'
import OTPInputGrid from '../components/auth/OTPInputGrid'
import FormError from '../components/auth/FormError'

const OTP_LENGTH = 6

export default function OTPPage() {
    const location = useLocation()
    const navigate = useNavigate()
    const email = location.state?.email || 'your email'

    const [digits, setDigits] = useState(Array(OTP_LENGTH).fill(''))
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)
    const [resent, setResent] = useState(false)
    const [cooldown, setCooldown] = useState(0)
    const inputRefs = useRef([])
    const timerRef = useRef(null)

    /* Start 60-s resend cooldown on mount */
    useEffect(() => {
        startCooldown()
        return () => clearInterval(timerRef.current)
    }, [])

    const startCooldown = () => {
        setCooldown(60)
        clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setCooldown(c => { if (c <= 1) { clearInterval(timerRef.current); return 0 } return c - 1 })
        }, 1000)
    }

    const handleChange = (index, val) => {
        const char = val.replace(/\D/g, '').slice(-1)
        const next = [...digits]
        next[index] = char
        setDigits(next)
        setError('')
        if (char && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
    }

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !digits[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
        if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus()
        if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
        const next = [...digits]
        pasted.split('').forEach((c, i) => { next[i] = c })
        setDigits(next)
        const focusIdx = Math.min(pasted.length, OTP_LENGTH - 1)
        inputRefs.current[focusIdx]?.focus()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const code = digits.join('')
        if (code.length < OTP_LENGTH) { setError('Please enter all 6 digits.'); return }
        setLoading(true)
        setError('')
        await new Promise(r => setTimeout(r, 1500))
        setLoading(false)
        // Simulate valid OTP
        if (code === '000000') { setError('Incorrect code. Please try again.'); return }
        setSuccess(true)
        setTimeout(() => navigate('/login'), 2200)
    }

    const handleResend = async () => {
        if (cooldown > 0) return
        setResent(true)
        startCooldown()
        await new Promise(r => setTimeout(r, 800))
        setResent(false)
    }

    const isComplete = digits.every(d => d !== '')

    return (
        <AuthLayout
            title="Check your email"
            subtitle={
                <span>
                    We sent a 6-digit code to{' '}
                    <span className="text-white font-medium">{email}</span>
                </span>
            }
        >
            {/* Shield icon */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="flex justify-center mb-7"
            >
                <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-500/20">
                        <ShieldCheck size={36} className="text-purple-400" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl animate-glow-pulse" />
                </div>
            </motion.div>

            {/* Success overlay */}
            <AnimatePresence>
                {success && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-2xl z-20 gap-4"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                            className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center"
                        >
                            <ShieldCheck size={36} className="text-green-400" />
                        </motion.div>
                        <div className="text-white font-bold text-lg">Verified!</div>
                        <div className="text-white/50 text-sm">Redirecting you in…</div>
                    </motion.div>
                )}
            </AnimatePresence>

            <form onSubmit={handleSubmit}>
                <OTPInputGrid
                    digits={digits}
                    inputRefs={inputRefs}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    error={error}
                />

                {/* Hint */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs text-white/30 mb-4"
                >
                    Tip: paste your code directly into any digit box
                </motion.p>

                <FormError error={error} className="mb-4" />

                {/* Submit */}
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={loading || !isComplete}
                    className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? (
                        <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying…</>
                    ) : (
                        <>Verify Email <ArrowRight size={16} /></>
                    )}
                </motion.button>
            </form>

            {/* Resend */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="flex items-center justify-center gap-2 mt-6"
            >
                <span className="text-sm text-white/40">Didn't receive the code?</span>
                <button
                    onClick={handleResend}
                    disabled={cooldown > 0 || resent}
                    className={`flex items-center gap-1.5 text-sm font-medium transition-all duration-200 ${cooldown > 0 ? 'text-white/25 cursor-not-allowed' : 'text-purple-400 hover:text-purple-300 cursor-pointer'
                        }`}
                >
                    {resent ? (
                        <><div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                    ) : (
                        <><RotateCcw size={13} /> {cooldown > 0 ? `Resend in ${cooldown}s` : 'Resend'}</>
                    )}
                </button>
            </motion.div>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }} className="text-center text-sm text-white/40 mt-4">
                <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">← Back to sign in</Link>
            </motion.p>
        </AuthLayout>
    )
}
