import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import DsaProfile from "./components/Dsa/DsaProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dsa" element={<DsaProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
