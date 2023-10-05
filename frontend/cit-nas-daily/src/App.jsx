import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Login } from "./pages/Login/Login";
import { Evaluation } from "./pages/superior/Evaluation";
import { Attendance } from "./pages/OAS/Attendance";
import { Eval } from "./pages/OAS/Eval";
import { Status } from "./pages/OAS/Status";
import { Masterlist } from "./pages/OAS/Masterlist";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/evaluation" element={<Evaluation />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="eval" element={<Eval />} />
        <Route path="status" element={<Status />} />
        <Route path="masterlist" element={<Masterlist />} />
      </Routes>
    </>
  );
}

export default App;