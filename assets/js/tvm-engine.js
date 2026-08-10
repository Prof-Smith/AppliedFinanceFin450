/* Applied Finance Lab: TVM Studio interactions for Sprint 2A. */
function getTVMInputs() {
  const presentValue = FinanceCore.toNumber(document.querySelector('#tvm-present-value')?.value, 1000);
  const futureValue = FinanceCore.toNumber(document.querySelector('#tvm-future-value')?.value, 2000);
  const annualRate = FinanceCore.rateDecimal(document.querySelector('#tvm-rate')?.value || 8);
  const years = Math.max(1, FinanceCore.toNumber(document.querySelector('#tvm-years')?.value, 5));
  const compounds = Math.max(1, FinanceCore.toNumber(document.querySelector('#tvm-compounds')?.value, 1));
  const payment = FinanceCore.toNumber(document.querySelector('#tvm-payment')?.value, 250);
  return { presentValue, futureValue, rate: annualRate, years, compounds, payment };
}
function renderTVMStudio() {
  const data = getTVMInputs();
  const pvFromFV = FinanceCore.presentValue(data.futureValue, data.rate, data.years, data.compounds);
  const fvFromPV = FinanceCore.futureValue(data.presentValue, data.rate, data.years, data.compounds);
  const discountFactor = FinanceCore.discountFactor(data.rate, data.years, data.compounds);
  const annuityPV = FinanceCore.ordinaryAnnuityPV(data.payment, data.rate, data.years, data.compounds);
  const annuityFV = FinanceCore.ordinaryAnnuityFV(data.payment, data.rate, data.years, data.compounds);
  const opportunityCost = data.futureValue - pvFromFV;

  const set = (id, value) => { const el = document.querySelector(id); if (el) el.textContent = value; };
  set('#result-pv', FinanceCore.money2(pvFromFV));
  set('#result-fv', FinanceCore.money2(fvFromPV));
  set('#result-df', discountFactor.toFixed(4));
  set('#result-annuity-pv', FinanceCore.money2(annuityPV));
  set('#result-annuity-fv', FinanceCore.money2(annuityFV));
  set('#result-opportunity-cost', FinanceCore.money2(opportunityCost));

  const interpretation = document.querySelector('#tvm-interpretation');
  if (interpretation) {
    interpretation.innerHTML = `At an annual rate of <strong>${FinanceCore.percent(data.rate)}</strong>, ${FinanceCore.money2(data.futureValue)} received in <strong>${data.years}</strong> years is worth <strong>${FinanceCore.money2(pvFromFV)}</strong> today. The difference, <strong>${FinanceCore.money2(opportunityCost)}</strong>, is the economic cost of waiting under these assumptions.`;
  }

  FinanceCharts.plotTVMTimeline('tvm-timeline-chart', data);
  FinanceCharts.plotDiscountFactors('discount-factor-chart', data);

  if (typeof AFL !== 'undefined') {
    AFL.write({ module1: Math.max(AFL.read().module1, 32), currentSection: 'tvm' });
  }
}
function wireTVMStudio() {
  document.querySelectorAll('[data-tvm-input]').forEach(input => {
    input.addEventListener('input', renderTVMStudio);
    input.addEventListener('change', renderTVMStudio);
  });
  const reset = document.querySelector('#reset-tvm');
  if (reset) {
    reset.addEventListener('click', () => {
      document.querySelector('#tvm-present-value').value = 1000;
      document.querySelector('#tvm-future-value').value = 2000;
      document.querySelector('#tvm-rate').value = 8;
      document.querySelector('#tvm-years').value = 5;
      document.querySelector('#tvm-compounds').value = 1;
      document.querySelector('#tvm-payment').value = 250;
      renderTVMStudio();
    });
  }
  renderTVMStudio();
}
document.addEventListener('DOMContentLoaded', wireTVMStudio);
