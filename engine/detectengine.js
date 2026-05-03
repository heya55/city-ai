export function detectTopCategory(profile) {
  const entries = Object.entries(profile || {}).filter(([, v]) => typeof v === "number");
  return entries.length
    ? entries.sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0][0]
    : "kesif";
}