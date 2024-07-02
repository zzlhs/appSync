import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import MyView from "./pages/Paper/MyView";
// import Views from "./pages/Paper/Views";
import MainView from "./pages/MainView";



const App: React.FC = () => {

  const [apps, setApps] = useState<string[]>([]);
  console.log("detail111111 useEffect if out", apps);

  useEffect(() => {
    if (window.versions) {
      window.versions.onInstalledApps('installed-apps', (data: string[]) => {
        console.log("detail111111 useEffect if out2 ", data);
        setApps(data);
      });
      console.log("detail111111 useEffect if in", apps);

    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="home" element={<Home />}>
          <Route index path="index" element={<h1>欢迎使用应用同步</h1>} />
          <Route index path="main" element={<MainView />} />
          <Route index path="my" element={<MyView />} />
        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
