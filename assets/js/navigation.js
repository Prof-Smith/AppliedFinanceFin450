/* Applied Finance Lab navigation repair.
   Module 1 DCF behavior is scoped only to Module 1.
   Module 2 links are activated as pages are added. */
(function(){
  function norm(s){return (s||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function patchModule1(){
    if(!location.pathname.includes('/module1/')) return;
    const isDcf=location.pathname.includes('dcf-valuation.html');
    document.querySelectorAll('.sidebar .card').forEach(card=>{
      const links=[...card.querySelectorAll('a.side-link')];
      if(!links.length) return;
      let dcf=links.find(a=>norm(a.textContent)==='dcf valuation'||a.getAttribute('href')==='dcf-valuation.html');
      if(!dcf){
        dcf=document.createElement('a');
        dcf.className='side-link';
        dcf.href='dcf-valuation.html';
        dcf.textContent='DCF Valuation';
        dcf.setAttribute('onclick',"markPageVisited('dcf-valuation')");
        const ratio=links.find(a=>norm(a.textContent)==='ratio analysis');
        const enterprise=links.find(a=>norm(a.textContent)==='enterprise value');
        if(ratio) ratio.insertAdjacentElement('afterend',dcf);
        else if(enterprise) enterprise.insertAdjacentElement('beforebegin',dcf);
        else card.appendChild(dcf);
      }
      if(isDcf){ links.forEach(a=>a.classList.remove('active')); dcf.classList.add('active'); }
    });
  }
  function patchModule2(){
    if(!location.pathname.includes('/module2/')) return;
    const page=location.pathname.split('/').pop();
    const map={
      'wacc build studio':'wacc-build.html',
      'operating fcf studio':'operating-fcf.html',
      'pro forma builder':'pro-forma-builder.html',
      'mid-year dcf':'mid-year-dcf.html',
      'sensitivity & roic':'sensitivity-roic.html',
      'case challenge':'challenge.html'
    };
    document.querySelectorAll('.sidebar .card a.side-link').forEach(a=>{
      const label=norm(a.textContent);
      if(map[label]){ a.href=map[label]; a.classList.remove('muted'); }
      if(page==='overview.html' && label==='overview') a.classList.add('active');
      if(page==='wacc-build.html' && label==='wacc build studio') a.classList.add('active');
      if(page==='operating-fcf.html' && label==='operating fcf studio') a.classList.add('active');
      if(page==='pro-forma-builder.html' && label==='pro forma builder') a.classList.add('active');
      if(page==='mid-year-dcf.html' && label==='mid-year dcf') a.classList.add('active');
      if(page==='sensitivity-roic.html' && label==='sensitivity & roic') a.classList.add('active');
      if(page==='challenge.html' && label==='case challenge') a.classList.add('active');
      if(page==='challenge.html' && label!=='case challenge') a.classList.remove('active');
      if(page==='sensitivity-roic.html' && label!=='sensitivity & roic') a.classList.remove('active');
      if(page==='mid-year-dcf.html' && label!=='mid-year dcf') a.classList.remove('active');
      if(page==='pro-forma-builder.html' && label!=='pro forma builder') a.classList.remove('active');
      if(page==='operating-fcf.html' && label!=='operating fcf studio') a.classList.remove('active');
      if(page==='wacc-build.html' && label!=='wacc build studio') a.classList.remove('active');
    });
    document.querySelectorAll('a.btn').forEach(a=>{
      const text=norm(a.textContent);
      if(page==='cost-capital.html' && (a.getAttribute('href')==='#' || text.includes('next build'))){ a.href='wacc-build.html'; a.textContent='Next: WACC Build Studio →'; }
      if(page==='wacc-build.html' && (a.getAttribute('href')==='#' || text.includes('next build'))){ a.href='operating-fcf.html'; a.textContent='Next: Operating FCF Studio →'; }
      if(page==='operating-fcf.html' && (a.getAttribute('href')==='#' || text.includes('next build'))){ a.href='pro-forma-builder.html'; a.textContent='Next: Pro Forma Builder →'; }
      if(page==='pro-forma-builder.html' && (a.getAttribute('href')==='#' || text.includes('next build'))){ a.href='mid-year-dcf.html'; a.textContent='Next: Mid-Year DCF →'; }
      if(page==='mid-year-dcf.html' && (a.getAttribute('href')==='#' || text.includes('next build'))){ a.href='sensitivity-roic.html'; a.textContent='Next: Sensitivity & ROIC →'; }
      if(page==='sensitivity-roic.html' && (a.getAttribute('href')==='#' || text.includes('next build'))){ a.href='challenge.html'; a.textContent='Next: Case Challenge →'; }
      if(page==='challenge.html' && text.includes('previous')){ a.href='sensitivity-roic.html'; a.textContent='← Previous: Sensitivity & ROIC'; }
    });
  }
  function mobile(){
    const t=document.querySelector('[data-mobile-toggle]'), l=document.querySelector('.nav-links');
    if(t&&l&&!t.dataset.bound){ t.dataset.bound='true'; t.addEventListener('click',()=>l.classList.toggle('open')); }
  }
  function run(){patchModule1();patchModule2();mobile();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
})();
