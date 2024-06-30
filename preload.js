const { contextBridge, ipcRenderer } = require('electron')

/**
 * 通过 contextBridge 接口定义 全局对象 versions 暴露给渲染器
 */
contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // 除函数之外，我们也可以暴露变量
    ping: () => ipcRenderer.invoke('ping')

})