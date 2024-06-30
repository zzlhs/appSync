/**
 *
 * electron的main.js
 *
 * 使用CommonJS 语法导入了两个 Electron 模块
 * app，它着您应用程序的事件生命周期。
 * BrowserWindow，它负责创建和管理应用窗口。
 */

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            /**
             * __dirname 字符串指向当前正在执行的脚本的路径(在本例中，它指向你的项目的根文件夹)。
             * path.join API 将多个路径联结在一起，创建一个跨平台的路径字符串。
             */
            preload: path.join(__dirname, 'preload.js'),
            // nodeIntegration: true, // 启用 Node.js 集成
            // contextIsolation: false
        }
    });

    mainWindow.loadURL(`file://${path.join(__dirname, 'src/index.html')}`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
});

/**
 * 在 Windows 和 Linux 上，我们通常希望在关闭一个应用的所有窗口后让它退出。
 * 要在Electron应用中实现这一点，监听 app 模块的 window-all-closed 事件，
 * 并调用 app.quit() 来退出您的应用程序。
 *
 *
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') { // 此方法不适用于 macOS。
        app.quit();
    }
});

/**
 * 与前二者相比，即使没有打开任何窗口，macOS 应用通常也会继续运行。 在没有窗口可用时调用 app 会打开一个新窗口
 */
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
