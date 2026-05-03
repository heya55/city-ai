export const STYLE_KEYS = ["doga", "eglence", "sakinlik", "kesif", "luks", "sosyal"];

/** Quiz skorları birikimli geldiği için 0–10 ölçeğine yaklaştırır (şehir etiketleriyle kıyas için). */
export function normalizedStyleProfile(profile) {
  const raw = STYLE_KEYS.map(k => Math.max(0, Number(profile?.[k]) || 0));
  const max = Math.max(...raw, 1e-6);
  const out = {};
  STYLE_KEYS.forEach((k, i) => {
    out[k] = (raw[i] / max) * 10;
  });
  return out;
}
