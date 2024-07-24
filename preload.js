const { contextBridge, ipcRenderer } = require('electron')

const CustomEvent = {
    RENDER_TO_MAIN: {
        OPEN_MAC_APP_STORE: 'open-mac-app-store',
    },
    MAIN_TO_RENDER:{
        INSTALLED_APPS:'installed-apps',
    },
    ELECTRON_EVENT: {
        WINDOW_ALL_CLOSED: 'window-all-closed',
        ACTIVATE: 'activate',
        // 网页内容加载完成时触发
        DID_FINISH_LOAD: 'did-finish-load',
    }

}

/**
 * 通过 contextBridge 接口定义 全局对象 versions 暴露给渲染器
 */
contextBridge.exposeInMainWorld('syncapps', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    // 除函数之外，我们也可以暴露变量
    ping: () => ipcRenderer.invoke('ping'),
    // main to render
    onInstalledApps: (channel, func) => {
        const validChannels = [CustomEvent.MAIN_TO_RENDER.INSTALLED_APPS];
        if (validChannels.includes(channel)) {
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
    },
    // render thread trans data to main thread
    openMacAppStore: (appId) => ipcRenderer.send(CustomEvent.RENDER_TO_MAIN.OPEN_MAC_APP_STORE, appId),

})