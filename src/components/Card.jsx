export default function Card({ children, className = '', neo = false, ...rest }) {
  return (
    <div className={`card ${neo ? 'neo' : ''} ${className}`} {...rest}>
      {children}
    </div>
  )
}
