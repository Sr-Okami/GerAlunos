import { app } from 'electron'
import path from 'path'
import fs from 'fs'

export function getBaseDir() {
  if (app.isPackaged) {
    return path.dirname(process.execPath)
  }
  return process.cwd()
}

export function getDadosDir() {
  return path.join(getBaseDir(), 'dados')
}

export function getConfigPath() {
  return path.join(getBaseDir(), 'config.json')
}

export function getLogsDir() {
  return path.join(getBaseDir(), 'logs')
}

export function getBackupsDir() {
  return path.join(getBaseDir(), 'backups')
}

export function getImportadosDir() {
  return path.join(getBaseDir(), 'Importados')
}

export function garantirPastas() {
  const pastas = [getDadosDir(), getLogsDir(), getBackupsDir(), getImportadosDir()]
  for (const pasta of pastas) {
    if (!fs.existsSync(pasta)) {
      fs.mkdirSync(pasta, { recursive: true })
    }
  }
}
