const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const path = require('path');
const compression = require('compression');

// Import des configurations
const connectDB = require('./config/db');
const config = require('./config/config');

// Import des routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const forumRoutes = require('./routes/forumRoutes');
const postRoutes = require('./routes/postRoutes');

// Import des middlewares
const errorHandler = require('./middlewares/errorHandler');

// Création de l'application Express
const app = express();

// Connexion à la base de données
connectDB();

// Middleware de sécurité
app.use(helmet());

// Configuration CORS
app.use(cors({
    origin: config.CORS_ORIGIN,
    credentials: true
}));

// Limiter les requêtes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // Limite chaque IP à 100 requêtes par fenêtre
});
app.use('/api', limiter);

// Middleware pour le parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Prévention des injections NoSQL
app.use(mongoSanitize());

// Prévention XSS
app.use(xss());

// Compression des réponses
app.use(compression());

// Logging en développement
if (config.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Configuration des dossiers statiques
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Routes API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/posts', postRoutes);

// Route pour servir l'application frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

// Middleware de gestion des routes non trouvées
app.use(errorHandler.notFound);

// Middleware de gestion globale des erreurs
app.use(errorHandler.handleError);

// Démarrage du serveur
const PORT = config.PORT;
const server = app.listen(PORT, () => {
    console.log(`Serveur démarré en mode ${config.NODE_ENV} sur le port ${PORT}`);
});

// Gestion des erreurs non capturées
process.on('unhandledRejection', (err) => {
    console.error('ERREUR NON GÉRÉE! 💥 Arrêt du serveur...');
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Gestion de SIGTERM
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM REÇU. Arrêt gracieux...');
    server.close(() => {
        console.log('💥 Processus terminé!');
    });
});

module.exports = app;