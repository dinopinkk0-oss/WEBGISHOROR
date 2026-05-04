// ══════════════════════════════════════════════════════
//  HAUNTED MAP — script.js
//  Pemetaan Lokasi Horor Berbasis Persepsi Masyarakat
// ══════════════════════════════════════════════════════

// ── MAPBOX TOKEN ─────────────────────────────────────
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ';

// ── DATA LOKASI HOROR ────────────────────────────────
const LOCATIONS = [
  {
    id: 1,
    nama: 'Bioskop XXI Yogyakarta',
    lat: -7.7961, lon: 110.3688,
    kategori: 'penampakan',
    level: 'sedang',
    persen: 45,
    deskripsi: 'Beberapa pengunjung melaporkan melihat sosok berpakaian kuno berdiri di sudut bioskop setelah jam operasional berakhir. Petugas kebersihan sering mendengar suara kursi bergerak sendiri di ruang teater yang sudah dikunci.',
    kronologi: [
      { waktu: '23.00', teks: 'Petugas kebersihan mendengar suara langkah kaki di koridor yang sudah sepi.' },
      { waktu: '23.30', teks: 'Lampu di teater nomor 3 menyala sendiri meskipun sudah dimatikan dari panel.' },
      { waktu: '00.15', teks: 'Sosok tidak dikenal terlihat di rekaman CCTV di lorong belakang, namun tidak ada tamu yang tersisa.' },
    ],
    gambar: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80',
    video: 'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote: '🎙 Podcast: Kisah Misteri Bioskop Angker Yogyakarta'
  },
  {
    id: 2,
    nama: 'Benteng Vredeburg',
    lat: -7.8013, lon: 110.3647,
    kategori: 'penampakan',
    level: 'tinggi',
    persen: 72,
    deskripsi: 'Benteng peninggalan kolonial Belanda ini menyimpan banyak cerita mistis. Pengunjung melaporkan melihat bayangan prajurit Belanda yang masih berpatroli di malam hari. Bau mesiu dan darah disebut-sebut tercium saat hujan turun di area bekas ruang tahanan.',
    kronologi: [
      { waktu: 'Senja', teks: 'Bayangan manusia terlihat di balik tembok benteng menjelang Maghrib.' },
      { waktu: 'Tengah Malam', teks: 'Suara tembakan dan jeritan terdengar dari arah ruang bawah tanah.' },
      { waktu: 'Dini Hari', teks: 'Sosok berseragam tentara kolonial dilaporkan berjalan menembus tembok.' },
    ],
    gambar: 'https://images.unsplash.com/photo-1580477371194-de0d47129efe?w=600&q=80',
    video: 'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote: '🎙 Podcast: Misteri Benteng Kolonial Yogyakarta'
  },
  {
    id: 3,
    nama: 'Keraton Yogyakarta',
    lat: -7.8053, lon: 110.3642,
    kategori: 'urban-legend',
    level: 'sangat-tinggi',
    persen: 91,
    deskripsi: 'Keraton Yogyakarta dikenal sebagai salah satu tempat paling sakral di Jawa. Legenda Nyi Roro Kidul sebagai penguasa laut selatan sangat kuat di sini. Pengunjung yang mengenakan pakaian berwarna hijau sering merasakan hal-hal aneh dan tidak nyaman.',
    kronologi: [
      { waktu: 'Tradisi', teks: 'Setiap malam Jumat Kliwon diadakan ritual khusus untuk menghormati leluhur keraton.' },
      { waktu: 'Larut Malam', teks: 'Penjaga malam melaporkan melihat cahaya bergerak di dalam kompleks yang sudah ditutup.' },
      { waktu: 'Subuh', teks: 'Suara gamelan terdengar dari arah dalam keraton meskipun tidak ada pertunjukan yang berlangsung.' },
    ],
    gambar: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    video: 'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote: '🎙 Podcast: Misteri dan Legenda Keraton Yogyakarta'
  },
  {
    id: 4,
    nama: 'Kali Code Bawah Jembatan',
    lat: -7.7932, lon: 110.3712,
    kategori: 'suara',
    level: 'tinggi',
    persen: 68,
    deskripsi: 'Area di bawah jembatan Kali Code dikenal angker oleh warga sekitar. Suara tangisan wanita dan anak kecil sering terdengar dari arah sungai di malam hari. Beberapa pengendara motor mengaku pernah melihat sosok putih berdiri di tengah sungai.',
    kronologi: [
      { waktu: '21.00', teks: 'Warga sekitar mulai menutup jendela rumah mendengar suara aneh dari arah sungai.' },
      { waktu: '23.00', teks: 'Suara tangisan perempuan terdengar jelas meski tidak ada siapapun di tepi sungai.' },
      { waktu: '02.00', teks: 'Pengendara melaporkan melihat sosok putih melayang di atas permukaan air.' },
    ],
    gambar: 'https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?w=600&q=80',
    video: 'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote: '🎙 Podcast: Misteri Kali Code Malam Hari'
  },
  {
    id: 5,
    nama: 'Rumah Sakit Pugeran (Eks)',
    lat: -7.8167, lon: 110.3625,
    kategori: 'kejadian',
    level: 'sangat-tinggi',
    persen: 88,
    deskripsi: 'Bekas gedung rumah sakit tua ini telah lama ditinggalkan. Warga setempat tidak berani mendekati bangunan ini setelah gelap. Berbagai laporan mencakup lampu yang menyala sendiri, bayangan yang melintas di balik jendela yang sudah diboarded, dan bau antiseptik yang sangat menyengat.',
    kronologi: [
      { waktu: 'Sore', teks: 'Anak-anak bermain di sekitar gedung melaporkan mendengar panggilan nama mereka.' },
      { waktu: 'Malam', teks: 'Lampu di lantai 3 menyala dan mati secara berirama selama beberapa menit.' },
      { waktu: 'Dini Hari', teks: 'Penjaga keamanan setempat menolak bertugas sendirian di area ini sejak terjadi insiden pada 2019.' },
    ],
    gambar: 'https://images.unsplash.com/photo-1516549655669-df64031e6c02?w=600&q=80',
    video: 'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote: '🎙 Podcast: Gedung Terbengkalai Paling Angker di Yogyakarta'
  },
  {
    id: 6,
    nama: 'Taman Sari Yogyakarta',
    lat: -7.8098, lon: 110.3591,
    kategori: 'bau',
    level: 'sedang',
    persen: 52,
    deskripsi: 'Kompleks taman air peninggalan Kesultanan Yogyakarta ini menyimpan lorong-lorong bawah tanah yang gelap. Pengunjung sering mencium wangi bunga melati yang sangat kuat tanpa sumber yang jelas, dipercaya sebagai tanda kehadiran putri keraton yang wafat di sini.',
    kronologi: [
      { waktu: 'Siang', teks: 'Turis asing melaporkan aroma bunga melati yang sangat kuat di terowongan bawah tanah.' },
      { waktu: 'Sore', teks: 'Pemandu wisata mempersingkat tur ke dalam kompleks karena kamera mendadak mati.' },
      { waktu: 'Malam', teks: 'Pengelola menemukan pintu lorong terbuka sendiri meskipun sudah dikunci.' },
    ],
    gambar: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80',
    video: 'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote: '🎙 Podcast: Misteri Lorong Bawah Tanah Taman Sari'
  }
];

