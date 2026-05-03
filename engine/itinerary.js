const itineraries = {
  "İstanbul": {
    districts: ["Sultanahmet", "Karaköy", "Galata", "Balat", "Kadıköy", "Beşiktaş", "Ortaköy"],
    routes: [
      { title: "Tarihi Yarımada", stops: ["Ayasofya", "Topkapı", "Sultanahmet Meydanı", "Kapalıçarşı"] },
      { title: "Boğaz Hattı", stops: ["Beşiktaş", "Ortaköy", "Bebek", "Emirgan"] },
      { title: "Anadolu Yakası", stops: ["Kadıköy", "Moda", "Üsküdar", "Kuzguncuk"] }
    ]
  },
  "Antalya": {
    districts: ["Kaleiçi", "Konyaaltı", "Lara", "Kaş", "Kemer", "Side"],
    routes: [
      { title: "Şehir + Sahil", stops: ["Kaleiçi", "Yat Limanı", "Konyaaltı", "Düden Şelalesi"] },
      { title: "Tarihi Rota", stops: ["Aspendos", "Perge", "Side Antik Kenti"] }
    ]
  },
  "İzmir": {
    districts: ["Konak", "Kordon", "Alsancak", "Alaçatı", "Çeşme", "Seferihisar"],
    routes: [
      { title: "Merkez Rota", stops: ["Kordon", "Saat Kulesi", "Kemeraltı"] },
      { title: "Ege Kaçamağı", stops: ["Alaçatı", "Çeşme", "Ilıca"] }
    ]
  },
  "Muğla": {
    districts: ["Bodrum", "Fethiye", "Marmaris", "Datça", "Akyaka"],
    routes: [
      { title: "Koylar + Deniz", stops: ["Ölüdeniz", "Kelebekler Vadisi", "Saklıkent"] },
      { title: "Bodrum Günleri", stops: ["Bodrum Kalesi", "Marina", "Gümüşlük"] }
    ]
  },
  "Trabzon": {
    districts: ["Ortahisar", "Uzungöl", "Maçka", "Sürmene"],
    routes: [
      { title: "Klasik Trabzon", stops: ["Sümela", "Maçka", "Uzungöl"] }
    ]
  },
  "Rize": {
    districts: ["Ayder", "Çamlıhemşin", "Fırtına Vadisi", "Çayeli"],
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

