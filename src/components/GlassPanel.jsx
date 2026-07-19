export default function GlassPanel({ children, dark = false, className = '' }) {
  return (
    <div
      className={`w-full max-w-md rounded-[28px] border backdrop-blur-xl p-6 ${
        dark ? 'bg-black/40 border-white/5' : 'bg-white/[0.04] border-white/10'
      } ${className}`}
    >
      {children}
    </div>
  )
}