// ── STATE ────────────────────────────────────────────
let currentUser    = null;
let markers        = [];
let allLocations   = [...LOCATIONS];
let selectedLocId  = null;
let userLat        = null;
let userLon        = null;
let isAudioPlaying = false;
let audioStarted   = false;

// ── MAP INIT — Mapbox dark basemap ──────────────────
const map = L.map('map', {
  center: [-7.8013, 110.3647],
  zoom: 14,
  zoomControl: false
});

L.tileLayer(
  `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
  {
    attribution: '© <a href="https://mapbox.com">Mapbox</a> © <a href="https://openstreetmap.org">OSM</a>',
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 19
  }
).addTo(map);

L.control.zoom({ position: 'bottomright' }).addTo(map);

// ── GEOLOCATION ──────────────────────────────────────
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    userLat = pos.coords.latitude;
    userLon = pos.coords.longitude;
    document.getElementById('locationStatus').textContent =
      `📍 Lokasi kamu: ${userLat.toFixed(5)}, ${userLon.toFixed(5)}`;
    L.circleMarker([userLat, userLon], {
      radius: 8, fillColor: '#00aaff',
      color: '#ffffff', weight: 2, fillOpacity: 0.9
    }).addTo(map).bindPopup('<b style="color:#00aaff">📍 Lokasi Kamu</b>');
  }, () => {
    document.getElementById('locationStatus').textContent = '⚠ Izin lokasi ditolak';
  });
}

function calcDist(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const f1 = lat1 * Math.PI/180, f2 = lat2 * Math.PI/180;
  const df = (lat2-lat1)*Math.PI/180, dl = (lon2-lon1)*Math.PI/180;
  const a  = Math.sin(df/2)**2 + Math.cos(f1)*Math.cos(f2)*Math.sin(dl/2)**2;
  const d  = 2*R*Math.asin(Math.sqrt(a));
  return d < 1000 ? `${Math.round(d)} m` : `${(d/1000).toFixed(1)} km`;
}

// ── MARKER COLORS ─────────────────────────────────────
const COLORS = {
  'rendah':        '#2dcc2d',
  'sedang':        '#ffd700',
  'tinggi':        '#ff3333',
  'sangat-tinggi': '#cc44ff'
};
const BADGES = {
  'penampakan':   '👻 PENAMPAKAN',
  'suara':        '🔊 SUARA MISTERIUS',
  'bau':          '💨 BAU ANEH',
  'kejadian':     '⚡ KEJADIAN ANEH',
  'urban-legend': '📖 URBAN LEGEND'
};

function markerIcon(loc) {
  const color = COLORS[loc.level] || '#ff3333';
  const isSuperHigh = loc.level === 'sangat-tinggi';
  const size = isSuperHigh ? 20 : 14;
  const pulse = isSuperHigh ? `
    <div style="
      position:absolute; inset:-6px; border-radius:50%;
      border:2px solid ${color}; opacity:0.5;
      animation:pulse 1.5s ease-out infinite;
    "></div>` : '';
  return L.divIcon({
    className: '',
    iconSize:  [size + (isSuperHigh ? 12 : 0), size + (isSuperHigh ? 12 : 0)],
    iconAnchor:[(size + (isSuperHigh ? 12 : 0))/2, (size + (isSuperHigh ? 12 : 0))/2],
    html: `
      <style>
        @keyframes pulse {
          0%   { transform:scale(1); opacity:0.5; }
          100% { transform:scale(2.5); opacity:0; }
        }
      </style>
      <div style="
        position:relative; width:${size}px; height:${size}px;
        background:${color}; border-radius:50%;
        border:2px solid rgba(255,255,255,0.6);
        box-shadow:0 0 12px ${color}, 0 0 24px ${color}55;
        cursor:pointer;
      ">${pulse}
        ${isSuperHigh ? '<div style="position:absolute;top:-4px;left:-4px;font-size:16px;">💀</div>' : ''}
      </div>`
  });
}

