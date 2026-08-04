import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import { garantirPastas } from './src-main/paths.js'
import { listarAtestados, criarAtestado, atualizarAtestado, excluirAtestado } from './src-main/atestados.js'
import { lerAlunosImportados } from './src-main/importados.js'
import { criarBackup } from './src-main/backups.js'
import { registrarLog } from './src-main/logs.js'
import { listarDismissals, adicionarDismissal } from './src-main/atestados.js'


const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
    },
  })
  win.maximize()
  win.show()

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, 'dist', 'index.html'))
  } else {
    win.loadURL('http://localhost:5173')
    win.webContents.openDevTools()
  }
}

ipcMain.handle('ping', () => {
  return 'pong! (resposta main.js)'
})
ipcMain.handle('atestados:listar', () => {
  return listarAtestados()
})

ipcMain.handle('atestados:criar', (event, atestado) => {
  return criarAtestado(atestado)
})

ipcMain.handle('atestados:atualizar', (event, id, atestado) => {
  return atualizarAtestado(id, atestado)
})

ipcMain.handle('atestados:excluir', (event, id) => {
  excluirAtestado(id)
  return true
})
ipcMain.handle('importados:ler', () => {
  return lerAlunosImportados()
})
ipcMain.handle('backups:criar', (event, atestados) => {
  criarBackup(atestados)
  return true
})
ipcMain.handle('logs:registrar', (event, acao, atestado) => {
  registrarLog(acao, atestado)
  return true
})
ipcMain.handle('dismissals:listar', (event, tipo) => {
  return listarDismissals(tipo)
})
ipcMain.handle('dismissals:adicionar', (event, atestadoId, tipo) => {
  adicionarDismissal(atestadoId, tipo)
  return true
})

app.whenReady().then(() => {
  garantirPastas()
  createWindow()
  Menu.setApplicationMenu(null)
})
