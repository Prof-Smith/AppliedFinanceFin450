/* Applied Finance Lab navigation helpers. Scoped repairs for Modules 1, 2, and 3. */
(function(){
  function norm(s){return (s||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function patchModule1(){
    if(!location.pathname.includes('/module1/')) return;
    const page=location.pathname.split('/').pop();
    if(page==='dcf-valuation.html'){
      document.querySelectorAll('.sidebar .card a.side-link').forEach(a=>{
        if(norm(a.textContent)==='dcf valuation') a.classList.add('active'); else a.classList.remove('active');
      });
    }
  }
  function patchModule2(){
    if(!location.pathname.includes('/module2/')) return;
    const page=location.pathname.split('/').pop();
    const map={'overview':'overview.html','wacc & capital structure':'wacc-overview.html','cost of debt & equity':'cost-capital.html','wacc build studio':'wacc-build.html','operating fcf studio':'operating-fcf.html','pro forma builder':'pro-forma-builder.html','mid-year dcf':'mid-year-dcf.html','sensitivity & roic':'sensitivity-roic.html','case challenge':'challenge.html'};
    const active={'overview.html':'overview','wacc-overview.html':'wacc & capital structure','cost-capital.html':'cost of debt & equity','wacc-build.html':'wacc build studio','operating-fcf.html':'operating fcf studio','pro-forma-builder.html':'pro forma builder','mid-year-dcf.html':'mid-year dcf','sensitivity-roic.html':'sensitivity & roic','challenge.html':'case challenge'};
    document.querySelectorAll('.sidebar .card a.side-link').forEach(a=>{const label=norm(a.textContent);if(map[label]){a.href=map[label];a.classList.remove('muted');}if(active[page]){if(label===active[page])a.classList.add('active');else a.classList.remove('active');}});
  }
  function patchModule3(){
    if(!location.pathname.includes('/module3/')) return;
    const page=location.pathname.split('/').pop();
    const map={'overview':'overview.html','financial statement import':'financial-statements.html','economic balance sheet':'economic-balance-sheet.html','sales & product transition':'sales-product-transition.html','operating cost drivers':'operating-cost-drivers.html'};
    const active={'overview.html':'overview','financial-statements.html':'financial statement import','economic-balance-sheet.html':'economic balance sheet','sales-product-transition.html':'sales & product transition','operating-cost-drivers.html':'operating cost drivers'};
    document.querySelectorAll('.sidebar .card a.side-link').forEach(a=>{const label=norm(a.textContent);if(map[label]){a.href=map[label];a.classList.remove('muted');}if(active[page]){if(label===active[page])a.classList.add('active');else a.classList.remove('active');}});
    document.querySelectorAll('a.btn').forEach(a=>{const text=norm(a.textContent);const href=a.getAttribute('href');if(page==='sales-product-transition.html'&&(href==='#'||text.includes('next build'))){a.href='operating-cost-drivers.html';a.textContent='Next: Operating Cost Drivers →';}if(page==='operating-cost-drivers.html'&&text.includes('previous')){a.href='sales-product-transition.html';a.textContent='← Previous: Sales & Product Transition';}});
  }
  function mobile(){const t=document.querySelector('[data-mobile-toggle]'),l=document.querySelector('.nav-links');if(t&&l&&!t.dataset.bound){t.dataset.bound='true';t.addEventListener('click',()=>l.classList.toggle('open'));}}
  function run(){patchModule1();patchModule2();patchModule3();mobile();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
