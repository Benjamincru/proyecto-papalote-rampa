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

  // --- Línea(s) de tiempo interactivas (Tierra, Cambio, y las que sigan) ---
  // Se busca CADA elemento con [data-timeline] en la página y se le da
  // su propio slider independiente, para poder reutilizar el mismo
  // componente en distintas estaciones.
  document.querySelectorAll('[data-timeline]').forEach((timeline) => {
    const slider = timeline.querySelector('[data-timeline-slider]');
    const dataScript = timeline.querySelector('[data-timeline-data]');
    const eraEl = timeline.querySelector('[data-timeline-era]');
    const ageEl = timeline.querySelector('[data-timeline-age]');
    const descEl = timeline.querySelector('[data-timeline-desc]');
    const emojiEl = timeline.querySelector('[data-timeline-emoji]');

    let momentos = [];
    try {
      momentos = JSON.parse(dataScript.textContent);
    } catch (e) {
      console.error('No se pudieron leer los datos de la línea de tiempo:', e);
    }

    if (momentos.length === 0) return;

    slider.max = momentos.length - 1;

    function mostrarMomento(indice) {
      const m = momentos[indice];
      if (!m) return;
      eraEl.textContent = m.era;
      ageEl.textContent = m.edad;
      descEl.textContent = m.desc;
      emojiEl.textContent = m.emoji;
    }

    slider.addEventListener('input', () => {
      mostrarMomento(Number(slider.value));
    });

    mostrarMomento(0);
  });

  // --- UX: barra de progreso de lectura (parte de arriba de la pantalla) ---
  const progressBar = document.getElementById('progress-bar');

  function actualizarProgreso() {
    const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
    const avance = alturaTotal > 0 ? (window.scrollY / alturaTotal) * 100 : 0;
    if (progressBar) progressBar.style.width = `${avance}%`;
  }

  // --- UX: botón "volver arriba" (aparece después de bajar un poco) ---
  const backToTop = document.getElementById('back-to-top');

  function actualizarBotonArriba() {
    if (!backToTop) return;
    backToTop.classList.toggle('is-visible', window.scrollY > 500);
  }

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    actualizarProgreso();
    actualizarBotonArriba();
  });
  actualizarProgreso();
  actualizarBotonArriba();

  // --- UX: animación de aparición al hacer scroll (cada estación) ---
  const elementosReveal = document.querySelectorAll('.reveal');

  if (elementosReveal.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observer.unobserve(entrada.target); // solo se anima una vez
        }
      });
    }, { threshold: 0.15 });

    elementosReveal.forEach((el) => observer.observe(el));
  } else {
    // Si el navegador no soporta IntersectionObserver, mostramos todo directo
    elementosReveal.forEach((el) => el.classList.add('is-visible'));
  }

  // --- UX: resaltar en el menú la estación que se está viendo (scrollspy) ---
  const enlacesNav = document.querySelectorAll('.main-nav a');
  const estaciones = document.querySelectorAll('section[id]');

  if (enlacesNav.length > 0 && estaciones.length > 0 && 'IntersectionObserver' in window) {
    const spyObserver = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const idActual = entrada.target.getAttribute('id');
          enlacesNav.forEach((enlace) => {
            enlace.classList.toggle('is-active', enlace.getAttribute('href') === `#${idActual}`);
          });
        }
      });
    }, { threshold: 0.5 });

    estaciones.forEach((s) => spyObserver.observe(s));
  }

  // --- UX: cerrar el menú móvil automáticamente al elegir una estación ---
  enlacesNav.forEach((enlace) => {
    enlace.addEventListener('click', () => {
      if (mainNav) mainNav.classList.remove('main-nav--open');
    });
  });

  // --- Estación ECOSISTEMA: gráfica de dona construida desde JSON ---
  document.querySelectorAll('[data-donut]').forEach((bloque) => {
    const chart = bloque.querySelector('[data-donut-chart]');
    const legend = bloque.querySelector('[data-donut-legend]');
    const dataScript = bloque.querySelector('[data-donut-data]');

    let datos = [];
    try {
      datos = JSON.parse(dataScript.textContent);
    } catch (e) {
      console.error('No se pudieron leer los datos de la gráfica:', e);
      return;
    }

    const tamano = 200;
    const radio = 70;
    const centro = tamano / 2;
    const circunferencia = 2 * Math.PI * radio;

    // Construimos el SVG: un círculo de fondo + un círculo por categoría
    let svg = `<svg viewBox="0 0 ${tamano} ${tamano}" width="100%" height="100%">`;
    svg += `<circle cx="${centro}" cy="${centro}" r="${radio}" fill="none" stroke="${getComputedStyle(document.documentElement).getPropertyValue('--gris-panel')}" stroke-width="26" />`;

    let acumulado = 0;
    datos.forEach((item, i) => {
      const largoSegmento = (item.value / 100) * circunferencia;
      const espacio = circunferencia - largoSegmento;
      const offset = -((acumulado / 100) * circunferencia);

      svg += `<circle
        data-donut-index="${i}"
        cx="${centro}" cy="${centro}" r="${radio}"
        fill="none" stroke="${item.color}" stroke-width="26"
        stroke-dasharray="${largoSegmento} ${espacio}"
        stroke-dashoffset="${offset}"
        transform="rotate(-90 ${centro} ${centro})"
      />`;

      acumulado += item.value;
    });

    svg += '</svg>';
    chart.innerHTML = svg;

    // Construimos la leyenda a partir de los mismos datos
    legend.innerHTML = datos.map((item, i) => `
      <li data-legend-index="${i}">
        <span class="donut-swatch" style="background:${item.color}"></span>
        <span>${item.label}</span>
        <span class="donut-value">${item.value}%</span>
      </li>
    `).join('');

    // Pasar el mouse por la leyenda resalta su segmento en la gráfica, y viceversa
    const circulos = chart.querySelectorAll('circle[data-donut-index]');
    const items = legend.querySelectorAll('li[data-legend-index]');

    function resaltar(indice) {
      circulos.forEach((c) => {
        const activo = c.dataset.donutIndex === String(indice);
        c.style.opacity = indice === null || activo ? '1' : '0.25';
        c.style.strokeWidth = activo ? '30' : '26';
      });
      items.forEach((li) => {
        li.classList.toggle('is-active', li.dataset.legendIndex === String(indice));
      });
    }

    items.forEach((li) => {
      li.addEventListener('mouseenter', () => resaltar(li.dataset.legendIndex));
      li.addEventListener('mouseleave', () => resaltar(null));
    });

    circulos.forEach((c) => {
      c.addEventListener('mouseenter', () => resaltar(c.dataset.donutIndex));
      c.addEventListener('mouseleave', () => resaltar(null));
    });
  });

  // --- Espacio reservado para futuras funciones ---
  // Ejemplos de lo que agregaremos estación por estación:
  // - Quiz de opción múltiple al final de cada estación
  // - Sistema de puntos/insignias guardado en localStorage
  // - Barra de progreso según las estaciones visitadas

});
