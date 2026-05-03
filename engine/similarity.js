import { normalizedStyleProfile, STYLE_KEYS } from "./normalizeProfile.js";

/**
 * Kosinüs benzerliği — sadece seyahat eksenleri (şehir verisiyle aynı boyut).
 * Kullanıcı vektörü normalize edilir; böylece birikimli quiz skorları şehir 0–10 ölçeğiyle daha tutarlı kıyaslanır.
 */
export function similarity(user, city) {
  const uvec = normalizedStyleProfile(user || {});

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const key of STYLE_KEYS) {
    const u = uvec[key] || 0;
    const c = city[key] || 0;

    dot += u * c;
    magA += u * u;
    magB += c * c;
  }

  const denom = Math.sqrt(magA) * Math.sqrt(magB);

  return denom === 0 ? 0 : dot / denom;
}
