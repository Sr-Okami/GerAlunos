import { useState } from 'react'
import { diasRestantes } from '../utils/datas'

function DataLimite({ atestados, onDispensar }) {
  const [aberto, setAberto] = useState(false)
  const quantidade = atestados.length

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setAberto(!aberto)}
        className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 text-white transition relative cursor-pointer"
      >
        Data Limite
      </button>

      {quantidade > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5">
          {quantidade}
        </span>
      )}

      {aberto && (
        <div className="absolute right-0 mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg z-50 p-2">
          <p className="text-xs text-neutral-400 px-2 py-1">
            Confira se já lançou no outro sistema:
          </p>

          {quantidade === 0 && (
            <p className="text-sm text-neutral-500 px-2 py-3">
              Nada vencendo nos próximos dias.
            </p>
          )}

          {atestados.map((atestado) => {
            const dias = diasRestantes(atestado.ateData)
            return (
              <div
                key={atestado.id}
                className="px-2 py-2 border-t border-neutral-800 flex justify-between items-center gap-2"
              >
                <div>
                  <p className="text-sm">{atestado.nome}</p>
                  <p className="text-xs text-neutral-500">
                    {atestado.turmaNumero} - {atestado.turmaLetra}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      dias < 0
                        ? 'bg-red-900 text-red-400'
                        : 'bg-yellow-900 text-yellow-400'
                    }`}
                  >
                    {dias < 0 ? `${Math.abs(dias)}d atrasado` : `${dias}d restantes`}
                  </span>
                  <button
                    onClick={() => onDispensar(atestado.id)}
                    title="Já conferi, dispensar"
                    className="text-neutral-500 hover:text-neutral-300 text-xs cursor-pointer px-1"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DataLimite
