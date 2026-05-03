export function generatePersonality(profile) {
  const sorted = Object.entries(profile || {})
    .filter(([, v]) => typeof v === "number")
    .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0));

  const top = sorted?.[0]?.[0] || "kesif";
  const second = sorted?.[1]?.[0] || top;

  const map = {
    doga: "doğayla bağlantılı, özgür ruhlu",
    eglence: "sosyal, eğlence odaklı",
    sakinlik: "huzur ve denge arayan",
    kesif: "keşif tutkunu",
    luks: "konfor ve kalite odaklı",
    sosyal: "insan ilişkileri güçlü"
  };

  return {
    insight: `
Sen aslında ${map[top] || map.kesif} bir kişiliğe sahipsin.
Ama ${map[second] || map.kesif} tarafın seni dengeliyor.

Bu yüzden seçimlerin rastgele değil, karakter temelli.
`
  };
}