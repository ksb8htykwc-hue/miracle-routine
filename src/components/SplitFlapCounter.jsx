import { useEffect, useRef, useState } from 'react'

function Digit({ char }) {
  const [flip, setFlip] = useState(false)
  const prev = useRef(char)

  useEffect(() => {
    if (prev.current !== char) {
      setFlip(true)
      prev.current = char
      const t = setTimeout(() => setFlip(false), 260)
      return () => clearTimeout(t)
    }
  }, [char])

  return (
    <span className={`flap ${flip ? 'flap--flip' : ''}`}>
      <span className="flap__value">{char}</span>
      <span className="flap__line" />
    </span>
  )
}

export default function SplitFlapCounter({ value, size = 'lg' }) {
  const digits = String(value).split('')
  return (
    <div className={`splitflap splitflap--${size}`}>
      {digits.map((char, i) => (
        <Digit key={`${digits.length}-${i}`} char={char} />
      ))}
    </div>
  )
}
