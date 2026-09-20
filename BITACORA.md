# Bitácora del proyecto — La Rampa del Planeta

Este archivo lleva el registro de avance del proyecto de residencia
(digitalización de la rampa de evolución del planeta, Papalote Museo
del Niño Monterrey). Cada vez que trabajemos, agregamos una entrada
nueva arriba con: fecha, quién trabajó, qué se hizo, y qué sigue.
Así, si Benjamín y su compañero no coinciden en horario, cualquiera
puede retomar exactamente donde se quedó el otro.

---

## 2026-09-20 — Benjamín (con ayuda de Claude)

**Se hizo:**
- Se agregó la estación **RECURSOS** con el paso a paso real de cómo se
  forman los combustibles fósiles (organismos enterrados → hidrocarburos
  → petróleo y gas por presión/temperatura), reutilizando el mismo
  componente de paso a paso de la estación Fósil, y una galería de íconos
  de usos cotidianos (edificios, barcos, aviones, plásticos, medicinas).
- Se agregó la estación **CONCIENCIA** con el texto real sobre el impacto
  humano acelerado de los últimos 200 años, y una leyenda de las 4
  categorías de riesgo (en peligro de extinción, amenazadas, sujetas a
  protección especial, probablemente extintas en el medio silvestre).
- **Aviso de datos:** el panel original de Conciencia muestra gráficas
  con el % exacto de especies de cada grupo (hongos, plantas, peces, etc.)
  en cada categoría de riesgo, pero esos números no se alcanzan a leer
  bien en las fotos. Se dejó como nota visible en el sitio — no se
  inventaron porcentajes.
- **Se refactorizó el componente de paso a paso** (`data-stepper`) para
  que funcione con varias instancias en la página (antes solo detectaba
  la primera, como con la línea de tiempo). Ya no depende de que la
  primera secuencia se llame "amonite": ahora toma automáticamente la
  primera secuencia que encuentre en cada estación.
- Se agregaron "Recursos" y "Conciencia" al menú de navegación.

**Estaciones que ya tienen contenido real (9 de 9 estaciones principales):**
Tierra, Cambio, Aramberri, Fósil, Ecosistema, Paleontólogos, Ancestro,
Adaptación, Recursos, Conciencia, Sostenible.

**Pendiente / siguiente sesión:**
- Estaciones que faltan por transcribir del recorrido físico: Evidencia,
  Fósil Guía, Conocimiento (paneles con vitrinas de fósiles adicionales,
  contenido parecido a Fósil/Ecosistema — decidir si se fusionan con
  esas o se hacen aparte).
- Confirmar con el museo los % exactos de la estación Conciencia y el
  texto de los 9 pasos de Paleontólogos.
- (se mantiene lo demás: colaborador, hosting, reemplazar fotos de
  referencia por oficiales)

---

## 2026-09-19 — Benjamín (con ayuda de Claude)

**Se hizo:**
- Se agregó la estación **ANCESTRO** con un **árbol de la vida interactivo**:
  un centro "Ancestro común" rodeado de 5 ramas tocables (Plantas, Animales,
  Hongos, Protozoos, Bacterias); al tocar una rama se muestra qué la hace
  diferente de las demás.
- Se agregó la estación **ADAPTACIÓN** con el texto real sobre el mar de
  Vallecillo hace 93 Ma y los moluscos *Inoceramus*, más **tarjetas
  expandibles** (acordeón) de las 4 especies nombradas en la rampa:
  *Mauriciosaurus fernandezi*, *Vallecillichthys multivertebratum*,
  *Vallecillosaurus donrobertoi* y *Gouimimichthys roberti*, cada una con
  el significado real de su nombre científico.
- Se agregaron "Ancestro" y "Adaptación" al menú de navegación.

**Pendiente / siguiente sesión:**
- Estaciones que faltan: Evidencia, Fósil Guía, Conocimiento, Recursos,
  Conciencia.
- (se mantiene lo demás: colaborador, confirmar texto de Paleontólogos,
  hosting, reemplazar fotos de referencia por oficiales)

---

## 2026-09-18 (4ta sesión del día) — Benjamín (con ayuda de Claude)

**Se hizo:**
- Se integró el **logo oficial de Papalote Museo del Niño Monterrey**
  (la mariposa verde con formas geométricas) en 3 lugares: el encabezado
  del sitio, la pantalla de entrada (arriba del título animado), y como
  ícono de la pestaña del navegador (favicon).
- Se guardaron 2 versiones optimizadas en `/img`: `logo-papalote.png`
  (500x500, uso general) y `favicon-papalote.png` (64x64, ícono de pestaña).

**Pendiente / siguiente sesión:**
- (se mantiene todo lo anterior)

---

## 2026-09-18 (3ra sesión del día) — Benjamín (con ayuda de Claude)