// ── RENDER MARKERS ───────────────────────────────────
function renderMarkers(locations) {
  markers.forEach(m => map.removeLayer(m));
  markers = [];
  const locList = document.getElementById('locationList');
  locList.innerHTML = '';

  locations.forEach(loc => {
    const m = L.marker([loc.lat, loc.lon], { icon: markerIcon(loc) }).addTo(map);
    const dist = (userLat && userLon) ? calcDist(userLat, userLon, loc.lat, loc.lon) : '—';
    m.bindPopup(`
      <div class="popup-inner">
        <div class="popup-title">${loc.nama}</div>
        <div class="popup-row">Kategori: <strong>${BADGES[loc.kategori]||loc.kategori}</strong></div>
        <div class="popup-row">Kepercayaan: <strong style="color:${COLORS[loc.level]}">${loc.persen}% (${loc.level})</strong></div>
        <div class="popup-dist">📍 Jarak dari kamu: ${dist}</div>
        <button class="popup-btn" onclick="openDetail(${loc.id})">👁 Lihat Detail</button>
      </div>
    `, { maxWidth: 260 });
    markers.push(m);

    const li = document.createElement('div');
    li.className = 'loc-item';
    li.innerHTML = `
      <div class="loc-item-name">${loc.nama}</div>
      <div class="loc-item-sub" style="color:${COLORS[loc.level]}">${loc.level.toUpperCase()} · ${loc.persen}%</div>`;
    li.onclick = () => { map.flyTo([loc.lat, loc.lon], 16); m.openPopup(); };
    locList.appendChild(li);
  });

  document.getElementById('statTotal').textContent   = allLocations.length;
  document.getElementById('statVisible').textContent = locations.length;
}

