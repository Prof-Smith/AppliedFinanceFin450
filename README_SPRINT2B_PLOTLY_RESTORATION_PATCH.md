# Sprint 2B Plotly Restoration Patch

Upload the extracted contents of this ZIP to the root of your GitHub repository and overwrite existing files.

This patch restores Plotly as the primary chart engine and keeps SVG as a fallback.

Files replaced or added:

- assets/css/dashboard.css
- assets/js/plotly-safe-loader.js
- assets/js/charts-finance.js
- assets/js/pv-engine.js
- assets/js/fv-engine.js
- assets/js/tvm-engine.js

What this patch does:

1. Restores Plotly-first charts with hover tooltips, mode bar, and responsive rendering.
2. Dynamically loads Plotly if it is not already available.
3. Falls back to SVG only if Plotly truly fails to load.
4. Keeps card numbers on one line using compact dollar formatting in metric cards.
5. Preserves full precision values in the explanatory interpretation text.

Important:

If your PV/FV/TVM HTML pages already include the Plotly CDN script, this patch will work as-is. If any chart still does not render after a hard refresh, add this line immediately after `finance-core.js` and before `charts-finance.js` on the affected page:

<script src="../../assets/js/plotly-safe-loader.js"></script>

Then hard refresh:

- Windows: Ctrl + F5
- Mac: Cmd + Shift + R
