// ── REACCIONES ──
const reacciones = { corazon: 0, fiesta: 0, aplauso: 0 };

function reaccionar(tipo) {
  reacciones[tipo]++;
  document.getElementById('count-' + tipo).textContent = reacciones[tipo];

  // Animación en el botón
  const btn = event.currentTarget;
  btn.style.transform = 'scale(1.3)';
  setTimeout(() => btn.style.transform = 'scale(1)', 200);
}

// ── COMPARTIR ──
function compartir() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    mostrarToast();
  }).catch(() => {
    // Fallback por si el navegador no soporta clipboard
    const input = document.createElement('input');
    input.value = url;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    mostrarToast();
  });
}

function mostrarToast() {
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ── CONTADOR DE VISITAS (simulado) ──
function simularVisitas() {
  const base = 1240;
  const variacion = Math.floor(Math.random() * 80) + 10;
  document.getElementById('visitas').textContent = (base + variacion).toLocaleString();
}

simularVisitas();

// ── NAVBAR: resaltar sección activa ──
const secciones = document.querySelectorAll('section[id]');
const links = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let actual = '';
  secciones.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      actual = sec.getAttribute('id');
    }
  });

  links.forEach(link => {
    link.style.color = link.getAttribute('href') === '#' + actual ? '#185FA5' : '#444';
    link.style.fontWeight = link.getAttribute('href') === '#' + actual ? '600' : '400';
  });
});


// ── CARRUSEL ──
let slideActual = 0;
const slides = document.querySelectorAll('.carrusel-slide');
const puntos = document.querySelectorAll('.punto');
let intervalo = iniciarCarrusel();

function mostrarSlide(n) {
  slides[slideActual].classList.remove('activo');
  puntos[slideActual].classList.remove('activo');
  slideActual = (n + slides.length) % slides.length;
  slides[slideActual].classList.add('activo');
  puntos[slideActual].classList.add('activo');
}

function cambiarSlide(dir) {
  clearInterval(intervalo);
  mostrarSlide(slideActual + dir);
  intervalo = iniciarCarrusel();
}

function irASlide(n) {
  clearInterval(intervalo);
  mostrarSlide(n);
  intervalo = iniciarCarrusel();
}

function iniciarCarrusel() {
  return setInterval(() => mostrarSlide(slideActual + 1), 4000);
}

// ── CONFETTI ──
function lanzarConfetti() {
  const colores = ['#185FA5', '#B5D4F4', '#FFD700', '#FF6B6B', '#7BFF6B', '#FF69B4', '#ffffff'];
  const total = 120;

  for (let i = 0; i < total; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: ${Math.random() * 10 + 6}px;
        height: ${Math.random() * 10 + 6}px;
        background: ${colores[Math.floor(Math.random() * colores.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        z-index: 9999;
        pointer-events: none;
        animation: caerConfetti ${Math.random() * 2 + 2}s ease-in forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, i * 30);
  }
}

lanzarConfetti();

// ── SOBRES CON CONTRASEÑA ──
function mostrarClave(frente) {
  const container = frente.closest('.sobre-container');
  frente.style.display = 'none';
  container.querySelector('.sobre-clave').style.display = 'flex';
}

function verificarClave(btn, claveCorrecta, mensaje) {
  const container = btn.closest('.sobre-container');
  const input = container.querySelector('.clave-input');
  const error = container.querySelector('.clave-error');

  if (input.value.toLowerCase() === claveCorrecta) {
    container.querySelector('.sobre-clave').style.display = 'none';
    const mensajeDiv = container.querySelector('.sobre-mensaje');
    mensajeDiv.querySelector('.mensaje-texto').textContent = `"${mensaje}"`;
    mensajeDiv.style.display = 'flex';
  } else {
    error.style.display = 'block';
    input.value = '';
    setTimeout(() => error.style.display = 'none', 2000);
  }
}

function cerrarSobre(btn) {
  const container = btn.closest('.sobre-container');
  container.querySelector('.sobre-mensaje').style.display = 'none';
  container.querySelector('.sobre-frente').style.display = 'flex';
}


// ── ENTER EN INPUT DE CLAVE ──
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const input = document.activeElement;
    if (input.classList.contains('clave-input')) {
      input.closest('.sobre-clave').querySelector('.clave-btn').click();
    }
  }
});     

function volverSobre(btn) {
  const container = btn.closest('.sobre-container');
  container.querySelector('.sobre-clave').style.display = 'none';
  container.querySelector('.sobre-frente').style.display = 'flex';
}