// ── FILTERS ──────────────────────────────────────────
function applyFilters() {
  const levels = [...document.querySelectorAll('.filter-checks input[value]')]
    .filter(i => ['rendah','sedang','tinggi','sangat-tinggi'].includes(i.value) && i.checked)
    .map(i => i.value);
  const cats = [...document.querySelectorAll('.filter-checks input[value]')]
    .filter(i => ['penampakan','suara','bau','kejadian','urban-legend'].includes(i.value) && i.checked)
    .map(i => i.value);
  renderMarkers(allLocations.filter(l => levels.includes(l.level) && cats.includes(l.kategori)));
}

// ── SEARCH ───────────────────────────────────────────
function searchLocations() {
  const q   = document.getElementById('searchInput').value.trim().toLowerCase();
  const box = document.getElementById('searchResults');
  box.innerHTML = '';
  if (!q) return;
  const matches = allLocations.filter(l => l.nama.toLowerCase().includes(q)).slice(0, 6);
  matches.forEach(l => {
    const d = document.createElement('div');
    d.className = 'search-item';
    d.innerHTML = `${l.nama}<small>${BADGES[l.kategori]||l.kategori} · ${l.level}</small>`;
    d.onclick = () => {
      map.flyTo([l.lat, l.lon], 17);
      openDetail(l.id);
      box.innerHTML = '';
      document.getElementById('searchInput').value = '';
    };
    box.appendChild(d);
  });
  if (!matches.length)
    box.innerHTML = '<div class="search-item" style="color:#8a6a6a;pointer-events:none">Tidak ditemukan</div>';
}
document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap'))
    document.getElementById('searchResults').innerHTML = '';
});

// ── DETAIL MODAL ─────────────────────────────────────
function openDetail(id) {
  const loc = allLocations.find(l => l.id === id);
  if (!loc) return;
  selectedLocId = id;

  document.getElementById('detailImg').src          = loc.gambar;
  document.getElementById('detailBadge').textContent = BADGES[loc.kategori]||loc.kategori;
  document.getElementById('detailName').textContent  = loc.nama;
  document.getElementById('detailLevel').textContent = loc.level.toUpperCase();
  document.getElementById('detailLevel').style.color = COLORS[loc.level];
  document.getElementById('detailPct').textContent   = `${loc.persen}% kepercayaan`;
  document.getElementById('detailDesc').textContent  = loc.deskripsi;
  document.getElementById('detailVideo').src         = loc.video;
  document.getElementById('videoNote').textContent   = loc.videoNote;

  const kEl = document.getElementById('detailKronologi');
  kEl.innerHTML = (loc.kronologi||[]).map(k =>
    `<div class="krono-item">
      <span class="krono-time">${k.waktu}</span>
      <span class="krono-desc">${k.teks}</span>
    </div>`).join('');

  const ratings = JSON.parse(localStorage.getItem(`rating_${id}`) || '[]');
  const avg = ratings.length ? (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1) : '—';
  document.getElementById('ratingAvg').textContent = `Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('active'));

  document.querySelectorAll('.mtab').forEach((t,i) => t.classList.toggle('active', i===0));
  document.querySelectorAll('.mtab-content').forEach((c,i) => c.classList.toggle('active', i===0));

  document.getElementById('detailModal').classList.add('active');
}
function closeDetailModal(e) {
  if (e.target === document.getElementById('detailModal')) closeDetailModalBtn();
}
function closeDetailModalBtn() {
  document.getElementById('detailModal').classList.remove('active');
  document.getElementById('detailVideo').src = '';
}
function switchModalTab(tab, btn) {
  document.querySelectorAll('.mtab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.mtab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab' + tab.charAt(0).toUpperCase() + tab.slice(1)).classList.add('active');
}

// ── RATING ───────────────────────────────────────────
function setRating(val) {
  if (!currentUser) { alert('Login dulu untuk memberi rating!'); return; }
  document.querySelectorAll('.star').forEach((s,i) => s.classList.toggle('active', i < val));
  const key = `rating_${selectedLocId}`;
  const ratings = JSON.parse(localStorage.getItem(key) || '[]');
  ratings.push(val);
  localStorage.setItem(key, JSON.stringify(ratings));
  const avg = (ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1);
  document.getElementById('ratingAvg').textContent = `Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
}

