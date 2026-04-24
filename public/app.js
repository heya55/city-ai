let sessionId = null;

function setView(html) {
  document.getElementById("app").innerHTML = html;
}

// 🚀 ONBOARD
function showStart() {
  setView(`
    <div class="center">
      <div class="card start">
        <h1>🌍 City AI</h1>
        <p>Sana en uygun şehri bulalım</p>
        <button onclick="start()">Başla</button>
      </div>
    </div>
  `);
}

// 🧠 START
async function start() {
  const res = await fetch("/api/start", { method: "POST" });
  const data = await res.json();

  sessionId = data.sessionId;
  renderQuestion(data.question);
}

function renderQuestion(q) {
  setView(`
    <div class="center">
      <div class="card">
        <h2>${q.text}</h2>

        <button class="btn-yes" onclick="send(3)">Evet</button>
        <button class="btn-mid" onclick="send(1)">Biraz</button>
        <button class="btn-no" onclick="send(0)">Hayır</button>
      </div>
    </div>
  `);
}

async function send(value) {
  const res = await fetch(`/api/answer/${sessionId}`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ value })
  });

  const data = await res.json();

  if (data.done) return showResult();

  renderQuestion(data.next);
}

// 🧠 helpers
function img(city) {
  return `https://source.unsplash.com/600x300/?${city}`;
}

function map(city) {
  return `https://www.google.com/maps?q=${city}&output=embed`;
}

function badge(k) {
  const m = {
    doga:"🌲", eglence:"🎉", sakinlik:"🧘",
    kesif:"🧭", luks:"💎", sosyal:"👥"
  };
  return m[k] || k;
}

// 🎯 RESULT
async function showResult() {
  const res = await fetch(`/api/result/${sessionId}`);
  const data = await res.json();

  function card(c, best=false) {
    return `
      <div class="city-card">
        <img class="city-img" src="${img(c.city)}">

        <div class="city-content">
          <h3>${best?"🔥 ":""}${c.city}</h3>

          <div class="bar">
            <div class="fill" style="width:${Math.round(c.score*100)}%"></div>
          </div>

          <div>
            ${(c.tags||[]).map(t=>`<span class="badge">${badge(t)}</span>`).join("")}
          </div>

          <iframe class="map" src="${map(c.city)}"></iframe>
        </div>
      </div>
    `;
  }

  setView(`
    <div class="card">
      <h2>🎯 Sonuç</h2>

      <div class="result-grid">
        ${card(data.best, true)}
        ${card(data.second)}
        ${card(data.surprise)}
      </div>

      <p>${data.reasons.join("<br>")}</p>
    </div>
  `);
}

showStart();