import { useState } from 'react'

function motivoAtencao(atestado) {
  const motivos = []
  if (atestado.tipo === 'Laudo' || atestado.tipo === 'Declaração Religiosa') {
    motivos.push(atestado.tipo)
  }
  if (Number(atestado.dias) > 10) {
    motivos.push('+10 dias')
  }
  if (atestado.obs && atestado.obs.trim() !== '') {
    motivos.push('Com observação')
  }
  return motivos.join(' · ')
}

function Atencao({ atestados }) {
  const [aberto, setAberto] = useState(false)
  const quantidade = atestados.length

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setAberto(!aberto)}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition relative cursor-pointer"
      >
        Atenção
      </button>

      {quantidade > 0 && (
        <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full px-1.5">
          {quantidade}
        </span>
      )}

      {aberto && (
        <div className="absolute right-0 mt-2 w-72 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg z-50 p-2">
          <p className="text-xs text-neutral-400 px-2 py-1">
            Atestados que merecem atenção:
          </p>

          {quantidade === 0 && (
            <p className="text-sm text-neutral-500 px-2 py-3">
              Nada de especial no momento.
            </p>
          )}

          {atestados.map((atestado) => (
            <div
              key={atestado.id}
              className="px-2 py-2 border-t border-neutral-800"
            >
              <p className="text-sm">{atestado.nome}</p>
              <p className="text-xs text-neutral-500">
                {atestado.turmaNumero} - {atestado.turmaLetra}
              </p>
              <p className="text-xs text-yellow-500 mt-1">
                {motivoAtencao(atestado)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Atencao
