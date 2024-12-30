// Gestion du menu mobile
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    navLinks.classList.toggle('active');
    
    // Animation du bouton hamburger
    const spans = menuBtn.getElementsByTagName('span');
    if (isMenuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            menuBtn.click();
        }
    });
});

// Smooth scroll pour les ancres
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation au scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observer les sections pour l'animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Gestion du formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            // Simulation d'envoi de données
            console.log('Envoi des données :', formData);
            // Ici, vous pouvez ajouter votre logique d'envoi de données
            
            // Réinitialisation du formulaire
            contactForm.reset();
            alert('Message envoyé avec succès !');
        } catch (error) {
            console.error('Erreur lors de l\'envoi :', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        }
    });
}

// Animations des statistiques
function animateNumbers() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 1500;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current > target) {
                clearInterval(timer);
                current = target;
            }
            stat.textContent = Math.floor(current) + '+';
        }, stepTime);
    });
}

// Déclencher l'animation des statistiques au scroll
const statsSection = document.querySelector('.stats-container');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}