import { normalizedStyleProfile, STYLE_KEYS } from "./normalizeProfile.js";

export function explain(profile, cities, cityName) {
  const city = cities[cityName];
  if (!city) return ["Şehir verisi bulunamadı."];

  const n = normalizedStyleProfile(profile);
  const reasons = [];

  const labels = {
    doga: "doğa ve ferah manzaralar",
    eglence: "tempolu eğlence ve aktivite çeşitliliği",
    sakinlik: "dingin tempo ve rahatlatıcı ortam",
    kesif: "tarih ve keşif odaklı geziler",
    luks: "konfor ve kaliteli deneyimler",
    sosyal: "sosyal ortamlara karışma ve insan enerjisi"
  };

  const rankedUser = STYLE_KEYS.map(k => [k, n[k]]).sort((a, b) => b[1] - a[1]);
  const topNeed = rankedUser[0];
  const secondNeed = rankedUser[1];

  for (const key of STYLE_KEYS) {
    const pu = n[key];
    const cv = city[key];
    if (typeof cv !== "number") continue;

    const diff = Math.abs(pu - cv);

    if (pu >= 7 && cv >= 7 && diff <= 2.5) {
      reasons.push(`✔ "${labels[key]}" konusunda güçlü bir örtüşme var: senin öncelin belirgin (~${pu.toFixed(1)}/10), ${cityName} profili de bu başlıkta yüksek (${cv}/10).`);
    } else if (pu >= 5 && cv >= 6 && diff <= 3) {
      reasons.push(`✔ "${labels[key]}" için uyum iyi görünüyor (~${pu.toFixed(1)}/10 kullanıcı profili; şehir ${cv}/10). Planlanabilir bir ana tema olarak seçilebilir.`);
    } else if (pu >= 7 && cv <= 5 && diff >= 3) {
      reasons.push(`• "${labels[key]}" senin için kritik görünüyor (~${pu.toFixed(1)}/10); ${cityName} bu başlıkta daha orta seviye (${cv}/10). Günlük rotayı bu ekseni güçlendirecek duraklarla tamamlarsan tatmin yükselir.`);
    }
  }

  if (topNeed && topNeed[1] >= 6) {
    reasons.push(`• Özet aksın: en çok öne çıkan ihtiyaç "${labels[topNeed[0]]}" (${topNeed[1].toFixed(1)}/10). İkinci sıra "${labels[secondNeed[0]]}" (${secondNeed[1].toFixed(1)}/10) ile dengeleniyor — öneri bu iki ekseni birlikte düşünerek oluşturuldu.`);
  }

  const b = Number(profile?.budget);
  if (b === 1) {
    reasons.push(`• Ekonomik çizgi seçtin (${b}/4); günlük geziyi merkezi bölgeler ve yerel lokantalar üzerinden kurmak maliyeti daha iyi kontrol eder.`);
  } else if (b >= 3) {
    reasons.push(`• Bütçe profilin daha rahat (${b}/4); ${cityName} içinde konaklama ve deneyim seçeneklerinde bir üst kalite seçeneği düşünmek daha az ödün gerektirir.`);
  }

  const d = Number(profile?.duration);
  if (d <= 1) {
    reasons.push(`• Süren kısa (${d}/4 ölçek); tek güçlü bir tema seçip fazla yüklemeden rota kurmak daha tatmin edici olabilir.`);
  } else if (d >= 3) {
    reasons.push(`• Süren uzun (${d}/4 ölçek); ana destinasyon çevresine günübirlik çıkışlar eklemek çeşitlilik hissini tamamlayabilir.`);
  }

  const s = Number(profile?.season);
  if (s >= 2) {
    reasons.push(`• Mevsim tercihini işaret ettin (${s}/3 ölçek); sıcaklık/kalabalık için molaları plana yazmak günlük konforu artırır.`);
  }

  return reasons.slice(0, 10);
}