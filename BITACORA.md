# Bitácora del proyecto — La Rampa del Planeta

Este archivo lleva el registro de avance del proyecto de residencia
(digitalización de la rampa de evolución del planeta, Papalote Museo
del Niño Monterrey). Cada vez que trabajemos, agregamos una entrada
nueva arriba con: fecha, quién trabajó, qué se hizo, y qué sigue.
Así, si Benjamín y su compañero no coinciden en horario, cualquiera
puede retomar exactamente donde se quedó el otro.

---

## 2026-09-08 (6ta sesión) — Benjamín 6

**Se hizo:**
- Se agregó la estación **ECOSISTEMA** con una **gráfica de dona interactiva**
  (construida en SVG a partir de un JSON, igual patrón reutilizable que la
  línea de tiempo): muestra la composición de fósiles de Vallecillo
  (53% peces, 14% coprolitos, 13% moluscos bivalvos, 9% partículas
  carbonatadas, 9% ammonites, 1% octópodos, 1% otros). Al pasar el mouse
  por la leyenda o por la gráfica, se resalta el segmento correspondiente.
- Se agregó la estación **PALEONTÓLOGOS** con el texto real legible del
  panel (cooperación paleontólogos/sociedad civil, trabajo de campo y
  laboratorio) y una galería de las herramientas reales que aparecen en
  la vitrina de la rampa (martillo geológico, brochas, guantes, cincel,
  brújula, GPS, sombrero, pala).
- **Aviso importante:** en el panel de Paleontólogos había 9 pasos
  numerados en las fotos, pero el texto se ve demasiado pequeño/borroso
  para transcribirlo con certeza. Se dejó una nota visible en el sitio
  y aquí en la bitácora para que se confirme con el museo o con fotos
  de mejor resolución antes de la entrega final.
- Se agregaron "Ecosistema" y "Paleontólogos" al menú de navegación.

**Pendiente / siguiente sesión:**
- Confirmar/transcribir el texto de los 9 pasos del panel de Paleontólogos.
- Estaciones que faltan: Evidencia, Fósil Guía, Conocimiento, Ancestro,
  Adaptación, Recursos, Conciencia.
- (se mantiene lo demás: colaborador, fotos/videos reales, hosting,
  gamificación visible, decisión de paleta)

---

## 2026-09-08 (5ta sesión) — Benjamín 5

**Se hizo — mejoras de experiencia de usuario (aplican a todo el sitio):**
- **Barra de progreso** arriba de la pantalla: muestra cuánto llevas
  recorrido de la rampa completa, no solo de una estación.
- **Menú activo (scrollspy):** el enlace de la estación que estás viendo
  se resalta automáticamente en el menú, así el visitante siempre sabe
  dónde está.
- **Animación de aparición:** cada estación aparece con un fade + subtle
  slide al hacer scroll hasta ella, para que se sienta más como un
  recorrido y menos como una página estática. Se respeta la preferencia
  de "reducir movimiento" del sistema (accesibilidad).
- **Botón flotante "volver arriba":** aparece después de bajar un poco
  y regresa al inicio con scroll suave.
- **Menú móvil mejorado:** ahora se abre/cierra con una animación, y se
  cierra automáticamente al elegir una estación (antes se quedaba abierto).
- **Accesibilidad:** se agregó un enlace "Saltar al contenido" (útil para
  quien navega con teclado o lector de pantalla), visible solo al usarlo.

**Pendiente / siguiente sesión:**
- (se mantiene lo de sesiones anteriores)
- Próximas mejoras de UX sugeridas para cuando avancemos más:
  sistema de puntos/insignias visible en todo momento (ej. barra fija
  con "X de 17 estaciones visitadas"), y optimizar imágenes/videos
  reales cuando se suban (carga rápida en el wifi del museo).

---

## 2026-09-08 (4ta sesión) — Benjamín 4

**Se hizo:**
- Se completó la estación **CAMBIO** con el texto real: mares cretácicos
  cubriendo el NE de México, arrecifes en Mina, mar profundo en Aramberri
  y Vallecillo, y el retiro gradual del mar hacia el Golfo de México.
- Se agregó un **mini mapa interactivo** (mismo componente de línea de
  tiempo que Tierra) con 4 momentos: hace 145 Ma, 90 Ma, 66 Ma y el
  presente, mostrando cómo se retiró el mar de Nuevo León.
- Se **refactorizó `script.js`** para que la línea de tiempo funcione con
  varias instancias en la misma página (antes solo soportaba una). Esto
  es importante: si en otra estación quieren otra línea de tiempo, ya
  funciona automáticamente sin tocar el JavaScript, solo agregando el
  bloque HTML con su propio JSON de datos.
- Se agregó "Cambio" al menú de navegación.

