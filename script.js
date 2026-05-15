// ══════════════════════════════════════════════════════
//  WEBGIS HOROR — script.js
//  Mapbox token: pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ
// ══════════════════════════════════════════════════════

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZGhybjIxIiwiYSI6ImNtbm9meDNxcTI0Y2sycXEyaG43dnJqajIifQ.p1s6U3VJQR6jJu0kSN2WLQ';

// ── DATA LOKASI ───────────────────────────────────────
const LOCATIONS = [
  {
    id:1, nama:'Bioskop XXI Yogyakarta',
    lat:-7.7961, lon:110.3688,
    kategori:'penampakan', level:'sedang', persen:45,
    deskripsi:'Beberapa pengunjung melaporkan melihat sosok berpakaian kuno berdiri di sudut bioskop setelah jam operasional berakhir. Petugas kebersihan sering mendengar suara kursi bergerak sendiri di ruang teater yang sudah dikunci.',
    kronologi:[
      {waktu:'23.00',teks:'Petugas kebersihan mendengar suara langkah kaki di koridor yang sudah sepi.'},
      {waktu:'23.30',teks:'Lampu di teater nomor 3 menyala sendiri meskipun sudah dimatikan dari panel.'},
      {waktu:'00.15',teks:'Sosok tidak dikenal terlihat di rekaman CCTV di lorong belakang.'},
    ],
    gambar:'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80',
    video:'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote:'🎙 Podcast: Kisah Misteri Bioskop Angker Yogyakarta'
  },
  {
    id:2, nama:'Benteng Vredeburg',
    lat:-7.8013, lon:110.3647,
    kategori:'penampakan', level:'tinggi', persen:72,
    deskripsi:'Benteng peninggalan kolonial Belanda ini menyimpan banyak cerita mistis. Pengunjung melaporkan melihat bayangan prajurit Belanda yang masih berpatroli di malam hari.',
    kronologi:[
      {waktu:'Senja',teks:'Bayangan manusia terlihat di balik tembok benteng menjelang Maghrib.'},
      {waktu:'Tengah Malam',teks:'Suara tembakan dan jeritan terdengar dari arah ruang bawah tanah.'},
      {waktu:'Dini Hari',teks:'Sosok berseragam tentara kolonial dilaporkan berjalan menembus tembok.'},
    ],
    gambar:'https://images.unsplash.com/photo-1580477371194-de0d47129efe?w=600&q=80',
    video:'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote:'🎙 Podcast: Misteri Benteng Kolonial Yogyakarta'
  },
  {
    id:3, nama:'Keraton Yogyakarta',
    lat:-7.8053, lon:110.3642,
    kategori:'urban-legend', level:'sangat-tinggi', persen:91,
    deskripsi:'Keraton Yogyakarta dikenal sebagai salah satu tempat paling sakral di Jawa. Legenda Nyi Roro Kidul sebagai penguasa laut selatan sangat kuat di sini.',
    kronologi:[
      {waktu:'Tradisi',teks:'Setiap malam Jumat Kliwon diadakan ritual khusus untuk menghormati leluhur keraton.'},
      {waktu:'Larut Malam',teks:'Penjaga malam melaporkan melihat cahaya bergerak di dalam kompleks yang sudah ditutup.'},
      {waktu:'Subuh',teks:'Suara gamelan terdengar dari arah dalam keraton meskipun tidak ada pertunjukan.'},
    ],
    gambar:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    video:'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote:'🎙 Podcast: Misteri dan Legenda Keraton Yogyakarta'
  },
  {
    id:4, nama:'Kali Code Bawah Jembatan',
    lat:-7.7932, lon:110.3712,
    kategori:'suara', level:'tinggi', persen:68,
    deskripsi:'Area di bawah jembatan Kali Code dikenal angker oleh warga sekitar. Suara tangisan wanita dan anak kecil sering terdengar dari arah sungai di malam hari.',
    kronologi:[
      {waktu:'21.00',teks:'Warga sekitar mulai menutup jendela rumah mendengar suara aneh dari arah sungai.'},
      {waktu:'23.00',teks:'Suara tangisan perempuan terdengar jelas meski tidak ada siapapun di tepi sungai.'},
      {waktu:'02.00',teks:'Pengendara melaporkan melihat sosok putih melayang di atas permukaan air.'},
    ],
    gambar:'https://images.unsplash.com/photo-1614267157481-ca2b81ac6fcc?w=600&q=80',
    video:'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote:'🎙 Podcast: Misteri Kali Code Malam Hari'
  },
  {
    id:5, nama:'Rumah Sakit Pugeran (Eks)',
    lat:-7.8167, lon:110.3625,
    kategori:'kejadian', level:'sangat-tinggi', persen:88,
    deskripsi:'Bekas gedung rumah sakit tua ini telah lama ditinggalkan. Warga setempat tidak berani mendekati bangunan ini setelah gelap. Laporan mencakup lampu menyala sendiri dan bau antiseptik menyengat.',
    kronologi:[
      {waktu:'Sore',teks:'Anak-anak bermain di sekitar gedung melaporkan mendengar panggilan nama mereka.'},
      {waktu:'Malam',teks:'Lampu di lantai 3 menyala dan mati secara berirama selama beberapa menit.'},
      {waktu:'Dini Hari',teks:'Penjaga keamanan menolak bertugas sendirian sejak insiden 2019.'},
    ],
    gambar:'https://images.unsplash.com/photo-1516549655669-df64031e6c02?w=600&q=80',
    video:'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote:'🎙 Podcast: Gedung Terbengkalai Paling Angker di Yogyakarta'
  },
  {
    id:6, nama:'Taman Sari Yogyakarta',
    lat:-7.8098, lon:110.3591,
    kategori:'bau', level:'sedang', persen:52,
    deskripsi:'Kompleks taman air peninggalan Kesultanan ini menyimpan lorong bawah tanah gelap. Pengunjung sering mencium wangi melati kuat tanpa sumber jelas.',
    kronologi:[
      {waktu:'Siang',teks:'Turis melaporkan aroma bunga melati sangat kuat di terowongan bawah tanah.'},
      {waktu:'Sore',teks:'Pemandu wisata mempersingkat tur karena kamera mendadak mati.'},
      {waktu:'Malam',teks:'Pengelola menemukan pintu lorong terbuka sendiri meski sudah dikunci.'},
    ],
    gambar:'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80',
    video:'https://www.youtube.com/embed/videoseries?list=PLbpi6ZahtOH6Ar_3GPy3workJHEJ93',
    videoNote:'🎙 Podcast: Misteri Lorong Bawah Tanah Taman Sari'
  }
];

