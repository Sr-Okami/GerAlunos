import { useState, useEffect } from 'react'

function NovoAtestado({ isOpen, onClose, onSalvar }) {
  const [formData, setFormData] = useState({
    nome: '',
    turmaNumero: '',
    turmaLetra: '',
    data: '',
    ateData: '',
    dias: '',
    obs: '',
    tipo: 'Atestado'
  })

  // Função para calcular dias úteis (segunda a sexta)
  const calcularDiasUteis = (dataInicio, dataFim) => {
    if (!dataInicio || !dataFim) return 0

    const inicio = new Date(dataInicio)
    const fim = new Date(dataFim)

    if (fim < inicio) return 0

    let diasUteis = 0
    const dataAtual = new Date(inicio)

    while (dataAtual <= fim) {
      const diaSemana = dataAtual.getDay()
      // 0 = domingo, 6 = sábado
      if (diaSemana !== 0 && diaSemana !== 6) {
        diasUteis++
      }
      dataAtual.setDate(dataAtual.getDate() + 1)
    }

    return diasUteis
  }

  // Função para calcular dias corridos (inclui finais de semana)
  const calcularDiasCorridos = (dataInicio, dataFim) => {
    if (!dataInicio || !dataFim) return 0

    const inicio = new Date(dataInicio)
    const fim = new Date(dataFim)

    if (fim < inicio) return 0

    const diferenca = fim - inicio
    return Math.floor(diferenca / (1000 * 60 * 60 * 24)) + 1
  }

  // Atualiza os dias automaticamente quando data ou ateData mudarem
  useEffect(() => {
    if (formData.data && formData.ateData) {
      const diasUteis = calcularDiasUteis(formData.data, formData.ateData)
      // const diasCorridos = calcularDiasCorridos(formData.data, formData.ateData)

      setFormData(prev => ({
        ...prev,
        dias: diasUteis.toString()
      }))
    }
  }, [formData.data, formData.ateData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSalvar(formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-lg p-6 w-full max-w-md border border-neutral-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Novo Atestado</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            {/* Aluno */}
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Aluno</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
                required
              />
            </div>

            {/* Turma */}
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Turma</label>
              <div className="flex gap-2">
                <select
                  name="turmaNumero"
                  value={formData.turmaNumero}
                  onChange={handleChange}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Selecione</option>
                  <option value="II">II</option>
                  <option value="III">III</option>
                  <option value="IV">IV</option>
                  <option value="V">V</option>
                </select>
                <select
                  name="turmaLetra"
                  value={formData.turmaLetra}
                  onChange={handleChange}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Selecione</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                  <option value="E">E</option>
                  <option value="F">F</option>
                </select>
              </div>
            </div>

            {/* Data */}
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Data</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
                required
              />
            </div>

            {/* Data Limite */}
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Data Limite</label>
              <input
                type="date"
                name="ateData"
                value={formData.ateData}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
              />
            </div>

            {/* Dias (automático e somente leitura) */}
            <div>
              <label className="block text-sm text-neutral-400 mb-1">
                Dias úteis
                {formData.data && formData.ateData && (
                  <span className="text-xs text-neutral-500 ml-2">
                    (calculado automaticamente)
                  </span>
                )}
              </label>
              <input
                type="text"
                name="dias"
                value={formData.dias || 'Selecione as datas'}
                readOnly
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm cursor-default"
              />
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Tipo</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm"
              >
                <option value="Atestado">Atestado</option>
                <option value="Receituário">Receituário</option>
                <option value="Declaração">Declaração</option>
                <option value="Laudo">Laudo</option>
                <option value="Declaração Religiosa">Declaração Religiosa</option>
                <option value="Justificado">Justificado</option>
              </select>
            </div>

            {/* Obs */}
            <div>
              <label className="block text-sm text-neutral-400 mb-1">Observação</label>
              <textarea
                name="obs"
                value={formData.obs}
                onChange={handleChange}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-3 py-2 text-sm resize-none h-20"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md text-sm bg-neutral-800 hover:bg-neutral-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-sm bg-amber-500 text-neutral-950 font-medium hover:bg-amber-400"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovoAtestado
