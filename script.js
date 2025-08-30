// Animación de fondo dinámico
const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradientShift = 0;
function animateBackground() {
  gradientShift += 0.005;
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, `hsl(${(gradientShift*100)%360}, 80%, 60%)`);
  gradient.addColorStop(1, `hsl(${(gradientShift*100+120)%360}, 80%, 60%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animateBackground);
}
animateBackground();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Fade-in al hacer scroll
const faders = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeIn 1s forwards";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
faders.forEach(el => observer.observe(el));

// Dark/Light Mode Toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});
