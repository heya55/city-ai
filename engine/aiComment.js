export function aiComment(profile, city) {
  const entries = Object.entries(profile || {}).filter(([, v]) => typeof v === "number");
  const dominant = entries.length
    ? entries.sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))[0][0]
    : "kesif";

  const map = {
    doga: "doğaya kaçmak isteyen",
    eglence: "enerjik ve hareketli",
    sakinlik: "kafa dinlemek isteyen",
    kesif: "yeni şeyler keşfetmeyi seven",
    luks: "konfor arayan",
    sosyal: "insanlarla iç içe olmayı seven"
  };

  return `Sen ${map[dominant] || "keşfetmeyi seven"} bir profilsin. ${city} bu yönünü besleyecek güçlü bir deneyim sunar.`;
}