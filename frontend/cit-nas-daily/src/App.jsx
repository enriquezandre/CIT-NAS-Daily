import "./index.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Common/Navbar.jsx";
import { Login } from "./components/Login/Login.jsx";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
