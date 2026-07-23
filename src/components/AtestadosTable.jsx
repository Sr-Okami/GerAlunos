import BotaoExcluir from './BotaoExcluir.jsx'
import BotaoEditar from './BotaoEditar.jsx'
import BotaoCopiar from './BotaoCopiar.jsx'
import { formatarData } from '../utils/datas.js'
import BotaoObservacao from './BotaoObservacao.jsx'


function AtestadosTable({ atestados, onExcluir, onToggleLancado, onEditar }) {
  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-neutral-800 text-neutral-400 rounded-t-lg">
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
            <td className="p-3">{atestado.turmaNumero} - {atestado.turmaLetra}</td>
            <td className="p-3 flex justify-between items-center">{atestado.nome}
              <div className="flex gap-2">
                <BotaoObservacao obs={atestado.obs} />
                <BotaoCopiar texto={atestado.nome} />
              </div></td>
            <td className="p-3">{formatarData(atestado.data)}</td>
            <td className="p-3">
              {atestado.ateData ? (
                atestado.dias
              ) : (
                <span className="bg-purple-900 text-purple-400 text-xs px-2 py-1 rounded-full">
                  Indeterminado
                </span>
              )}
            </td>
            <td className="p-3">{atestado.dias}</td>
            <td className="p-3">{atestado.tipo}</td>
            <td className="p-3 text-center">
              <button onClick={() => onToggleLancado(atestado.id)}>
                {atestado.lancado ? (
                  <span className="bg-green-900 text-green-400 text-xs px-3 py-1 rounded-full">
                    Sim
                  </span>
                ) : (
                  <span className="bg-yellow-900 text-yellow-400 text-xs px-3 py-1 rounded-full">
                    Não
                  </span>
                )}

              </button>
            </td>
            <td className="p-3 text-center gap-2 flex justify-center">
              <BotaoEditar onClick={() => onEditar(atestado)} />
              <BotaoExcluir onClick={() => onExcluir(atestado.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AtestadosTable
