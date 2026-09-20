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

  // --- Micro-Interacciones Sonoras ---
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  function playPop(type = 'click') {
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    osc.type = 'sine';
    if (type === 'correct') {
      osc.frequency.setValueAtTime(400, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.15);
    } else if (type === 'incorrect') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.2);
    } else {
      osc.frequency.setValueAtTime(500, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.1);
    }
    
    gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.2);
  }

  // Bind clicks to generic buttons (excluding specific game buttons handled manually)
  document.querySelectorAll('button:not(.quiz-btn):not(.fossil-btn)').forEach(btn => {
    btn.addEventListener('click', () => playPop('click'));
  });

  // --- Sistema de Gamificación (Insignias y Quizzes) ---
  const badgeCountEl = document.getElementById('badge-count');
  const backpackEl = document.getElementById('backpack');
  let badgesObtained = new Set();
  const totalBadges = 4; // 3 quizzes + 1 minijuego

  function checkBadge(badgeId) {
    if (!badgesObtained.has(badgeId)) {
      badgesObtained.add(badgeId);
      badgeCountEl.textContent = `${badgesObtained.size}/${totalBadges}`;
      
      // Animar mochila
      if (backpackEl) {
        backpackEl.style.transform = 'scale(1.2) translateY(-10px)';
        backpackEl.style.background = 'var(--verde-papalote)';
        backpackEl.style.color = 'var(--blanco)';
        setTimeout(() => {
          backpackEl.style.transform = 'scale(1) translateY(0)';
          backpackEl.style.background = 'var(--crema)';
          backpackEl.style.color = 'var(--tinta)';
        }, 600);
      }
      
      if (badgesObtained.size === totalBadges) {
        setTimeout(() => alert('¡Felicidades! Has completado todos los juegos interactivos de la Rampa.'), 1000);
      }
    }
  }

  document.querySelectorAll('.quiz-container').forEach(quiz => {
    const btns = quiz.querySelectorAll('.quiz-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', function() {
        const isCorrect = this.dataset.correct === 'true';
        const badgeId = this.dataset.badge;
        
        // Reset colors
        btns.forEach(b => {
          b.style.background = 'var(--gris-panel)';
          b.style.color = 'var(--tinta)';
        });

        if (isCorrect) {
          playPop('correct');
          this.style.background = 'var(--verde-papalote)';
          this.style.color = 'var(--blanco)';
          checkBadge(badgeId);
        } else {
          playPop('incorrect');
          this.style.background = 'var(--naranja-globo)';
          this.style.color = 'var(--blanco)';
          // Animación de error (vibración leve)
          quiz.style.transition = 'transform 0.05s';
          quiz.style.transform = 'translateX(6px)';
          setTimeout(() => quiz.style.transform = 'translateX(-6px)', 50);
          setTimeout(() => quiz.style.transform = 'translateX(6px)', 100);
          setTimeout(() => quiz.style.transform = 'translateX(0)', 150);
          setTimeout(() => quiz.style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)', 200);
        }
      });
    });
  });

  // --- Minijuego: Excava tu Fósil (Scratch Card) ---
  const canvas = document.getElementById('scratchCanvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    
    // Rellenamos el canvas simulando "tierra"
    ctx.fillStyle = '#C89B6A'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Textura de tierra simulada
    ctx.fillStyle = '#A3774C';
    for(let i=0; i<150; i++){
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5, 0, Math.PI*2);
      ctx.fill();
    }

    ctx.globalCompositeOperation = 'destination-out';
    
    function getPointerPos(e) {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (clientX - rect.left) * scaleX,
        y: (clientY - rect.top) * scaleY
      };
    }

    function startScratch(e) {
      isDrawing = true;
      if (audioCtx.state === 'suspended') audioCtx.resume();
      scratch(e);
    }
    
    function stopScratch() {
      isDrawing = false;
      checkScratchCompletion();
    }
    
    function scratch(e) {
      if (!isDrawing) return;
      if (e.cancelable) e.preventDefault(); // prevenir scroll en móvil
      
      const pos = getPointerPos(e);
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 25, 0, Math.PI * 2);
      ctx.fill();
    }
    
    let isRevealed = false;
    function checkScratchCompletion() {
      if (isRevealed) return;
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let clearPixels = 0;
      
      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] < 128) clearPixels++;
      }
      
      const percent = clearPixels / (pixels.length / 4);
      if (percent > 0.6) {
        isRevealed = true;
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        playPop('correct');
        checkBadge('fossil-minigame');
        setTimeout(() => canvas.style.display = 'none', 600);
      }
    }

    canvas.addEventListener('mousedown', startScratch);
    canvas.addEventListener('mousemove', scratch);
    canvas.addEventListener('mouseup', stopScratch);
    canvas.addEventListener('mouseleave', stopScratch);

    canvas.addEventListener('touchstart', startScratch, {passive: false});
    canvas.addEventListener('touchmove', scratch, {passive: false});
    canvas.addEventListener('touchend', stopScratch);
  }

  // --- Parallax 3D FX (Papalote Premium Claymorphism) ---
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  // Para Desktop (Movimiento de ratón)
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
      const xOffset = x * speed * 250;
      const yOffset = y * speed * 250;
      el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  });

  // Para Móviles (Giroscopio)
  if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", (e) => {
      const x = e.gamma ? (e.gamma / 45) : 0; 
      const y = e.beta ? ((e.beta - 45) / 45) : 0;
      
      parallaxElements.forEach(el => {
        const speed = parseFloat(el.getAttribute('data-parallax')) || 0.1;
        const xOffset = x * speed * 150;
        const yOffset = y * speed * 150;
        el.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    }, true);
  }

  // --- Carrusel(es) de imágenes: construido desde JSON, reutilizable ---
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const dotsBox = carousel.querySelector('[data-carousel-dots]');
    const btnPrev = carousel.querySelector('[data-carousel-prev]');
    const btnNext = carousel.querySelector('[data-carousel-next]');
    const dataScript = carousel.querySelector('[data-carousel-data]');

    let slides = [];
    try {
      slides = JSON.parse(dataScript.textContent);
    } catch (e) {
      console.error('No se pudieron leer los datos del carrusel:', e);
      return;
    }
    if (slides.length === 0) return;

    // Construimos cada slide (imagen + texto)
    track.innerHTML = slides.map((s) => `
      <div class="carousel-slide">
        <img src="${s.src}" alt="${s.alt || ''}" loading="lazy">
        <p class="carousel-caption">${s.caption || ''}</p>
      </div>
    `).join('');

    // Construimos los puntos de navegación
    dotsBox.innerHTML = slides.map((_, i) => `
      <button class="carousel-dot${i === 0 ? ' is-active' : ''}" data-carousel-dot="${i}" aria-label="Ir a la imagen ${i + 1}"></button>
    `).join('');

    const dots = dotsBox.querySelectorAll('[data-carousel-dot]');
    let indiceActual = 0;

    function irA(indice) {
      indiceActual = (indice + slides.length) % slides.length;
      track.style.transform = `translateX(-${indiceActual * 100}%)`;
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === indiceActual));
    }

    btnPrev.addEventListener('click', () => irA(indiceActual - 1));
    btnNext.addEventListener('click', () => irA(indiceActual + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => irA(i)));

    irA(0);
  });

  // --- Pantalla de entrada (intro): anima letras y bloquea el scroll hasta iniciar ---
  const introOverlay = document.getElementById('intro-overlay');
  const introBtn = document.getElementById('intro-start');

  if (introOverlay) {
    // Bloquea el scroll de la página mientras se muestra la intro
    document.body.style.overflow = 'hidden';

    // Cada letra del título aparece un poco después que la anterior
    introOverlay.querySelectorAll('.intro-title span').forEach((letra, i) => {
      letra.style.animationDelay = `${i * 0.05}s`;
    });

    if (introBtn) {
      introBtn.addEventListener('click', () => {
        introOverlay.classList.add('is-hidden');
        document.body.style.overflow = '';
      });
    }
  }

  // --- Estación ANCESTRO: árbol de la vida (toca una rama para ver info) ---
  document.querySelectorAll('[data-tree]').forEach((tree) => {
    const ramas = tree.querySelectorAll('[data-tree-branch]');
    const detalle = tree.querySelector('[data-tree-detail]');
    const dataScript = tree.querySelector('[data-tree-data]');

    let textos = [];
    try {
      textos = JSON.parse(dataScript.textContent);
    } catch (e) {
      console.error('No se pudieron leer los datos del árbol:', e);
      return;
    }

    ramas.forEach((rama) => {
      rama.addEventListener('click', () => {
        ramas.forEach((r) => r.classList.remove('is-active'));
        rama.classList.add('is-active');
        const i = Number(rama.dataset.treeIndex);
        detalle.textContent = textos[i] || '';
      });
    });
  });

  // --- Estación ADAPTACIÓN: tarjetas de especies expandibles (acordeón) ---
  document.querySelectorAll('[data-accordion]').forEach((grupo) => {
    grupo.querySelectorAll('[data-accordion-item]').forEach((item) => {
      item.addEventListener('click', () => {
        item.classList.toggle('is-open');
        const abierto = item.classList.contains('is-open');
        item.querySelector('.species-toggle').textContent = abierto ? '×' : '+';
      });
    });
  });

  // --- Espacio reservado para futuras funciones ---

});
