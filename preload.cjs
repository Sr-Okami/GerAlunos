const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),
  lerAtestados: () => ipcRenderer.invoke('atestados:ler'),
  salvarAtestados: (atestados) => ipcRenderer.invoke('atestados:salvar', atestados),
})
