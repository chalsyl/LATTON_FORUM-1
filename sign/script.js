document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registerForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePasswordBtn = document.querySelector('.toggle-password');
    const passwordStrength = document.querySelector('.password-strength');

    // Toggle password visibility
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('.eye-icon').textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Check password strength
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;

        // Length check
        if (password.length >= 8) strength++;
        // Contains number
        if (/\d/.test(password)) strength++;
        // Contains letter
        if (/[a-zA-Z]/.test(password)) strength++;
        // Contains special character
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        passwordStrength.className = 'password-strength';
        if (strength > 3) {
            passwordStrength.classList.add('strong');
        } else if (strength > 2) {
            passwordStrength.classList.add('medium');
        } else if (strength > 0) {
            passwordStrength.classList.add('weak');
        }
    });

    // Form validation
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        clearErrors();

        let isValid = true;
        const email = document.getElementById('email').value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const fullname = document.getElementById('fullname').value;
        const university = document.getElementById('university').value;
        const terms = document.getElementById('terms').checked;

        // Validate fullname
        if (fullname.length < 3) {
            showError('fullname', 'Le nom doit contenir au moins 3 caractères');
            isValid = false;
        }

        // Validate email
        if (!validateEmail(email)) {
            showError('email', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }

        // Validate password
        if (password.length < 8) {
            showError('password', 'Le mot de passe doit contenir au moins 8 caractères');
            isValid = false;
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            showError('confirmPassword', 'Les mots de passe ne correspondent pas');
            isValid = false;
        }

        // Validate university
        if (university.length < 2) {
            showError('university', 'Veuillez entrer le nom de votre établissement');
            isValid = false;
        }

        // Validate terms
        if (!terms) {
            showError('terms', 'Vous devez accepter les conditions d\'utilisation');
            isValid = false;
        }

        if (isValid) {
            // Simulation d'envoi du formulaire
            console.log('Inscription en cours...', {
                fullname,
                email,
                university
            });
            // Ici, vous pouvez ajouter votre logique d'inscription
            alert('Inscription réussie ! Vous allez recevoir un email de confirmation.');
        }
    });
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    field.classList.add('error');
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input');
    
    errors.forEach(error => error.style.display = 'none');
    inputs.forEach(input => input.classList.remove('error'));
}