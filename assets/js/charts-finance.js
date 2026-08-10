/* Applied Finance Lab: robust Plotly chart helpers for Sprint 2B hotfix. */
const FinanceCharts = {
  hasPlotly(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return false;
    if (!window.Plotly) {
      target.innerHTML = '<div class="card"><h3>Visualization unavailable</h3><p>Plotly did not load. Check internet access or the Plotly CDN script on this page.</p></div>';
      return false;
    }
    return true;
  },

  safePlot(targetId, traces, layout) {
    const target = document.getElementById(targetId);
    if (!this.hasPlotly(targetId)) return;
    try {
      Plotly.newPlot(targetId, traces, layout, { responsive: true, displayModeBar: false });
    } catch (error) {
      console.error('Plotly chart error:', error);
      target.innerHTML = '<div class="card"><h3>Chart error</h3><p>The calculations are working, but the visualization could not render. Open the browser console for details.</p></div>';
    }
  },

  baseLayout(title, xTitle, yTitle, yExtras = {}) {
    return {
      title: { text: title, font: { size: 18, color: '#0B3558' } },
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 60, r: 24, b: 58, l: 78 },
      xaxis: { title: xTitle, gridcolor: '#E5E7EB', zerolinecolor: '#CBD5E1' },
      yaxis: { title: yTitle, gridcolor: '#E5E7EB', zerolinecolor: '#CBD5E1', ...yExtras },
      font: { family: 'Segoe UI, Arial, sans-serif', color: '#17212B' },
      showlegend: false
    };
  },

  plotTVMTimeline(targetId, data) {
    const years = [];
    const compounded = [];
    const discounted = [];
    const maxYears = Math.max(1, Math.round(data.years));

    for (let y = 0; y <= maxYears; y++) {
      years.push(y);
      compounded.push(FinanceCore.futureValue(data.presentValue, data.rate, y, data.compounds));
      discounted.push(FinanceCore.presentValue(data.futureValue, data.rate, maxYears - y, data.compounds));
    }

    this.safePlot(targetId, [
      { x: years, y: compounded, type: 'scatter', mode: 'lines+markers', name: 'Growth from PV', line: { width: 4, color: '#27AE60' }, marker: { size: 7 } },
      { x: years, y: discounted, type: 'scatter', mode: 'lines+markers', name: 'Discount path to FV', line: { width: 4, color: '#2F80ED', dash: 'dot' }, marker: { size: 7 } }
    ], {
      ...this.baseLayout('Time Value of Money Timeline', 'Year', 'Value', { tickprefix: '$' }),
      showlegend: true,
      legend: { orientation: 'h', y: -0.22 }
    });
  },

  plotDiscountFactors(targetId, data) {
    const years = [];
    const factors = [];
    const maxYears = Math.max(1, Math.round(data.years));

    for (let y = 0; y <= maxYears; y++) {
      years.push(y);
      factors.push(FinanceCore.discountFactor(data.rate, y, data.compounds));
    }

    const layout = this.baseLayout('Discount Factor by Year', 'Year', 'Discount Factor');
    layout.yaxis.range = [0, 1.05];

    this.safePlot(targetId, [
      { x: years, y: factors, type: 'bar', marker: { color: '#2F80ED' } }
    ], layout);
  },

  plotPVDecline(targetId, data) {
    const years = [];
    const values = [];
    const maxYears = Math.max(1, Math.round(data.years));

    for (let y = 0; y <= maxYears; y++) {
      years.push(y);
      values.push(FinanceCore.presentValue(data.futureValue, data.rate, y, data.compounds));
    }

    this.safePlot(targetId, [
      {
        x: years,
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        fill: 'tozeroy',
        line: { width: 4, color: '#2F80ED' },
        marker: { size: 7, color: '#0B3558' },
        name: 'Present Value'
      }
    ], this.baseLayout('Present Value Declines as Time Increases', 'Years Until Cash Flow', 'Present Value', { tickprefix: '$' }));
  },

  plotPVRateSensitivity(targetId, data) {
    const rates = [];
    const values = [];
    const currentRate = Math.max(0, data.rate * 100);
    const maxRate = Math.max(20, Math.ceil(currentRate + 10));

    for (let r = 0; r <= maxRate; r += 1) {
      rates.push(r);
      values.push(FinanceCore.presentValue(data.futureValue, r / 100, data.years, data.compounds));
    }

    this.safePlot(targetId, [
      { x: rates, y: values, type: 'scatter', mode: 'lines', line: { width: 4, color: '#0B3558' }, name: 'PV' }
    ], this.baseLayout('Discount Rate Sensitivity', 'Discount Rate (%)', 'Present Value', { tickprefix: '$' }));
  },

  plotFVGrowth(targetId, data) {
    const years = [];
    const values = [];
    const maxYears = Math.max(1, Math.round(data.years));

    for (let y = 0; y <= maxYears; y++) {
      years.push(y);
      values.push(FinanceCore.futureValue(data.presentValue, data.rate, y, data.compounds));
    }

    this.safePlot(targetId, [
      {
        x: years,
        y: values,
        type: 'scatter',
        mode: 'lines+markers',
        fill: 'tozeroy',
        line: { width: 4, color: '#27AE60' },
        marker: { size: 7, color: '#0B3558' },
        name: 'Future Value'
      }
    ], this.baseLayout('Future Value Growth Through Compounding', 'Years Invested', 'Future Value', { tickprefix: '$' }));
  },

  plotFVRateSensitivity(targetId, data) {
    const rates = [];
    const values = [];
    const currentRate = Math.max(0, data.rate * 100);
    const maxRate = Math.max(20, Math.ceil(currentRate + 10));

    for (let r = 0; r <= maxRate; r += 1) {
      rates.push(r);
      values.push(FinanceCore.futureValue(data.presentValue, r / 100, data.years, data.compounds));
    }

    this.safePlot(targetId, [
      { x: rates, y: values, type: 'scatter', mode: 'lines', line: { width: 4, color: '#0B3558' }, name: 'FV' }
    ], this.baseLayout('Growth Rate Sensitivity', 'Growth Rate (%)', 'Future Value', { tickprefix: '$' }));
  }
};