// ── ADD LOCATION ─────────────────────────────────────
function openAddModal() {
  if (!currentUser) { alert('Login dulu untuk menambah lokasi!'); return; }
  document.getElementById('addModal').classList.add('active');
}
function closeAddModal(e) {
  if (e.target === document.getElementById('addModal'))
    document.getElementById('addModal').classList.remove('active');
}
function submitNewLocation(e) {
  e.preventDefault();
  const newLoc = {
    id: Date.now(),
    nama: document.getElementById('addName').value,
    lat:  parseFloat(document.getElementById('addLat').value),
    lon:  parseFloat(document.getElementById('addLon').value),
    kategori: document.getElementById('addKategori').value,
    level:    document.getElementById('addLevel').value,
    persen:   { rendah:25, sedang:50, tinggi:75, 'sangat-tinggi':92 }[document.getElementById('addLevel').value],
    deskripsi: document.getElementById('addDesc').value || 'Laporan dari komunitas.',
    kronologi: [{ waktu: 'Baru', teks: 'Lokasi baru dilaporkan oleh pengguna.' }],
    gambar: document.getElementById('addImg').value || 'https://via.placeholder.com/600x300/1a0a0a/ff3333?text=HAUNTED',
    video: '', videoNote: 'Podcast belum tersedia untuk lokasi ini.'
  };
  allLocations.push(newLoc);
  applyFilters();
  document.getElementById('addModal').classList.remove('active');
  map.flyTo([newLoc.lat, newLoc.lon], 16);
  e.target.reset();
}

// ── SIDEBAR ──────────────────────────────────────────
function toggleSidebar() {
  const sb = document.getElementById('sidebar');
  sb.classList.toggle('collapsed');
  document.getElementById('sidebarToggleIcon').textContent =
    sb.classList.contains('collapsed') ? '▶' : '◀';
}

// ── BLOOD DRIP GENERATOR ─────────────────────────────
function makeDrips() {
  const container = document.getElementById('bloodDrip');
  if (!container) return;
  const count = Math.floor(window.innerWidth / 60);
  for (let i = 0; i < count; i++) {
    const d = document.createElement('div');
    d.className = 'drip';
    const h     = 40 + Math.random() * 120;
    const delay = Math.random() * 8;
    const dur   = 4 + Math.random() * 6;
    d.style.cssText = `
      --dh: ${h}px;
      height: 0;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      opacity: ${0.4 + Math.random() * 0.5};
      left: ${Math.random() * 100}%;
      position: absolute;
    `;
    container.appendChild(d);
  }
}
makeDrips();

// ══════════════════════════════════════════════════════
//  AUDIO SYSTEM
//  Priority: horror-ambient.mp3 (file lokal)
//  Fallback: Web Audio API synthesizer
//  Toggle: bisa nyala/mati, auto-loop kalau file habis
// ══════════════════════════════════════════════════════

let bgMusic     = null;
let audioCtx    = null;
let gainNode    = null;
let oscNodes    = [];
let usingFile   = false; // true = pakai MP3, false = pakai Web Audio

function initAudio() {
  if (audioStarted) return;
  audioStarted = true;

  // Coba load file horror-ambient.mp3
  bgMusic         = new Audio('horror-ambient.mp3');
  bgMusic.loop    = true;   // ← auto-loop kalau file habis
  bgMusic.volume  = 0.40;
  bgMusic.preload = 'auto';

  // Berhasil load file → pakai MP3
  bgMusic.addEventListener('canplaythrough', () => {
    usingFile = true;
    bgMusic.play().catch(() => {});
    isAudioPlaying = true;
    document.getElementById('audioBtn').textContent = '🔊';
  }, { once: true });

  // Gagal load file → fallback Web Audio
  bgMusic.addEventListener('error', () => {
    console.warn('horror-ambient.mp3 tidak ditemukan → Web Audio fallback');
    usingFile = false;
    startWebAudio();
  }, { once: true });

  bgMusic.load();
}

// ── Toggle nyala / mati ──────────────────────────────
function toggleAudio() {
  if (!audioStarted) {
    initAudio();
    return;
  }

  if (usingFile && bgMusic) {
    // Kontrol file MP3
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      document.getElementById('audioBtn').textContent = '🔊';
      isAudioPlaying = true;
    } else {
      bgMusic.pause();
      document.getElementById('audioBtn').textContent = '🔇';
      isAudioPlaying = false;
    }
  } else {
    // Kontrol Web Audio
    if (isAudioPlaying) {
      stopWebAudio();
    } else {
      startWebAudio();
    }
  }
}

