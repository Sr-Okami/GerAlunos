import { getDb } from './db.js'

function paraLinha(atestado) {
  return {
    turmaNumero: atestado.turmaNumero,
    turmaLetra: atestado.turmaLetra,
    nome: atestado.nome,
    data: atestado.data,
    ateData: atestado.ateData || null,
    dias: atestado.dias || null,
    tipo: atestado.tipo,
    obs: atestado.obs || '',
    lancado: atestado.lancado ? 1 : 0,
  }
}

function paraObjeto(linha) {
  return {
    ...linha,
    lancado: linha.lancado === 1,
  }
}

export function listarAtestados() {
  const db = getDb()
  const linhas = db.prepare('SELECT * FROM atestados ORDER BY data DESC').all()
  return linhas.map(paraObjeto)
}

export function criarAtestado(atestado) {
  const db = getDb()
  const dados = paraLinha(atestado)

  const resultado = db
    .prepare(
      `INSERT INTO atestados (turmaNumero, turmaLetra, nome, data, ateData, dias, tipo, obs, lancado)
       VALUES (@turmaNumero, @turmaLetra, @nome, @data, @ateData, @dias, @tipo, @obs, @lancado)`
    )
    .run(dados)

  return { ...atestado, id: resultado.lastInsertRowid }
}

export function atualizarAtestado(id, atestado) {
  const db = getDb()
  const dados = paraLinha(atestado)

  db.prepare(
    `UPDATE atestados
     SET turmaNumero = @turmaNumero, turmaLetra = @turmaLetra, nome = @nome,
         data = @data, ateData = @ateData, dias = @dias, tipo = @tipo,
         obs = @obs, lancado = @lancado
     WHERE id = @id`
  ).run({ ...dados, id })

  return { ...atestado, id }
}

export function excluirAtestado(id) {
  const db = getDb()
  db.prepare('DELETE FROM atestados WHERE id = ?').run(id)
}