// ── STATE ─────────────────────────────────────────────
let map, markers=[], allLocations=[...LOCATIONS];
let selectedLocId=null, userLat=null, userLon=null;
let isAudioPlaying=false, audioStarted=false;
let bgMusic=null, audioCtx=null, gainNode=null, oscNodes=[], usingFile=false;

// ══════════════════════════════════════════════════════
//  LANDING — ANIMASI
// ══════════════════════════════════════════════════════

// Blood drips
(function makeDrips(){
  const c = document.getElementById('drips');
  if(!c) return;
  const n = Math.max(8, Math.floor(window.innerWidth/55));
  for(let i=0;i<n;i++){
    const d = document.createElement('div');
    d.className = 'drip';
    const h   = 50 + Math.random()*130;
    const dur = 3 + Math.random()*7;
    const del = Math.random()*10;
    d.style.cssText = `--dh:${h}px;--dur:${dur}s;--del:${del}s;left:${Math.random()*100}%;opacity:${0.4+Math.random()*0.5}`;
    c.appendChild(d);
  }
})();

// Ghosts
(function makeGhosts(){
  const c = document.getElementById('ghostContainer');
  if(!c) return;
  const ghosts = ['👻','👻','👻','🕷','🕸','💀','🦇','🦇'];
  ghosts.forEach((g,i)=>{
    const el = document.createElement('div');
    el.className = 'ghost';
    const x = 5 + Math.random()*90;
    const y = 10 + Math.random()*80;
    const dur   = 5 + Math.random()*9;
    const delay = Math.random()*-8;
    const tx = (Math.random()-0.5)*60;
    const ty = -20 - Math.random()*40;
    el.style.cssText = `left:${x}%;top:${y}%;--gd:${dur}s;--gdelay:${delay}s;--gx:${tx}px;--gy:${ty}px;font-size:${1.2+Math.random()*2.5}rem`;
    el.textContent = g;
    c.appendChild(el);
  });
})();

