import AtestadosTable from "./components/AtestadosTable"
import { mockAtestados } from "./data/mockAtestados"
import FiltrosBar from "./components/FiltrosBar"

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <h1 className="text-2xl font-semibold mb-4"> GerAlunos</h1>
      <FiltrosBar
        turmas={['III - A', 'II - B', 'V - E']}
        onNovoAtestado={() => console.log('clicou em novo atestado')}
      />      <div className="border border-neutral-800 rounded-lg overflow-hidden">
        <AtestadosTable atestados={mockAtestados} />
      </div>
    </div>
  )
}

export default App
