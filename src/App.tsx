import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import MyView from "./pages/Paper/MyView";
import MainView from "./pages/MainView";
import Application from "@/types/Application.ts";

const CustomEvent = {
  RENDER_TO_MAIN: {
    OPEN_MAC_APP_STORE: 'open-mac-app-store',
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

const app1: Application  = {
  name: "阴阳师",
  desc: "阴阳师网易事实上非大煞风景咖喱鸡饭看乐山大佛弹尽粮绝快乐就快乐",
  avatar: "111",
  index: 1,
  localIsInstalled: true, // 本地是否已经安装
  cloudIsInstalled: false, //
}
const app2: Application  = {
  name: "梦幻西游",
  desc: "梦幻西游看见肯德基咖啡几点上课就犯困酒店房间打开手机疯狂的技术开发就看见啊微风i件廉价品",
  avatar: "222",
  index: 2,
  webUrl: '6451498949',
  localIsInstalled: false, // 本地是否已经安装
  cloudIsInstalled: true, //
}
const appsD: Application[] = [app1, app2]

const App: React.FC = () => {
  const [allApps, setAllApps] = useState({});
  const [apps, setApps] = useState<Application[]>([]);
  const [osInfo, setOsInfo] = useState('');
  const [willInstallAppUrl, setwillInstallAppUrl] = useState<string>('');

  console.log("detail111111 useEffect out", apps.length);

  useEffect(() => {
    console.log("detail111111 useEffect if out 1 ", apps.length);

    if (window.syncapps) {
      window.syncapps.onInstalledApps(CustomEvent.MAIN_TO_RENDER.INSTALLED_APPS, (data: string[]) => {
        console.log("detail111111 useEffect if in ", data.length);
        console.log("detail111111 useEffect if in ", data);

        // let appArray: Application[] = [];
        // data.map(item => {
        //   let name: string = item.substring(item.lastIndexOf('/') + 1);
        //   let appTemp: Application = {
        //     name: name,
        //     webUrl: "http://jkljlk",
        //     localIsInstalled: true,
        //   }
        //   appArray.push(appTemp);
        // });
        setAllApps(data);
        setApps(data.get('LOCAL'));
      });

      window.syncapps.onInstalledApps(CustomEvent.MAIN_TO_RENDER.OS_INFO, (data: string) => {
        console.log('osInfo = ', data)
        setOsInfo(data);
      });
    }
    console.log("detail111111 useEffect if out 2 ", apps.length);
    // 返回一个 清理（cleanup） 函数
    return  () => {
      console.log("clenaup fun ...")
      setApps([]);
    }
  }, []);

  const handleInstall = (url: string) => {
    setwillInstallAppUrl(url);
    console.log("app  install ", url);
    window.syncapps.openMacAppStore(url);
  }

  const handleAppOsFromChild = (osType: string) => {
    console.log('handleAppOsFromChild ', osType);
    setApps(allApps.get(osType));
  }

  const handleExportAllApp = (apps: Application[]) => {
    window.syncapps.exportAllAppMes(allApps);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index path="index" element={<h1>欢迎使用应用同步</h1>} />
          <Route index path="main" element={<MainView apps={apps}
                                                      onInstallApp = {handleInstall}
                                                      onChangeOsType={handleAppOsFromChild} />}
          />
          <Route index path="my" element={<MyView osInfo={osInfo} onExportAllAppMes={handleExportAllApp}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
