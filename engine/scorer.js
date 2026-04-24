export function score(profile, city) {
  let total = 0;

  for (let k in profile) {
    total += Math.abs(profile[k] - city[k]);
  }

  return total;
}