export default function GlassPanel({ children, dark = false, className = '' }) {
  return (
    <div
      className={`w-full max-w-md rounded-[28px] border backdrop-blur-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.55)] ${
        dark
          ? 'bg-black/40 border-white/5 border-t-white/10'
          : 'bg-white/[0.05] border-white/10 border-t-white/20'
      } ${className}`}
    >
      {children}
    </div>
  )
}