// Skull particles
(function makeSkulls(){
  const c = document.getElementById('skullContainer');
  if(!c) return;
  for(let i=0;i<14;i++){
    const el = document.createElement('div');
    el.className = 'skull-p';
    el.textContent = ['💀','🩸','👁','🕯'][Math.floor(Math.random()*4)];
    const dur   = 8 + Math.random()*12;
    const delay = Math.random()*15;
    el.style.cssText = `left:${Math.random()*100}%;bottom:${-10+Math.random()*10}%;--sd:${dur}s;--sdelay:${delay}s;font-size:${0.7+Math.random()*1.2}rem`;
    c.appendChild(el);
  }
})();

// ══════════════════════════════════════════════════════
//  AUDIO SYSTEM
//  1. Coba horror-ambient.mp3 (auto-play, loop)
//  2. Fallback Web Audio synthesizer
//  3. Toggle bisa nyala/mati kapan saja
// ══════════════════════════════════════════════════════

function initAudio(){
  if(audioStarted) return;
  audioStarted = true;

  bgMusic         = new Audio('horror-ambient.mp3');
  bgMusic.loop    = true;
  bgMusic.volume  = 0.38;
  bgMusic.preload = 'auto';

  bgMusic.addEventListener('canplaythrough', ()=>{
    usingFile = true;
    bgMusic.play().catch(()=>{});
    isAudioPlaying = true;
    setAudioUI(true);
  }, {once:true});

  bgMusic.addEventListener('error', ()=>{
    usingFile = false;
    startWebAudio();
  }, {once:true});

  bgMusic.load();
}

function toggleAudio(){
  if(!audioStarted){ initAudio(); return; }

  if(usingFile && bgMusic){
    if(bgMusic.paused){
      bgMusic.play().catch(()=>{});
      isAudioPlaying=true; setAudioUI(true);
    } else {
      bgMusic.pause();
      isAudioPlaying=false; setAudioUI(false);
    }
  } else {
    isAudioPlaying ? stopWebAudio() : startWebAudio();
  }
}

function setAudioUI(on){
  // Navbar audio btn
  const btn = document.getElementById('audioBtn');
  if(btn) btn.textContent = on ? '🔊' : '🔇';
  // Landing indicator
  const ind = document.getElementById('audioIndicator');
  const lbl = document.getElementById('audioLabel');
  if(ind && lbl){
    ind.classList.toggle('muted', !on);
    lbl.textContent = on ? 'AUDIO AKTIF' : 'AUDIO MATI';
  }
}

