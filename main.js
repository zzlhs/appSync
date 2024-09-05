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
const util = require('util');
const execAsync = util.promisify(exec);
const path = require('path');
const fs = require('fs').promises;
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

    const osInfo = getOSInfo();

    (async () => {
        try {
            const appArray = await getInstallApps();
            const fileAppMap = await getFileApps();

            appArray.forEach((app) => {
                fileAppMap.get('local').push( {
                    name: app.substring(app.lastIndexOf('/') + 1),
                    localIsInstalled: true,
                    webUrl: "http://jkljlk",
                });
            })

            // 将结果传递给渲染进程
            // 第2步：当网页内容加载完成时触发
            mainWindow.webContents.on(CustomEvent.ELECTRON_EVENT.DID_FINISH_LOAD, () => {
                console.log("send appArray to sub finished...", fileAppMap);
                mainWindow.webContents.send(CustomEvent.MAIN_TO_RENDER.INSTALLED_APPS, fileAppMap);
                mainWindow.webContents.send(CustomEvent.MAIN_TO_RENDER.OS_INFO, osInfo);
            });
        } catch (error) {
            console.error('Error:', error);
        }
    })();

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

/**
 * 监听自定义channel
 */

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
    const  osInfo = getOSInfo();
    const filePath = path.join(app.getPath('documents'), 'app.sync');

    let newlineC = '';
    newlineC = getNewLineFlag(osInfo);

    let data = osInfo + newlineC;
    (async () => {
        try {
            const appArray = await getInstallApps();
            console.log('Installed apps:', appArray);

            console.log('export all apps = ', appArray);
            appArray.map(item => {
                data = data + item.substring(item.lastIndexOf('/') + 1) + ' 1 ' + newlineC;
            })
            console.log('export data = ', data);
            if (filePath) {
                console.log('export filePath = ',filePath)
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
        } catch (error) {
            console.error('Error:', error);
        }
    })();

});

async function getFileApps() {
    try {
        const startTime = Date.now();
        const  osInfo = getOSInfo();
        const newlineC = getNewLineFlag(osInfo);
        const allAppMap = new Map();

        const filePath = path.join(app.getPath('documents'), 'app.sync');

        try{
            const data = await fs.readFile(filePath, 'utf8');
            console.log('import file data = ', data)

            const oss = ['MAC', 'WINDOWS'];
            const regex = new RegExp(`\\s*(${oss.join('|')})\\s*`, 'g');
            const osAppArray = data.split(regex);

            oss.forEach(item => allAppMap.set(item, []));
            allAppMap.set('local', []);
            let key = '';
            osAppArray.forEach(item => {
                const tempItem = item.trim();
                if (tempItem.length > 0) {
                    if(!oss.includes(tempItem)){
                        let ss = tempItem.split('\n');
                        ss.forEach(item => {
                            const appS = item.split('  ');
                            const obj = {
                                name:appS[0],
                                cloudIsInstalled: appS[1] === '1' ? true : false,
                                webUrl: appS[2], // none表示当前平台无此应用
                            };
                            allAppMap.get(key).push(obj);
                        })
                    }else{
                        key = tempItem;
                    }
                }
            });
            console.log('import file allAppMap = ', allAppMap);
        }catch(err){
            console.error('Error reading file:', err);
        }

        // fs.readFile(filePath, 'utf8', (err, data) => {
        //     if (err) {
        //         console.error(`Error reading file: ${err.message}`);
        //     } else {
        //
        //     }
        // });
        const endTime = Date.now();
        console.log(`getFileApps Execution time: ${endTime - startTime}ms`);
        return allAppMap;
    } catch (error) {
        console.error(`exec error: ${error}`);
        return allAppMap;
    }
}

async function getInstallApps() {
    try {
        const startTime = Date.now();
        // 使用 mdfind 命令获取已安装的应用
        // mdfind "kMDItemContentType == 'com.apple.application-bundle'" | grep "~/Library/Application Support"
        const { stdout, stderr } = await execAsync('mdfind "kMDItemContentType == \'com.apple.application-bundle\'" | grep "/Applications" ');
        const endTime = Date.now();
        console.log(`getInstallApps Execution time: ${endTime - startTime}ms`);

        const appArray = stdout.split('\n').filter(item => item);
        console.log(appArray);
        return appArray;
    } catch (error) {
        console.error(`exec error: ${error}`);
        return [];
    }
}



function getOSInfo() {
    const osInfo = `${os.type()}`// `OS Type: ${os.type()}`
      // OS Platform: ${os.platform()}
      // OS Architecture: ${os.arch()}
      // OS Release: ${os.release()}
      // OS Hostname: ${os.hostname()}
    // `;
    console.log('osInfo = ', osInfo)
    switch (osInfo){
        case 'Darwin': return 'MAC';
            break;
    }
    return osInfo;
}

function getNewLineFlag(osInfo) {
    switch (osInfo) {
        case 'MAC':
            newlineC = `\n`;
            break;
        default:
            return ` \r\n`;
    }
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


