const VRINDAVAN_TEMPLES = [
  {
    id: 'prem-mandir',
    name: 'Prem Mandir',
    tabTitle: '1. Prem Mandir',
    subtitle: 'The Temple of Divine Love • Raman Reti, Vrindavan',
    image: 'assets/vrindavan/prem-mandir.jpg',
    location: '📍 Raman Reti, Vrindavan',
    tag: '360° PANORAMIC VIEW • PREM MANDIR',
    badge: 'VRINDAVAN DHAM • SACRED ARCHITECTURE',
    meta: 'Inaugurated 2012 • 54m Pure Italian Carrara Marble',
    type: 'White Marble Mandir',
    tradition: 'Radha Krishna & Sita Rama',
    desc: 'Carved completely from pristine white Italian Carrara marble, Prem Mandir stands as a modern wonder of devotional architecture. Its sanctum and outer walls feature 84 intricately sculpted high-relief panels depicting Krishna’s childhood pastimes, surrounded by landscaped satsang gardens, peacocks, and musical fountains.',
    hotspots: [
      { x: 50, y: 35, title: 'Central Marble Shikhara', text: 'Stands 54 meters (177 ft) high, hand-carved with traditional Kalinga and Rajasthani temple motifs.' },
      { x: 26, y: 65, title: 'Floral Satsang Gardens', text: 'Manicured Braj gardens featuring musical water fountains and sculptures of Krishna lifting Mount Govardhan.' },
      { x: 74, y: 55, title: 'Sita Rama & Radha Krishna Pavilions', text: 'Two-tiered pillared corridors with intricate reliefs depicting the Rasik traditions of Vrindavan.' }
    ]
  },
  {
    id: 'banke-bihari',
    name: 'Banke Bihari Mandir',
    tabTitle: '2. Banke Bihari Mandir',
    subtitle: 'Supreme Seat of Madhurya Bhakti • Vrindavan Dham',
    image: 'assets/vrindavan/banke-bihari.png',
    location: '📍 Goda Vihar, Vrindavan',
    tag: '360° PANORAMIC VIEW • BANKE BIHARI MANDIR',
    badge: 'BRAJ TRADITION • TRIBHANGA DARSHAN',
    meta: 'Established by Swami Haridas • 1864 Rajasthani Façade',
    type: 'Historic Rajasthani Sandstone',
    tradition: 'Swami Haridas Parampara',
    desc: 'The iconic Shri Banke Bihari Mandir houses the enchanting black marble deity manifested by the singing of Swami Haridas in Nidhivan. Famed for its traditional Parda (curtain) darshan, the temple radiates the spontaneous, child-like devotion where bells are not rung to ensure the beloved Lord rests peacefully.',
    hotspots: [
      { x: 50, y: 45, title: 'Sacred Garbhagriha Arches', text: 'The holy sanctum where the beloved Tribhanga deity gives darshan through rhythmic curtain openings.' },
      { x: 22, y: 70, title: 'Historic Sandstone Pillars', text: 'Carved red sandstone pillars and ornate brackets from 1864 that welcome thousands of pilgrims daily.' },
      { x: 76, y: 62, title: 'Courtyard of Raag Seva', text: 'The central gathering court where classical Haveli Sangeet and devotional kirtans have echoed for centuries.' }
    ]
  },
  {
    id: 'nidhivan',
    name: 'Nidhivan',
    tabTitle: '3. Nidhivan',
    subtitle: 'The Sacred Forest of Celestial Raas Leela',
    image: 'assets/vrindavan/nidhivan.jpg',
    location: '📍 Seva Kunj Road, Vrindavan',
    tag: '360° PANORAMIC VIEW • NIDHIVAN',
    badge: 'LIVING SACRED GROVE • MYSTIC HERITAGE',
    meta: 'Ancient Sacred Forest • Swami Haridas Samadhi Sthal',
    type: 'Sacred Living Vana (Grove)',
    tradition: 'Nitya Vihar & Maharaas',
    desc: 'Nidhivan is an ancient, mystical sacred grove of hollow, intertwining Van trees paired together, venerated by millions as the holy Gopis. According to centuries of living tradition, Lord Krishna and Radha Rani perform their divine Maharaas here every night, after which all gates are closed to the world.',
    hotspots: [
      { x: 50, y: 55, title: 'Pathway to Rang Mahal', text: 'The brick pathway leading to the sanctum where a sacred bed and refreshments are lovingly prepared each night.' },
      { x: 24, y: 42, title: 'Intertwined Sacred Trees', text: 'Short, twisted green trees rooted in sandy soil that stay green throughout all seasons, worshipped as divine sakhis.' },
      { x: 78, y: 50, title: 'Lalita Kund & Samadhi Shrine', text: 'The historic spring dug by Krishna’s flute to quench Lalita Sakhi’s thirst, and the samadhi of Swami Haridas.' }
    ]
  }
];

