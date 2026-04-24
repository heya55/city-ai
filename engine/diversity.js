export function diversityBoost(index, city) {
  // üst sıradaki şehirleri tekrar etmemesi için hafif ceza
  const rankPenalty = index * 0.8;

  // küçük rastgelelik → aynı sonuçların kilitlenmesini engeller
  const noise = Math.random() * 1.5;

  return noise - rankPenalty;
}