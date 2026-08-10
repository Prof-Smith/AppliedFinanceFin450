# Sprint 2C Patch: NPV Studio

Upload the extracted contents of this ZIP to the root of your GitHub repository and overwrite existing files.

This patch adds a full Net Present Value Studio.

Files added or replaced:

- assets/js/plotly-safe-loader.js
- assets/js/charts-finance.js
- assets/js/npv-engine.js
- modules/module1/npv.html

What the NPV Studio includes:

- Initial investment input
- Discount rate input
- Five annual cash flow inputs
- Net present value calculation
- Profitability index
- Simple payback estimate
- Accept/reject recommendation badge
- Plotly cash flow profile
- Plotly NPV profile by discount rate
- Plotly sensitivity chart
- Analyst prompt
- Previous/next navigation

Important:

This page uses Plotly first and falls back to SVG only if Plotly fails to load.

After upload, hard refresh:

- Windows: Ctrl + F5
- Mac: Cmd + Shift + R

Then test:

- modules/module1/npv.html