let activeTempleIdx = 0;
let panoYaw = 0;
let panoPitch = 0;
let panoZoom = 1.0;
let isPanoDragging = false;
let startDragX = 0;
let startDragY = 0;
let autoRotateActive = true;
let animFrameId = null;

function switchTemple(idx) {
  activeTempleIdx = idx;
  const temple = VRINDAVAN_TEMPLES[idx];
  if (!temple) return;

  // Update tabs
  document.querySelectorAll('.vTab').forEach((btn, i) => {
    btn.classList.toggle('active', i === idx);
  });

  // Update canvas background
  const canvas = document.getElementById('v360Canvas');
  if (canvas) {
    canvas.style.backgroundImage = `url('${temple.image}')`;
  }

  // Update text & headers
  const tagEl = document.getElementById('v360Tag');
  if (tagEl) tagEl.innerText = temple.tag;

  const locEl = document.getElementById('v360Location');
  if (locEl) locEl.innerText = temple.location;

  const titleEl = document.getElementById('templeTitle');
  if (titleEl) titleEl.innerText = temple.name;

  const badgeEl = document.getElementById('templeBadge');
  if (badgeEl) badgeEl.innerText = temple.badge;

  const metaEl = document.getElementById('templeMeta');
  if (metaEl) metaEl.innerText = temple.meta;

  const descEl = document.getElementById('templeDesc');
  if (descEl) descEl.innerText = temple.desc;

  const typeEl = document.getElementById('templeType');
  if (typeEl) typeEl.innerText = temple.type;

  const tradEl = document.getElementById('templeTradition');
  if (tradEl) tradEl.innerText = temple.tradition;

  // Render Hotspots
  renderHotspots(temple);
  closeHotspotInfo();

  // Reset slight pan
  panoYaw = 0;
  panoPitch = 0;
  updatePanoTransform();
}

function renderHotspots(temple) {
  const container = document.getElementById('v360Hotspots');
  if (!container) return;
  container.innerHTML = '';

  temple.hotspots.forEach((h, idx) => {
    const pin = document.createElement('div');
    pin.className = 'panoPin';
    pin.style.left = `${h.x}%`;
    pin.style.top = `${h.y}%`;
    pin.innerHTML = `
      <div class="pinBeacon">✦</div>
      <div class="pinLabel">${h.title}</div>
    `;
    pin.onclick = (e) => {
      e.stopPropagation();
      openHotspot(idx);
    };
    container.appendChild(pin);
  });
}

function openHotspot(idx) {
  const temple = VRINDAVAN_TEMPLES[activeTempleIdx];
  const h = temple.hotspots[idx] || temple.hotspots[0];
  const card = document.getElementById('v360InfoCard');
  if (!card || !h) return;

  document.getElementById('v360InfoTitle').innerText = h.title;
  document.getElementById('v360InfoText').innerText = h.text;
  card.style.display = 'block';
}

