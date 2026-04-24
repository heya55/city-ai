export function generatePersonality(profile) {
  const sorted = Object.entries(profile)
    .filter(([k]) => typeof profile[k] === "number")
    .sort((a, b) => b[1] - a[1]);

  const top = sorted[0][0];
  const second = sorted[1][0];

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
Sen aslında ${map[top]} bir kişiliğe sahipsin.
Ama ${map[second]} tarafın seni dengeliyor.

Bu yüzden seçimlerin rastgele değil, karakter temelli.
`
  };
}