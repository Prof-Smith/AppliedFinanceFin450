# Metric Card CSS Hotfix

Upload the extracted contents of this ZIP to the root of your GitHub repository.

This patch replaces:

- assets/css/dashboard.css

What it fixes:

- Large dollar values no longer bleed outside metric cards
- Metric cards now use responsive font sizing
- Metric cards now wrap safely when values are long
- Metric grids now respect narrow card widths
- Inputs and card grids are protected from forcing overflow

After upload, hard refresh the browser:

- Windows: Ctrl + F5
- Mac: Cmd + Shift + R

Then test:

- modules/module1/fv.html
- modules/module1/pv.html
- modules/module1/tvm.html
