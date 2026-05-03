import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { normalizedStyleProfile, STYLE_KEYS } from "./normalizeProfile.js";
import { getItinerary } from "./itinerary.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const provinceIlceler = JSON.parse(readFileSync(join(__dirname, "provinceIlceler.json"), "utf8"));

/** Wikipedia JSON anahtarı ile cities.js yazımı bazen farklı (ör. Hakkâri / Hakkari). */
const IL_WIKI_ALIAS = {
  Hakkari: "Hakkâri"
};

function wikiProvinceKey(name) {
  return IL_WIKI_ALIAS[name] || name;
}

const TRAIT_WORD = {
  doga: "doğa ve manzara",
  eglence: "tempo ve eğlence",
  sakinlik: "dingin tempo",
  kesif: "keşif ve kültür",
  luks: "konfor",
  sosyal: "sosyal ortam"
};

function hashDistrictSeed(il, ilce) {
  const raw = `${il}\0${ilce}`;
  let h = 2166136261;
  for (let i = 0; i < raw.length; i++) {
    h ^= raw.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return "ca" + (h >>> 0).toString(36);
}

function topTraits(profile, n = 2) {
  const nvec = normalizedStyleProfile(profile || {});
  return STYLE_KEYS.map(k => [k, nvec[k] || 0])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([k]) => k);
}

function pickDistrictNames(cityName) {
  const it = getItinerary(cityName);
  const wk = wikiProvinceKey(cityName);
  const wiki = provinceIlceler[wk] || provinceIlceler[cityName] || [];
  const pref = (it.districts || []).filter(d => wiki.includes(d));
  const merged = [...new Set([...pref, ...wiki])];
  return merged.slice(0, 4);
}

function buildReason(ilce, il, profile, traits) {
  const [t1, t2] = traits;
  const focus = TRAIT_WORD[t1] || "seyahat önceliğini";
  const balance =
    t2 && t2 !== t1
      ? `${TRAIT_WORD[t2]} eksenini dengelemek için uygun bir tamamlayıcı durak.`
      : "";

  const ub = Number(profile?.budget) || 2;
  const ud = Number(profile?.duration) || 2;

  const budgetBit =
    ub <= 2
      ? "Yerel lokanta ve toplu ulaşım ile harcamayı kontrol altında tutmak için elverişli."
      : ub >= 4
        ? "Konforlu konaklama ve seçenekli yeme-içme çeşidi sunar."
        : "Harcamayı dengelemek için hem uygun fiyatlı hem orta segment seçenekler bulunur.";

  const durBit =
    ud >= 3
      ? "Uzun kalışta günlük plana yaymak için iyi bir durak."
      : "Kısa sürede yoğun deneyim için programa sıkıştırılabilir.";

  return `${ilce}, ${il} içinde ${focus} önceliğini güçlendirir. ${balance} ${budgetBit} ${durBit}`
    .replace(/\s+/g, " ")
    .trim();
}

export function districtSuggestionsFor(profile, cityName) {
  const names = pickDistrictNames(cityName);
  const traits = topTraits(profile, 2);

  return names.map(ilce => ({
    ilce,
    reason: buildReason(ilce, cityName, profile, traits),
    visualSeed: hashDistrictSeed(cityName, ilce)
  }));
}
