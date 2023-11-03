import "../src/index.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.jsx";
import { Login } from "./pages/Login/Login";
import { SuperiorEvaluation } from "./pages/superior/SuperiorEvaluation";
import { SuperiorNASList } from "./pages/superior/SuperiorNASList";
import { NASPage } from "./pages/NAS/NASPage";
import { OASPage } from "./pages/OAS/OASPage";

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
        <Route path="/oas/offices" element={<OASPage />} />
        {/* NAS */}
        <Route path="/nas/1" element={<NASPage />} />
      </Routes>
    </>
  );
}

export default App;
