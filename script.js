/* ═══════════════════════════════════════════════════
   HAUNTED MAP — script.js
   WebGIS Pemetaan Lokasi Horor Berbasis Persepsi Masyarakat
   Mapbox token digunakan untuk basemap tiles via Leaflet
═══════════════════════════════════════════════════ */

// ── Mapbox token (untuk tiles jika diperlukan) ──
const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ';

// ══════════════════════════════════════════════════
//  DATA DUMMY — Lokasi Horor Yogyakarta
// ══════════════════════════════════════════════════
const HORROR_LOCATIONS = [
  {
    id: 1,
    nama: "XXI Bioskop Malioboro Mall",
    lat: -7.7921,
    lon: 110.3658,
    kategori: "penampakan",
    level: "sedang",
    persen: 52,
    deskripsi: "Sejumlah pengunjung dan karyawan bioskop melaporkan penampakan sosok berpakaian putih di lorong menuju toilet lantai 3, terutama setelah jam operasional berakhir. Beberapa satpam malam mengaku mendengar suara langkah kaki di lorong yang harusnya kosong.",
    kronologi: [
      { waktu: "2021", teks: "Laporan pertama dari karyawan cleaning service yang melihat bayangan di ruang proyektor." },
      { waktu: "2022", teks: "Beberapa pengunjung foto selfie di area toilet, muncul sosok asing di latar belakang." },
      { waktu: "2023", teks: "Satpam malam mendengar suara tawa anak kecil dari studio 5 yang sedang tidak beroperasi." },
    ],
    gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Malioboro_Mall_Yogyakarta.jpg/640px-Malioboro_Mall_Yogyakarta.jpg",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
    videoNote: "🎙 Podcast: Cerita Horor Bioskop Indonesia — Episode Yogyakarta"
  },
  {
    id: 2,
    nama: "Benteng Vredeburg",
    lat: -7.7994,
    lon: 110.3657,
    kategori: "suara",
    level: "tinggi",
    persen: 74,
    deskripsi: "Benteng peninggalan Belanda ini menyimpan banyak cerita kelam. Banyak penjaga malam yang melaporkan suara rantai besi bergesekan dan erangan dari arah ruang bawah tanah yang kini dijadikan museum. Konon arwah tahanan masa penjajahan masih bergentayangan.",
    kronologi: [
      { waktu: "2019", teks: "Penjaga malam menemukan pintu ruang bawah tanah terbuka sendiri padahal sudah dikunci ganda." },
      { waktu: "2020", teks: "Tim peneliti paranormal merekam EVP (Electronic Voice Phenomenon) berbahasa Belanda kuno." },
      { waktu: "2022", teks: "Pengunjung museum memotret ruangan kosong, muncul siluet seseorang berseragam militer lama." },
      { waktu: "2024", teks: "Saksi mata melaporkan aroma mesiu dan darah di malam hari tanpa sebab yang jelas." }
    ],
    gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Benteng_Vredeburg_Yogyakarta.jpg/640px-Benteng_Vredeburg_Yogyakarta.jpg",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    videoNote: "🎙 Podcast: Misteri Benteng Kolonial Yogyakarta (segera hadir)"
  },
  {
    id: 3,
    nama: "Stasiun Tugu Yogyakarta",
    lat: -7.7892,
    lon: 110.3625,
    kategori: "penampakan",
    level: "sangat-tinggi",
    persen: 91,
    deskripsi: "Stasiun bersejarah yang dibangun 1887 ini dikenal sebagai salah satu lokasi paling angker di Yogyakarta. Sosok 'Mbak Kunti' — wanita berbaju merah — sering terlihat berdiri di ujung peron 1 tengah malam. Beberapa masinis kereta malam mengaku melihat penumpang misterius yang menghilang begitu kereta tiba.",
    kronologi: [
      { waktu: "1990an", teks: "Beredar cerita turun-temurun dari petugas stasiun tentang wanita berbaju merah." },
      { waktu: "2015", teks: "Kamera CCTV merekam sosok berjalan di peron 1 pukul 03.00 yang tidak teridentifikasi." },
      { waktu: "2018", teks: "Masinis KA malam melaporkan seseorang berdiri di tengah rel lalu menghilang." },
      { waktu: "2023", teks: "Viral video TikTok pengunjung yang merekam pantulan cermin aneh di toilet peron." }
    ],
    gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Stasiun_Tugu_Yogyakarta.jpg/640px-Stasiun_Tugu_Yogyakarta.jpg",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
    videoNote: "🎙 Podcast: Hantu Kereta — Kisah dari Peron Gelap Stasiun Tugu"
  },
  {
    id: 4,
    nama: "Parangtritis Beach — Pantai Selatan",
    lat: -8.0257,
    lon: 110.3316,
    kategori: "urban-legend",
    level: "sangat-tinggi",
    persen: 96,
    deskripsi: "Pantai paling terkenal di Yogyakarta ini menyimpan legenda Ratu Kidul yang diyakini masyarakat setempat. Pantai ini dikenal memiliki arus berbahaya, namun banyak yang percaya beberapa korban tenggelam 'dipanggil' oleh penguasa laut selatan. Dilarang memakai baju hijau di sini.",
    kronologi: [
      { waktu: "Turun-temurun", teks: "Legenda Nyi Roro Kidul sebagai penguasa pantai selatan telah ada sejak era kerajaan Mataram." },
      { waktu: "2010", teks: "Wisatawan melaporkan melihat wanita cantik berpakaian hijau berjalan di tepi pantai lalu menghilang ke ombak." },
      { waktu: "2019", teks: "Korban tenggelam ke-7 ditemukan dalam posisi aneh, jauh dari titik tenggelam awal." },
      { waktu: "2024", teks: "Fenomena cahaya hijau misterius terekam kamera drone warga di atas permukaan laut." }
    ],
    gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Parangtritis_Beach.jpg/640px-Parangtritis_Beach.jpg",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
    videoNote: "🎙 Podcast: Ratu Kidul & Misteri Pantai Selatan (segera hadir)"
  },
  {
    id: 5,
    nama: "Hotel Grand Inna Malioboro",
    lat: -7.7941,
    lon: 110.3654,
    kategori: "kejadian",
    level: "tinggi",
    persen: 68,
    deskripsi: "Hotel tertua dan paling ikonik di Yogyakarta ini memiliki sejarah panjang sejak zaman penjajahan. Kamar 327 dan kamar 215 diyakini sebagai kamar paling angker — tamu sering melaporkan pintu terbuka sendiri, bayangan melintas di kaca, dan rasa sesak napas tiba-tiba saat malam hari.",
    kronologi: [
      { waktu: "1960an", teks: "Seorang tamu wanita ditemukan dalam kondisi tidak sadar di kamar 327 tanpa sebab medis." },
      { waktu: "2008", teks: "Staf housekeeping melapor lampu kamar 215 menyala sendiri berulang kali meski sudah dimatikan." },
      { waktu: "2020", teks: "Tamu memposting foto selfie di kamar, terlihat siluet tangan di balik tirai." },
      { waktu: "2023", teks: "Investigasi paranormal amatir merekam suara ketukan dari dalam dinding kamar 327." }
    ],
    gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Grand_Inna_Malioboro.jpg/640px-Grand_Inna_Malioboro.jpg",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
    videoNote: "🎙 Podcast: Menginap di Hotel Berhantu Yogyakarta (segera hadir)"
  },
  {
    id: 6,
    nama: "Universitas Gadjah Mada — Gedung Lama",
    lat: -7.7714,
    lon: 110.3779,
    kategori: "bau",
    level: "rendah",
    persen: 28,
    deskripsi: "Beberapa mahasiswa dan dosen melaporkan bau bunga melati yang sangat menyengat di koridor gedung lama FIB UGM, terutama menjelang tengah malam saat mengerjakan skripsi. Bau ini muncul tiba-tiba tanpa sumber yang jelas dan seringkali disertai rasa tidak nyaman.",
    kronologi: [
      { waktu: "2016", teks: "Mahasiswa yang kerja lembur melaporkan bau melati kuat di koridor lantai 2 sekitar pukul 23.00." },
      { waktu: "2019", teks: "Satpam mengaku mendengar langkah kaki di lantai atas saat gedung sudah dikunci." },
      { waktu: "2021", teks: "Beberapa saksi melaporkan kesamaan: bau muncul di hari-hari jelang ujian akhir semester." }
    ],
    gambar: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/UGM_Main_Gate.jpg/640px-UGM_Main_Gate.jpg",
    video: "https://www.youtube.com/embed/QH2-TGUlwu4",
    videoNote: "🎙 Podcast: Misteri Kampus Angker di Indonesia (segera hadir)"
  }
];

