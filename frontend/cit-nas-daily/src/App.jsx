import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Login } from "./pages/Login/Login";
import { SuperiorEvaluation } from "./pages/superior/SuperiorEvaluation";
import { SuperiorNASList } from "./pages/superior/SuperiorNASList";
import { Attendance } from "./pages/OAS/Attendance";
import { Eval } from "./pages/OAS/Eval";
import { Status } from "./pages/OAS/Status";
import { NASPage } from "./pages/NAS/NASPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Superior */}
        <Route path="/superiorevaluation" element={<SuperiorEvaluation />} />
        <Route path="/superiornaslist" element={<SuperiorNASList />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/eval" element={<Eval />} />
        <Route path="/status" element={<Status />} />
        <Route path="/naspage" element={<NASPage />} />
      </Routes>
    </>
  );
}

export default App;
