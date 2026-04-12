import { motion } from 'framer-motion'

export default function OTPInputGrid({ digits, inputRefs, onChange, onKeyDown, onPaste, error }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center gap-2.5 mb-6"
            onPaste={onPaste}
        >
            {digits.map((d, i) => (
                <motion.input
                    key={i}
                    ref={el => inputRefs.current[i] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={d}
                    onChange={e => onChange(i, e.target.value)}
                    onKeyDown={e => onKeyDown(i, e)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06 }}
                    className={`otp-input ${d ? 'filled' : ''}`}
                    style={error ? { borderColor: 'rgba(239,68,68,0.5)' } : {}}
                    autoFocus={i === 0}
                />
            ))}
        </motion.div>
    )
}
