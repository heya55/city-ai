// ── Şehir fotoğraf sorguları ───────────────────────────
const cityPhotos = {
  "İstanbul":       [{label:"Ayasofya",q:"Hagia Sophia Istanbul"},{label:"Boğaz",q:"Istanbul Bosphorus sunset"},{label:"Balat",q:"Balat Istanbul colorful streets"},{label:"Kapalıçarşı",q:"Grand Bazaar Istanbul"}],
  "Antalya":        [{label:"Kaleiçi",q:"Kaleici Antalya old harbour"},{label:"Turkuaz koy",q:"Antalya turquoise beach"},{label:"Düden Şelalesi",q:"Duden waterfall Antalya"},{label:"Aspendos",q:"Aspendos ancient theatre"}],
  "Muğla":          [{label:"Ölüdeniz",q:"Oludeniz blue lagoon Turkey"},{label:"Bodrum",q:"Bodrum Castle Aegean"},{label:"Marmaris",q:"Marmaris bay Turkey"},{label:"Gökova",q:"Gokova bay Turkey"}],
  "Rize":           [{label:"Ayder Yaylası",q:"Ayder Plateau Rize green"},{label:"Kaçkar",q:"Kackar Mountains trekking"},{label:"Şelale",q:"Rize waterfall green valley"},{label:"Çay bahçeleri",q:"Rize tea garden Black Sea"}],
  "Trabzon":        [{label:"Sümela",q:"Sumela Monastery Trabzon cliff"},{label:"Uzungöl",q:"Uzungol lake mountains"},{label:"Boztepe",q:"Boztepe Trabzon Black Sea view"},{label:"Atatürk Köşkü",q:"Trabzon Ataturk Kosku"}],
  "Kapadokya":      [{label:"Peri Bacaları",q:"Cappadocia fairy chimneys"},{label:"Balon",q:"Cappadocia hot air balloon sunrise"},{label:"Ihlara",q:"Ihlara Valley green canyon"},{label:"Yeraltı Şehri",q:"Derinkuyu underground city"}],
  "İzmir":          [{label:"Kordon",q:"Izmir Kordon waterfront promenade"},{label:"Efes",q:"Ephesus ancient ruins"},{label:"Alaçatı",q:"Alacati stone streets windmill"},{label:"Kemeraltı",q:"Kemeralti Bazaar Izmir"}],
  "Şanlıurfa":      [{label:"Göbeklitepe",q:"Gobeklitepe archaeological site"},{label:"Balıklıgöl",q:"Balikligol Urfa fish pool"},{label:"Harran",q:"Harran beehive houses Urfa"},{label:"Urfa Çarşısı",q:"Sanliurfa bazaar historic"}],
  "Artvin":         [{label:"Seytan Kalesi",q:"Artvin Seytan Kalesi canyon"},{label:"Savsat",q:"Savsat Artvin green mountains"},{label:"Borcka",q:"Borcka lake Artvin"},{label:"Macahel",q:"Macahel Artvin forest"}],
  "Bolu":           [{label:"Abant Gölü",q:"Abant Lake Bolu Turkey"},{label:"Yedigöller",q:"Yedigöller national park Bolu"},{label:"Kartalkaya",q:"Kartalkaya ski resort Bolu"},{label:"Orman",q:"Bolu forest autumn Turkey"}],
  "Kars":           [{label:"Ani Harabeleri",q:"Ani ruins Kars Armenia"},{label:"Çıldır Gölü",q:"Cildir Lake frozen Kars"},{label:"Kars Kalesi",q:"Kars Castle fortress"},{label:"Bozkır",q:"Kars steppe winter landscape"}],
  "Van":            [{label:"Van Gölü",q:"Lake Van Turkey turquoise"},{label:"Akdamar",q:"Akdamar Church Lake Van"},{label:"Van Kalesi",q:"Van Castle historic"},{label:"Nemrut Krateri",q:"Nemrut crater lake Van"}],
  "Gaziantep":      [{label:"Zeugma",q:"Zeugma mosaic museum Gaziantep"},{label:"Bakırcılar",q:"Gaziantep bazaar copper"},{label:"Rumkale",q:"Rumkale Gaziantep fortress"},{label:"Baklava",q:"Gaziantep baklava dessert"}],
  "Ankara":         [{label:"Anıtkabir",q:"Anitkabir Ankara mausoleum"},{label:"Ankara Kalesi",q:"Ankara Castle historic"},{label:"Anadolu Medeniyetleri",q:"Museum Anatolian Civilizations Ankara"},{label:"Gençlik Parkı",q:"Genclik Park Ankara"}],
  "Bursa":          [{label:"Uludağ",q:"Uludag mountain Bursa ski"},{label:"Yeşil Cami",q:"Green Mosque Bursa Turkey"},{label:"Cumalıkızık",q:"Cumalikizik village Bursa"},{label:"Kapalı Çarşı",q:"Bursa covered bazaar historic"}],
  "Eskişehir":      [{label:"Porsuk Çayı",q:"Porsuk River Eskisehir"},{label:"Odunpazarı",q:"Odunpazari Eskisehir historic"},{label:"Sazova Parkı",q:"Sazova Park Eskisehir"},{label:"Tepebasi",q:"Tepebasi Eskisehir night"}],
  "Çanakkale":      [{label:"Truva",q:"Troy ancient ruins Canakkale"},{label:"Gelibolu",q:"Gallipoli memorial Canakkale"},{label:"Boğaz",q:"Canakkale strait Dardanelles"},{label:"Assos",q:"Assos ancient city Canakkale"}],
  "Denizli":        [{label:"Pamukkale",q:"Pamukkale travertine pools Turkey"},{label:"Hierapolis",q:"Hierapolis ancient ruins Pamukkale"},{label:"Kaklik Mağarası",q:"Kaklik Cave Denizli"},{label:"Salda Gölü",q:"Salda Lake turquoise Burdur"}],
  "Hatay":          [{label:"Saint Pierre Kilisesi",q:"Saint Pierre Church Antioch Hatay"},{label:"Bazaar",q:"Hatay bazaar spices"},{label:"Samandağ",q:"Samandag beach Hatay"},{label:"Titus Tüneli",q:"Titus Tunnel Hatay Roman"}],
  "Erzurum":        [{label:"Palandöken",q:"Palandoken ski resort Erzurum"},{label:"Çifte Minareler",q:"Cifte Minareli Medrese Erzurum"},{label:"Oltu",q:"Oltu castle Erzurum"},{label:"Tortum Şelalesi",q:"Tortum waterfall Erzurum"}],
  "default":        [{label:"Doğa manzarası",q:"Turkey nature landscape"},{label:"Tarihi doku",q:"Turkey historic town"},{label:"Yöresel lezzetler",q:"Turkish local food"},{label:"Gece manzarası",q:"Turkey city night view"}]
};

