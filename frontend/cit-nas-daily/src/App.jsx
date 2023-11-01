import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Login } from "./pages/Login/Login";
import { SuperiorEvaluation } from "./pages/superior/SuperiorEvaluation";
import { SuperiorNASList } from "./pages/superior/SuperiorNASList";
import { OASAttendance } from "./pages/OAS/OASAttendance";
import { OASEvaluation } from "./pages/OAS/OASEvaluation";
import { OASStatus } from "./pages/OAS/OASStatus";
import { NASPage } from "./pages/NAS/NASPage";
import { OASPage } from "./pages/OAS/OASPage";
import { OASValidation } from "./pages/OAS/OASValidation";
import { OASOffices } from "./pages/OAS/OASOffices";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Superior */}
        <Route path="/superior/evaluation" element={<SuperiorEvaluation />} />
        <Route path="/superior/naslist" element={<SuperiorNASList />} />
        {/* OAS */}
        <Route path="/oas" element={<OASPage />} />
        <Route path="/oas/office" element={<OASOffices />} />
        <Route path="/oas/attendance" element={<OASAttendance />} />
        <Route path="/oas/evaluation" element={<OASEvaluation />} />
        <Route path="/oas/status" element={<OASStatus />} />
        <Route path="/oas/validate" element={<OASValidation />} />
        {/* NAS */}
        <Route path="/nas" element={<NASPage />} />
      </Routes>
    </>
  );
}

export default App;
