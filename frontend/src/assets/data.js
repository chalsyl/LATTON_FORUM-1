export const utilisateurs = [
  {
    id: 1,
    avatar: "",
    nom: "Babou",
    prenom: "Serigne",
    email: "babouserigne028@gmail.com",
    password: "123",
    status: "Administrateur",
    niveau: "NULL",
    matieres: [1, 2, 3],
    dateInscription: "NULL",
  },
  {
    id: 2,
    avatar: "",
    nom: "Dieng",
    prenom: "Fala",
    email: "fala8@gmail.com",
    password: "1234",
    status: "Tuteur",
    niveau: "L2",
    matieres: [1],
    dateInscription: "2025-04-11T09:00:00Z",
  },
  {
    id: 3,
    avatar: "",
    nom: "Babou",
    prenom: "Fala",
    email: "Baboufala8@gmail.com",
    password: "1234",
    status: "Etudiant",
    niveau: "L1",
    matieres: [],
    dateInscription: "2025-04-11T10:00:00Z",
  },
];

export const mockSubjects = [
  { id: 0, name: "Générale", questions: 4000, students: 500 },
  { id: 1, name: "Mathématiques I", questions: 45, students: 32 },
  { id: 2, name: "Algorithmique", questions: 28, students: 25 },
  { id: 3, name: "Electricité", questions: 37, students: 18 },
  { id: 4, name: "Langage C", questions: 37, students: 18 },
  { id: 5, name: "Architecture des réseaux Télécoms", questions: 40, students: 25 },
  { id: 6, name: "Eléments généraux de transmission", questions: 45, students: 2 },
  { id: 7, name: "Organisation des réseaux aéro-souterraines", questions: 39, students: 22 },
  { id: 8, name: "Internet/HTML/CSS", questions: 30, students: 27 },
  { id: 9, name: "Développement personnel", questions: 30, students: 27 },
  { id: 10, name: "Mathématiques II", questions: 50, students: 30 },
  { id: 11, name: "Programmation Python", questions: 42, students: 20 },
  { id: 12, name: "Programmation Java", questions: 38, students: 19 },
  { id: 13, name: "Bases de données", questions: 36, students: 21 },
  { id: 14, name: "Systèmes d'exploitation", questions: 40, students: 23 },
  { id: 15, name: "Réseaux informatiques", questions: 45, students: 26 },
  { id: 16, name: "Introduction à la cybersécurité", questions: 29, students: 17 },
  { id: 17, name: "Electronique numérique", questions: 41, students: 16 },
  { id: 18, name: "Communication professionnelle", questions: 33, students: 28 },
  { id: 19, name: "Gestion de projet", questions: 35, students: 25 },
  { id: 20, name: "Cloud Computing", questions: 31, students: 18 },
];


export const messages = [
  {
    id: 101,
    userId: 2,
    sujet: [3],
    contenu: "Comment résoudre une équation du second degré ?",
    dateCreation: "2025-05-11T09:00:00Z",
    reponse: [201],
  },
  {
    id: 102, // Correction de l'ID dupliqué
    userId: 3,
    sujet: [7],
    contenu: "Comment résoudre un probleme d'algorithmique ?",
    dateCreation: "2025-05-11T09:00:00Z",
    reponse: [201],
  },
  {
    id: 103,
    userId: 1,
    sujet: [7],
    contenu: "Comment résoudre un probleme de langage C ?",
    dateCreation: "2025-05-11T09:00:00Z",
    reponse: [201],
  },
  {
    id: 104,
    userId: 2,
    sujet: [2],
    contenu:
      "Peut-on utiliser les boucles imbriquées dans une fonction récursive ?",
    dateCreation: "2025-05-11T09:15:00Z",
    reponse: [],
  },
  {
    id: 105,
    userId: 1,
    sujet: [4],
    contenu:
      "Quelle est la différence entre une fonction pure et une fonction impure ?",
    dateCreation: "2025-05-11T09:20:00Z",
    reponse: [204],
  },
  {
    id: 106,
    userId: 3,
    sujet: [8],
    contenu:
      "Quel est le rôle du compilateur dans l'exécution d'un programme C ?",
    dateCreation: "2025-05-11T09:25:00Z",
    reponse: [],
  },
  {
    id: 107,
    userId: 2,
    sujet: [7],
    contenu: "Comment implémenter une pile avec un tableau dynamique ?",
    dateCreation: "2025-05-11T09:30:00Z",
    reponse: [205],
  },
];

export const reponses = [
  {
    id: 201,
    messageId: 101,
    userId: 2,
    contenu:
      "Tu peux utiliser la formule générale : x = (-b ± √(b² - 4ac)) / 2a.",
    dateCreation: "2025-04-15T13:00:00Z",
  },
];
