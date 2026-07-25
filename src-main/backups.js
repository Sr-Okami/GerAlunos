import XLSX from 'xlsx'
import fs from 'fs'
import path from 'path'
import { getBackupsDir } from './paths.js'

XLSX.set_fs(fs)

const COLUNAS = ['id', 'turmaNumero', 'turmaLetra', 'nome', 'data', 'ateData', 'dias', 'tipo', 'obs', 'lancado']

function nomeArquivoBackupHoje() {
  const hoje = new Date()
  const dia = String(hoje.getDate()).padStart(2, '0')
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const ano = hoje.getFullYear()
  return `backup_${dia}-${mes}-${ano}.xlsx`
}

export function criarBackup(atestados) {
  const caminho = path.join(getBackupsDir(), nomeArquivoBackupHoje())

  const linhas = atestados.map((atestado) => {
    const linha = {}
    for (const coluna of COLUNAS) {
      linha[coluna] = atestado[coluna] ?? ''
    }
    return linha
  })

  const planilha = XLSX.utils.json_to_sheet(linhas, { header: COLUNAS })
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, planilha, 'Backup')

  XLSX.writeFile(workbook, caminho)
}
