import XLSX from 'xlsx'
import path from 'path'
import fs from 'fs'
import { getDadosDir } from './paths.js'

XLSX.set_fs(fs)

const COLUNAS = ['id', 'turmaNumero', 'turmaLetra', 'nome', 'data', 'ateData', 'dias', 'tipo', 'obs', 'lancado']

function nomeArquivoMesAtual() {
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  return `${ano}-${mes}.xlsx`
}

function caminhoArquivoMesAtual() {
  return path.join(getDadosDir(), nomeArquivoMesAtual())
}

export function lerAtestados() {
  const caminho = caminhoArquivoMesAtual()

  if (!fs.existsSync(caminho)) {
    return []
  }

  const workbook = XLSX.readFile(caminho)
  const planilha = workbook.Sheets[workbook.SheetNames[0]]
  const linhas = XLSX.utils.sheet_to_json(planilha)

  return linhas
}

export function salvarAtestados(atestados) {
  const caminho = caminhoArquivoMesAtual()

  const linhas = atestados.map((atestado) => {
    const linha = {}
    for (const coluna of COLUNAS) {
      linha[coluna] = atestado[coluna] ?? ''
    }
    return linha
  })

  const planilha = XLSX.utils.json_to_sheet(linhas, { header: COLUNAS })
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, planilha, 'Atestados')

  XLSX.writeFile(workbook, caminho)
}
