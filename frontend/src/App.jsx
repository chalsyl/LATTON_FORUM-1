import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // <-- Ajoute ceci
import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div>
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <main>
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/Forums" element={<div></div>} />
            <Route path="/Utilisateurs" element={<div></div>} />
            <Route path="/Matières" element={<div></div>} />
            <Route path="/Ressources" element={<div></div>} />
            <Route path="/Notifications" element={<div></div>} />
            <Route path="/Groupes" element={<div></div>} />
            <Route path="/Paramètres" element={<div></div>} />
            <Route path="/Déconnexion" element={<div></div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