function getPhotos(cityName) {
  return cityPhotos[cityName] || cityPhotos["default"];
}

function escapeAttr(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function hashSeed(parts) {
  const raw = parts.join("\0");
  let h = 2166136261;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return "ca" + (h >>> 0).toString(36);
}

/** Deterministic görsel (picsum). source.unsplash.com çoğu yerde artık çalışmıyor. */
function photoSeedKey(cityName, p) {
  return hashSeed([cityName, p.label, p.q]);
}

function quizHeroUrl(q) {
  const seed = hashSeed(["hero", q.id || "", q.text]);
  return `https://picsum.photos/seed/${seed}/720/340`;
}

function quizThumbUrl(q, optIndex, label) {
  const seed = hashSeed(["thumb", q.id || "", String(optIndex), label]);
  return `https://picsum.photos/seed/${seed}/280/200`;
}

function quizBackdropUrl(q) {
  const seed = hashSeed(["backdrop", q.id || "", q.text]);
  return `https://picsum.photos/seed/${seed}/1600/1000`;
}

function applyQuizBackdrop(q) {
  const url = quizBackdropUrl(q);
  document.documentElement.style.setProperty("--quiz-backdrop-url", `url("${url}")`);
  document.body.classList.add("quiz-mode");
}

function clearQuizVisuals() {
  document.body.classList.remove("quiz-mode");
  document.documentElement.style.removeProperty("--quiz-backdrop-url");
}

function prefetchNextQuizImages() {
  const next = questions[currentQ + 1];
  if (!next) return;
  const urls = [
    quizHeroUrl(next),
    quizBackdropUrl(next),
    ...next.opts.map((o, i) => quizThumbUrl(next, i, o.label))
  ];
  urls.forEach(src => {
    const im = new Image();
    im.decoding = "async";
    im.src = src;
  });
}

function photoUrls(cityName, p) {
  const seed = photoSeedKey(cityName, p);
  return {
    primary: `https://picsum.photos/seed/${seed}/400/280`,
    fallback: `https://placehold.co/400x280/e8efe9/085041/png?font=montserrat&text=${encodeURIComponent(p.label)}`
  };
}

// ── State ──────────────────────────────────────────────
let questionBank = null;
let questions = [];
let baseLen = 0;
let appendedAdaptive = false;
let currentQ  = 0;
let answers   = {};
let profile   = { doga: 0, eglence: 0, sakinlik: 0, kesif: 0, luks: 0, sosyal: 0, budget: 0, duration: 0, season: 0 };

// ── Helpers ────────────────────────────────────────────
function show(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function el(id) { return document.getElementById(id); }

// ── Start ──────────────────────────────────────────────
async function init() {
  document.getElementById('app').innerHTML = `
    <div id="s-start" class="screen active">
      <div class="card">
        <div class="app-logo">City AI</div>
        <h1>Sana en uygun Türkiye ili hangisi?</h1>
        <p class="sub">Adaptif sorularla profilini çıkarıp 81 il arasından sana en uygun olanı buluyorum — sebepleriyle birlikte.</p>
        <button class="btn primary" id="start-btn">Başla</button>
      </div>
    </div>
    <div id="s-quiz" class="screen"></div>
    <div id="s-loading" class="screen">
      <div class="card">
        <div class="loading-box">
          <div class="spinner"></div>
          <p class="loading-text" id="loading-text">Sorular yükleniyor...</p>
        </div>
      </div>
    </div>
    <div id="s-result" class="screen"></div>
  `;

  document.getElementById('start-btn').onclick = startQuiz;

  try {
    const res = await fetch('/api/questions');
    questionBank = await res.json();
  } catch (e) {
    document.getElementById('s-start').querySelector('.card').innerHTML += `
      <div class="error-box" style="margin-top:1rem">Sunucuya bağlanılamadı. Lütfen sayfayı yenileyin.</div>
    `;
  }

  clearQuizVisuals();
}

function blankProfile() {
  return { doga: 0, eglence: 0, sakinlik: 0, kesif: 0, luks: 0, sosyal: 0, budget: 0, duration: 0, season: 0 };
}

function applyScores(scores, sign = +1) {
  if (!scores) return;
  Object.entries(scores).forEach(([k, v]) => {
    if (k in profile) profile[k] += (Number(v) || 0) * sign;
  });
}

function getTopKeys(p, n = 2) {
  const excluded = new Set(["budget", "duration", "season"]);
  return Object.entries(p)
    .filter(([k, v]) => !excluded.has(k) && typeof v === "number")
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

function recomputeProfile() {
  profile = blankProfile();
  for (let qi = 0; qi < questions.length; qi++) {
    const sel = answers[qi];
    if (sel === undefined) continue;
    const scores = questions[qi]?.opts?.[sel]?.scores;
    applyScores(scores, +1);
  }
}

function maybeAppendAdaptiveQuestions() {
  if (appendedAdaptive) return;
  if (!questionBank?.categoryQuestions) return;

  const tops = getTopKeys(profile, 2);
  const extra = [];
  for (const key of tops) {
    const qlist = questionBank.categoryQuestions[key];
    if (Array.isArray(qlist)) extra.push(...qlist);
  }

  if (extra.length) {
    questions = questions.concat(extra);
    appendedAdaptive = true;
  }
}

// ── Quiz ───────────────────────────────────────────────
function startQuiz() {
  currentQ = 0;
  answers  = {};
  profile  = blankProfile();
  appendedAdaptive = false;

  baseLen = Array.isArray(questionBank?.baseQuestions) ? questionBank.baseQuestions.length : 0;
  questions = Array.isArray(questionBank?.baseQuestions) ? questionBank.baseQuestions.slice() : [];

  renderQuestion();
  show('s-quiz');
}

function renderQuestion() {
  const q   = questions[currentQ];
  applyQuizBackdrop(q);

  const pct = Math.round(((currentQ + 1) / questions.length) * 100);
  const sel = answers[currentQ] ?? null;

  const heroSrc = quizHeroUrl(q);
  const heroFb  = `https://placehold.co/720x340/e8efe9/085041/png?font=montserrat&text=${encodeURIComponent("City AI")}`;

  const opts = q.opts.map((o, i) => {
    const thumbSrc = quizThumbUrl(q, i, o.label);
    const thumbFb  = `https://placehold.co/280x200/e8efe9/085041/png?font=montserrat&text=${encodeURIComponent(String.fromCharCode(65 + i))}`;
    return `
    <button type="button" class="opt-btn opt-btn-visual${sel === i ? ' sel' : ''}" onclick="selectOpt(${i})">
      <div class="opt-thumb-wrap">
        <img class="opt-thumb" src="${escapeAttr(thumbSrc)}" alt="" decoding="async" loading="eager"
          data-fallback="${escapeAttr(thumbFb)}"
          onerror="this.onerror=null;this.src=this.dataset.fallback"/>
      </div>
      <div class="opt-body">
        <div class="opt-key">${String.fromCharCode(65 + i)}</div>
        <div class="opt-text">${escapeHtml(o.label)}</div>
      </div>
    </button>`;
  }).join('');

  el('s-quiz').innerHTML = `
    <div class="card quiz-card">
      <div class="quiz-hero">
        <img src="${escapeAttr(heroSrc)}" alt="" decoding="async" loading="eager"
          data-fallback="${escapeAttr(heroFb)}"
          onerror="this.onerror=null;this.src=this.dataset.fallback"/>
        <div class="quiz-hero-scrim"></div>
      </div>
      <div class="quiz-card-body">
        <div class="prog-wrap">
          <div class="prog-label">${currentQ + 1} / ${questions.length}</div>
          <div class="prog-bar"><div class="prog-fill" style="width:${pct}%"></div></div>
        </div>
        <div class="question">${escapeHtml(q.text)}</div>
        <div class="opt-grid opt-grid-visual">${opts}</div>
        <div class="nav-row">
          ${currentQ > 0 ? '<button class="btn" onclick="goBack()">← Geri</button>' : ''}
        </div>
      </div>
    </div>
  `;

  prefetchNextQuizImages();
}

function selectOpt(i) {
  answers[currentQ] = i;
  const scores = questions[currentQ].opts[i].scores;
  applyScores(scores, +1);

  document.querySelectorAll('.opt-btn').forEach((b, idx) => b.classList.toggle('sel', idx === i));

  setTimeout(() => {
    currentQ++;
    if (currentQ === baseLen) {
      maybeAppendAdaptiveQuestions();
    }

    if (currentQ >= questions.length) submitResult();
    else renderQuestion();
  }, 280);
}

function goBack() {
  if (currentQ <= 0) return;
  const prevAns = answers[currentQ - 1];
  if (prevAns !== undefined) {
    const scores = questions[currentQ - 1].opts[prevAns].scores;
    applyScores(scores, -1);
    delete answers[currentQ - 1];
  }
  currentQ--;

  // Eğer kullanıcı base sorulara geri döndüyse, adaptif ekleri temizle ve profili yeniden hesapla.
  if (appendedAdaptive && currentQ < baseLen) {
    questions = questions.slice(0, baseLen);
    appendedAdaptive = false;
    Object.keys(answers).forEach(k => {
      const qi = Number(k);
      if (Number.isFinite(qi) && qi >= baseLen) delete answers[qi];
    });
    recomputeProfile();
  }

  renderQuestion();
}

// ── Submit → backend engine ────────────────────────────
async function submitResult() {
  clearQuizVisuals();
  show('s-loading');
  const msgs = ["Profilin analiz ediliyor...", "81 il karşılaştırılıyor...", "En iyi eşleşme bulunuyor..."];
  let mi = 0;
  const iv = setInterval(() => { if (++mi < msgs.length) el('loading-text').textContent = msgs[mi]; }, 700);

  try {
    const res  = await fetch('/api/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile })
    });
    const data = await res.json();
    clearInterval(iv);
    renderResult(data);
  } catch (e) {
    clearInterval(iv);
    el('s-loading').innerHTML = `
      <div class="card">
        <div class="error-box">Sonuç alınamadı. Lütfen tekrar deneyin.</div>
        <button class="btn" onclick="startQuiz()">Tekrar dene</button>
      </div>
    `;
  }
}

// ── Result ─────────────────────────────────────────────
function renderResult(data) {
  clearQuizVisuals();

  const city    = data.best.city;
  const score   = Math.round(data.best.score * 100);
  const reasons = (data.reasons || []).map(r => `
    <div class="reason-item">
      <div class="reason-dot"></div>
      <div class="reason-text">${escapeHtml(r.replace(/^[✔•]\s*/, ''))}</div>
    </div>
  `).join('') || '<div class="reason-text" style="color:#aaa">Profil analizi tamamlandı.</div>';

  const planItems = (data.plan || []).map((p, i) => `
    <li class="plan-item">
      <span class="plan-day">Gün ${i + 1}</span>
      <span>${escapeHtml(p.replace(/^Gün \d+:\s*/, ''))}</span>
    </li>
  `).join('');

  const districts = (data.itinerary?.districts || []).map(d => `<span class="pill">${escapeHtml(d)}</span>`).join('');
  const routes = (data.itinerary?.routes || []).map(r => `
    <div class="also-card" style="text-align:left">
      <div class="also-label">${escapeHtml(r.title || 'Rota')}</div>
      <div class="also-score" style="margin-top:.25rem">${(r.stops || []).map(s => escapeHtml(s)).join(' • ')}</div>
    </div>
  `).join('');

  const photos = getPhotos(city);
  const photosHtml = photos.map(p => {
    const { primary, fallback } = photoUrls(city, p);
    return `
    <div class="photo-card">
      <img class="photo-img"
        src="${escapeAttr(primary)}"
        alt="${escapeAttr(p.label)}"
        data-fallback="${escapeAttr(fallback)}"
        loading="lazy"
        decoding="async"
        onerror="this.onerror=null;this.src=this.dataset.fallback"/>
      <div class="photo-label">${escapeHtml(p.label)}</div>
    </div>`;
  }).join('');

  el('s-result').innerHTML = `
    <div class="card">
      <span class="match-badge">En iyi eşleşme</span>
      <div class="city-name">${escapeHtml(city)}</div>
      <div class="city-score">Uyum skoru: ${score}%</div>

      <div class="personality-box" id="r-personality">${escapeHtml((data.personality || '').trim())}</div>

      <div class="section-label">Neden bu il?</div>
      ${reasons}

      <div class="divider"></div>

      <div class="section-label">Kişisel yorum</div>
      <div class="ai-box loading" id="r-ai">Sana özel yorum hazırlanıyor...</div>

      ${planItems ? `
        <div class="section-label">Örnek gezi planı</div>
        <ul class="plan-list">${planItems}</ul>
      ` : ''}

      ${(districts || routes) ? `
        <div class="section-label">İlçeler / Rotalar</div>
        ${districts ? `<div class="pill-row" style="display:flex;flex-wrap:wrap;gap:.5rem;margin:.25rem 0 1rem">${districts}</div>` : ''}
        ${routes ? `<div class="also-grid">${routes}</div>` : ''}
      ` : ''}

      <div class="section-label">Öne çıkan destinasyonlar</div>
      <div class="photo-grid">${photosHtml}</div>

      <div class="section-label">Ayrıca değerlendir</div>
      <div class="also-grid">
        <div class="also-card">
          <div class="also-label">İyi seçenek</div>
          <div class="also-city">${escapeHtml(data.second?.city || '—')}</div>
          <div class="also-score">${Math.round((data.second?.score || 0) * 100)}% uyum</div>
        </div>
        <div class="also-card">
          <div class="also-label">Sürpriz öneri</div>
          <div class="also-city">${escapeHtml(data.surprise?.city || '—')}</div>
          <div class="also-score">${Math.round((data.surprise?.score || 0) * 100)}% uyum</div>
        </div>
      </div>

      <div class="bottom-btns">
        <button class="btn" onclick="startQuiz()">Tekrar dene</button>
      </div>
    </div>
  `;
  show('s-result');
  loadAIComment(city, data.personality);
}

// ── AI Comment (Anthropic API varsa zengin, yoksa basit) ─
async function loadAIComment(city, personality) {
  try {
    const res  = await fetch('/api/ai-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, personality, profile })
    });
    const data = await res.json();
    const box  = el('r-ai');
    if (box) { box.textContent = data.comment; box.classList.remove('loading'); }
  } catch (e) {
    const box = el('r-ai');
    if (box) { box.textContent = `${city} — profilinizle güçlü bir uyum sağlıyor.`; box.classList.remove('loading'); }
  }
}

// ── Start ──────────────────────────────────────────────
init();
