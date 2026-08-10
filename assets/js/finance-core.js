/* Applied Finance Lab: shared finance formulas for Sprint 2A. */
const FinanceCore = {
  toNumber(value, fallback = 0) {
    const n = Number(String(value).replace(/[$,%\s,]/g, ''));
    return Number.isFinite(n) ? n : fallback;
  },
  rateDecimal(percent) {
    return this.toNumber(percent, 0) / 100;
  },
  periods(years, compoundsPerYear = 1) {
    return Math.max(0, this.toNumber(years, 0) * Math.max(1, this.toNumber(compoundsPerYear, 1)));
  },
  periodicRate(annualRateDecimal, compoundsPerYear = 1) {
    const m = Math.max(1, this.toNumber(compoundsPerYear, 1));
    return annualRateDecimal / m;
  },
  discountFactor(rateDecimal, years, compoundsPerYear = 1) {
    const m = Math.max(1, this.toNumber(compoundsPerYear, 1));
    const n = this.periods(years, m);
    return 1 / Math.pow(1 + rateDecimal / m, n);
  },
  presentValue(futureValue, annualRateDecimal, years, compoundsPerYear = 1) {
    return this.toNumber(futureValue, 0) * this.discountFactor(annualRateDecimal, years, compoundsPerYear);
  },
  futureValue(presentValue, annualRateDecimal, years, compoundsPerYear = 1) {
    const m = Math.max(1, this.toNumber(compoundsPerYear, 1));
    const n = this.periods(years, m);
    return this.toNumber(presentValue, 0) * Math.pow(1 + annualRateDecimal / m, n);
  },
  ordinaryAnnuityPV(payment, annualRateDecimal, years, compoundsPerYear = 1) {
    const m = Math.max(1, this.toNumber(compoundsPerYear, 1));
    const r = annualRateDecimal / m;
    const n = this.periods(years, m);
    if (n === 0) return 0;
    if (Math.abs(r) < 1e-12) return this.toNumber(payment, 0) * n;
    return this.toNumber(payment, 0) * (1 - Math.pow(1 + r, -n)) / r;
  },
  ordinaryAnnuityFV(payment, annualRateDecimal, years, compoundsPerYear = 1) {
    const m = Math.max(1, this.toNumber(compoundsPerYear, 1));
    const r = annualRateDecimal / m;
    const n = this.periods(years, m);
    if (n === 0) return 0;
    if (Math.abs(r) < 1e-12) return this.toNumber(payment, 0) * n;
    return this.toNumber(payment, 0) * (Math.pow(1 + r, n) - 1) / r;
  },
  money(value) {
    return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:0 }).format(this.toNumber(value, 0));
  },
  money2(value) {
    return new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:2 }).format(this.toNumber(value, 0));
  },
  percent(value) {
    return new Intl.NumberFormat('en-US', { style:'percent', minimumFractionDigits:2, maximumFractionDigits:2 }).format(this.toNumber(value, 0));
  }
};
