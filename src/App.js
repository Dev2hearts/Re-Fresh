import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Group from "./pages/Group";
import NotFound from "./pages/NotFound";
import Intro from "./pages/Intro";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/intro" />}></Route>
        <Route path="/intro" element={<Intro />}></Route>
        <Route path="/group/:iuser" element={<Group />}></Route>
        <Route path="/main/:iuser/:igroup" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