function closeHotspotInfo() {
  const card = document.getElementById('v360InfoCard');
  if (card) card.style.display = 'none';
}

function updatePanoTransform() {
  const canvas = document.getElementById('v360Canvas');
  if (!canvas) return;

  // Calculate normalized X offset for 360 wrap
  const normX = ((panoYaw % 100) + 100) % 100;
  canvas.style.backgroundPosition = `${normX}% ${50 + panoPitch}%`;
  canvas.style.transform = `scale(${panoZoom})`;

  // Update Compass
  const dial = document.getElementById('compassDial');
  const angleText = document.getElementById('compassAngle');
  const headingDeg = Math.round(((panoYaw * 3.6) % 360 + 360) % 360);
  if (dial) dial.style.transform = `rotate(${-headingDeg}deg)`;
  if (angleText) {
    const cardinal = headingDeg >= 315 || headingDeg < 45 ? 'N' : headingDeg < 135 ? 'E' : headingDeg < 225 ? 'S' : 'W';
    angleText.innerText = `360° • ${headingDeg}° ${cardinal}`;
  }
}

function toggleAutoRotate() {
  autoRotateActive = !autoRotateActive;
  const btn = document.getElementById('btnAutoRotate');
  if (btn) btn.innerText = autoRotateActive ? '🔄 Auto-Rotate: ON' : '⏸ Auto-Rotate: OFF';
}

function zoomIn() {
  panoZoom = Math.min(2.2, panoZoom + 0.2);
  updatePanoTransform();
}

function zoomOut() {
  panoZoom = Math.max(1.0, panoZoom - 0.2);
  updatePanoTransform();
}

function resetPano() {
  panoYaw = 0;
  panoPitch = 0;
  panoZoom = 1.0;
  updatePanoTransform();
}

function initPanoEvents() {
  const vp = document.getElementById('v360Viewport');
  if (!vp) return;

  const onStart = (clientX, clientY) => {
    isPanoDragging = true;
    startDragX = clientX;
    startDragY = clientY;
    vp.classList.add('grabbing');
    const hint = document.getElementById('v360DragHint');
    if (hint) hint.style.display = 'none';
  };

  const onMove = (clientX, clientY) => {
    if (!isPanoDragging) return;
    const dx = clientX - startDragX;
    const dy = clientY - startDragY;
    startDragX = clientX;
    startDragY = clientY;

    // Adjust sensitivity
    panoYaw -= dx * 0.18;
    panoPitch = Math.max(-20, Math.min(20, panoPitch + dy * 0.12));
    updatePanoTransform();
  };

  const onEnd = () => {
    isPanoDragging = false;
    vp.classList.remove('grabbing');
  };

  vp.addEventListener('mousedown', e => onStart(e.clientX, e.clientY));
  window.addEventListener('mousemove', e => onMove(e.clientX, e.clientY));
  window.addEventListener('mouseup', onEnd);

  vp.addEventListener('touchstart', e => {
    if (e.touches.length === 1) onStart(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener('touchmove', e => {
    if (e.touches.length === 1) onMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });

  window.addEventListener('touchend', onEnd);

  // Wheel zoom
  vp.addEventListener('wheel', e => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  }, { passive: false });

  // Animation Loop for Auto-Rotation
  function renderLoop() {
    if (autoRotateActive && !isPanoDragging) {
      panoYaw += 0.07;
      updatePanoTransform();
    }
    animFrameId = requestAnimationFrame(renderLoop);
  }
  renderLoop();
}

// Backward compatibility stubs for other scripts/templates
function travelTime(v) {}
function jumpYear(y) {}
function toggleMemory() {}
async function fakeUpload(btn) {
  btn.innerText = 'ARCHIVED TO HERITAGE ✓';
}

// Initialize on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
  switchTemple(0);
  initPanoEvents();
});
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(() => {
    switchTemple(0);
    initPanoEvents();
  }, 100);
}

