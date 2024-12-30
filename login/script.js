document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Réinitialiser les messages d'erreur
    clearErrors();
    
    // Récupérer les valeurs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Valider l'email
    if (!validateEmail(email)) {
        showError('email', 'Veuillez entrer une adresse email valide');
        return;
    }
    
    // Valider le mot de passe
    if (password.length < 6) {
        showError('password', 'Le mot de passe doit contenir au moins 6 caractères');
        return;
    }
    
    // Si tout est valide, simuler la connexion
    console.log('Tentative de connexion...');
    // Ici, vous pouvez ajouter votre logique de connexion
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.nextElementSibling;
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('.form-group input');
    
    errors.forEach(error => error.style.display = 'none');
    inputs.forEach(input => input.classList.remove('error'));
}