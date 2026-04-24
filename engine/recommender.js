import { similarity } from "./similarity.js";

export function recommendTop3(profile, cities) {
  const ranked = Object.entries(cities)
    .map(([city, data]) => {
      const score = similarity(profile, data);

      const tags = [];

      for (const key in profile) {
        if (profile[key] > 4 && data[key] > 6) {
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