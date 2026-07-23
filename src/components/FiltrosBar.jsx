
function FiltrosBar({
  numeros,
  letras,
  onNovoAtestado,
  ordenarPor,
  onOrdenarChange,
  busca,
  onBuscaChange,
  turmaNumeroSelecionada,
  onTurmaNumeroChange,
  turmaLetraSelecionada,
  onTurmaLetraChange,
  mesSelecionado,
  onMesChange,
  tipoSelecionado,
  onTipoChange,
  onLimparFiltros,
}) {

  return (
    <div className="flex justify-between items-center mb-4 gap-3 flex-wrap">
      <div className="flex gap-3">
        {/* selecionar a turma */}
        <select
          value={turmaNumeroSelecionada}
          onChange={(e) => onTurmaNumeroChange(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Todos os números</option>
          {numeros.map((numero) => (
            <option key={numero} value={numero}>
              {numero}
            </option>
          ))}
        </select>

        <select
          value={turmaLetraSelecionada}
          onChange={(e) => onTurmaLetraChange(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Todas as letras</option>
          {letras.map((letra) => (
            <option key={letra} value={letra}>
              {letra}
            </option>
          ))}
        </select>

        {/* selecionar o mês */}
        <select
          value={mesSelecionado}
          onChange={(e) => onMesChange(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm"
        >
          <option value="">Todos os meses</option>
          <option value="01">(01) Janeiro</option>
          <option value="02">(02) Fevereiro</option>
          <option value="03">(03) Março</option>
          <option value="04">(04) Abril</option>
          <option value="05">(05) Maio</option>
          <option value="06">(06) Junho</option>
          <option value="07">(07) Julho</option>
          <option value="08">(08) Agosto</option>
          <option value="09">(09) Setembro</option>
          <option value="10">(10) Outubro</option>
          <option value="11">(11) Novembro</option>
          <option value="12">(12) Dezembro</option>
        </select>
        {/* selecionar o tipo de justificaiva */}
        <select
          value={tipoSelecionado}
          onChange={(e) => onTipoChange(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm w-48"
        >
          <option value="">Todos os tipos</option>
          <option value="Atestado">Atestado</option>
          <option value="Receituário">Receituário</option>
          <option value="Declaração">Declaração</option>
          <option value="Laudo">Laudo</option>
          <option value="Declaração Religiosa">Declaração Religiosa</option>
          <option value="Justificado">Justificado</option>
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
          onChange={(e) => onBuscaChange(e.target.value)}
          className="bg-neutral-900 border border-neutral-800 rounded-md px-3 py-2 text-sm w-48"
        />

        <button
          onClick={onLimparFiltros}
          className="bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 rounded-md px-3 py-2 text-sm cursor-pointer"
        >
          Limpar
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