// Web Audio fallback
function startWebAudio(){
  if(audioCtx) return;
  audioCtx = new (window.AudioContext||window.webkitAudioContext)();
  gainNode = audioCtx.createGain();
  gainNode.gain.value = 0;
  gainNode.connect(audioCtx.destination);
  gainNode.gain.linearRampToValueAtTime(0.09, audioCtx.currentTime+2);

  // Dark drone — 4 oscillators
  [55,58.27,82.41,110].forEach((freq,i)=>{
    const osc=audioCtx.createOscillator(), g=audioCtx.createGain();
    const lfo=audioCtx.createOscillator(), lg=audioCtx.createGain();
    osc.type = i%2===0 ? 'sawtooth':'triangle';
    osc.frequency.value=freq;
    lfo.frequency.value=0.12+i*0.07; lg.gain.value=freq*0.004;
    g.gain.value=0.16;
    lfo.connect(lg); lg.connect(osc.frequency);
    osc.connect(g); g.connect(gainNode);
    osc.start(); lfo.start(); oscNodes.push(osc,lfo);
  });

  // Filtered noise (wind)
  const buf=audioCtx.createBuffer(1,audioCtx.sampleRate*3,audioCtx.sampleRate);
  const data=buf.getChannelData(0);
  for(let i=0;i<buf.length;i++) data[i]=Math.random()*2-1;
  const noise=audioCtx.createBufferSource();
  noise.buffer=buf; noise.loop=true;
  const lpf=audioCtx.createBiquadFilter();
  lpf.type='lowpass'; lpf.frequency.value=180;
  const ng=audioCtx.createGain(); ng.gain.value=0.04;
  noise.connect(lpf); lpf.connect(ng); ng.connect(gainNode);
  noise.start(); oscNodes.push(noise);

  isAudioPlaying=true; setAudioUI(true);
}

function stopWebAudio(){
  if(!audioCtx) return;
  gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime+1);
  setTimeout(()=>{
    oscNodes.forEach(o=>{ try{o.stop()}catch(e){} });
    oscNodes=[]; audioCtx.close(); audioCtx=null; gainNode=null;
  },1100);
  isAudioPlaying=false; setAudioUI(false);
}

// Play scream sound via Web Audio on button click
function playScream(){
  try{
    const ctx = new (window.AudioContext||window.webkitAudioContext)();
    const dur=0.8;
    const buf=ctx.createBuffer(1,ctx.sampleRate*dur,ctx.sampleRate);
    const d=buf.getChannelData(0);
    for(let i=0;i<d.length;i++){
      const t=i/ctx.sampleRate;
      const env=Math.exp(-t*3)*Math.sin(Math.PI*t/dur);
      // high pitch screech
      d[i]=(
        Math.sin(2*Math.PI*880*t)*0.4 +
        Math.sin(2*Math.PI*1320*t*(1+t*0.5))*0.3 +
        (Math.random()*2-1)*0.3
      )*env;
    }
    const src=ctx.createBufferSource();
    src.buffer=buf;
    const g=ctx.createGain(); g.gain.value=0.55;
    src.connect(g); g.connect(ctx.destination);
    src.start();
    setTimeout(()=>ctx.close(), 1200);
  } catch(e){}
}

// ── Auto-init on first user interaction ──────────────
document.addEventListener('click', ()=>{
  if(!audioStarted) initAudio();
},{once:true});

// Auto-try audio on page load (may be blocked by browser)
window.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(()=>{
    if(!audioStarted) initAudio();
    const lbl=document.getElementById('audioLabel');
    if(lbl) lbl.textContent='KLIK UNTUK AKTIFKAN AUDIO';
  }, 800);
});

// ══════════════════════════════════════════════════════
//  ENTER MAP — tombol MASUK dengan efek seram
// ══════════════════════════════════════════════════════
let mapInitialized = false;

function enterMap(){
  // 1. Scare flash merah
  const flash = document.getElementById('scareFlash');
  flash.classList.add('active');

  // 2. Scream sound
  playScream();

  // 3. Transition ke peta
  setTimeout(()=>{
    const overlay = document.getElementById('transOverlay');
    overlay.classList.add('fade-in');
  }, 300);

  setTimeout(()=>{
    // Sembunyikan landing
    document.getElementById('landing').style.display='none';
    // Tampilkan app
    document.getElementById('appScreen').style.display='block';

    // Init map hanya sekali
    if(!mapInitialized){
      initMap();
      mapInitialized=true;
    }

    // Fade out overlay
    const overlay = document.getElementById('transOverlay');
    overlay.style.transition='opacity 0.8s ease';
    overlay.style.opacity='0';
    setTimeout(()=>{ overlay.classList.remove('fade-in'); overlay.style.opacity=''; }, 900);

    flash.classList.remove('active');
  }, 700);
}