// ══════════════════════════════════════════════════
//  STATE
// ══════════════════════════════════════════════════
let map, markers = [], currentUser = null, userLatLng = null;
let currentDetailId = null, isAudioPlaying = false, sidebarOpen = true;

// ══════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  initAuth();
  createAmbientEffect();
});

function createAmbientEffect() {
  const glow = document.createElement('div');
  glow.className = 'app-glow';
  document.body.appendChild(glow);
}

// ══════════════════════════════════════════════════
//  AUTH — localStorage-based
// ══════════════════════════════════════════════════
function initAuth() {
  const saved = localStorage.getItem('haunted_session');
  if (saved) {
    currentUser = JSON.parse(saved);
    startApp();
  }
  // pre-seed admin account
  const users = getUsers();
  if (!users['admin']) {
    users['admin'] = { password: 'admin123', email: 'admin@haunted.id' };
    saveUsers(users);
  }
}

function getUsers() {
  return JSON.parse(localStorage.getItem('haunted_users') || '{}');
}
function saveUsers(u) { localStorage.setItem('haunted_users', JSON.stringify(u)); }

function switchTab(tab) {
  document.getElementById('loginForm').classList.toggle('hidden', tab !== 'login');
  document.getElementById('registerForm').classList.toggle('hidden', tab !== 'register');
  document.getElementById('tabLogin').classList.toggle('active', tab === 'login');
  document.getElementById('tabRegister').classList.toggle('active', tab !== 'login');
}