**Se hizo:**
- Se agregó una **pantalla de entrada (intro)** a pantalla completa,
  inspirada en el patrón de estudios creativos (título animándose letra
  por letra + botón "Comenzar recorrido"). Al presionar el botón, la
  pantalla se desvanece y revela el sitio; mientras tanto el scroll de
  la página queda bloqueado para que el efecto se vea completo.
- Se respeta la preferencia de "reducir movimiento" (accesibilidad):
  si el visitante la tiene activada, el texto aparece directo sin animar.

**Pendiente / siguiente sesión:**
- (se mantiene todo lo anterior)
- Cuando el contenido esté más avanzado, se puede pulir esta intro con
  un ícono/logo propio del proyecto en vez de solo texto.

---

## 2026-09-18 (2da sesión del día) — Benjamín (con ayuda de Claude)

**Se hizo:**
- Se agregaron 3 fotos de fósiles de referencia a `/img`: `amonite-especimen.jpg`,
  `pez-fosil-raya.jpg`, `pez-fosil-pequeno.jpg` (comprimidas de varios MB a
  ~170-200 KB cada una para que carguen rápido).
- Se construyó un **componente de carrusel reutilizable** (mismo patrón que
  la línea de tiempo y la gráfica de dona: JSON + JavaScript genérico) y se
  integró en la estación **FÓSIL**, mostrando esas 3 fotos con flechas y
  puntos de navegación.
- Se **corrigió el visor 3D de Aramberri**: el iframe de Sketchfab
  (modelo "Ocean Pliosaur Mosasaurus" de Etherion Designs) traía parámetros
  que ocultaban el crédito al autor (`ui_watermark_link=0`,
  `ui_watermark_brand=0`). Se quitaron esos parámetros y se agregó de vuelta
  el texto de atribución con enlaces, como exige Sketchfab para uso gratuito
  de modelos de otros autores. El visor sigue siendo 100% interactivo
  (el visitante puede rotar/zoom con el dedo o mouse).
- Ajuste final: se reemplazó por el código de embed **oficial exacto** que
  entrega Sketchfab (copiado directamente desde su botón "Embed viewer"),
  para no dejar ninguna duda sobre la atribución correcta.

**Aviso de derechos de autor:** se recibió una 4ta imagen (`fosil.jpg`,
una lámina en blanco y negro de una publicación científica en francés)
que **NO se integró al sitio** porque parece escaneada de un artículo/libro
impreso, con posibles derechos de autor del editor. Se guardó en `/img`
como `NOUSAR-placa-cientifica-verificar-licencia.jpg` (el nombre lo dice:
no usar hasta confirmar la licencia). Si se puede confirmar que es de
dominio público o de una fuente con licencia libre, se puede integrar
después.

**Pendiente / siguiente sesión:**
- Reemplazar las 3 fotos de fósiles de referencia por fotos oficiales de
  la rampa cuando estén disponibles.
- Decidir qué hacer con la 4ta imagen (buscar la fuente original o
  descartarla definitivamente).
- (se mantiene lo demás: colaborador, confirmar texto de Paleontólogos,
  estaciones restantes, hosting)

---

## 2026-09-18 — Sesión con Antigravity (trabajo paralelo, fusionado aquí)

**Se hizo (en otra herramienta, ahora integrado como base de trabajo):**
- Se resolvió el pendiente de la **paleta de color**: se ajustó a los
  colores reales de papalotemty.org.mx — verde `#27A64C`, naranja/rojo
  `#F05A28`, azul `#00AEEF`.
- Se agregó un estilo visual **"clay"** (tarjetas y botones con efecto
  3D suave y muy redondeado) aplicado a botones, tarjetas y controles
  en todo el sitio.
- Se agregó **gamificación real**:
  - Quiz de opción múltiple en la estación Tierra.
  - Minijuego "rasca y descubre" en la estación Fósil (canvas con
    interacción de mouse/dedo para revelar un fósil).
  - Widget de "mochila" flotante con contador de insignias — esto
    resuelve el pendiente de "sistema de gamificación visible".
- Se agregaron las primeras imágenes reales/de prueba en `/img`:
  `Amonite.png`, `pez.jpg`, `fossil-pez.svg`.
- Se agregaron fondos decorativos con parallax sutil (formas geométricas).

**Nota del equipo:** este trabajo se hizo con otra herramienta (Antigravity)
en paralelo; se revisó y se adoptó como base de trabajo actual porque es
compatible y superior a la versión anterior. A partir de aquí seguimos
trabajando sobre esta versión.

**Pendiente / siguiente sesión:**
- Conseguir/colocar el video del pliosaurio (render de Sketchfab) en el
  espacio ya reservado de la estación Aramberri.
- Conseguir imágenes de prueba de peces, moluscos, amonites y del
  planeta en distintas épocas (usar bancos con licencia libre: Wikimedia
  Commons, Smithsonian Open Access, Unsplash/Pexels — marcarlas como
  placeholder y reemplazarlas antes de la entrega final).
- (se mantiene lo demás: colaborador, confirmar texto de Paleontólogos,
  estaciones restantes, hosting)

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
