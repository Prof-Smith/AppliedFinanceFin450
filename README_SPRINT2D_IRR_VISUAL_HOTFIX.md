# Sprint 2D IRR Visual Hotfix

Upload the extracted contents of this ZIP to the root of your GitHub repository and overwrite existing files.

This patch replaces:

- assets/js/plotly-safe-loader.js
- assets/js/irr-engine.js
- modules/module1/irr.html

What this hotfix does:

- Keeps Plotly as the chart engine.
- Removes the dependency on the shared `charts-finance.js` chain for the IRR page.
- Renders the IRR profile, IRR vs. hurdle chart, and cash-flow chart directly from `irr-engine.js`.
- Adds explicit minimum heights to the three IRR chart containers.
- Keeps the IRR calculations and warnings intact.

After upload, hard refresh:

- Windows: Ctrl + F5
- Mac: Cmd + Shift + R

Then test:

- modules/module1/irr.html
