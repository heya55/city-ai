const itineraries = {
  "İstanbul": {
    districts: ["Fatih", "Beyoğlu", "Kadıköy", "Beşiktaş"],
    routes: [
      { title: "Tarihi Yarımada", stops: ["Ayasofya", "Topkapı", "Sultanahmet Meydanı", "Kapalıçarşı"] },
      { title: "Boğaz Hattı", stops: ["Beşiktaş", "Ortaköy", "Bebek", "Emirgan"] },
      { title: "Anadolu Yakası", stops: ["Kadıköy", "Moda", "Üsküdar", "Kuzguncuk"] }
    ]
  },
  "Antalya": {
    districts: ["Muratpaşa", "Konyaaltı", "Alanya", "Kaş"],
    routes: [
      { title: "Şehir + Sahil", stops: ["Muratpaşa – Kaleiçi çevresi", "Konyaaltı", "Düden Şelalesi"] },
      { title: "Tarihi Rota", stops: ["Aspendos", "Perge", "Side Antik Kenti"] }
    ]
  },
  "İzmir": {
    districts: ["Konak", "Karşıyaka", "Çeşme", "Buca"],
    routes: [
      { title: "Merkez Rota", stops: ["Kordon", "Saat Kulesi", "Kemeraltı"] },
      { title: "Ege Kaçamağı", stops: ["Alaçatı", "Çeşme", "Ilıca"] }
    ]
  },
  "Muğla": {
    districts: ["Bodrum", "Fethiye", "Marmaris", "Datça"],
    routes: [
      { title: "Koylar + Deniz", stops: ["Ölüdeniz", "Kelebekler Vadisi", "Saklıkent"] },
      { title: "Bodrum Günleri", stops: ["Bodrum Kalesi", "Marina", "Gümüşlük"] }
    ]
  },
  "Trabzon": {
    districts: ["Ortahisar", "Maçka", "Çaykara", "Akçaabat"],
    routes: [
      { title: "Klasik Trabzon", stops: ["Sümela", "Maçka", "Uzungöl"] }
    ]
  },
  "Rize": {
    districts: ["Çamlıhemşin", "Rize", "Ardeşen", "Çayeli"],
    routes: [
      { title: "Yayla + Şelale", stops: ["Ayder", "Fırtına Vadisi", "Zil Kale"] }
    ]
  }
};

export function getItinerary(cityName) {
  return itineraries[cityName] || {
    districts: [],
    routes: [{ title: "Önerilen rota", stops: ["Şehir merkezi", "Yerel lezzetler", "Gün batımı noktası"] }]
  };
}

