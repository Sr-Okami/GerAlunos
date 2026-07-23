import { useState } from 'react'
import AtestadosTable from "./components/AtestadosTable"
//import { mockAtestados } from "./data/mockAtestados"
import FiltrosBar from "./components/FiltrosBar"
import Atencao from "./components/Atencao"
import DataLimite from "./components/DataLimite"
import NovoAtestado from "./components/NovoAtestado"
import { diasRestantes } from './utils/datas'
import { numeros } from './data/turmas'
import { letras } from './data/turmas'
import { useEffect } from 'react'


function App() {
  const [atestados, setAtestados] = useState([])
  const [carregado, setCarregado] = useState(false)
  const [modalAberto, setModalAberto] = useState(false)
  const [atestadoEditando, setAtestadoEditando] = useState(null)
  const [dispensados, setDispensados] = useState([])
  const [ordenar, setOrdenar] = useState('nome-asc')
  const [busca, setBusca] = useState('')
  const [turmaNumeroSelecionada, setTurmaNumeroSelecionada] = useState('')
  const [turmaLetraSelecionada, setTurmaLetraSelecionada] = useState('')
  const [mesSelecionado, setMesSelecionado] = useState('')
  const [tipoSelecionado, setTipoSelecionado] = useState('')
  const [dispensadosAtencao, setDispensadosAtencao] = useState([])

  useEffect(() => {
    window.api.lerAtestados().then((dados) => {
      setAtestados(dados)
      setCarregado(true)
    })
  }, [])

  useEffect(() => {
      if (!carregado) return
      window.api.salvarAtestados(atestados)
    }, [atestados, carregado])


  const atestadosFiltrados = atestados.filter((atestado) => {
    const bateBusca = atestado.nome.toLowerCase().includes(busca.toLowerCase())
    const bateTurma = (turmaNumeroSelecionada === '' || atestado.turmaNumero === turmaNumeroSelecionada) && (turmaLetraSelecionada === '' || atestado.turmaLetra === turmaLetraSelecionada)
    const bateMes = mesSelecionado === '' || atestado.data.split('-')[1] === mesSelecionado
    const bateTipo = tipoSelecionado === '' || atestado.tipo === tipoSelecionado
    return bateBusca && bateTurma && bateMes && bateTipo
  })
  const atestadosOrdenados = [...atestadosFiltrados].sort((a, b) => {
    if (ordenar === 'nome-asc') return a.nome.localeCompare(b.nome)
    if (ordenar === 'nome-desc') return b.nome.localeCompare(a.nome)
    if (ordenar === 'data-asc') return a.data.localeCompare(b.data)
    if (ordenar === 'data-desc') return b.data.localeCompare(a.data)
    return 0
  })

  const handleSalvarAtestado = (novoAtestado) => {
    const novo = {
      id: Date.now(),
      ...novoAtestado,
      status: 'ativo'
    }
    setAtestados(prev => [novo, ...prev])
  }

  const handleExcluirAtestado = (id) => {
    setAtestados(prev =>
      prev.filter(atestado =>
        atestado.id !== id))
  }
  const handleAbrirEdicao = (atestado) => {
    setAtestadoEditando(atestado)
    setModalAberto(true)
  }

  const handleAtualizarAtestado = (dadosAtualizados) => {
    setAtestados(prev =>
      prev.map(atestado =>
        atestado.id === atestadoEditando.id
          ? { ...atestado, ...dadosAtualizados }
          : atestado
      )
    )
    setAtestadoEditando(null)
  }
  const handleFecharModal = () => {
    setModalAberto(false)
    setAtestadoEditando(null)
  }
  const handleToggleLancado = (id) => {
    setAtestados(prev =>
      prev.map(atestado =>
        atestado.id === id ?
          { ...atestado, lancado: !atestado.lancado } :
          atestado
      )
    )
  }
  const atestadosVencendo = atestados.filter((atestado) => {
    const dias = diasRestantes(atestado.ateData)
    return dias !== null && dias <= 4 && !dispensados.includes(atestado.id)
  })
  const handleDispensar = (id) => {
    setDispensados(prev => [...prev, id])
  }
  const handleDispensarAtencao = (id) => {
    const confirmar = window.confirm('Tem certeza que deseja remover este atestado da lista')
    if (confirmar) {
      setDispensadosAtencao(prev => [...prev, id])
    }
  }
  const tiposEspeciais = ['Laudo', 'Declaração Religiosa']

  const atestadosAtencao = atestados.filter((atestado) => {
    const tiposEspecial = tiposEspeciais.includes(atestado.tipo)
    const muitosDias = Number(atestado.dia) > 10
    const temObservacao = atestado.obs && atestado.obs.trim() !== ''
    const dataIndeterminada = !atestado.ateData
    return (tiposEspecial || muitosDias || temObservacao || dataIndeterminada) && !dispensadosAtencao.includes(atestado.id)
  })
  const handleLimparFiltros = () => {
    setBusca('')
    setTurmaNumeroSelecionada('')
    setTurmaLetraSelecionada('')
    setMesSelecionado('')
    setTipoSelecionado('')
  }


  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">GerAlunos</h1>
        <div className="flex gap-2">
          <Atencao
            atestados={atestadosAtencao}
            onDispensar={handleDispensarAtencao}
          />
          <DataLimite
            atestados={atestadosVencendo}
            onDispensar={handleDispensar}
          />
        </div>
      </div>

      <FiltrosBar
        numeros={numeros}
        letras={letras}
        onNovoAtestado={() => setModalAberto(true)}
        ordenarPor={ordenar}
        onOrdenarChange={setOrdenar}
        busca={busca}
        onBuscaChange={setBusca}
        turmaNumeroSelecionada={turmaNumeroSelecionada}
        onTurmaNumeroChange={setTurmaNumeroSelecionada}
        turmaLetraSelecionada={turmaLetraSelecionada}
        onTurmaLetraChange={setTurmaLetraSelecionada}
        mesSelecionado={mesSelecionado}
        onMesChange={setMesSelecionado}
        tipoSelecionado={tipoSelecionado}
        onTipoChange={setTipoSelecionado}
        onLimparFiltros={handleLimparFiltros}
      />

      <div className="border border-neutral-800 rounded-lg">
        <AtestadosTable
          atestados={atestadosOrdenados}
          onExcluir={handleExcluirAtestado}
          onToggleLancado={handleToggleLancado}
          onEditar={handleAbrirEdicao}
        />
      </div>

      <NovoAtestado
        isOpen={modalAberto}
        onClose={handleFecharModal}
        onSalvar={handleSalvarAtestado}
        onAtualizar={handleAtualizarAtestado}
        atestadoEditando={atestadoEditando}
      />
    </div>
  )
}

export default App
