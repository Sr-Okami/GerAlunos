import AtestadosTable from "./components/AtestadosTable"
import { mockAtestados } from "./data/mockAtestados"
import FiltrosBar from "./components/FiltrosBar"
import Atencao from "./components/Atencao"
import DataLimite from "./components/DataLimite"

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">GerAlunos</h1>
        <div className="flex gap-2">
          <Atencao quantidade={15} />
          <DataLimite falta={10} />
        </div>
      </div>

      <FiltrosBar
        turmas={['III - A', 'II - B', 'V - E']}
        onNovoAtestado={() => console.log('clicou em novo atestado')}
      />

      <div className="border border-neutral-800 rounded-lg overflow-hidden">
        <AtestadosTable atestados={mockAtestados} />
      </div>
    </div>
  )
}

export default App
