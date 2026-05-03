import express from "express";
import { cities } from "./cities.js";
import { recommendTop3 } from "./engine/recommender.js";
import { explain } from "./engine/explainer.js";
import { generatePersonality } from "./engine/personality.js";
import { aiComment } from "./engine/aiComment.js";
import { createPlan } from "./engine/planner.js";
import { getItinerary } from "./engine/itinerary.js";
import { normalizedStyleProfile } from "./engine/normalizeProfile.js";

const app  = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

// ── Soru bankası (frontend adaptif akış kurar) ──────────
// Format: { id, text, opts: [{ label, scores }] }
const baseQuestions = [
  {
    id: "goal",
    text: "Bu seyahatte en çok ne arıyorsun?",
    opts: [
      { label: "Huzur ve dinginlik", scores: { sakinlik: 4, doga: 2 } },
      { label: "Macera ve keşif", scores: { kesif: 4, doga: 2 } },
      { label: "Eğlence ve sosyal ortam", scores: { eglence: 4, sosyal: 3 } },
      { label: "Kültür, tarih ve şehir gezisi", scores: { kesif: 3, sosyal: 2 } }
    ]
  },
  {
    id: "environment",
    text: "Hangi ortam seni daha çok çekiyor?",
    opts: [
      { label: "Dağ, orman, yayla", scores: { doga: 4, sakinlik: 2 } },
      { label: "Deniz, kıyı, sahil", scores: { doga: 3, eglence: 2 } },
      { label: "Tarihi/otantik şehir", scores: { kesif: 4, sosyal: 1 } },
      { label: "Karışık olsun (hepsi)", scores: { kesif: 2, doga: 2, eglence: 1 } }
    ]
  },
  {
    id: "nights",
    text: "Akşamlar nasıl geçsin?",
    opts: [
      { label: "Sakin, kafa dinlemelik", scores: { sakinlik: 4 } },
      { label: "Canlı gece hayatı", scores: { eglence: 4, sosyal: 2 } },
      { label: "Yerel restoran/çarşı", scores: { sosyal: 3, kesif: 2 } },
      { label: "Konforlu otel/SPA", scores: { luks: 4, sakinlik: 1 } }
    ]
  },
  {
    id: "duration",
    text: "Kaç gün ayırmayı düşünüyorsun?",
    opts: [
      { label: "1–2 gün (kaçamak)", scores: { duration: 1 } },
      { label: "3–4 gün (mini tatil)", scores: { duration: 2 } },
      { label: "5–7 gün (tam tatil)", scores: { duration: 3 } },
      { label: "8+ gün (uzun gezi)", scores: { duration: 4 } }
    ]
  },
  {
    id: "budget",
    text: "Bütçe yaklaşımın ne?",
    opts: [
      { label: "Ekonomik", scores: { budget: 1 } },
      { label: "Dengeli", scores: { budget: 2 } },
      { label: "Rahat", scores: { budget: 3 } },
      { label: "Lüks", scores: { budget: 4, luks: 2 } }
    ]
  },
  {
    id: "withWho",
    text: "Kiminle gidiyorsun?",
    opts: [
      { label: "Tek başıma", scores: { kesif: 2 } },
      { label: "Partner/çift", scores: { sakinlik: 1, luks: 1 } },
      { label: "Arkadaş grubu", scores: { eglence: 2, sosyal: 2 } },
      { label: "Aile", scores: { sakinlik: 2, sosyal: 1 } }
    ]
  },
  {
    id: "season",
    text: "Hangi dönemde gitmek istiyorsun?",
    opts: [
      { label: "İlkbahar", scores: { season: 2, kesif: 1 } },
      { label: "Yaz", scores: { season: 3, doga: 1, eglence: 1 } },
      { label: "Sonbahar", scores: { season: 2, sakinlik: 1 } },
      { label: "Kış", scores: { season: 1, sakinlik: 1 } }
    ]
  }
];

