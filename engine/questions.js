export const starterQuestions = [
  {
    q: "Tatil senin için ne? (A dinlenme / B keşif / C eğlence)",
    map: { a: "sakinlik", b: "kesif", c: "eglence" },
    value: { a: 2, b: 3, c: 3 }
  },
  {
    q: "Kalabalık ortam? (A severim / B yorulurum)",
    map: { a: "sosyal", b: "sakinlik" },
    value: { a: 3, b: 2 }
  },
  {
    q: "Doğa mı şehir mi? (A doğa / B şehir)",
    map: { a: "doga", b: "eglence" },
    value: { a: 3, b: 2 }
  },
  {
    q: "Bütçe seviyen? (A düşük / B orta / C yüksek)",
    map: { a: "luks", b: "luks", c: "luks" },
    value: { a: 1, b: 2, c: 3 }
  },
  {
    q: "Seyahat tarzın? (A planlı / B spontan)",
    map: { a: "kesif", b: "eglence" },
    value: { a: 2, b: 3 }
  }
];

export const categoryQuestions = {
  doga: [
    { q: "Kamp mı otel mi? (A/B)", key: "doga" },
    { q: "Dağ mı deniz mi? (A/B)", key: "doga" }
  ],

  eglence: [
    { q: "Gece hayatı? (A/B)", key: "eglence" },
    { q: "Festival önemli mi? (A/B)", key: "eglence" }
  ],

  kesif: [
    { q: "Tarih mi modern mi? (A/B)", key: "kesif" },
    { q: "Yeni yer keşfi sever misin? (A/B)", key: "kesif" }
  ],

  sakinlik: [
    { q: "Sessizlik önemli mi? (A/B)", key: "sakinlik" },
    { q: "Kalabalık seni yorar mı? (A/B)", key: "sakinlik" }
  ],

  luks: [
    { q: "Konfor önemli mi? (A/B)", key: "luks" },
    { q: "Premium deneyim ister misin? (A/B)", key: "luks" }
  ],

  sosyal: [
    { q: "Yeni insanlarla tanışmak? (A/B)", key: "sosyal" },
    { q: "Grup tatili mi solo mu? (A/B)", key: "sosyal" }
  ]
};