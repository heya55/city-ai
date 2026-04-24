export function similarity(user, city) {
  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (const key in user) {
    const u = user[key] || 0;
    const c = city[key] || 0;

    dot += u * c;
    magA += u * u;
    magB += c * c;
  }

  const denom = Math.sqrt(magA) * Math.sqrt(magB);

  return denom === 0 ? 0 : dot / denom;
}