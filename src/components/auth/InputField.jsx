const InputField = ({ icon: Icon, type, placeholder, value, onChange, rightEl, autoFocus, style }) => (
    <div className="relative">
        <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none z-10" />
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="auth-input"
            autoFocus={autoFocus}
            style={style}
        />
        {rightEl && (
            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 z-10">
                {rightEl}
            </div>
        )}
    </div>
)

export default InputField
