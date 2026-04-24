export function detectTopCategory(profile) {
  return Object.entries(profile)
    .sort((a, b) => b[1] - a[1])[0][0];
}