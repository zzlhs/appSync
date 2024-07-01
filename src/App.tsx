import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import MyView from "./pages/Paper/MyView";
// import Views from "./pages/Paper/Views";
import MainView from "./pages/MainView";
export default function App() {
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
