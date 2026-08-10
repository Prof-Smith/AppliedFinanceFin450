# Sprint 2D IRR Plotly-Only Patch

Upload the extracted contents to the root of your GitHub repository and overwrite:

- modules/module1/irr.html

Why this patch exists:

The previous IRR page used an external `irr-engine.js` file plus a fallback SVG path. That made it hard to determine whether GitHub Pages or browser caching was still serving an older file. This patch makes the IRR page self-contained and Plotly-only.

What changed:

- Plotly CDN is loaded directly in the IRR page head.
- All IRR calculation and chart rendering logic is inline inside `irr.html`.
- No SVG fallback is used as the default.
- If Plotly does not load, the chart area explicitly states that Plotly did not load.
- This bypasses any stale `assets/js/irr-engine.js` cache issue.

After upload:

1. Open modules/module1/irr.html
2. Hard refresh:
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R

Expected result:

- IRR profile renders as an interactive Plotly chart.
- IRR vs. required return renders as an interactive Plotly bar chart.
- Project cash flows render as an interactive Plotly bar chart.
