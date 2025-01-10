require('dotenv').config();

const config = {
    // Server configuration
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',

    // Database configuration
    MONGODB_URI: process.env.MONGODB_URI,

    // JWT configuration
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',

    // Upload configuration
    UPLOAD_PATH: process.env.UPLOAD_PATH || 'uploads/',
    MAX_FILE_SIZE: process.env.MAX_FILE_SIZE || 5242880, // 5MB

    // Cors configuration
    CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:8080'
};

module.exports = config;