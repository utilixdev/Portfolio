// Animación de fondo dinámico y Mouse Trail Effect
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");
let mouse = { x: 0, y: 0 };
let particles = [];
let gradientShift = 0;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function animateBackground() {
    gradientShift += 0.005;
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `hsl(${(gradientShift * 100) % 360}, 80%, 60%)`);
    gradient.addColorStop(1, `hsl(${(gradientShift * 100 + 120) % 360}, 80%, 60%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    requestAnimationFrame(animateBackground);
}
animateBackground();

document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    particles.push(new Particle(mouse.x, mouse.y));
});

function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = `hsl(${(gradientShift * 100) % 360}, 100%, 50%)`;
}

Particle.prototype.update = function() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.2) this.size -= 0.1;
};

Particle.prototype.draw = function() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
};

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
}

function animateParticles() {
    handleParticles();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// Dark/Light Mode Toggle y persistencia
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        toggleBtn.textContent = '☀️';
    } else {
        document.body.classList.remove('dark');
        toggleBtn.textContent = '🌙';
    }
});

// Animación de la barra de navegación y menú móvil
const header = document.querySelector(".header");
const menuToggle = document.getElementById("menu-toggle");
const nav = document.getElementById("main-nav");
let lastScrollY = window.scrollY;

menuToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});

window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY && window.scrollY > 200) {
        header.style.transform = "translateY(-100%)";
    } else {
        header.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;
});

// Scroll suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
        }

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- Interacciones de las secciones ---
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Animación de la sección "Sobre nosotros"
        if (entry.target.id === 'about') {
            entry.target.style.animation = "fadeIn 1s forwards";
        }
        
        // Animación de las tarjetas en "Servicios"
        if (entry.target.id === 'services') {
            const cards = entry.target.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
            });
        }
        
        // Animación de las tarjetas en "Proyectos"
        if (entry.target.id === 'projects') {
            const cards = entry.target.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.animation = `fadeInUp 0.8s ease-out ${index * 0.2}s forwards`;
            });
        }

        observer.unobserve(entry.target);
    });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});
