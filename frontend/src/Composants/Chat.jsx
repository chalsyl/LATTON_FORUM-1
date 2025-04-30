// Importation des hooks React et des données nécessaires
import { useRef, useState, useEffect } from "react";
import {
  utilisateurs,
  messages as importedMessages,
  mockSubjects,
} from "../assets/data";

// Importation des icônes utilisées dans le composant
import { FaPlus } from "react-icons/fa6";
import { LuSend } from "react-icons/lu";

// Importation du fichier CSS pour le style
import "./Chat.css";

// Définition du composant fonctionnel Chat
const Chat = () => {
  // État pour gérer l'ouverture/fermeture du menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Référence pour accéder au conteneur de la discussion
  const chatContainerRef = useRef(null);

  // ID de l'utilisateur actuel (statique ici)
  const currentUser = 1;

  // État pour stocker le message saisi par l'utilisateur
  const [message, setMessage] = useState("");

  // État pour stocker les messages (initialisé avec les messages importés)
  const [messages, setMessages] = useState(importedMessages);

  // État pour stocker le sujet actuellement sélectionné
  const [currentSubject, setCurrentSubject] = useState(mockSubjects[0]);

  // Référence pour accéder au conteneur des onglets (navigation des sujets)
  const scrollContainerRef = useRef(null);

  // État pour stocker la position actuelle du défilement horizontal
  const [scrollPosition, setScrollPosition] = useState(0);

  // Fonction pour ouvrir/fermer le menu d'ajout
  const menuAjout = () => {
    setIsMenuOpen(!isMenuOpen); // Inverse l'état actuel
  };

  // Fonction pour changer le sujet sélectionné
  const onSelectSubject = (subject) => {
    setCurrentSubject(subject); // Met à jour le sujet actuel
  };

  // Fonction pour gérer l'envoi d'un message
  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (message.trim()) {
      addMessage(message); // Ajoute le message à la liste
      setMessage(""); // Réinitialise le champ de saisie
    }
  };
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const pdfInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const documentInputRef = useRef(null);

  const handlePdfUpload = () => {
    pdfInputRef.current.click(); // Ouvre la boîte de dialogue pour téléverser un PDF
  };

  const handleImageUpload = () => {
    imageInputRef.current.click(); // Ouvre la boîte de dialogue pour téléverser une image
  };

  const handleDocumentUpload = () => {
    documentInputRef.current.click(); // Ouvre la boîte de dialogue pour téléverser un document
  };

  const handleFileUpload = (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    // Créer une URL pour le fichier
    const fileURL = URL.createObjectURL(file);

    // Ajouter le fichier à la liste
    setUploadedFiles((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: file.name,
        type: fileType,
        url: fileURL,
      },
    ]);

    // Fermer le menu après sélection
    setIsMenuOpen(false);
  };
  // Fonction pour ajouter un nouveau message
  const addMessage = (content) => {
    if (!content.trim()) return; // Ne fait rien si le message est vide

    // Création d'un nouvel objet message
    const newMessage = {
      id: Date.now(), // Génère un ID unique basé sur le timestamp
      userId: currentUser, // Associe le message à l'utilisateur actuel
      contenu: content, // Contenu du message
      dateCreation: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }), // Formatage de l'heure de création
      sujet: [currentSubject.id], // Associe le message au sujet actuel
      files: [...uploadedFiles], //  Ajouter les fichiers au message
    };

    // Ajoute le nouveau message à la liste des messages existants
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Fonction pour gérer le défilement horizontal
  const handleScroll = () => {
    const container = scrollContainerRef.current; // Accède au conteneur
    if (container) {
      setScrollPosition(container.scrollLeft); // Met à jour la position du défilement
    }
  };

  // useEffect pour gérer les clics en dehors du menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si le menu est ouvert et que l'utilisateur clique en dehors
      if (isMenuOpen && !event.target.closest(".menu-button-container")) {
        setIsMenuOpen(false); // Ferme le menu
      }
    };

    // Ajoute un écouteur d'événements pour détecter les clics
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoie l'écouteur lors du démontage du composant
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]); // Déclenché lorsque `isMenuOpen` change

  // useEffect pour gérer le défilement horizontal
  useEffect(() => {
    const container = scrollContainerRef.current; // Accède au conteneur
    if (container) {
      container.addEventListener("scroll", handleScroll); // Ajoute un écouteur pour le défilement
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll); // Nettoie l'écouteur
      }
    };
  }, []); // Exécuté une seule fois après le premier rendu

  useEffect(() => {
    if (chatContainerRef.current) {
      //Défiler vers le bas du conteneur
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Exécute à chaque fois que 'messages' change
  // Fonction pour défiler horizontalement
  const scroll = (direction) => {
    const container = scrollContainerRef.current; // Accède au conteneur
    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200; // Définit la direction du défilement
      const newPosition = Math.max(
        0,
        Math.min(
          scrollPosition + scrollAmount, // Calcule la nouvelle position
          container.scrollWidth - container.clientWidth // Limite la position
        )
      );

      container.scrollTo({
        left: newPosition, // Définit la position du défilement
        behavior: "smooth", // Ajoute une animation fluide
      });

      setScrollPosition(newPosition); // Met à jour la position
    }
  };

  // Variables pour afficher ou masquer les flèches de navigation
  const showLeftArrow = true;
  const showRightArrow = true;

  // Rendu du composant
  return (
    <div className="ContainerParent">
      {/* En-tête de la discussion */}
      <div className="headerChat">
        <h2>Discussion</h2>
      </div>

      {/* Conteneur de navigation des sujets */}
      <div className="tab-navigation-container">
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")} // Défile vers la gauche
            className="nav-arrow nav-arrow-left"
            aria-label="Défiler vers la gauche"
          >
            ‹
          </button>
        )}
        <div ref={scrollContainerRef} className="tabs-container">
          <div className="subject-selector">
            {mockSubjects.map((subject) => (
              <button
                key={subject.id} // Clé unique pour chaque sujet
                onClick={() => onSelectSubject(subject)} // Change le sujet
                className={`subject-button ${
                  currentSubject.id === subject.id ? "active" : ""
                }`} // Ajoute une classe active si le sujet est sélectionné
                style={
                  currentSubject.id === subject.id
                    ? { backgroundColor: "rgb(18, 36, 44)" }
                    : {}
                } // Change le style si le sujet est actif
              >
                {subject.name} {/* Affiche le nom du sujet */}
              </button>
            ))}
          </div>
        </div>
        {showRightArrow && (
          <button
            onClick={() => scroll("right")} // Défile vers la droite
            className="nav-arrow nav-arrow-right"
            aria-label="Défiler vers la droite"
          >
            ›
          </button>
        )}
      </div>

      {/* Conteneur des messages */}
      <div ref={chatContainerRef} className="chat-container">
        {messages.map((msg) => {
          // Recherche l'utilisateur correspondant au message
          const user = utilisateurs.find((u) => u.id === msg.userId);
          // Recherche les sujets associés au message
          const sujet = mockSubjects.filter((s) => msg.sujet.includes(s.id));

          return (
            <div
              key={msg.id} // Clé unique pour chaque message
              className={`message-row ${
                msg.userId === currentUser ? "right" : "left"
              }`} // Positionne le message à gauche ou à droite
            >
              <div className="message-bubble">
                <div className="message-user">
                  <p>
                    <strong>
                      {user?.prenom} {user?.nom} {/* Nom de l'utilisateur */}
                    </strong>
                  </p>
                </div>
                <div className="message-content">{msg.contenu}</div>{" "}
                {/* Contenu du message */}
                <div className="message-attributs">
                  {msg.dateCreation} - {sujet.map((s) => s.name).join(", ")} -{" "}
                  {user.status} {/* Attributs du message */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Conteneur pour saisir un message */}
      <div className="chat-input-container">
        <div className="menu-button-container">
          <button className="chat-button" onClick={menuAjout}>
            <FaPlus size={20} /> {/* Icône pour ouvrir le menu */}
          </button>
          {isMenuOpen && (
            <div className="dropdown-menu">
              <button className="menu-item" onClick={handlePdfUpload}>
                <span></span>
                <span>Téléverser un PDF</span>
              </button>
              <button className="menu-item" onClick={handleImageUpload}>
                <span></span>
                <span>Téléverser une image</span>
              </button>
              <button className="menu-item" onClick={handleDocumentUpload}>
                <span></span>
                <span>Téléverser un Document</span>
              </button>

              <input
                type="file"
                ref={pdfInputRef}
                onChange={(e) => handleFileUpload(e, "pdf")}
                style={{ display: "none" }}
                accept=".pdf"
              />
              <input
                type="file"
                ref={imageInputRef}
                onChange={(e) => handleFileUpload(e, "image")}
                style={{ display: "none" }}
                accept="image/*"
              />
              <input
                type="file"
                ref={documentInputRef}
                onChange={(e) => handleFileUpload(e, "document")}
                style={{ display: "none" }}
                accept=".doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx"
              />
            </div>
          )}
        </div>

        {uploadedFiles.length > 0 && (
          <div className="selected-files">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="selected-file-badge">
                {file.name.substring(0, 10)}
                {file.name.length > 10 && "..."}{" "}
                <button
                  className="remove-file"
                  onClick={() =>
                    setUploadedFiles((prev) =>
                      prev.filter((f) => f.id !== file.id)
                    )
                  }
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            placeholder="Écrivez votre message ici..."
            value={message} // Liaison avec l'état `message`
            onChange={(e) => setMessage(e.target.value)} // Met à jour l'état `message`
            className="chat-input"
          />
          <button type="submit" className="chat-button">
            <LuSend size={20} /> {/* Icône pour envoyer le message */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat; // Exporte le composant pour l'utiliser ailleurs
