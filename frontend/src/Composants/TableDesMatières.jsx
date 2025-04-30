import { useState } from "react";
import { mockSubjects } from "../assets/data";
import "./TableDesMatières.css";

// Icônes de base (vous pouvez utiliser react-icons en vrai projet)
const BookIcon = () => <span>📘</span>;
const MessageSquareIcon = () => <span>💬</span>;
const UserIcon = () => <span>👤</span>;

const TablesDesMatières = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Fonction pour filtrer les matières en fonction de la recherche
  const filteredSubjects = mockSubjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* En-tête */}
      <div className="header">
        <h1>Bienvenue sur LATTON FORUM ESMT</h1>
        <p>Sélectionnez une matière pour voir les discussions</p>
      </div>
      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="Rechercher une matière... "
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Grille des matières */}
      <div className="subjects-grid">
        {filteredSubjects.map((subject) => (
          <div key={subject.id} className="subject-card">
            <div className="card-content">
              <div className="icon-container">
                <BookIcon />
              </div>
              <div className="subject-info">
                <h3>{subject.name}</h3>
                <div className="stats">
                  <p>
                    <MessageSquareIcon /> {subject.questions} questions
                  </p>
                  <p>
                    <UserIcon /> {subject.students} étudiants
                  </p>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button>Voir les discussions →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TablesDesMatières;
