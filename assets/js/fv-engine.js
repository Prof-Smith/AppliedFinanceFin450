/* Applied Finance Lab: Future Value Studio. Display/chart fix. */
function getFVInputs() {
  return {
    presentValue: FinanceCore.toNumber(document.querySelector('#fv-present-value')?.value, 10000),
    rate: FinanceCore.rateDecimal(document.querySelector('#fv-rate')?.value || 8),
    years: Math.max(1, FinanceCore.toNumber(document.querySelector('#fv-years')?.value, 5)),
    compounds: Math.max(1, FinanceCore.toNumber(document.querySelector('#fv-compounds')?.value, 1)),
    contribution: FinanceCore.toNumber(document.querySelector('#fv-contribution')?.value, 0)
  };
}
function renderFVStudio() {
  try {
    const data = getFVInputs();
    const lumpSumFV = FinanceCore.futureValue(data.presentValue, data.rate, data.years, data.compounds);
    const contributionFV = FinanceCore.ordinaryAnnuityFV(data.contribution, data.rate, data.years, data.compounds);
    const totalFV = lumpSumFV + contributionFV;
    const invested = data.presentValue + (data.contribution * data.years * data.compounds);
    const interestEarned = totalFV - invested;
    const growthMultiple = totalFV / Math.max(1, data.presentValue);
    const set = (id, value) => { const el = document.querySelector(id); if (el) el.textContent = value; };
    set('#fv-result', FinanceCore.money2(totalFV));
    set('#fv-lump-result', FinanceCore.money2(lumpSumFV));
    set('#fv-contribution-result', FinanceCore.money2(contributionFV));
    set('#fv-interest-earned', FinanceCore.money2(interestEarned));
    set('#fv-growth-multiple', growthMultiple.toFixed(2) + 'x');
    const interpretation = document.querySelector('#fv-interpretation');
    if (interpretation) {
      interpretation.innerHTML = `${FinanceCore.money2(data.presentValue)} invested for <strong>${data.years}</strong> years at <strong>${FinanceCore.percent(data.rate)}</strong> grows to <strong>${FinanceCore.money2(lumpSumFV)}</strong> before contributions. With periodic contributions included, the projected future value is <strong>${FinanceCore.money2(totalFV)}</strong>.`;
    }
    if (typeof FinanceCharts !== 'undefined') {
      FinanceCharts.plotFVGrowth('fv-growth-chart', data);
      FinanceCharts.plotFVRateSensitivity('fv-rate-chart', data);
    }
    if (typeof AFL !== 'undefined') AFL.write({ module1: Math.max(AFL.read().module1, 48), currentSection: 'fv' });
  } catch (error) { console.error('FV Studio error:', error); }
}
function wireFVStudio() {
  document.querySelectorAll('[data-fv-input]').forEach(input => {
    input.addEventListener('input', renderFVStudio);
    input.addEventListener('change', renderFVStudio);
  });
  const reset = document.querySelector('#reset-fv');
  if (reset) reset.addEventListener('click', () => {
    document.querySelector('#fv-present-value').value = 10000;
    document.querySelector('#fv-rate').value = 8;
    document.querySelector('#fv-years').value = 5;
    document.querySelector('#fv-compounds').value = 1;
    document.querySelector('#fv-contribution').value = 0;
    renderFVStudio();
  });
  setTimeout(renderFVStudio, 150);
}
document.addEventListener('DOMContentLoaded', wireFVStudio);
window.addEventListener('load', renderFVStudio);
