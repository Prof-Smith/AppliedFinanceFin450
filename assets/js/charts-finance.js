/* Applied Finance Lab: Plotly chart helpers for Sprint 2B. */
const FinanceCharts = {
  plotTVMTimeline(targetId, data) {
    if (!window.Plotly) return;
    const years = [];
    const compounded = [];
    const discounted = [];
    const rate = data.rate;
    const m = data.compounds;
    for (let y = 0; y <= data.years; y++) {
      years.push(y);
      compounded.push(FinanceCore.futureValue(data.presentValue, rate, y, m));
      discounted.push(FinanceCore.presentValue(data.futureValue, rate, data.years - y, m));
    }
    Plotly.react(targetId, [
      { x: years, y: compounded, type: 'scatter', mode: 'lines+markers', name: 'Growth from PV', line: { width: 4 } },
      { x: years, y: discounted, type: 'scatter', mode: 'lines+markers', name: 'Discount path to FV', line: { width: 4, dash: 'dot' } }
    ], this.baseLayout('Time Value of Money Timeline', 'Year', 'Value', { tickprefix: '$', separatethousands: true }), { responsive: true, displayModeBar: false });
  },
  plotDiscountFactors(targetId, data) {
    if (!window.Plotly) return;
    const years = [];
    const factors = [];
    for (let y = 0; y <= data.years; y++) {
      years.push(y);
      factors.push(FinanceCore.discountFactor(data.rate, y, data.compounds));
    }
    const layout = this.baseLayout('Discount Factor by Year', 'Year', 'Discount Factor');
    layout.yaxis.range = [0, 1.05];
    Plotly.react(targetId, [{ x: years, y: factors, type: 'bar', name: 'Discount Factor', marker: { color: '#2F80ED' } }], layout, { responsive: true, displayModeBar: false });
  },
  plotPVDecline(targetId, data) {
    if (!window.Plotly) return;
    const years = [];
    const values = [];
    for (let y = 0; y <= data.years; y++) {
      years.push(y);
      values.push(FinanceCore.presentValue(data.futureValue, data.rate, y, data.compounds));
    }
    Plotly.react(targetId, [{
      x: years,
      y: values,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Present Value',
      fill: 'tozeroy',
      line: { width: 4, color: '#2F80ED' }
    }], this.baseLayout('Present Value Declines as Time Increases', 'Years Until Cash Flow', 'Present Value', { tickprefix: '$', separatethousands: true }), { responsive: true, displayModeBar: false });
  },
  plotFVGrowth(targetId, data) {
    if (!window.Plotly) return;
    const years = [];
    const values = [];
    for (let y = 0; y <= data.years; y++) {
      years.push(y);
      values.push(FinanceCore.futureValue(data.presentValue, data.rate, y, data.compounds));
    }
    Plotly.react(targetId, [{
      x: years,
      y: values,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Future Value',
      fill: 'tozeroy',
      line: { width: 4, color: '#27AE60' }
    }], this.baseLayout('Future Value Growth Through Compounding', 'Years Invested', 'Future Value', { tickprefix: '$', separatethousands: true }), { responsive: true, displayModeBar: false });
  },
  plotPVRateSensitivity(targetId, data) {
    if (!window.Plotly) return;
    const rates = [];
    const values = [];
    const maxRate = Math.max(20, Math.ceil((data.rate * 100) + 10));
    for (let r = 0; r <= maxRate; r += 1) {
      rates.push(r);
      values.push(FinanceCore.presentValue(data.futureValue, r / 100, data.years, data.compounds));
    }
    Plotly.react(targetId, [{ x: rates, y: values, type: 'scatter', mode: 'lines', line: { width: 4, color: '#0B3558' }, name: 'PV' }], this.baseLayout('Rate Sensitivity', 'Discount Rate (%)', 'Present Value', { tickprefix: '$', separatethousands: true }), { responsive: true, displayModeBar: false });
  },
  plotFVRateSensitivity(targetId, data) {
    if (!window.Plotly) return;
    const rates = [];
    const values = [];
    const maxRate = Math.max(20, Math.ceil((data.rate * 100) + 10));
    for (let r = 0; r <= maxRate; r += 1) {
      rates.push(r);
      values.push(FinanceCore.futureValue(data.presentValue, r / 100, data.years, data.compounds));
    }
    Plotly.react(targetId, [{ x: rates, y: values, type: 'scatter', mode: 'lines', line: { width: 4, color: '#0B3558' }, name: 'FV' }], this.baseLayout('Rate Sensitivity', 'Growth Rate (%)', 'Future Value', { tickprefix: '$', separatethousands: true }), { responsive: true, displayModeBar: false });
  },
  baseLayout(title, xTitle, yTitle, yExtras = {}) {
    return {
      title,
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 58, r: 18, b: 54, l: 72 },
      xaxis: { title: xTitle, gridcolor: '#E5E7EB' },
      yaxis: { title: yTitle, gridcolor: '#E5E7EB', ...yExtras },
      font: { family: 'Inter, Segoe UI, Arial, sans-serif', color: '#17212B' }
    };
  }
};
