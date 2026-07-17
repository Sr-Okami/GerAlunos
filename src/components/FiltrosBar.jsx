import { useState } from 'react'

function FiltrosBar({ turmas, onNovoAtestado }) {
  const [busca, setBusca] = useState('')
  const [turmaSelecionada, setTurmaSelecionada] = useState('todas')

  return (
    <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
      <div className="flex gap-3">
        <select
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm"
        >
          <option value="todas">Todas as turmas</option>
          {turmas.map((turma) => (
            <option key={turma} value={turma}>
              {turma}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar aluno..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm w-48"
        />
      </div>

      <button
        onClick={onNovoAtestado}
        className="bg-amber-500 text-neutral-950 font-medium px-4 py-2 rounded-md text-sm hover:bg-amber-400"
      >
        + Novo atestado
      </button>
    </div>
  )
}

export default FiltrosBar
