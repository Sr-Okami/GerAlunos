const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  ping: () => ipcRenderer.invoke('ping'),
  listarAtestados: () => ipcRenderer.invoke('atestados:listar'),
  criarAtestado: (atestado) => ipcRenderer.invoke('atestados:criar', atestado),
  atualizarAtestado: (id, atestado) => ipcRenderer.invoke('atestados:atualizar', id, atestado),
  excluirAtestado: (id) => ipcRenderer.invoke('atestados:excluir', id),
  lerImportados: () => ipcRenderer.invoke('importados:ler'),
  criarBackup: (atestados) => ipcRenderer.invoke('backups:criar', atestados),
  registrarLog: (acao, atestado) => ipcRenderer.invoke('logs:registrar', acao, atestado),
})