// ══════════════════════════════════════════════════════
//  MAP INIT — Mapbox dark-v11 (tiles benar, tidak hilang saat zoom)
// ══════════════════════════════════════════════════════
function initMap(){
  map = L.map('map',{
    center:[-7.8013, 110.3647],
    zoom:14,
    zoomControl:false,
    preferCanvas:false
  });

  // Mapbox tile — pakai {z}/{x}/{y}@2x untuk retina, tileSize 512 + zoomOffset -1
  L.tileLayer(
    'https://api.mapbox.com/styles/v1/mapbox/dark-v11/tiles/512/{z}/{x}/{y}@2x?access_token=' + MAPBOX_TOKEN,
    {
      attribution:'© <a href="https://mapbox.com">Mapbox</a> © <a href="https://openstreetmap.org">OSM</a>',
      tileSize: 512,
      zoomOffset: -1,
      maxZoom: 20,
      minZoom: 2,
      crossOrigin: true
    }
  ).addTo(map);

  L.control.zoom({position:'bottomright'}).addTo(map);

  // Geolocation
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(pos=>{
      userLat=pos.coords.latitude; userLon=pos.coords.longitude;
      document.getElementById('locationStatus').textContent=
        `📍 Lokasi kamu: ${userLat.toFixed(5)}, ${userLon.toFixed(5)}`;
      L.circleMarker([userLat,userLon],{
        radius:8,fillColor:'#00aaff',color:'#fff',weight:2,fillOpacity:0.9
      }).addTo(map).bindPopup('<b style="color:#00aaff">📍 Lokasi Kamu</b>');
    },()=>{
      document.getElementById('locationStatus').textContent='⚠ Izin lokasi ditolak';
    });
  }

  renderMarkers(allLocations);

  // Invalidate size setelah map muncul
  setTimeout(()=>map.invalidateSize(), 100);
}

// ── MARKER CONFIG ─────────────────────────────────────
const COLORS={
  'rendah':'#2dcc2d','sedang':'#ffd700',
  'tinggi':'#ff3333','sangat-tinggi':'#cc44ff'
};
const BADGES={
  'penampakan':'👻 PENAMPAKAN','suara':'🔊 SUARA MISTERIUS',
  'bau':'💨 BAU ANEH','kejadian':'⚡ KEJADIAN ANEH','urban-legend':'📖 URBAN LEGEND'
};

function markerIcon(loc){
  const color=COLORS[loc.level]||'#ff3333';
  const big=loc.level==='sangat-tinggi';
  const sz=big?20:14, wrap=big?sz+12:sz;
  const pulse=big?`<div style="position:absolute;inset:-6px;border-radius:50%;border:2px solid ${color};opacity:0.5;animation:mpulse 1.5s ease-out infinite;"></div>`:'';
  return L.divIcon({
    className:'',
    iconSize:[wrap,wrap], iconAnchor:[wrap/2,wrap/2],
    html:`<style>@keyframes mpulse{0%{transform:scale(1);opacity:0.5}100%{transform:scale(2.5);opacity:0}}</style>
    <div style="position:relative;width:${sz}px;height:${sz}px;background:${color};border-radius:50%;border:2px solid rgba(255,255,255,0.55);box-shadow:0 0 10px ${color},0 0 22px ${color}55;cursor:pointer;">
      ${pulse}${big?'<div style="position:absolute;top:-4px;left:-4px;font-size:15px;">💀</div>':''}
    </div>`
  });
}

