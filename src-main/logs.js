import fs from 'fs'
import path from 'path'
import { getLogsDir } from './paths.js'

function nomeArquivoLogHoje() {
  const hoje = new Date()
  const dia = String(hoje.getDate()).padStart(2, '0')
  const mes = String(hoje.getMonth() + 1).padStart(2, '0')
  const ano = hoje.getFullYear()
  return `log_${dia}-${mes}-${ano}.txt`
}

function agoraFormatado() {
  const agora = new Date()
  const data = agora.toLocaleDateString('pt-BR')
  const hora = agora.toLocaleTimeString('pt-BR')
  return `${data} ${hora}`
}

export function registrarLog(acao, atestado) {
  const caminho = path.join(getLogsDir(), nomeArquivoLogHoje())
  const turma = `${atestado.turmaNumero} - ${atestado.turmaLetra}`
  const linha = `[${agoraFormatado()}] - usuário ${acao} entrada '${atestado.nome}' - '${turma}'\n`

  fs.appendFileSync(caminho, linha)
}