const categoryQuestions = {
  doga: [
    {
      id: "doga_1",
      text: "Doğada en çok hangisi seni mutlu eder?",
      opts: [
        { label: "Yürüyüş/trekking rotaları", scores: { doga: 3, kesif: 2 } },
        { label: "Göl/yayla manzarası", scores: { doga: 3, sakinlik: 2 } },
        { label: "Deniz + doğa birlikte", scores: { doga: 2, eglence: 1 } },
        { label: "Kamp/çadır deneyimi", scores: { doga: 4 } }
      ]
    },
    {
      id: "doga_2",
      text: "Zorluk seviyesi nasıl olsun?",
      opts: [
        { label: "Rahat ve kolay", scores: { sakinlik: 2, doga: 1 } },
        { label: "Orta seviye", scores: { doga: 2, kesif: 1 } },
        { label: "Zorlayıcı/ekstrem", scores: { doga: 3, kesif: 2 } }
      ]
    }
  ],
  eglence: [
    {
      id: "eglence_1",
      text: "Eğlencede hangisi daha senlik?",
      opts: [
        { label: "Barlar/klüpler", scores: { eglence: 4, sosyal: 2 } },
        { label: "Konser/festival", scores: { eglence: 3, sosyal: 2 } },
        { label: "Sokak lezzetleri + kalabalık", scores: { sosyal: 3, eglence: 2 } },
        { label: "Gündüz aktivite, akşam sakin", scores: { eglence: 2, sakinlik: 2 } }
      ]
    },
    {
      id: "eglence_2",
      text: "Kalabalıkla aran nasıl?",
      opts: [
        { label: "Severim, enerji verir", scores: { sosyal: 3, eglence: 1 } },
        { label: "Bazen iyi", scores: { sosyal: 1 } },
        { label: "Yorar, uzak dururum", scores: { sakinlik: 3 } }
      ]
    }
  ],
  sakinlik: [
    {
      id: "sakinlik_1",
      text: "Sakinlik deyince aklına ne geliyor?",
      opts: [
        { label: "Sessiz doğa", scores: { sakinlik: 4, doga: 2 } },
        { label: "Az kalabalık sahil", scores: { sakinlik: 3, doga: 1 } },
        { label: "Küçük şehir huzuru", scores: { sakinlik: 4 } }
      ]
    },
    {
      id: "sakinlik_2",
      text: "Ritmin nasıl olsun?",
      opts: [
        { label: "Yavaş ve plansız", scores: { sakinlik: 3 } },
        { label: "Dengeli", scores: { sakinlik: 2, kesif: 1 } },
        { label: "Çok gezeyim ama sakin kalsın", scores: { kesif: 2, sakinlik: 2 } }
      ]
    }
  ],
  kesif: [
    {
      id: "kesif_1",
      text: "Keşifte hangisi daha çekici?",
      opts: [
        { label: "Tarih ve müzeler", scores: { kesif: 4 } },
        { label: "Yeni sokaklar/mahalleler", scores: { kesif: 3, sosyal: 1 } },
        { label: "Doğa + keşif", scores: { kesif: 2, doga: 2 } }
      ]
    },
    {
      id: "kesif_2",
      text: "Gezi stilin?",
      opts: [
        { label: "Planlı rota", scores: { kesif: 3 } },
        { label: "Spontane", scores: { eglence: 2, kesif: 1 } },
        { label: "Karışık", scores: { kesif: 2 } }
      ]
    }
  ],
  luks: [
    {
      id: "luks_1",
      text: "Konforda en çok ne önemli?",
      opts: [
        { label: "İyi otel + kahvaltı", scores: { luks: 4 } },
        { label: "Spa/termal", scores: { luks: 3, sakinlik: 1 } },
        { label: "Fine dining", scores: { luks: 3, sosyal: 1 } }
      ]
    },
    {
      id: "luks_2",
      text: "Ulaşım/konfor tercihi?",
      opts: [
        { label: "Yakın ve rahat ulaşım", scores: { luks: 2 } },
        { label: "Fark etmez, deneyim önemli", scores: { kesif: 1 } }
      ]
    }
  ],
  sosyal: [
    {
      id: "sosyal_1",
      text: "Sosyal olarak ne istersin?",
      opts: [
        { label: "Yeni insanlarla tanışmak", scores: { sosyal: 4 } },
        { label: "Mekanlar ve etkinlikler", scores: { sosyal: 3, eglence: 2 } },
        { label: "Yerel kültürle karışmak", scores: { sosyal: 2, kesif: 2 } }
      ]
    },
    {
      id: "sosyal_2",
      text: "Tempo?",
      opts: [
        { label: "Sürekli hareket", scores: { sosyal: 2, eglence: 2 } },
        { label: "Dengeli", scores: { sosyal: 1 } },
        { label: "Sakin sosyal (kafe/gezinti)", scores: { sosyal: 1, sakinlik: 2 } }
      ]
    }
  ]
};

// ── GET /api/questions ─────────────────────────────────
app.get("/api/questions", (req, res) => {
  res.json({
    version: 2,
    baseQuestions,
    categoryQuestions
  });
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
  const itinerary   = getItinerary(recs.best.city);

  res.json({
    best:        recs.best,
    second:      recs.second,
    surprise:    recs.surprise,
    reasons,
    personality: personality.insight,
    comment,
    plan,
    itinerary
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
        max_tokens: 720,
        system:
          "Sen Türkiye seyahatinde uzmanlaşmış bir rehbersin. Türkçe yaz. Üslup samimi ama bilgilendirici olsun. " +
          "Yanıt yaklaşık 900–1400 karakter aralığında olsun (3–5 kısa paragraf). " +
          "Şunları mutlaka ele al: (1) kullanıcı profili ve şehir uyumu (2) şehirde somut aktivite/lokasyon örnekleri (gerçekçi ve genel, uydurma detay verme) (3) kimler için çok uygun / kimler için daha az uygun olabileceği (4) küçük pratik öneriler (tempo, kalabalık, ulaşım gibi genel). " +
          "Abartılı garantiler verme; tek seçenekmiş gibi konuşma.",
        messages: [{
          role:    "user",
          content:
            `Kişilik özeti:\n${personality}\n\n` +
            `Önerilen il: ${city}\n\n` +
            `Normalize edilmiş seyahat eksenleri (0–10, quiz skorlarından türetilmiş):\n${JSON.stringify(normalizedStyleProfile(profile || {}))}\n\n` +
            `Bu kullanıcı için bu ili önermenin mantığını detaylıca anlat; gerektiğinde küçük başlıklar kullanabilirsin ama emoji kullanmak zorunda değilsin.`
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
