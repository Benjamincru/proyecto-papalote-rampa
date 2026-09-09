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

  // --- Espacio reservado para futuras funciones ---
  // Ejemplos de lo que agregaremos estación por estación:
  // - Quiz de opción múltiple al final de cada estación
  // - Sistema de puntos/insignias guardado en localStorage
  // - Barra de progreso según las estaciones visitadas

});
