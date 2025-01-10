// Initialisation de l'application
const App = {
    // État global de l'application
    state: {
        currentUser: null,
        isAuthenticated: false,
        theme: localStorage.getItem('theme') || 'light',
        notifications: []
    },

    // Initialisation
    init() {
        this.checkAuth();
        this.initTheme();
        this.initComponents();
        this.bindEvents();
    },

    // Vérification de l'authentification
    async checkAuth() {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await AuthService.getCurrentUser();
                if (response.success) {
                    this.state.currentUser = response.data.user;
                    this.state.isAuthenticated = true;
                    this.updateUI();
                }
            } catch (error) {
                console.error('Erreur d\'authentification:', error);
                localStorage.removeItem('token');
            }
        }
    },

    // Initialisation du thème
    initTheme() {
        document.documentElement.setAttribute('data-theme', this.state.theme);
    },

    // Initialisation des composants
    initComponents() {
        // Initialiser les composants header et footer
        Header.init();
        Footer.init();

        // Initialiser les modales
        Modal.init();

        // Initialiser les formulaires
        Forms.init();

        // Initialiser les notifications
        NotificationComponent.init();
    },

    // Liaison des événements
    bindEvents() {
        // Gestion du changement de thème
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Gestion de la déconnexion
        document.getElementById('logoutBtn')?.addEventListener('click', () => {
            this.logout();
        });

        // Gestion des notifications
        document.getElementById('notificationsBtn')?.addEventListener('click', () => {
            this.toggleNotifications();
        });
    },

    // Mise à jour de l'interface utilisateur
    updateUI() {
        const authButtons = document.getElementById('authButtons');
        const userMenu = document.getElementById('userMenu');
        const userAvatar = document.getElementById('userAvatar');
        const username = document.getElementById('username');

        if (this.state.isAuthenticated && this.state.currentUser) {
            if (authButtons) authButtons.style.display = 'none';
            if (userMenu) userMenu.style.display = 'flex';
            if (userAvatar) userAvatar.src = this.state.currentUser.avatar || '/assets/images/default-avatar.png';
            if (username) username.textContent = this.state.currentUser.username;
        } else {
            if (authButtons) authButtons.style.display = 'flex';
            if (userMenu) userMenu.style.display = 'none';
        }
    },

    // Changement de thème
    toggleTheme() {
        this.state.theme = this.state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', this.state.theme);
        this.initTheme();
    },

    // Déconnexion
    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            this.state.currentUser = null;
            this.state.isAuthenticated = false;
            this.updateUI();
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', error);
            NotificationComponent.show('Erreur lors de la déconnexion', 'error');
        }
    },

    // Gestion des notifications
    toggleNotifications() {
        NotificationComponent.toggle();
    },

    // Navigation
    navigate(path) {
        window.location.href = path;
    },

    // Gestion des erreurs globale
    handleError(error) {
        console.error('Erreur:', error);
        if (error.response?.status === 401) {
            this.logout();
        }
        NotificationComponent.show(
            error.message || 'Une erreur est survenue',
            'error'
        );
    },

    // Utilitaires
    formatDate(date) {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Vérification des permissions
    hasPermission(permission) {
        if (!this.state.currentUser) return false;
        return this.state.currentUser.role === 'admin' || 
               this.state.currentUser.permissions?.includes(permission);
    }
};

// Initialisation de l'application au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// Exportation pour utilisation dans d'autres modules
window.App = App;