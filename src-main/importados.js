import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { getImportadosDir } from './paths.js'

XLSX.set_fs(fs)

const NUMERO_ROMANO = {
  '1': 'I',
  '2': 'II',
  '3': 'III',
  '4': 'IV',
  '5': 'V',
}

function extrairTurmaDoNomeArquivo(nomeArquivo) {
  const semExtensao = nomeArquivo.replace(/\.xlsx$/i, '')
  const partes = semExtensao.split(/[-_\s]+/).filter(Boolean)

  const numero = partes.find((p) => /^\d+$/.test(p))
  const letra = partes.find((p) => /^[A-Fa-f]$/.test(p))

  return {
    turmaNumero: NUMERO_ROMANO[numero] || null,
    turmaLetra: letra ? letra.toUpperCase() : null,
  }
}

export function lerAlunosImportados() {
  const pasta = getImportadosDir()
  const arquivos = fs.readdirSync(pasta).filter((f) => f.endsWith('.xlsx'))

  const alunos = []

  for (const arquivo of arquivos) {
    const { turmaNumero, turmaLetra } = extrairTurmaDoNomeArquivo(arquivo)
    if (!turmaNumero || !turmaLetra) continue

    const workbook = XLSX.readFile(path.join(pasta, arquivo))
    const planilha = workbook.Sheets[workbook.SheetNames[0]]
    const linhas = XLSX.utils.sheet_to_json(planilha)

    for (const linha of linhas) {
      const nome = linha['ALUNO(A)']
      if (nome) {
        alunos.push({ nome, turmaNumero, turmaLetra })
      }
    }
  }

  return alunos
}
