import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import About from "./pages/About";
import Group from "./pages/Group"
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/group" />}></Route>
        <Route path="/group" element={<Group/>}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </>
  );
}

export default App;
