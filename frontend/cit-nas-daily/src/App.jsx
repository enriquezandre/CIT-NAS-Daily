import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Common/Navbar.jsx";
import { Login } from "./components/Login/Login.jsx";
import { Evaluation } from "./components/Superior/Evaluation.jsx"

function App() {
  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="evaluate" element={<Evaluation />} />
      </Routes>
    </>
  );
}

export default App;
