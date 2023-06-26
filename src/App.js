import { Navigate, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import About from "./pages/About";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/profile" />}></Route>
        <Route path="/main" element={<Main />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default App;
