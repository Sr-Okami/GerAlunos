import { app, BrowserWindow, Menu } from 'electron'

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    resizable: true,
  })

  win.loadURL('http://localhost:5173')
  /*win.webContents.openDevTools()*/
}

app.whenReady().then(() => {
  createWindow()
  Menu.setApplicationMenu(null)
})
