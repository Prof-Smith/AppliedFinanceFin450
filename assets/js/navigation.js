/* Applied Finance Lab global navigation patch.
   Adds DCF Valuation to every Module 1 sidebar and repairs next/previous links. */
(function(){
  function normalizeText(s){return (s||'').replace(/\s+/g,' ').trim().toLowerCase();}
  function makeLink(active){
    const a=document.createElement('a');
    a.className='side-link'+(active?' active':'');
    a.href='dcf-valuation.html';
    a.textContent='DCF Valuation';
    a.setAttribute('onclick',"markPageVisited('dcf-valuation')");
    return a;
  }
  function patchSidebar(){
    const sidebars=document.querySelectorAll('.sidebar .card');
    const isDcf=location.pathname.indexOf('dcf-valuation.html')!==-1;
    sidebars.forEach(card=>{
      const links=Array.from(card.querySelectorAll('a.side-link'));
      if(!links.length) return;
      const hasDcf=links.some(a=>normalizeText(a.textContent)==='dcf valuation'||a.getAttribute('href')==='dcf-valuation.html');
      if(hasDcf){
        links.forEach(a=>{
          if(normalizeText(a.textContent)==='dcf valuation'||a.getAttribute('href')==='dcf-valuation.html'){
            a.href='dcf-valuation.html';
            if(isDcf) a.classList.add('active'); else if(a.classList.contains('active') && !isDcf) a.classList.remove('active');
          }
        });
        return;
      }
      const ratio=links.find(a=>normalizeText(a.textContent)==='ratio analysis');
      const enterprise=links.find(a=>normalizeText(a.textContent)==='enterprise value');
      const dcf=makeLink(isDcf);
      if(ratio && ratio.parentNode){ ratio.insertAdjacentElement('afterend',dcf); }
      else if(enterprise && enterprise.parentNode){ enterprise.insertAdjacentElement('beforebegin',dcf); }
      else { card.appendChild(dcf); }
    });
  }
  function patchActiveState(){
    if(location.pathname.indexOf('dcf-valuation.html')===-1) return;
    document.querySelectorAll('.side-link.active').forEach(a=>{
      if(normalizeText(a.textContent)!=='dcf valuation') a.classList.remove('active');
    });
    document.querySelectorAll('.side-link').forEach(a=>{
      if(normalizeText(a.textContent)==='dcf valuation') a.classList.add('active');
    });
  }
  function patchFlowButtons(){
    const page=location.pathname.split('/').pop();
    document.querySelectorAll('a.btn').forEach(a=>{
      const text=normalizeText(a.textContent);
      if(page==='ratio-analysis.html' && a.getAttribute('href')==='enterprise-value.html'){
        a.href='dcf-valuation.html';
        a.textContent='Next: DCF Valuation →';
      }
      if(page==='enterprise-value.html' && a.getAttribute('href')==='ratio-analysis.html'){
        a.href='dcf-valuation.html';
        a.textContent='← Previous: DCF Valuation';
      }
      if(page==='dcf-valuation.html' && text.indexOf('previous')!==-1){
        a.href='ratio-analysis.html';
        a.textContent='← Previous: Ratio Analysis';
      }
      if(page==='dcf-valuation.html' && text.indexOf('next')!==-1){
        a.href='enterprise-value.html';
        a.textContent='Next: Enterprise Value →';
      }
    });
  }
  function mobileMenu(){
    const toggle=document.querySelector('[data-mobile-toggle]');
    const links=document.querySelector('.nav-links');
    if(toggle && links && !toggle.dataset.bound){
      toggle.dataset.bound='true';
      toggle.addEventListener('click',()=>links.classList.toggle('open'));
    }
  }
  function run(){patchSidebar();patchActiveState();patchFlowButtons();mobileMenu();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
})();
