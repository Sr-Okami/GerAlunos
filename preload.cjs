const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),
  lerAtestados: () => ipcRenderer.invoke('atestados:ler'),
  salvarAtestados: (atestados) => ipcRenderer.invoke('atestados:salvar', atestados),
  lerImportados: () => ipcRenderer.invoke('importados:ler'),
  criarBackup: (atestados) => ipcRenderer.invoke('backups:criar', atestados),
  registrarLog: (acao, atestado) => ipcRenderer.invoke('logs:registrar', acao, atestado),
})