// ── Web Audio Fallback ───────────────────────────────
function startWebAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(audioCtx.destination);
  gainNode.gain.linearRampToValueAtTime(0.09, audioCtx.currentTime + 2);

  // Drone gelap
  [55, 58.27, 82.41, 110].forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const g   = audioCtx.createGain();
    const lfo = audioCtx.createOscillator();
    const lg  = audioCtx.createGain();
    osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
    osc.frequency.value = freq;
    lfo.frequency.value = 0.15 + i * 0.08;
    lg.gain.value = freq * 0.004;
    g.gain.value  = 0.18;
    lfo.connect(lg); lg.connect(osc.frequency);
    osc.connect(g);  g.connect(gainNode);
    osc.start(); lfo.start();
    oscNodes.push(osc, lfo);
  });

  // White noise rendah seperti angin
  const bufSize = audioCtx.sampleRate * 3;
  const buf  = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = audioCtx.createBufferSource();
  noise.buffer = buf; noise.loop = true;
  const lpf = audioCtx.createBiquadFilter();
  lpf.type = 'lowpass'; lpf.frequency.value = 180;
  const ng = audioCtx.createGain(); ng.gain.value = 0.04;
  noise.connect(lpf); lpf.connect(ng); ng.connect(gainNode);
  noise.start();
  oscNodes.push(noise);

  isAudioPlaying = true;
  document.getElementById('audioBtn').textContent = '🔊';
}

function stopWebAudio() {
  if (!audioCtx) return;
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1);
  setTimeout(() => {
    oscNodes.forEach(o => { try { o.stop(); } catch(e){} });
    oscNodes = [];
    audioCtx.close();
    audioCtx = null;
    gainNode = null;
  }, 1100);
  isAudioPlaying = false;
  document.getElementById('audioBtn').textContent = '🔇';
}

// Auto-init saat user pertama klik
document.addEventListener('click', () => {
  if (!audioStarted) initAudio();
}, { once: true });

// ── AUTH ─────────────────────────────────────────────
function switchTab(tab) {
  document.getElementById('loginForm').classList.toggle('hidden',    tab !== 'login');
  document.getElementById('registerForm').classList.toggle('hidden', tab !== 'register');
  document.getElementById('tabLogin').classList.toggle('active',    tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab === 'register');
}

function handleLogin(e) {
  e.preventDefault();
  const user  = document.getElementById('loginUser').value.trim();
  const pass  = document.getElementById('loginPass').value;
  const users = JSON.parse(localStorage.getItem('hm_users') || '{}');
  if (!users[user]) { document.getElementById('loginError').textContent = '⚠ Username tidak ditemukan.'; return; }
  if (users[user].password !== pass) { document.getElementById('loginError').textContent = '⚠ Password salah.'; return; }
  loginSuccess(user);
}

function handleRegister(e) {
  e.preventDefault();
  const user  = document.getElementById('regUser').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass  = document.getElementById('regPass').value;
  const users = JSON.parse(localStorage.getItem('hm_users') || '{}');
  if (users[user]) { document.getElementById('registerError').textContent = '⚠ Username sudah dipakai.'; return; }
  users[user] = { email, password: pass };
  localStorage.setItem('hm_users', JSON.stringify(users));
  document.getElementById('registerSuccess').textContent = '✓ Akun dibuat! Silakan masuk.';
  document.getElementById('registerError').textContent   = '';
  setTimeout(() => switchTab('login'), 1200);
}

function loginSuccess(user) {
  currentUser = user;
  localStorage.setItem('hm_current', user);
  document.getElementById('navUsername').textContent = user;
  const auth = document.getElementById('authScreen');
  auth.style.transition = 'all 0.5s ease';
  auth.style.opacity    = '0';
  auth.style.transform  = 'scale(1.05)';
  setTimeout(() => {
    auth.classList.add('hidden');
    document.getElementById('appScreen').classList.remove('hidden');
    renderMarkers(allLocations);
  }, 500);
}

function logout() {
  currentUser  = null;
  audioStarted = false;
  localStorage.removeItem('hm_current');
  if (bgMusic) { bgMusic.pause(); bgMusic.src = ''; bgMusic = null; }
  stopWebAudio();
  isAudioPlaying = false; usingFile = false;
  document.getElementById('audioBtn').textContent = '🔇';
  document.getElementById('appScreen').classList.add('hidden');
  const auth = document.getElementById('authScreen');
  auth.classList.remove('hidden');
  auth.style.opacity   = '1';
  auth.style.transform = 'scale(1)';
  document.getElementById('loginUser').value  = '';
  document.getElementById('loginPass').value  = '';
  document.getElementById('loginError').textContent = '';
}

// ── AUTO-LOGIN ───────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('hm_current');
  if (saved) loginSuccess(saved);
});
