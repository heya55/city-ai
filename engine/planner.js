export function createPlan(city) {
  const plans = {
    İstanbul: [
      "Gün 1: Tarihi yarımada + Ayasofya",
      "Gün 2: Boğaz turu + Galata",
      "Gün 3: Kadıköy keşif + gece hayatı"
    ],
    Antalya: [
      "Gün 1: Deniz + plaj",
      "Gün 2: Kaleiçi gezisi",
      "Gün 3: Şelale + doğa"
    ],
    Rize: [
      "Gün 1: Yayla gezisi",
      "Gün 2: Şelale ve doğa yürüyüşü",
      "Gün 3: Köy hayatı deneyimi"
    ]
  };

  return plans[city] || ["Keşfet, gez, keyfini çıkar 🚀"];
}