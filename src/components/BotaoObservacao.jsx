import { useState } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'


function BotaoObservacao({ obs }) {
  const [aberto, setAberto] = useState(false)
  const ref = useClickOutside(aberto, () => setAberto(false))

  if (!obs || obs.trim() === '') return null
  return (
    <div className="relative inline-block" ref={ref}>
      <button onClick={() => setAberto(!aberto)}
        title="Ver Observação"
        className="text-neutral-500 hover:text-amber-400 cursor-pointer"
      >
        📝
      </button>
      {
        aberto && (
          <div className="absolute left-0 mt-2 w-56 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg z-50 p-3">
            <p className="text-sm text-neutral-200">{obs}</p>
          </div>
        )}
    </div>
  )
}

export default BotaoObservacao