**Pendiente / siguiente sesión:**
- (se mantiene lo pendiente: colaborador, fotos/imágenes reales,
  estaciones restantes — Ecosistema, Evidencia, Paleontólogos, Fósil
  Guía, Conocimiento, Ancestro, Adaptación, Recursos, Conciencia —,
  hosting en Netlify/Vercel, sistema de puntos/quiz)
- Nota: en otra sesión se habló de hacer un documento de diseño aparte
  para el asesor, con una paleta ligeramente distinta a la que ya está
  en el CSS (extraída directo del home de papalotemty.org.mx: azul
  primario, naranja/rojo de acento, verde lima y morado secundarios,
  personajes geométricos con cara, trazos punteados a mano). Falta
  decidir si se ajusta la paleta del sitio a esa referencia o se deja
  la actual (verde/naranja/madera).

---

## 2026-09-08 (3ra sesión) — Benjamín 3

**Se hizo:**
- Se completó la estación **TIERRA** con el texto real de las fotos.
- Se agregó una **línea de tiempo interactiva** con control deslizante:
  el visitante arrastra y recorre 11 momentos del planeta, desde el Eón
  Hadeano (hace 4,600 Ma, bola de magma) hasta la época actual, pasando
  por la formación de la Luna, los primeros océanos, Pangea, el límite
  Cretácico-Paleógeno y la última era glacial.
- Los datos de cada momento viven en un bloque JSON dentro del HTML, así
  que es fácil editarlos o agregar momentos sin tocar el JavaScript.
- Por ahora cada época se representa con un emoji; se puede sustituir
  por las imágenes reales de los globos terráqueos de la rampa.

**Pendiente / siguiente sesión:**
- Sustituir los emojis de la línea de tiempo por las imágenes reales
  de los globos (las fotos del panel las tenemos, faltan los archivos
  digitales del museo).
- (se mantiene lo demás pendiente: colaborador, resto de estaciones,
  hosting, sistema de puntos/quiz)

---

## 2026-09-08 (2da sesión) — Benjamín 2

**Se hizo:**
- Se completó la estación **FÓSIL** con el texto real de las fotos
  (tipos de fósiles, por qué Vallecillo preserva tan bien los fósiles).
- Se agregó un paso a paso **interactivo** de cómo se forma un fósil,
  con dos secuencias que el visitante puede alternar: la de un amonite
  (6 pasos) y la de un pez (5 pasos), con botones "Anterior/Siguiente".
- Se actualizaron `index.html`, `css/style.css` y `js/script.js`.

**Pendiente / siguiente sesión:**
- (se mantiene lo pendiente de la sesión anterior: colaborador, fotos
  reales, resto de estaciones, hosting, gamificación)
- Sugerencia para la próxima estación: **Tierra** (línea de tiempo de
  continentes) o **Aramberri con más multimedia** (agregar foto real
  del fósil cuando la tengan).

---

## 2026-09-08 — Benjamín 1

**Se hizo:**
- Se creó el repositorio `rampa-papalote-uanl` en GitHub.
- Se definió la estructura de carpetas: /css, /js, /img, /videos, /paginas
- Se analizó el contenido real de la rampa a partir de fotos del lugar:
  17 estaciones identificadas (Tierra, Cambio, Fósil, Ecosistema, Evidencia,
  Paleontólogos, Aramberri, Fósil Guía, Conocimiento, Ancestro, Adaptación,
  Recursos, Conciencia, Sostenible, entre otras).
- Se creó el sistema de diseño (colores, tipografía) inspirado en el sitio
  oficial de Papalote Monterrey (papalotemty.org.mx).
- Se armaron los archivos base: `index.html`, `css/style.css`, `js/script.js`
- Se construyó el prototipo completo de la estación **Aramberri** (con el
  texto real de las fotos: descubrimiento en 1985, 18 m de longitud,
  adultos hasta 25 m, el pliosaurio más grande registrado en rocas del
  Jurásico tardío).
- Se dejaron placeholders (secciones vacías con estructura) para las
  estaciones Tierra, Fósil y Sostenible.

**Pendiente / siguiente sesión:**
- Agregar al compañero de equipo como colaborador del repositorio.
- Conseguir y subir a /img las fotos e ilustraciones reales de cada
  estación (por ahora solo tenemos las fotos de referencia de la rampa,
  no los archivos digitales originales del museo).
- Completar el contenido real de las estaciones: Tierra, Cambio, Fósil,
  Ecosistema, Paleontólogos, Fósil Guía, Ancestro, Adaptación, Recursos,
  Conciencia.
- Decidir si cada estación vive en la misma página (`index.html`) con
  scroll, o si se separan en archivos individuales dentro de /paginas.
- Conectar el repositorio a Netlify o Vercel para tener una URL pública
  de avance.
- Agregar el sistema de gamificación (quiz + progreso) una vez que el
  contenido de las estaciones esté completo.

---

<!-- Nueva entrada: copia el formato de arriba y agrégala HASTA ARRIBA -->