function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  const users = getUsers();
  const err = document.getElementById('loginError');

  if (!users[user] || users[user].password !== pass) {
    err.textContent = '☠ Username atau password salah.';
    shakeForm('loginForm');
    return;
  }
  err.textContent = '';
  currentUser = { username: user, email: users[user].email };
  localStorage.setItem('haunted_session', JSON.stringify(currentUser));
  startApp();
}

function handleRegister(e) {
  e.preventDefault();
  const user  = document.getElementById('regUser').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const pass  = document.getElementById('regPass').value;
  const users = getUsers();
  const err   = document.getElementById('registerError');
  const ok    = document.getElementById('registerSuccess');

  if (users[user]) { err.textContent = '☠ Username sudah digunakan.'; ok.textContent=''; return; }
  if (pass.length < 6) { err.textContent = '☠ Password minimal 6 karakter.'; ok.textContent=''; return; }

  users[user] = { password: pass, email };
  saveUsers(users);
  err.textContent = '';
  ok.textContent = '✓ Akun berhasil dibuat! Silakan masuk.';
  setTimeout(() => { switchTab('login'); ok.textContent=''; }, 1500);
}

function shakeForm(id) {
  const el = document.getElementById(id);
  el.style.animation = 'none';
  el.offsetHeight; // reflow
  el.style.animation = 'authIn 0.1s ease both';
}

