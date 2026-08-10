# Sprint 2D IRR Visual Failsafe Patch

Upload the extracted contents of this ZIP to the root of your GitHub repository and overwrite existing files.

Files replaced:

- assets/js/plotly-safe-loader.js
- assets/js/irr-engine.js
- modules/module1/irr.html

What this patch does differently:

- The IRR page now renders SVG charts immediately, so the visualization area should never be blank.
- If Plotly loads successfully, the SVG charts are automatically upgraded to interactive Plotly charts.
- Cache-busting query strings were added to the IRR page script tags.
- The page no longer depends on `charts-finance.js` for the IRR visuals.

After upload:

1. Open modules/module1/irr.html
2. Hard refresh:
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R

Expected behavior:

- You should immediately see charts in the IRR profile section.
- If Plotly loads, the charts become interactive.
- If Plotly does not load, the SVG charts remain visible.
