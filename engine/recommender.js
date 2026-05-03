import { similarity } from "./similarity.js";
import { normalizedStyleProfile, STYLE_KEYS } from "./normalizeProfile.js";
import { metaAffinity } from "./metaAffinity.js";

export function recommendTop3(profile, cities) {
  const nProf = normalizedStyleProfile(profile || {});

  const ranked = Object.entries(cities)
    .map(([city, data]) => {
      const base = similarity(profile, data);
      const bonus = metaAffinity(profile, data);
      const score = Math.min(1, base + bonus);

      const tags = [];

      for (const key of STYLE_KEYS) {
        if ((nProf[key] || 0) > 5 && (data[key] || 0) > 6) {
          tags.push(key);
        }
      }

      return { city, score, tags };
    })
    .sort((a, b) => b.score - a.score);

  return {
    best: ranked[0],
    second: ranked[1],
    surprise: ranked[2]
  };
}