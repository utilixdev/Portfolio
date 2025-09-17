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

// --- Interacciones de las secciones y formulario de contacto ---
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

  // Animación de las columnas de contacto
  if (entry.target.id === 'contact') {
      const contactBoxes = entry.target.querySelectorAll('.contact-box');
      contactBoxes.forEach((box, index) => {
        box.style.animationDelay = `${index * 0.2}s`;
        box.classList.add('animated');
      });
  }

  observer.unobserve(entry.target);
 });
}, { threshold: 0.2 });

document.querySelectorAll('.section').forEach(section => {
 sectionObserver.observe(section);
});

document.addEventListener('DOMContentLoaded', (event) => {
 const textElement = document.getElementById('typewriter-text');
 if (textElement) {
  const textToType = "En UtiliX ofrecemos soluciones digitales personalizadas para empresas y emprendedores que buscan destacar en el entorno online. Nuestro equipo se especializa en el diseño y desarrollo de páginas web modernas, rápidas y adaptadas a cualquier dispositivo, siempre con un enfoque en la experiencia del usuario y el rendimiento.";
  let i = 0;
  
  function typeWriter() {
   if (i < textToType.length) {
    textElement.innerHTML += textToType.charAt(i);
    i++;
    setTimeout(typeWriter, 50);
   }
  }

  // Iniciar el efecto cuando la sección es visible
  const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
    if (entry.isIntersecting) {
     typeWriter();
     observer.unobserve(entry.target);
    }
   });
  }, { threshold: 0.5 });

  const aboutSection = document.getElementById('about');
  observer.observe(aboutSection);
 }
});

// Manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');
const contactBox = document.getElementById('form-box');
const messageContainer = contactBox.querySelector('.message-container');

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        // 1. Deshabilitar el botón y mostrar "Enviando..."
        const submitButton = contactForm.querySelector('.btn');
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // 2. Limpiar el contenedor de mensajes de forma segura
        messageContainer.innerHTML = '';
        messageContainer.classList.remove('has-message');

        const data = new FormData(event.target);
        const messageElement = document.createElement('p');

        try {
            const response = await fetch(event.target.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                contactForm.reset();
                messageElement.textContent = '✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.';
                messageElement.classList.add('success-message');
            } else {
                messageElement.textContent = '❌ Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.';
                messageElement.classList.add('error-message');
            }

        } catch (error) {
            messageElement.textContent = '❌ Hubo un problema de conexión. Inténtalo de nuevo más tarde.';
            messageElement.classList.add('error-message');
        } finally {
            // 3. Añadir el elemento del mensaje (con opacidad 0) al contenedor.
            messageElement.style.opacity = '0';
            messageContainer.appendChild(messageElement);

            // 4. Esperamos al siguiente cuadro de animación del navegador
            // antes de añadir la clase. Esto garantiza que el DOM ha sido
            // renderizado con el nuevo elemento, pero aún con la altura mínima.
            requestAnimationFrame(() => {
                // 5. Ahora, forzamos un reflow para que el navegador "vea"
                // la altura de nuestro nuevo contenido. Esto evita el salto.
                messageContainer.offsetHeight;

                // 6. Activamos las transiciones de forma suave.
                messageContainer.classList.add('has-message');
                messageElement.style.opacity = '1';
            });

            // 7. Configurar el temporizador para ocultar el mensaje y el contenedor
            setTimeout(() => {
                messageElement.style.opacity = '0'; // Desvanece el mensaje

                // Esperamos 500ms (duración de la transición de opacidad)
                // antes de contraer el contenedor.
                setTimeout(() => {
                    messageContainer.classList.remove('has-message'); // Contrae el contenedor
                }, 500);

            }, 5000); // El mensaje permanece visible por 5 segundos

            // 8. Reiniciar el botón y el contenedor
            setTimeout(() => {
                messageContainer.innerHTML = '';
                submitButton.textContent = 'Enviar Mensaje';
                submitButton.disabled = false;
            }, 5600); // 5000ms (visible) + 500ms (fade-out) + 100ms (seguridad)
        }
    });
}
