export function aiComment(profile, city) {
  const dominant = Object.entries(profile)
    .sort((a, b) => b[1] - a[1])[0][0];

  const map = {
    doga: "doğaya kaçmak isteyen",
    eglence: "enerjik ve hareketli",
    sakinlik: "kafa dinlemek isteyen",
    kesif: "yeni şeyler keşfetmeyi seven",
    luks: "konfor arayan",
    sosyal: "insanlarla iç içe olmayı seven"
  };

  return `Sen ${map[dominant]} bir profilsin. ${city} bu yönünü besleyecek güçlü bir deneyim sunar.`;
}