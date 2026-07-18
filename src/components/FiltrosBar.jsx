import { useState } from 'react'

function FiltrosBar({ turmas, onNovoAtestado, ordenarPor, onOrdenarChange }) {
  const [busca, setBusca] = useState('')
  const [turmaSelecionada, setTurmaSelecionada] = useState('todas')
  const [mes, setMes] = useState('')
  const [jus, setJus] = useState('')

  return (
    <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
      <div className="flex gap-3">
        {/* selecionar a turma */}
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
        {/* selecionar o mês */}
        <select
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Todos os meses</option>
          <option value="1">(01) Janeiro</option>
          <option value="2">(02) Fevereiro</option>
          <option value="3">(03) Março</option>
          <option value="4">(04) Abril</option>
          <option value="5">(05) Maio</option>
          <option value="6">(06) Junho</option>
          <option value="7">(07) Julho</option>
          <option value="8">(08) Agosto</option>
          <option value="9">(09) Setembro</option>
          <option value="10">(10) Outubro</option>
          <option value="11">(11) Novembro</option>
          <option value="12">(12) Dezembro</option>
        </select>
        {/* selecionar o tipo de justificaiva */}
        <select
          value={jus}
          onChange={(e) => setJus(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm w-48"
        >
          <option value="">Todos os tipos</option>
          <option value="1">Atestado</option>
          <option value="2">Receituário</option>
          <option value="3">Declaração</option>
          <option value="4">Laudo</option>
          <option value="5">Declaração Religiosa</option>
          <option value="6">Justificado</option>
        </select>

        {/* Filtro e Ordenação */}
        <select
          value={ordenarPor}
          onChange={(e) => onOrdenarChange(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm w-48"
        >
          <option value="nome-asc">Nome (A-Z)</option>
          <option value="nome-desc">Nome (Z-A)</option>
          <option value="data-asc">Data (mais antigo)</option>
          <option value="data-desc">Data (mais recente)</option>
        </select>

        {/* Campo de Busca */}
        <input
          type="text"
          placeholder="Buscar aluno..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm w-48"
        />
        {/* Botão de Buscar */}
        <button
          onClick={() => console.log('buscar', busca, turmaSelecionada, mes)}
          className="bg-blue-900 border hover:bg-blue-800 border-neutral-800 rounded-md px-3 py-2 text-sm cursor-pointer"
        >
          Buscar
        </button>

      </div>

      <button
        onClick={onNovoAtestado}
        className="bg-amber-500 text-neutral-950 font-medium px-4 py-2 rounded-md text-sm hover:bg-amber-400 cursor-pointer"
      >
        + Novo atestado
      </button>
    </div>
  )
}

export default FiltrosBar
