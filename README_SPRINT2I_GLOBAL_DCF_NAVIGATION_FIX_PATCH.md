# Sprint 2I Global DCF Navigation Fix Patch

Upload the extracted contents to the root of your GitHub repository and overwrite:

- assets/js/navigation.js

Why this patch is needed:

The DCF Valuation page exists, and the overview page can show it, but the other Module 1 pages still have older static sidebars. When students click to another page, that page loads its own older sidebar and the DCF link disappears.

What this patch does:

- Adds DCF Valuation to every Module 1 sidebar at runtime.
- Inserts DCF Valuation between Ratio Analysis and Enterprise Value.
- Keeps DCF Valuation highlighted when students are on dcf-valuation.html.
- Updates flow buttons automatically:
  - Ratio Analysis now goes next to DCF Valuation.
  - DCF Valuation goes next to Enterprise Value.
  - Enterprise Value goes previous to DCF Valuation.
- Preserves simple mobile menu behavior.

After upload:

1. Open modules/module1/overview.html
2. Hard refresh:
   - Windows: Ctrl + F5
   - Mac: Cmd + Shift + R
3. Click through several pages.

Expected result:

DCF Valuation should remain visible in the sidebar on every Module 1 page.
