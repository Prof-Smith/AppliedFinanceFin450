# Sprint 2B Display and Chart Fix

Upload the extracted contents of this ZIP to the root of your GitHub repository and overwrite existing files.

This patch replaces:

- assets/css/dashboard.css
- assets/js/charts-finance.js
- assets/js/pv-engine.js
- assets/js/fv-engine.js

Fixes:

- Metric numbers shrink slightly instead of wrapping awkwardly
- Metric text stays inside cards without line breaks inside dollar values
- FinanceCharts is now attached to window and also available as FinanceCharts
- PV and FV engines now call charts correctly
- Plotly chart containers have minimum heights

After upload, hard refresh:

- Windows: Ctrl + F5
- Mac: Cmd + Shift + R

Test:

- modules/module1/pv.html
- modules/module1/fv.html
- modules/module1/tvm.html
