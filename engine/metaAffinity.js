function clamp(x, a, b) {
  return Math.max(a, Math.min(b, x));
}

/** Şehir vektöründen türetilen: ekonomi (yüksek=bütçe dostu), uzun kalış potansiyeli, mevsim esnekliği. */
export function deriveTripMeta(city) {
  const luks = city.luks ?? 5;
  const kesif = city.kesif ?? 5;
  const doga = city.doga ?? 5;
  const eglence = city.eglence ?? 5;
  const sosyal = city.sosyal ?? 5;
  const sakinlik = city.sakinlik ?? 5;

  const ekonomi = clamp(
    Math.round(10 - luks * 0.55 + (sosyal >= 8 ? 0.5 : 0) - (eglence >= 9 ? 1 : 0)),
    2,
    10
  );

  const uzunKalış = clamp(
    Math.round((kesif + doga + eglence) / 3 + (kesif >= 8 ? 1 : 0)),
    3,
    10
  );

  const mevsimEsnek = clamp(
    Math.round((doga + kesif + sakinlik) / 3 + (luks >= 8 ? 0.5 : 0)),
    4,
    10
  );

  return { ekonomi, uzunKalış, mevsimEsnek };
}

/**
 * Quiz'deki bütçe / süre / mevsim ile şehir uyumuna küçük bir ek katkı (0–~0.22).
 * Ana sinyal hâlâ 6 boyutlu kosinüs benzerliği.
 */
export function metaAffinity(profile, city) {
  const m = deriveTripMeta(city);
  const ub = Number(profile?.budget) || 2;
  const ud = Number(profile?.duration) || 2;
  const us = Number(profile?.season) || 2;

  let bonus = 0;

  if (ub <= 2) bonus += (m.ekonomi / 10) * 0.15;
  else if (ub >= 4) bonus += ((city.luks ?? 5) / 10) * 0.12;

  if (ud >= 3) bonus += (m.uzunKalış / 10) * 0.14;
  else bonus += ((10 - m.uzunKalış) / 10) * 0.06;

  if (us === 3) {
    bonus += (((city.doga ?? 5) + (city.eglence ?? 5)) / 20) * 0.08;
  } else {
    bonus += (m.mevsimEsnek / 10) * 0.07;
  }

  return Math.min(0.22, bonus);
}