// ── RENDER MARKERS ────────────────────────────────────
function renderMarkers(locs){
  markers.forEach(m=>map.removeLayer(m));
  markers=[];
  const locList=document.getElementById('locationList');
  locList.innerHTML='';

  locs.forEach(loc=>{
    const m=L.marker([loc.lat,loc.lon],{icon:markerIcon(loc)}).addTo(map);
    const dist=(userLat&&userLon)?calcDist(userLat,userLon,loc.lat,loc.lon):'—';

    m.bindPopup(`
      <div class="popup-inner">
        <div class="popup-title">${loc.nama}</div>
        <div class="popup-row">Kategori: <strong>${BADGES[loc.kategori]||loc.kategori}</strong></div>
        <div class="popup-row">Kepercayaan: <strong style="color:${COLORS[loc.level]}">${loc.persen}% (${loc.level})</strong></div>
        <div class="popup-dist">📍 Jarak dari kamu: ${dist}</div>
        <button class="popup-btn" onclick="openDetail(${loc.id})">👁 Lihat Detail</button>
      </div>`,{maxWidth:260});
    markers.push(m);

    const li=document.createElement('div');
    li.className='loc-item';
    li.innerHTML=`<div class="loc-item-name">${loc.nama}</div>
      <div class="loc-item-sub" style="color:${COLORS[loc.level]}">${loc.level.toUpperCase()} · ${loc.persen}%</div>`;
    li.onclick=()=>{ map.flyTo([loc.lat,loc.lon],16); m.openPopup(); };
    locList.appendChild(li);
  });

  document.getElementById('statTotal').textContent  =allLocations.length;
  document.getElementById('statVisible').textContent=locs.length;
}

// ── HELPERS ───────────────────────────────────────────
function calcDist(la1,lo1,la2,lo2){
  const R=6371e3,f1=la1*Math.PI/180,f2=la2*Math.PI/180;
  const df=(la2-la1)*Math.PI/180,dl=(lo2-lo1)*Math.PI/180;
  const a=Math.sin(df/2)**2+Math.cos(f1)*Math.cos(f2)*Math.sin(dl/2)**2;
  const d=2*R*Math.asin(Math.sqrt(a));
  return d<1000?`${Math.round(d)} m`:`${(d/1000).toFixed(1)} km`;
}

// ── FILTER ────────────────────────────────────────────
function applyFilters(){
  const lvls=[...document.querySelectorAll('.filter-checks input')]
    .filter(i=>['rendah','sedang','tinggi','sangat-tinggi'].includes(i.value)&&i.checked).map(i=>i.value);
  const cats=[...document.querySelectorAll('.filter-checks input')]
    .filter(i=>['penampakan','suara','bau','kejadian','urban-legend'].includes(i.value)&&i.checked).map(i=>i.value);
  renderMarkers(allLocations.filter(l=>lvls.includes(l.level)&&cats.includes(l.kategori)));
}

// ── SEARCH ────────────────────────────────────────────
function searchLocations(){
  const q=document.getElementById('searchInput').value.trim().toLowerCase();
  const box=document.getElementById('searchResults');
  box.innerHTML='';
  if(!q){box.classList.remove('show');return;}
  const m=allLocations.filter(l=>l.nama.toLowerCase().includes(q)).slice(0,6);
  m.forEach(l=>{
    const d=document.createElement('div');
    d.className='search-item';
    d.innerHTML=`${l.nama}<small>${BADGES[l.kategori]||l.kategori} · ${l.level}</small>`;
    d.onclick=()=>{
      map.flyTo([l.lat,l.lon],17); openDetail(l.id);
      box.classList.remove('show'); document.getElementById('searchInput').value='';
    };
    box.appendChild(d);
  });
  if(!m.length) box.innerHTML='<div class="search-item" style="color:#6a4a4a;pointer-events:none">Tidak ditemukan</div>';
  box.classList.add('show');
}
document.addEventListener('click',e=>{
  if(!e.target.closest('.search-wrap')) document.getElementById('searchResults').classList.remove('show');
});