function logout() {
  localStorage.removeItem('haunted_session');
  location.reload();
}

// ══════════════════════════════════════════════════
//  START APP
// ══════════════════════════════════════════════════
function startApp() {
  document.getElementById('authScreen').style.opacity = '0';
  document.getElementById('authScreen').style.transition = 'opacity 0.5s ease';
  setTimeout(() => {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('appScreen').classList.remove('hidden');
    document.getElementById('navUsername').textContent = currentUser.username;
    initMap();
    getUserLocation();
    renderLocationList();
    updateStats();
  }, 500);
}

// ══════════════════════════════════════════════════
//  MAP INIT
// ══════════════════════════════════════════════════
function initMap() {
  map = L.map('map', {
    center: [-7.7956, 110.3695],
    zoom: 13,
    zoomControl: true,
  });

  // Basemap menggunakan Mapbox (via token)
  L.tileLayer(
    `https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
    {
      attribution: '© <a href="https://www.mapbox.com/">Mapbox</a> © <a href="https://www.openstreetmap.org/">OSM</a>',
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 19,
    }
  ).addTo(map);

  renderMarkers(HORROR_LOCATIONS);
}

// ══════════════════════════════════════════════════
//  MARKERS
// ══════════════════════════════════════════════════
const LEVEL_CONFIG = {
  'rendah':       { color: '#2ecc4a', bg: '#1a6b2a', label: 'RENDAH',       icon: '🟢' },
  'sedang':       { color: '#f5c518', bg: '#7a6200', label: 'SEDANG',        icon: '🟡' },
  'tinggi':       { color: '#ff2222', bg: '#8b0000', label: 'TINGGI',        icon: '🔴' },
  'sangat-tinggi':{ color: '#b44fff', bg: '#6b0aab', label: 'SANGAT TINGGI', icon: '💀' },
};

const KATEGORI_CONFIG = {
  'penampakan':   '👻',
  'suara':        '🔊',
  'bau':          '💨',
  'kejadian':     '⚡',
  'urban-legend': '📖',
};

function createMarkerIcon(loc) {
  const cfg = LEVEL_CONFIG[loc.level] || LEVEL_CONFIG['rendah'];
  let html;

  if (loc.level === 'sangat-tinggi') {
    // Skull icon untuk sangat tinggi
    html = `<div style="
      position:relative; width:38px; height:38px;
      display:flex; align-items:center; justify-content:center;
      background:rgba(107,10,171,0.3); border:2px solid ${cfg.color};
      border-radius:50%; font-size:1.3rem;
      box-shadow:0 0 12px ${cfg.color}, 0 0 24px rgba(180,79,255,0.3);
      animation:skullPulse 2s ease-in-out infinite;
    ">💀
      <div style="position:absolute;inset:-5px;border-radius:50%;border:1px solid ${cfg.color};opacity:0.4;animation:pulse 2s ease-out infinite;"></div>
    </div>`;
  } else {
    html = `<div style="
      position:relative; width:22px; height:22px; border-radius:50%;
      background:${cfg.bg}; border:2px solid ${cfg.color};
      box-shadow:0 0 8px ${cfg.color};
    ">
      <div style="position:absolute;inset:-5px;border-radius:50%;border:1px solid ${cfg.color};opacity:0.5;animation:pulse 2s ease-out infinite;"></div>
    </div>`;
  }

  return L.divIcon({
    html,
    className: '',
    iconSize:   loc.level === 'sangat-tinggi' ? [38,38] : [22,22],
    iconAnchor: loc.level === 'sangat-tinggi' ? [19,19] : [11,11],
    popupAnchor:[0, -20],
  });
}

function buildPopupHTML(loc) {
  const cfg = LEVEL_CONFIG[loc.level];
  const katIcon = KATEGORI_CONFIG[loc.kategori] || '📍';
  const jarakText = userLatLng
    ? (haversine(userLatLng, { lat: loc.lat, lon: loc.lon }) / 1000).toFixed(2) + ' km dari kamu'
    : 'Aktifkan GPS untuk jarak';

  return `
    <div class="popup-wrap">
      <div class="popup-name">${loc.nama}</div>
      <div class="popup-row">${katIcon} Kategori: <span>${loc.kategori.replace('-',' ').toUpperCase()}</span></div>
      <div class="popup-row">📍 Jarak: <span>${jarakText}</span></div>
      <div class="popup-row">⚠ Tingkat kepercayaan: <span style="color:${cfg.color}">${loc.persen}%</span></div>
      <div class="popup-pct-bar">
        <div class="popup-pct-fill" style="width:${loc.persen}%;background:${cfg.color}"></div>
      </div>
      <button class="popup-btn" onclick="openDetail(${loc.id})">👁 LIHAT DETAIL</button>
    </div>`;
}

function renderMarkers(locs) {
  // Clear existing
  markers.forEach(m => map.removeLayer(m.marker));
  markers = [];

  locs.forEach(loc => {
    const m = L.marker([loc.lat, loc.lon], { icon: createMarkerIcon(loc) })
      .addTo(map)
      .bindPopup(buildPopupHTML(loc), { maxWidth: 280, className: 'horror-popup' });

    m.on('mouseover', function() { this.openPopup(); });
    markers.push({ marker: m, loc });
  });
}

// ══════════════════════════════════════════════════
//  GEOLOCATION
// ══════════════════════════════════════════════════
function getUserLocation() {
  if (!navigator.geolocation) {
    document.getElementById('locationStatus').textContent = '📍 Geolocation tidak didukung browser ini';
    return;
  }
  navigator.geolocation.getCurrentPosition(pos => {
    userLatLng = { lat: pos.coords.latitude, lon: pos.coords.longitude };
    document.getElementById('locationStatus').textContent =
      `📍 Lokasi kamu: ${userLatLng.lat.toFixed(5)}, ${userLatLng.lon.toFixed(5)}`;

    // User location marker
    const userIcon = L.divIcon({
      html: `<div style="width:14px;height:14px;border-radius:50%;background:#4499ff;border:2px solid white;box-shadow:0 0 8px #4499ff;"></div>`,
      className: '', iconSize:[14,14], iconAnchor:[7,7]
    });
    L.marker([userLatLng.lat, userLatLng.lon], { icon: userIcon })
      .addTo(map)
      .bindPopup('<div style="font-family:var(--font-mono);font-size:0.75rem;color:#4499ff;">📍 Lokasi Kamu</div>');
  }, () => {
    document.getElementById('locationStatus').textContent = '📍 Izin lokasi ditolak';
  });
}

// Haversine formula — jarak dua koordinat (meter)
function haversine(a, b) {
  const R = 6371000;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLon = (b.lon - a.lon) * Math.PI / 180;
  const x = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180) * Math.cos(b.lat*Math.PI/180) * Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1-x));
}

// ══════════════════════════════════════════════════
//  FILTER
// ══════════════════════════════════════════════════
function applyFilters() {
  const activeLevels = [...document.querySelectorAll('.filter-checks input[type=checkbox]')]
    .filter(c => ['rendah','sedang','tinggi','sangat-tinggi'].includes(c.value) && c.checked)
    .map(c => c.value);

  const activeKats = [...document.querySelectorAll('.filter-checks input[type=checkbox]')]
    .filter(c => ['penampakan','suara','bau','kejadian','urban-legend'].includes(c.value) && c.checked)
    .map(c => c.value);

  const filtered = getAllLocations().filter(loc =>
    activeLevels.includes(loc.level) && activeKats.includes(loc.kategori)
  );

  renderMarkers(filtered);
  renderLocationList(filtered);
  updateStats(filtered);
}

function getAllLocations() {
  const custom = JSON.parse(localStorage.getItem('haunted_custom_locs') || '[]');
  return [...HORROR_LOCATIONS, ...custom];
}

function updateStats(locs) {
  const all = getAllLocations();
  const shown = locs || all;
  document.getElementById('statTotal').textContent   = all.length;
  document.getElementById('statVisible').textContent  = shown.length;
}

// ══════════════════════════════════════════════════
//  SIDEBAR
// ══════════════════════════════════════════════════
function toggleSidebar() {
  sidebarOpen = !sidebarOpen;
  document.getElementById('sidebar').classList.toggle('collapsed', !sidebarOpen);
  document.getElementById('sidebarToggleIcon').textContent = sidebarOpen ? '◀' : '▶';
}

function renderLocationList(locs) {
  const list = document.getElementById('locationList');
  const data = locs || getAllLocations();
  list.innerHTML = data.map(loc => {
    const cfg = LEVEL_CONFIG[loc.level];
    return `<div class="loc-item" onclick="flyToLocation(${loc.id})">
      <div class="loc-item-name">${loc.nama}</div>
      <div class="loc-item-meta">
        <div class="loc-dot" style="background:${cfg.color}"></div>
        <span class="loc-item-level">${cfg.label} • ${loc.persen}%</span>
      </div>
    </div>`;
  }).join('');
}

function flyToLocation(id) {
  const loc = getAllLocations().find(l => l.id === id);
  if (!loc) return;
  map.flyTo([loc.lat, loc.lon], 16, { duration: 1.2 });
  setTimeout(() => {
    const m = markers.find(m => m.loc.id === id);
    if (m) m.marker.openPopup();
  }, 1300);
}

// ══════════════════════════════════════════════════
//  SEARCH
// ══════════════════════════════════════════════════
function searchLocations() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  const resultsEl = document.getElementById('searchResults');

  if (!q) { resultsEl.classList.remove('show'); resultsEl.innerHTML=''; return; }

  const found = getAllLocations().filter(l =>
    l.nama.toLowerCase().includes(q) || l.deskripsi.toLowerCase().includes(q)
  );

  resultsEl.innerHTML = found.length
    ? found.map(l => `<div class="search-result-item" onclick="flyToLocation(${l.id}); document.getElementById('searchInput').value=''; document.getElementById('searchResults').classList.remove('show');">
        ${LEVEL_CONFIG[l.level].icon} ${l.nama}
        <div style="font-size:0.7rem;color:var(--muted);font-family:var(--font-mono)">${l.persen}% kepercayaan</div>
      </div>`).join('')
    : '<div class="search-result-item" style="color:var(--muted)">Tidak ada hasil...</div>';
  resultsEl.classList.add('show');
}

// Close search on outside click
document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) {
    document.getElementById('searchResults').classList.remove('show');
  }
});

// ══════════════════════════════════════════════════
//  DETAIL MODAL
// ══════════════════════════════════════════════════
function openDetail(id) {
  const loc = getAllLocations().find(l => l.id === id);
  if (!loc) return;
  currentDetailId = id;

  const cfg = LEVEL_CONFIG[loc.level];
  const katIcon = KATEGORI_CONFIG[loc.kategori] || '📍';

  document.getElementById('detailName').textContent = loc.nama;
  document.getElementById('detailImg').src = loc.gambar || '';
  document.getElementById('detailBadge').textContent = `${katIcon} ${loc.kategori.replace('-',' ').toUpperCase()}`;
  document.getElementById('detailLevel').textContent = cfg.label;
  document.getElementById('detailLevel').style.background = `rgba(${hexToRgb(cfg.color)},0.2)`;
  document.getElementById('detailLevel').style.borderColor = `rgba(${hexToRgb(cfg.color)},0.5)`;
  document.getElementById('detailLevel').style.color = cfg.color;
  document.getElementById('detailPct').textContent = `${loc.persen}% kepercayaan masyarakat`;
  document.getElementById('detailDesc').textContent = loc.deskripsi;

  // Kronologi
  document.getElementById('detailKronologi').innerHTML = (loc.kronologi||[]).map(k =>
    `<div class="kron-item">
      <div class="kron-time">${k.waktu}</div>
      <div class="kron-text">${k.teks}</div>
    </div>`
  ).join('');

  // Video
  const videoUrl = loc.video || '';
  document.getElementById('detailVideo').src = videoUrl;
  document.getElementById('videoNote').textContent = loc.videoNote || 'Video belum tersedia.';
  if (!videoUrl) document.getElementById('detailVideo').style.display = 'none';
  else document.getElementById('detailVideo').style.display = 'block';

  // Rating
  renderRating(id);

  // Reset tabs
  switchModalTab('cerita', document.querySelector('.mtab'));

  document.getElementById('detailModal').classList.add('active');
}

function closeDetailModal(e) {
  if (e.target === document.getElementById('detailModal')) closeDetailModalBtn();
}
function closeDetailModalBtn() {
  document.getElementById('detailModal').classList.remove('active');
  document.getElementById('detailVideo').src = ''; // stop video
}

function switchModalTab(tab, btn) {
  document.querySelectorAll('.mtab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach(el => el.classList.remove('active'));
  document.getElementById(`tab${capitalize(tab)}`).classList.add('active');
  if (btn) btn.classList.add('active');
  else document.querySelector(`.mtab[onclick*="${tab}"]`)?.classList.add('active');
}

// ══════════════════════════════════════════════════
//  RATING
// ══════════════════════════════════════════════════
function getRatings() { return JSON.parse(localStorage.getItem('haunted_ratings') || '{}'); }
function saveRatings(r) { localStorage.setItem('haunted_ratings', JSON.stringify(r)); }

function setRating(val) {
  if (!currentDetailId || !currentUser) return;
  const ratings = getRatings();
  if (!ratings[currentDetailId]) ratings[currentDetailId] = {};
  ratings[currentDetailId][currentUser.username] = val;
  saveRatings(ratings);
  renderRating(currentDetailId);
}

function renderRating(id) {
  const ratings = getRatings();
  const locRatings = ratings[id] || {};
  const myRating   = currentUser ? (locRatings[currentUser.username] || 0) : 0;
  const allVals    = Object.values(locRatings);
  const avg        = allVals.length ? (allVals.reduce((a,b)=>a+b,0)/allVals.length).toFixed(1) : '—';

  document.querySelectorAll('.star').forEach((s, i) => {
    s.classList.toggle('active', i < myRating);
  });
  document.getElementById('ratingAvg').textContent =
    avg === '—' ? 'Belum ada rating' : `Rata-rata: ${avg} ★ (${allVals.length} orang)`;
}

// ══════════════════════════════════════════════════
//  ADD NEW LOCATION (login required)
// ══════════════════════════════════════════════════
function openAddModal() {
  document.getElementById('addModal').classList.add('active');
}
function closeAddModal(e) {
  if (e.target === document.getElementById('addModal'))
    document.getElementById('addModal').classList.remove('active');
}

function submitNewLocation(e) {
  e.preventDefault();
  const custom = JSON.parse(localStorage.getItem('haunted_custom_locs') || '[]');
  const maxId  = Math.max(...getAllLocations().map(l=>l.id), 100);
  const level  = document.getElementById('addLevel').value;
  const pctMap = { 'rendah':15, 'sedang':45, 'tinggi':72, 'sangat-tinggi':90 };

  const newLoc = {
    id: maxId + 1,
    nama: document.getElementById('addName').value,
    lat:  parseFloat(document.getElementById('addLat').value),
    lon:  parseFloat(document.getElementById('addLon').value),
    kategori: document.getElementById('addKategori').value,
    level,
    persen: pctMap[level],
    deskripsi: document.getElementById('addDesc').value || 'Laporan dari pengguna.',
    kronologi: [{ waktu: new Date().getFullYear().toString(), teks: 'Dilaporkan oleh ' + currentUser.username }],
    gambar: document.getElementById('addImg').value || 'https://via.placeholder.com/600x300/1a0a0a/ff3333?text=HAUNTED',
    video: '', videoNote: 'Podcast belum tersedia.',
    addedBy: currentUser.username,
  };

  custom.push(newLoc);
  localStorage.setItem('haunted_custom_locs', JSON.stringify(custom));
  document.getElementById('addModal').classList.remove('active');
  e.target.reset();
  applyFilters();
  renderLocationList();
  updateStats();
  flyToLocation(newLoc.id);
}

// ══════════════════════════════════════════════════
//  AUDIO
// ══════════════════════════════════════════════════
// Generate horror ambient sound via Web Audio API (no external file needed)
let audioCtx, gainNode, oscNodes = [];

function initHorrorAudio() {
  if (audioCtx) return;
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.06;
  gainNode.connect(audioCtx.destination);
  playAmbientDrone();
  isAudioPlaying = true;
  document.getElementById('audioBtn').textContent = '🔊';
}

function playAmbientDrone() {
  // Low drone frequencies for horror atmosphere
  const freqs = [55, 58.3, 82.4];
  freqs.forEach((freq, i) => {
    const osc = audioCtx.createOscillator();
    const oscGain = audioCtx.createGain();
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.value = freq;
    lfo.frequency.value = 0.08 + i * 0.04;
    lfoGain.gain.value = freq * 0.015;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    oscGain.gain.value = 0.3 - i * 0.08;
    osc.connect(oscGain);
    oscGain.connect(gainNode);
    osc.start();
    lfo.start();
    oscNodes.push(osc, lfo);
  });

  // Occasional low thump
  addHeartbeat();
}

function addHeartbeat() {
  if (!audioCtx || !isAudioPlaying) return;
  const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.5, audioCtx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const t = i / audioCtx.sampleRate;
    data[i] = Math.sin(2 * Math.PI * 60 * t) * Math.exp(-t * 12) * 0.4;
  }
  const src = audioCtx.createBufferSource();
  src.buffer = buf;
  const g = audioCtx.createGain();
  g.gain.value = 0.5;
  src.connect(g);
  g.connect(audioCtx.destination);
  src.start();

  const delay = 3000 + Math.random() * 8000;
  setTimeout(() => addHeartbeat(), delay);
}

function toggleAudio() {
  if (!audioCtx) {
    initHorrorAudio();
  } else if (isAudioPlaying) {
    gainNode.gain.setTargetAtTime(0, audioCtx.currentTime, 0.3);
    isAudioPlaying = false;
    document.getElementById('audioBtn').textContent = '🔇';
  } else {
    gainNode.gain.setTargetAtTime(0.06, audioCtx.currentTime, 0.3);
    isAudioPlaying = true;
    document.getElementById('audioBtn').textContent = '🔊';
  }
}

// Auto-init audio on first map interaction
document.addEventListener('click', () => {
  if (!audioCtx) initHorrorAudio();
}, { once: true });

// ══════════════════════════════════════════════════
//  UTILITIES
// ══════════════════════════════════════════════════
function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '255,255,255';
}
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

// Inject CSS keyframes for Leaflet markers
const style = document.createElement('style');
style.textContent = `
  @keyframes pulse {
    0%,100% { transform: scale(1); opacity: 0.5; }
    50%      { transform: scale(1.5); opacity: 0; }
  }
  @keyframes skullPulse {
    0%,100% { transform: scale(1) rotate(-3deg); filter:drop-shadow(0 0 6px rgba(200,0,0,0.5)); }
    50%      { transform: scale(1.1) rotate(3deg); filter:drop-shadow(0 0 14px rgba(180,79,255,0.7)); }
  }
`;
document.head.appendChild(style);
