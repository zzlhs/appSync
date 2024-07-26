
const CustomEvent = {
    RENDER_TO_MAIN: {
        OPEN_MAC_APP_STORE: 'open-mac-app-store',
        EXPORT_ALL_APP_MES:'export-all-app-mes',
    },
    MAIN_TO_RENDER:{
        INSTALLED_APPS:'installed-apps',
        OS_INFO: 'os-info',
    },
    ELECTRON_EVENT: {
        WINDOW_ALL_CLOSED: 'window-all-closed',
        ACTIVATE: 'activate',
        // 网页内容加载完成时触发
        DID_FINISH_LOAD: 'did-finish-load',
    }

}

module.exports = CustomEvent;