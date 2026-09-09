// ==========================================================================
// script.js — La Rampa del Planeta
// Lógica base del sitio. Se irá ampliando con cada estación
// (quiz, barra de progreso, gamificación) conforme avancemos.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Menú móvil: mostrar/ocultar navegación en pantallas pequeñas ---
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('main-nav--open');
    });
  }

  // --- Estación FÓSIL: paso a paso interactivo (amonite / pez) ---
  const stepper = document.querySelector('[data-stepper]');

  if (stepper) {
    const tabs = stepper.querySelectorAll('[data-fossil-track]');
    const prevBtn = stepper.querySelector('[data-fossil-prev]');
    const nextBtn = stepper.querySelector('[data-fossil-next]');
    const countLabel = stepper.querySelector('[data-fossil-count]');

    let currentTrack = 'amonite';
    let currentIndex = 0;

    // Devuelve la lista de <li> (pasos) de la secuencia activa
    function getSteps(track) {
      const list = stepper.querySelector(`[data-fossil-steps="${track}"]`);
      return list ? Array.from(list.querySelectorAll('.fossil-step')) : [];
    }

    // Muestra el paso "currentIndex" de la secuencia activa
    function render() {
      const steps = getSteps(currentTrack);

      steps.forEach((step, i) => {
        step.classList.toggle('is-active', i === currentIndex);
      });

      countLabel.textContent = `${currentIndex + 1} / ${steps.length}`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex === steps.length - 1;
    }

    // Cambiar entre la secuencia de "amonite" y la de "pez"
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        currentTrack = tab.dataset.fossilTrack;
        currentIndex = 0;

        tabs.forEach((t) => t.classList.toggle('is-active', t === tab));

        stepper.querySelectorAll('[data-fossil-steps]').forEach((list) => {
          list.hidden = list.dataset.fossilSteps !== currentTrack;
        });

        render();
      });
    });

    prevBtn.addEventListener('click', () => {
      currentIndex = Math.max(0, currentIndex - 1);
      render();
    });

    nextBtn.addEventListener('click', () => {
      const steps = getSteps(currentTrack);
      currentIndex = Math.min(steps.length - 1, currentIndex + 1);
      render();
    });

    render();
  }

  // --- Espacio reservado para futuras funciones ---
  // Ejemplos de lo que agregaremos estación por estación:
  // - Quiz de opción múltiple al final de cada estación
  // - Sistema de puntos/insignias guardado en localStorage
  // - Barra de progreso según las estaciones visitadas

});
