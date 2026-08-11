/* Sprint 4H navigation patch. Keeps Module 3 links active through Valuation Cross-Check. */
(function(){
  function norm(s){return (s||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function patchModule3(){
    if(!location.pathname.includes('/module3/')) return;
    const page=location.pathname.split('/').pop();
    const map={
      'overview':'overview.html',
      'financial statement import':'financial-statements.html',
      'economic balance sheet':'economic-balance-sheet.html',
      'sales & product transition':'sales-product-transition.html',
      'operating cost drivers':'operating-cost-drivers.html',
      'asset intensity & reinvestment':'asset-intensity-reinvestment.html',
      'roic & value creation':'roic-value-creation.html',
      'valuation cross-check':'valuation-cross-check.html'
    };
    const active={
      'overview.html':'overview',
      'financial-statements.html':'financial statement import',
      'economic-balance-sheet.html':'economic balance sheet',
      'sales-product-transition.html':'sales & product transition',
      'operating-cost-drivers.html':'operating cost drivers',
      'asset-intensity-reinvestment.html':'asset intensity & reinvestment',
      'roic-value-creation.html':'roic & value creation',
      'valuation-cross-check.html':'valuation cross-check'
    };
    document.querySelectorAll('.sidebar .card a.side-link').forEach(a=>{
      const label=norm(a.textContent);
      if(map[label]){a.href=map[label];a.classList.remove('muted');}
      if(active[page]){label===active[page]?a.classList.add('active'):a.classList.remove('active');}
    });
    document.querySelectorAll('a.btn').forEach(a=>{
      const text=norm(a.textContent), href=a.getAttribute('href');
      if(page==='roic-value-creation.html' && (href==='#'||text.includes('next'))){a.href='valuation-cross-check.html';a.textContent='Next: Valuation Cross-Check →';}
      if(page==='valuation-cross-check.html' && text.includes('previous')){a.href='roic-value-creation.html';a.textContent='← Previous: ROIC & Value Creation';}
    });
  }
  function mobile(){const t=document.querySelector('[data-mobile-toggle]'),l=document.querySelector('.nav-links');if(t&&l&&!t.dataset.bound){t.dataset.bound='true';t.addEventListener('click',()=>l.classList.toggle('open'));}}
  function run(){patchModule3();mobile();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