// ── DETAIL MODAL ──────────────────────────────────────
function openDetail(id){
  const loc=allLocations.find(l=>l.id===id);
  if(!loc) return;
  selectedLocId=id;
  document.getElementById('detailImg').src         =loc.gambar;
  document.getElementById('detailBadge').textContent=BADGES[loc.kategori]||loc.kategori;
  document.getElementById('detailName').textContent =loc.nama;
  document.getElementById('detailLevel').textContent=loc.level.toUpperCase();
  document.getElementById('detailLevel').style.color=COLORS[loc.level];
  document.getElementById('detailPct').textContent  =`${loc.persen}% kepercayaan`;
  document.getElementById('detailDesc').textContent =loc.deskripsi;
  document.getElementById('detailVideo').src        =loc.video;
  document.getElementById('videoNote').textContent  =loc.videoNote;
  document.getElementById('detailKronologi').innerHTML=(loc.kronologi||[]).map(k=>
    `<div class="krono-item"><span class="krono-time">${k.waktu}</span><span class="krono-desc">${k.teks}</span></div>`
  ).join('');
  const ratings=JSON.parse(localStorage.getItem(`rating_${id}`)||'[]');
  const avg=ratings.length?(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1):'—';
  document.getElementById('ratingAvg').textContent=`Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
  document.querySelectorAll('.star').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.mtab').forEach((t,i)=>t.classList.toggle('active',i===0));
  document.querySelectorAll('.mtab-content').forEach((c,i)=>c.classList.toggle('active',i===0));
  document.getElementById('detailModal').classList.add('active');
}
function closeDetailModal(e){if(e.target===document.getElementById('detailModal'))closeDetailModalBtn();}
function closeDetailModalBtn(){
  document.getElementById('detailModal').classList.remove('active');
  document.getElementById('detailVideo').src='';
}
function switchModalTab(tab,btn){
  document.querySelectorAll('.mtab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.mtab-content').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab'+tab.charAt(0).toUpperCase()+tab.slice(1)).classList.add('active');
}

// ── RATING ────────────────────────────────────────────
function setRating(val){
  document.querySelectorAll('.star').forEach((s,i)=>s.classList.toggle('active',i<val));
  const key=`rating_${selectedLocId}`;
  const ratings=JSON.parse(localStorage.getItem(key)||'[]');
  ratings.push(val);
  localStorage.setItem(key,JSON.stringify(ratings));
  const avg=(ratings.reduce((a,b)=>a+b,0)/ratings.length).toFixed(1);
  document.getElementById('ratingAvg').textContent=`Rata-rata: ${avg} ⭐ (${ratings.length} penilaian)`;
}

// ── ADD LOCATION ──────────────────────────────────────
function openAddModal(){ document.getElementById('addModal').classList.add('active'); }
function closeAddModal(e){ if(e.target===document.getElementById('addModal'))document.getElementById('addModal').classList.remove('active'); }
function submitNewLocation(e){
  e.preventDefault();
  const newLoc={
    id:Date.now(),
    nama:document.getElementById('addName').value,
    lat:parseFloat(document.getElementById('addLat').value),
    lon:parseFloat(document.getElementById('addLon').value),
    kategori:document.getElementById('addKategori').value,
    level:document.getElementById('addLevel').value,
    persen:{rendah:25,sedang:50,tinggi:75,'sangat-tinggi':92}[document.getElementById('addLevel').value],
    deskripsi:document.getElementById('addDesc').value||'Laporan dari komunitas.',
    kronologi:[{waktu:'Baru',teks:'Lokasi baru dilaporkan.'}],
    gambar:document.getElementById('addImg').value||'https://via.placeholder.com/600x200/0a0005/cc0000?text=HAUNTED',
    video:'',videoNote:'Podcast belum tersedia.'
  };
  allLocations.push(newLoc);
  applyFilters();
  document.getElementById('addModal').classList.remove('active');
  map.flyTo([newLoc.lat,newLoc.lon],16);
  e.target.reset();
}

// ── SIDEBAR ───────────────────────────────────────────
function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  sb.classList.toggle('collapsed');
  document.getElementById('sidebarToggleIcon').textContent=sb.classList.contains('collapsed')?'▶':'◀';
  setTimeout(()=>map&&map.invalidateSize(),320);
}
