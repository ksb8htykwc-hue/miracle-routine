export default function GlassPanel({ children, dark = false, className = '' }) {
  return (
    <div
      className={`w-full max-w-md rounded-[28px] border backdrop-blur-2xl p-6 shadow-[0_8px_40px_rgba(0,0,0,0.4)] ${
        dark
          ? 'bg-glass-dark border-glass-faint border-t-glass-faint'
          : 'bg-glass-sm border-glass border-t-glass'
      } ${className}`}
    >
      {children}
    </div>
  )
}
