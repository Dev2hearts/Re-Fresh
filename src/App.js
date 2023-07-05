import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Group from "./pages/Group";
import NotFound from "./pages/NotFound";
import Intro from "./pages/Intro";
import { useState } from "react";

function App() {
  // 사용자 모든 정보 저장(박호진)
  const [appUsers, setAppUsers] = useState([]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/intro" />}></Route>
        <Route path="/intro" element={<Intro />}></Route>
        <Route path="/group/:iuser" element={<Group />}></Route>
        <Route
          path="/main/:iuser/:igroup"
          element={<Main appUsers={appUsers} />}
        ></Route>
        <Route
          path="/about/:iuser/:igroup"
          element={<About appUsers={appUsers} />}
        ></Route>
        <Route
          path="/profile"
          element={<Profile setAppUsers={setAppUsers} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
