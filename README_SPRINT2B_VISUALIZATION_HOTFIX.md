# Sprint 2B Visualization Hotfix

Upload these extracted files to the root of your repository and overwrite existing files.

This hotfix replaces:

- assets/js/charts-finance.js
- assets/js/pv-engine.js
- assets/js/fv-engine.js

What changed:

- More defensive Plotly rendering
- Visible fallback message if Plotly does not load
- `window.load` render call added
- `setTimeout` render call added to avoid early rendering before chart containers are ready
- Simplified Plotly configuration
- Console error reporting for easier debugging

After upload, hard refresh your browser:

- Windows: Ctrl + F5
- Mac: Cmd + Shift + R

Then test:

- modules/module1/pv.html
- modules/module1/fv.html
- modules/module1/tvm.html
