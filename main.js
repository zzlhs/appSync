/**
 *
 * electron的main.js
 *
 * 使用CommonJS 语法导入了两个 Electron 模块
 * app，它着您应用程序的事件生命周期。
 * BrowserWindow，它负责创建和管理应用窗口。
 */

const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');
const CustomEvent = require('./custom-event');

const filePathSystem = "System";

const appName = 'Safari';
const script = `
  tell application "Finder"
    set appPath to (POSIX path of (path to application "${appName}"))
    return appPath
  end tell
`;


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
            contextIsolation: true, // 启用上下文隔离
            enableRemoteModule: false, // 禁用 remote 模块
            nodeIntegration: false, // 禁用 Node.js 集成
        }
    });


    if (process.env.NODE_ENV === 'development') {
        //  第2步：加载网页内容
        mainWindow.loadURL("http://localhost:5173/")
    } else {
        mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
    }

    handleSyncApps(mainWindow);


    const filePath = path.join(app.getPath('documents'), 'myfile.sync');
    const data = 'hhhfdhskajfjksda jkdfkldsajfkl ';
    if (filePath) {
        console.log('filePath = ',filePath)
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('export success ...')
            }
        });
    } else {
        event.sender.send('save-file-response', { success: false, error: 'Save dialog was canceled' });
    }

    // exec(`osascript -e '${script}'`, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Error executing script: ${error}`);
    //         return;
    //     }
    //     const appPath = stdout.trim();
    //     console.log(`Application Path: ${appPath}`);
    //     checkIconPath(appPath);
    // });

    // Open the DevTools.
    mainWindow.webContents.openDevTools();
    console.log("start -----------------------------");
}


app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
});


// 打开网页中的 mac store
// const url = 'https://apps.apple.com/us/app/app-name/id6451498949';
// 打开系统的mac store
// main listen on render
ipcMain.on(CustomEvent.RENDER_TO_MAIN.OPEN_MAC_APP_STORE, (event, appId) => {
    const url = `macappstore://itunes.apple.com/app/id${appId}`;
    shell.openExternal(url);
});

ipcMain.on(CustomEvent.RENDER_TO_MAIN.EXPORT_ALL_APP_MES, (event, apps) => {
    console.log('array = ', apps.length)
});

/**
 * 在 Windows 和 Linux 上，我们通常希望在关闭一个应用的所有窗口后让它退出。
 * 要在Electron应用中实现这一点，监听 app 模块的 window-all-closed 事件，
 * 并调用 app.quit() 来退出您的应用程序。
 */
app.on(CustomEvent.ELECTRON_EVENT.WINDOW_ALL_CLOSED, () => {
    if (process.platform !== 'darwin') { // 此方法不适用于 macOS。
        app.quit();
    }
});

/**
 * 与前二者相比，即使没有打开任何窗口，macOS 应用通常也会继续运行。 在没有窗口可用时调用 app 会打开一个新窗口
 */
app.on(CustomEvent.ELECTRON_EVENT.ACTIVATE, () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

function handleSyncApps(mainWindow) {

    const osInfo = getOSInfo();

    // 使用 mdfind 命令获取已安装的应用
    // mdfind "kMDItemContentType == 'com.apple.application-bundle'" | grep "~/Library/Application Support"
    exec('mdfind "kMDItemContentType == \'com.apple.application-bundle\'" | grep "/Applications" ', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            } else {
                console.log("installed-apps = ", stdout);
            }

            const appArray = stdout.split('\n').filter(item => !item.includes(filePathSystem));
            // 将结果传递给渲染进程
            console.log(appArray);
            // 第2步：当网页内容加载完成时触发
            mainWindow.webContents.on(CustomEvent.ELECTRON_EVENT.DID_FINISH_LOAD, () => {
                console.log("send appArray to sub finished...", appArray);
                mainWindow.webContents.send(CustomEvent.MAIN_TO_RENDER.INSTALLED_APPS, appArray);
                mainWindow.webContents.send(CustomEvent.MAIN_TO_RENDER.OS_INFO, osInfo);
            });
        }
    );
}

function getOSInfo() {
    const osInfo = `${os.type()}`// `OS Type: ${os.type()}`
      // OS Platform: ${os.platform()}
      // OS Architecture: ${os.arch()}
      // OS Release: ${os.release()}
      // OS Hostname: ${os.hostname()}
    // `;

    console.log('osInfo = ', osInfo)
    return osInfo;
}


function checkIconPath(appPath) {
    // 常见的图标路径
    const possibleIconPaths = [
        path.join(appPath, 'Contents/Resources/AppIcon.icns'),
        path.join(appPath, 'Contents/Resources/app.icns'),
        path.join(appPath, 'Contents/Resources/icon.icns'),
        path.join(appPath, 'Contents/Resources/', appName + '.icns')
    ];

    for (let iconPath of possibleIconPaths) {
        fs.access(iconPath, fs.constants.F_OK, (err) => {
            if (!err) {
                console.log(`Icon Path: ${iconPath}`);
                readIconFile(iconPath);
                return;
            }
        });
    }
}

function readIconFile(iconPath) {
    fs.readFile(iconPath, (err, data) => {
        if (err) {
            console.error(`Error reading icon file: ${err}`);
            return;
        }

        // 转换为 Base64 编码
        const base64Icon = data.toString('base64');
        const dataUri = `data:image/icns;base64,${base64Icon}`;
        console.log(`Data URI: ${dataUri}`);

        // 将图标路径传递给前端（假设使用 Electron 的主进程与渲染进程通信）
        // mainWindow.webContents.send('icon-data', dataUri);
    });
}
