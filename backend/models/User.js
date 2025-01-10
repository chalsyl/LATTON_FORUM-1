const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Le nom d\'utilisateur est requis'],
        unique: true,
        trim: true,
        minlength: [3, 'Le nom d\'utilisateur doit faire au moins 3 caractères'],
        maxlength: [30, 'Le nom d\'utilisateur ne peut pas dépasser 30 caractères']
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Veuillez fournir un email valide'
        ]
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est requis'],
        minlength: [6, 'Le mot de passe doit faire au moins 6 caractères'],
        select: false // Ne pas inclure par défaut dans les requêtes
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    bio: {
        type: String,
        maxlength: [500, 'La bio ne peut pas dépasser 500 caractères']
    },
    location: String,
    website: String,
    preferences: {
        notifications: {
            email: {
                type: Boolean,
                default: true
            },
            mentions: {
                type: Boolean,
                default: true
            }
        },
        privacy: {
            showEmail: {
                type: Boolean,
                default: false
            },
            showLocation: {
                type: Boolean,
                default: true
            }
        },
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        }
    },
    stats: {
        postsCount: {
            type: Number,
            default: 0
        },
        repliesCount: {
            type: Number,
            default: 0
        },
        reputation: {
            type: Number,
            default: 0
        }
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerificationToken: String,
    emailVerificationExpire: Date
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Encrypter le mot de passe avant la sauvegarde
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Virtuals pour les liens avec d'autres collections
userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author',
    justOne: false
});

userSchema.virtual('forums', {
    ref: 'Forum',
    localField: '_id',
    foreignField: 'creator',
    justOne: false
});

module.exports = mongoose.model('User', userSchema);