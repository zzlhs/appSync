import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import MyView from "./pages/Paper/MyView";
import MainView from "./pages/MainView";
import Application from "@/types/Application.ts";

const app1: Application  = {
  name: "阴阳师",
  desc: "1",
  avatar: "111",
  index: 1,
  localIsInstalled: true, // 本地是否已经安装
  cloudIsInstalled: false, //
}
const app2: Application  = {
  name: "梦幻西游",
  desc: "2",
  avatar: "222",
  index: 2,
  localIsInstalled: false, // 本地是否已经安装
  cloudIsInstalled: true, //
}
const appsD: Application[] = [app1, app2]

const App: React.FC = () => {

  const [apps, setApps] = useState<string[]>([]);
  console.log("detail111111 useEffect out", apps);

  useEffect(() => {
    console.log("detail111111 useEffect if out 1 ", apps);

    if (window.versions) {
      window.versions.onInstalledApps('installed-apps', (data: string[]) => {
        console.log("detail111111 useEffect if in ", data);
        setApps(data);
      });
    }
    console.log("detail111111 useEffect if out 2 ", apps);

  }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index path="index" element={<h1>欢迎使用应用同步</h1>} />
          <Route index path="main" element={<MainView apps ={ appsD } />} />
          <Route index path="my" element={<MyView />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
