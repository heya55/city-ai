export function explain(profile, cities, cityName) {
  const city = cities[cityName];
  const reasons = [];

  const weights = {
    doga: "doğa ihtiyacın",
    eglence: "eğlence beklentin",
    sakinlik: "sakinlik ihtiyacın",
    kesif: "keşif isteğin",
    luks: "konfor beklentin",
    sosyal: "sosyalleşme isteğin"
  };

  for (const key in profile) {
    if (!city[key]) continue;

    const diff = Math.abs(profile[key] - city[key]);

    if (diff < 3 && profile[key] > 2) {
      reasons.push(`✔ ${weights[key]} bu şehirde iyi karşılanıyor`);
    }
  }

  return reasons.slice(0, 5);
}