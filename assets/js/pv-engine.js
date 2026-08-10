/* Applied Finance Lab: Present Value Studio. Display/chart fix. */
function getPVInputs() {
  return {
    futureValue: FinanceCore.toNumber(document.querySelector('#pv-future-value')?.value, 10000),
    rate: FinanceCore.rateDecimal(document.querySelector('#pv-rate')?.value || 8),
    years: Math.max(1, FinanceCore.toNumber(document.querySelector('#pv-years')?.value, 5)),
    compounds: Math.max(1, FinanceCore.toNumber(document.querySelector('#pv-compounds')?.value, 1))
  };
}
function renderPVStudio() {
  try {
    const data = getPVInputs();
    const pv = FinanceCore.presentValue(data.futureValue, data.rate, data.years, data.compounds);
    const discountFactor = FinanceCore.discountFactor(data.rate, data.years, data.compounds);
    const valueLost = data.futureValue - pv;
    const annualizedLoss = valueLost / data.years;
    const set = (id, value) => { const el = document.querySelector(id); if (el) el.textContent = value; };
    set('#pv-result', FinanceCore.money2(pv));
    set('#pv-discount-factor', discountFactor.toFixed(4));
    set('#pv-value-lost', FinanceCore.money2(valueLost));
    set('#pv-annualized-loss', FinanceCore.money2(annualizedLoss));
    const interpretation = document.querySelector('#pv-interpretation');
    if (interpretation) {
      interpretation.innerHTML = `${FinanceCore.money2(data.futureValue)} received in <strong>${data.years}</strong> years is worth <strong>${FinanceCore.money2(pv)}</strong> today when discounted at <strong>${FinanceCore.percent(data.rate)}</strong>. The model translates a future promise into today's decision value.`;
    }
    if (typeof FinanceCharts !== 'undefined') {
      FinanceCharts.plotPVDecline('pv-decline-chart', data);
      FinanceCharts.plotPVRateSensitivity('pv-rate-chart', data);
    }
    if (typeof AFL !== 'undefined') AFL.write({ module1: Math.max(AFL.read().module1, 40), currentSection: 'pv' });
  } catch (error) { console.error('PV Studio error:', error); }
}
function wirePVStudio() {
  document.querySelectorAll('[data-pv-input]').forEach(input => {
    input.addEventListener('input', renderPVStudio);
    input.addEventListener('change', renderPVStudio);
  });
  const reset = document.querySelector('#reset-pv');
  if (reset) reset.addEventListener('click', () => {
    document.querySelector('#pv-future-value').value = 10000;
    document.querySelector('#pv-rate').value = 8;
    document.querySelector('#pv-years').value = 5;
    document.querySelector('#pv-compounds').value = 1;
    renderPVStudio();
  });
  setTimeout(renderPVStudio, 150);
}
document.addEventListener('DOMContentLoaded', wirePVStudio);
window.addEventListener('load', renderPVStudio);
