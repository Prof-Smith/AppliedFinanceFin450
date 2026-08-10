/* Applied Finance Lab navigation repair.
   - Module 1: keeps DCF Valuation visible only inside Module 1.
   - Module 2: activates WACC Build and Operating FCF after Sprint 3D. */
(function(){
  function norm(s){return (s||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function dcfLink(active){
    const a=document.createElement('a');
    a.className='side-link'+(active?' active':'');
    a.href='dcf-valuation.html';
    a.textContent='DCF Valuation';
    a.setAttribute('onclick',"markPageVisited('dcf-valuation')");
    return a;
  }
  function patchModule1Sidebar(){
    if(!location.pathname.includes('/module1/')) return;
    const isDcf=location.pathname.includes('dcf-valuation.html');
    document.querySelectorAll('.sidebar .card').forEach(card=>{
      const links=[...card.querySelectorAll('a.side-link')];
      if(!links.length)return;
      const existing=links.find(a=>norm(a.textContent)==='dcf valuation'||a.getAttribute('href')==='dcf-valuation.html');
      if(existing){existing.href='dcf-valuation.html';if(isDcf)existing.classList.add('active');return;}
      const ratio=links.find(a=>norm(a.textContent)==='ratio analysis');
      const enterprise=links.find(a=>norm(a.textContent)==='enterprise value');
      const link=dcfLink(isDcf);
      if(ratio)ratio.insertAdjacentElement('afterend',link);
      else if(enterprise)enterprise.insertAdjacentElement('beforebegin',link);
      else card.appendChild(link);
    });
  }
  function patchModule1Buttons(){
    if(!location.pathname.includes('/module1/')) return;
    const page=location.pathname.split('/').pop();
    document.querySelectorAll('a.btn').forEach(a=>{
      const text=norm(a.textContent);
      if(page==='ratio-analysis.html'&&a.getAttribute('href')==='enterprise-value.html'){a.href='dcf-valuation.html';a.textContent='Next: DCF Valuation →';}
      if(page==='enterprise-value.html'&&a.getAttribute('href')==='ratio-analysis.html'){a.href='dcf-valuation.html';a.textContent='← Previous: DCF Valuation';}
      if(page==='dcf-valuation.html'&&text.includes('previous')){a.href='ratio-analysis.html';a.textContent='← Previous: Ratio Analysis';}
      if(page==='dcf-valuation.html'&&text.includes('next')){a.href='enterprise-value.html';a.textContent='Next: Enterprise Value →';}
    });
  }
  function patchModule2Sidebar(){
    if(!location.pathname.includes('/module2/')) return;
    const page=location.pathname.split('/').pop();
    document.querySelectorAll('.sidebar .card a.side-link').forEach(a=>{
      const label=norm(a.textContent);
      if(label==='wacc build studio'){
        a.href='wacc-build.html';
        a.classList.remove('muted');
      }
      if(label==='operating fcf studio'){
        a.href='operating-fcf.html';
        a.classList.remove('muted');
      }
      if(page==='wacc-build.html' && label==='wacc build studio') a.classList.add('active');
      if(page==='operating-fcf.html' && label==='operating fcf studio') a.classList.add('active');
      if((page==='wacc-build.html' || page==='operating-fcf.html') && label!=='wacc build studio' && label!=='operating fcf studio') a.classList.remove('active');
    });
  }
  function patchModule2Buttons(){
    if(!location.pathname.includes('/module2/')) return;
    const page=location.pathname.split('/').pop();
    document.querySelectorAll('a.btn').forEach(a=>{
      const text=norm(a.textContent);
      if(page==='cost-capital.html' && (a.getAttribute('href')==='#' || text.includes('next build'))){
        a.href='wacc-build.html';
        a.textContent='Next: WACC Build Studio →';
      }
      if(page==='wacc-build.html' && text.includes('previous')){
        a.href='cost-capital.html';
        a.textContent='← Previous: Cost of Debt & Equity';
      }
      if(page==='wacc-build.html' && (a.getAttribute('href')==='#' || text.includes('next build'))){
        a.href='operating-fcf.html';
        a.textContent='Next: Operating FCF Studio →';
      }
      if(page==='operating-fcf.html' && text.includes('previous')){
        a.href='wacc-build.html';
        a.textContent='← Previous: WACC Build Studio';
      }
    });
  }
  function mobile(){const t=document.querySelector('[data-mobile-toggle]'),l=document.querySelector('.nav-links');if(t&&l&&!t.dataset.bound){t.dataset.bound='true';t.addEventListener('click',()=>l.classList.toggle('open'));}}
  function run(){patchModule1Sidebar();patchModule1Buttons();patchModule2Sidebar();patchModule2Buttons();mobile();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();
