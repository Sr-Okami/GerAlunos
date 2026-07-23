import { app, BrowserWindow, Menu, ipcMain } from 'electron'
import path from 'path'
import { fileURLToPath } from 'url'
import { garantirPastas } from './src-main/paths.js'
import { lerAtestados, salvarAtestados } from './src-main/atestados.js'


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

  win.loadURL('http://localhost:5173')
  win.webContents.openDevTools()
}

ipcMain.handle('ping', () => {
  return 'pong! (resposta main.js)'
})
ipcMain.handle('atestados:ler', () => {
  return lerAtestados()
})
ipcMain.handle('atestados:salvar', (event, atestados) => {
  salvarAtestados(atestados)
  return true
})

app.whenReady().then(() => {
  garantirPastas()
  createWindow()
  Menu.setApplicationMenu(null)
})
