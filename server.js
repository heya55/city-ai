import express from "express";
import { cities } from "./cities.js";
import { recommendTop3 } from "./engine/recommender.js";
import { explain } from "./engine/explainer.js";
import { generatePersonality } from "./engine/personality.js";
import { aiComment } from "./engine/aiComment.js";
import { createPlan } from "./engine/planner.js";

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// ── Akıllı 4 soru (frontend için) ─────────────────────
const questions = [
  {
    id: 1,
    text: "Seyahatte en çok ne arar, ne hissedersin?",
    opts: [
      { label: "Huzur ve dinginlik",  scores: { sakinlik: 4, doga: 2 } },
      { label: "Macera ve keşif",     scores: { kesif: 4, doga: 2 } },
      { label: "Eğlence ve sosyal",   scores: { eglence: 4, sosyal: 3 } },
      { label: "Kültür ve tarih",     scores: { kesif: 3, luks: 1 } }
    ]
  },
  {
    id: 2,
    text: "Hangi ortam seni daha çok çekiyor?",
    opts: [
      { label: "Dağ ve orman",   scores: { doga: 4, sakinlik: 3 } },
      { label: "Deniz ve kıyı",  scores: { doga: 3, eglence: 2, luks: 1 } },
      { label: "Tarihi şehir",   scores: { kesif: 4, sosyal: 2 } },
      { label: "Hepsi olsun",    scores: { kesif: 2, doga: 2, eglence: 2 } }
    ]
  },
  {
    id: 3,
    text: "Gecelerin nasıl geçsin?",
    opts: [
      { label: "Sessiz, yıldızlı gökyüzü", scores: { sakinlik: 4, doga: 3 } },
      { label: "Canlı gece hayatı",         scores: { eglence: 4, sosyal: 3 } },
      { label: "Yerel restoran ve çarşı",   scores: { sosyal: 3, kesif: 2 } },
      { label: "Lüks otel konforu",         scores: { luks: 4, sakinlik: 2 } }
    ]
  },
  {
    id: 4,
    text: "Seyahat tarzın nasıl?",
    opts: [
      { label: "Kısa, uygun bütçeli",  scores: { eglence: 2, kesif: 2 } },
      { label: "Kısa, konforlu",        scores: { luks: 3, eglence: 2 } },
      { label: "Uzun, keşif odaklı",    scores: { kesif: 4, doga: 2 } },
      { label: "Uzun, tam lüks",        scores: { luks: 4, sosyal: 2 } }
    ]
  }
];

// ── GET /api/questions ─────────────────────────────────
app.get("/api/questions", (req, res) => {
  res.json(questions);
});

// ── POST /api/result ───────────────────────────────────
// Body: { profile: { doga, eglence, sakinlik, kesif, luks, sosyal } }
app.post("/api/result", (req, res) => {
  const profile = req.body.profile;
  if (!profile) return res.status(400).json({ error: "profile gerekli" });

  const recs        = recommendTop3(profile, cities);
  const reasons     = explain(profile, cities, recs.best.city);
  const personality = generatePersonality(profile);
  const comment     = aiComment(profile, recs.best.city);
  const plan        = createPlan(recs.best.city);

  res.json({
    best:        recs.best,
    second:      recs.second,
    surprise:    recs.surprise,
    reasons,
    personality: personality.insight,
    comment,
    plan
  });
});

// ── POST /api/ai-comment (Anthropic API ile zenginleştir) ──
app.post("/api/ai-comment", async (req, res) => {
  const { city, personality, profile } = req.body;
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.json({ comment: aiComment(profile || {}, city) });
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type":      "application/json",
        "x-api-key":         apiKey,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model:      "claude-sonnet-4-20250514",
        max_tokens: 200,
        system:     "Sen Türkiye'yi çok iyi bilen bir seyahat rehberisin. Kısa, samimi ve kişisel yaz. Maksimum 3 cümle. Türkçe.",
        messages: [{
          role:    "user",
          content: `Kullanıcı kişiliği: ${personality}. Önerilen il: ${city}. Bu kişiye neden bu şehrin mükemmel olduğunu 3 cümleyle samimi anlat.`
        }]
      })
    });
    const data    = await response.json();
    const comment = data.content?.map(i => i.text || "").join("") || aiComment({}, city);
    res.json({ comment });
  } catch (e) {
    console.error("Anthropic API hatası:", e.message);
    res.json({ comment: aiComment(profile || {}, city) });
  }
});

app.listen(PORT, () => console.log(`🚀 City AI v3: http://localhost:${PORT}`));
