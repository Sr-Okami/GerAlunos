function AtestadosTable({ atestados }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-neutral-800 text-neutral-400">
          <th className="text-left p-3 font-medium">Turma</th>
          <th className="text-left p-3 font-medium">Nome</th>
          <th className="text-left p-3 font-medium">Data</th>
          <th className="text-left p-3 font-medium">Até Data</th>
          <th className="text-left p-3 font-medium">Dias</th>
          <th className="text-left p-3 font-medium">Tipo</th>
          <th className="text-center p-3 font-medium">Lançado?</th>
          <th className="text-center p-3 font-medium">Editar</th>
        </tr>
      </thead>
      <tbody>
        {atestados.map((atestado) => (
          <tr key={atestado.id} className="border-t border-neutral-800">
            <td className="p-3">{atestado.turma}</td>
            <td className="p-3">{atestado.nome}</td>
            <td className="p-3">{atestado.data}</td>
            <td className="p-3">{atestado.ateData}</td>
            <td className="p-3">{atestado.dias}</td>
            <td className="p-3">{atestado.tipo}</td>
            <td className="p-3 text-center">
              {atestado.lancado ? (
                <span className="bg-green-900 text-green-400 text-xs px-3 py-1 rounded-full">
                  Sim
                </span>
              ) : (
                <span className="bg-yellow-900 text-yellow-400 text-xs px-3 py-1 rounded-full">
                  Não
                </span>
              )}
            </td>
            <td className="p-3 text-center">
              <button className="bg-green-600 text-green-400 hover:bg-green-950 text-xs px-3 py-1 rounded-full cursor-pointer">
                Editar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AtestadosTable
