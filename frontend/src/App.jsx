import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Composants/Sidebar";
import Avatar from "./Composants/Avatar";
import TablesDesMatières from "./Composants/TableDesMatières";
import Chat from "./Composants/Chat";
import "./style.css";
import avatarImage from "./assets/bamba.avif";

function MainRoutes() {
  const user = {
    name: "Bamba",
    avatarUrl: avatarImage,
    role: "Étudiant",
  };

  return (
    <>
      <div className="user-container static-right">
        <Avatar user={user} />
      </div>

      <Routes>
        <Route path="/" element={<TablesDesMatières />} />
        <Route path="/forum" element={<Chat />} />
        <Route path="/compte" element={<h2>Mon Compte</h2>} />
        <Route path="/mes-questions" element={<h2>Mes Questions</h2>} />
        <Route path="/logout" element={<h2>Déconnexion</h2>} />
      </Routes>

      <footer className="custom-footer">
        <p>© 2025 LATTON FORUM - Plateforme éducative</p>
      </footer>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <MainRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
