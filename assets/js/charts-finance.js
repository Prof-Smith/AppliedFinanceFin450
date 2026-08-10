/* Applied Finance Lab: Plotly chart helpers for Sprint 2A. */
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
    const traces = [
      { x: years, y: compounded, type: 'scatter', mode: 'lines+markers', name: 'Growth from PV', line: { width: 4 } },
      { x: years, y: discounted, type: 'scatter', mode: 'lines+markers', name: 'Discount path to FV', line: { width: 4, dash: 'dot' } }
    ];
    const layout = {
      title: 'Time Value of Money Timeline',
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 58, r: 18, b: 54, l: 72 },
      xaxis: { title: 'Year', gridcolor: '#E5E7EB' },
      yaxis: { title: 'Value', gridcolor: '#E5E7EB', tickprefix: '$', separatethousands: true },
      legend: { orientation: 'h', y: -0.22 },
      font: { family: 'Inter, Segoe UI, Arial, sans-serif', color: '#17212B' }
    };
    Plotly.react(targetId, traces, layout, { responsive: true, displayModeBar: false });
  },
  plotDiscountFactors(targetId, data) {
    if (!window.Plotly) return;
    const years = [];
    const factors = [];
    for (let y = 0; y <= data.years; y++) {
      years.push(y);
      factors.push(FinanceCore.discountFactor(data.rate, y, data.compounds));
    }
    Plotly.react(targetId, [{ x: years, y: factors, type: 'bar', name: 'Discount Factor' }], {
      title: 'Discount Factor by Year',
      paper_bgcolor: 'rgba(0,0,0,0)',
      plot_bgcolor: 'rgba(0,0,0,0)',
      margin: { t: 58, r: 18, b: 54, l: 62 },
      xaxis: { title: 'Year', gridcolor: '#E5E7EB' },
      yaxis: { title: 'Discount Factor', gridcolor: '#E5E7EB', range: [0, 1.05] },
      font: { family: 'Inter, Segoe UI, Arial, sans-serif', color: '#17212B' }
    }, { responsive: true, displayModeBar: false });
  }
};
