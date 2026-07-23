import { useEffect, useRef } from 'react'

export function useClickOutside(aberto, aoFechar) {
  const ref = useRef(null)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        aoFechar()
      }
    }

    document.addEventListener('mousedown', handleClick)

    return () => {
      document.removeEventListener('mousedown', handleClick)
    }
  }, [aberto, aoFechar])

  return ref
}
