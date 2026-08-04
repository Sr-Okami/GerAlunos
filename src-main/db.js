import Database from 'better-sqlite3'
import path from 'path'
import { getDadosDir } from './paths.js'

let db = null

export function getDb() {
  if (db) return db

  const caminho = path.join(getDadosDir(), 'geralunos.db')
  db = new Database(caminho)

  db.exec(`
    CREATE TABLE IF NOT EXISTS atestados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      turmaNumero TEXT NOT NULL,
      turmaLetra TEXT NOT NULL,
      nome TEXT NOT NULL,
      data TEXT NOT NULL,
      ateData TEXT,
      dias INTEGER,
      tipo TEXT NOT NULL,
      obs TEXT,
      lancado INTEGER NOT NULL DEFAULT 0
    )
  `)

  db.exec(`
    CREATE TABLE IF NOT EXISTS dismissals (
      atestadoId INTEGER NOT NULL,
      tipo TEXT NOT NULL,
      PRIMARY KEY (atestadoId, tipo)
    )
  `)

  return db
}
