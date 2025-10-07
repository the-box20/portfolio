// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();

    // Initialize animations
    initializeAnimations();

    // Initialize contact form
    initializeContactForm();

    // Initialize skill bar animations
    initializeSkillBars();
});

// Smooth scrolling function
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Initialize animations on scroll
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize skill bar animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const skillObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 200);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Initialize contact form
function initializeContactForm() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Log form data (in a real app, you would send this to a server)
        console.log('Form submitted:', data);

        // Show success message
        showToast('Message sent successfully!', 'Thank you for reaching out. I\'ll get back to you soon.');

        // Reset form
        form.reset();
    });
}

// Toast notification function
function showToast(title, description) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="toast-content">
            <h4 class="toast-title">${title}</h4>
            <p class="toast-description">${description}</p>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <i data-lucide="x"></i>
        </button>
    `;

    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        border: 1px solid #e5e7eb;
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        max-width: 400px;
        display: flex;
        align-items: flex-start;
        gap: 1rem;
        animation: slideIn 0.3s ease-out;
    `;

    // Add CSS for toast animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        .toast-content {
            flex: 1;
        }
        .toast-title {
            font-weight: 600;
            color: #111827;
            margin-bottom: 0.25rem;
        }
        .toast-description {
            color: #6b7280;
            font-size: 0.875rem;
            margin: 0;
        }
        .toast-close {
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 0.25rem;
        }
        .toast-close:hover {
            background: #f3f4f6;
        }
    `;
    document.head.appendChild(style);

    // Add toast to page
    document.body.appendChild(toast);

    // Initialize icons in toast
    lucide.createIcons();

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.remove();
        }
    }, 5000);
}

// Navbar scroll effect (if you want to add a navbar later)
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');

    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Add smooth hover effects for project cards
document.addEventListener('DOMContentLoaded', function () {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Typing animation for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation (uncomment to use)
document.addEventListener('DOMContentLoaded', function () {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriter(heroTitle, 'Mugisha Serein', 100);
    }
});

// EmailJS integration (if you want to use EmailJS for contact form)
(function () {
    emailjs.init("tuCu2sIabqr7ZnlDa"); // e.g. public_abC123x
})();

function sendEmail(event) {
    event.preventDefault();

    // Replace with your actual service and template ID
    emailjs.sendForm("service_6chuifi", "template_96onvri", event.target)
        .then(() => {
            showToast("Message sent successfully!", "Thank you for reaching out. I'll get back to you soon.");
            event.target.reset();
        }, (error) => {
            console.error("EmailJS Error:", error);
            showToast("Failed to send message", "Please try again.");
        });
}