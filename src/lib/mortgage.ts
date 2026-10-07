/** Monthly repayment for a fixed-rate loan (annual rate in %). */
export function monthlyPayment(principal: number, annualRate: number, years: number) {
  const n = years * 12;
  if (principal <= 0) return 0;
  if (annualRate === 0) return principal / n;
  const r = annualRate / 100 / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** Rough French notary fees: ~7.5 % for existing property, ~2.5 % for new builds (< 5 years). */
export function notaryFees(price: number, recentBuild: boolean) {
  return Math.round(price * (recentBuild ? 0.025 : 0.075));
}
