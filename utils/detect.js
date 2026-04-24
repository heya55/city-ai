export function detectTopCategory(profile) {
  return Object.entries(profile)
    .filter(([k]) => k !== "budget" && k !== "travel")
    .sort((a, b) => b[1] - a[1])[0][0];
}