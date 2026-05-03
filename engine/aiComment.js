import { normalizedStyleProfile, STYLE_KEYS } from "./normalizeProfile.js";

export function aiComment(profile, city) {
  const p = profile || {};
  const n = normalizedStyleProfile(p);
  const ranked = STYLE_KEYS.map(k => [k, n[k]]).sort((a, b) => b[1] - a[1]);
  const top = ranked[0]?.[0] || "kesif";
  const second = ranked[1]?.[0] || top;

  const label = {
    doga: "doğaya ve ferahlığa yakın duran",
    eglence: "tempolu ve eğlenceyi önemseyen",
    sakinlik: "dingin tempo ve rahatlama isteyen",
    kesif: "keşif ve görmeyi önceleyen",
    luks: "konfor ve kaliteyi önemseyen",
    sosyal: "insan enerjisi ve sosyal ortamları seven"
  };

  const b = Number(p.budget) || 0;
  const dur = Number(p.duration) || 0;

  const budgetLine =
    b <= 1
      ? "Maliyeti düşük tutmak istediğini görüyorum; günlük geziyi merkezi bölgeler ve yerel lokantalar üzerinden kurmak genelde daha kontrollü olur."
      : b >= 3
        ? "Konfor için biraz daha bütçe ayırabileceğini görüyorum; konaklama ve deneyim seçiminde kalite çıtasını yükseltmek tatili güçlendirir."
        : "Bütçede dengeli bir çizgi seçmişsin; hem çok şey görmek hem de sürdürülebilir harcama için günlük planı iki üç sabit durak üzerinden kurmak iyi çalışır.";

  const durationLine =
    dur <= 1
      ? "Kısa süren olduğu için tek bir güçlü tema seçip gerisi için küçük opsiyonlar bırakmak daha tatmin edici olabilir."
      : dur >= 3
        ? "Daha uzun kalış için ana şehre ek olarak çevreye bir iki çıkış eklemek çeşitlilik hissini tamamlayabilir."
        : "Mini tatil süren için ana başlıkları netleyip fazla yüklemeden ritmi kurmak önemli.";

  return [
    `${city}, senin özet profiline göre özellikle ${label[top] || label.kesif} bir tatil ritmine yaklaşıyorsun. İkinci planda gelen ${label[second] || label.kesif} tarafın ise seçimin tek bir şeye sıkışmasını engelliyor; böylece hem istediğin ana hissiyatı yakalarsın hem de denge korunur.`,
    `${budgetLine} ${durationLine}`,
    `Bu öneriyi yaparken sadece \"tek şehir çekilişi\" gibi düşünmedim; günlük tempoyu (kalabalık toleransı, gece–gündüz dengesi, lokasyon seçimi ve molaları) birlikte düşünerek bakmak daha doğru. İlk gün ana tema için güçlü bir durak seçip ikinci gün daha tamamlayıcı ve daha rahat bir gezi ile dengeli bir tatil çıkarabilirsin.`,
    `Son olarak küçük bir not: Hiçbir destinasyon yüzde yüz kusursuz değildir; önemli olan senin iki üç ana önceliğini güçlü şekilde karşılaması ve zayıf kalan başlıkta seni şaşırtmayacak kadar telafi rotası üretmesidir. Bu yüzden \"neden burası\" sorusunun cevabını hem güçlü yönleri hem de nasıl tamamlayacağını düşünerek birlikte kurduk.`
  ].join("\n\n");
}