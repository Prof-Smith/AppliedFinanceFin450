/* Applied Finance Lab navigation repair and Module 2 text-alignment enhancements.
   Module 1 DCF behavior is scoped only to Module 1.
   Module 2 now includes text alignment cards, model-validity notes, footer disclaimer, and all active links. */
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
        dcf=document.createElement('a'); dcf.className='side-link'; dcf.href='dcf-valuation.html'; dcf.textContent='DCF Valuation';
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
  function patchModule2Links(){
    if(!location.pathname.includes('/module2/')) return;
    const page=location.pathname.split('/').pop();
    const map={
      'overview':'overview.html',
      'wacc & capital structure':'wacc-overview.html',
      'cost of debt & equity':'cost-capital.html',
      'wacc build studio':'wacc-build.html',
      'operating fcf studio':'operating-fcf.html',
      'pro forma builder':'pro-forma-builder.html',
      'mid-year dcf':'mid-year-dcf.html',
      'sensitivity & roic':'sensitivity-roic.html',
      'case challenge':'challenge.html'
    };
    const activeMap={
      'overview.html':'overview','wacc-overview.html':'wacc & capital structure','cost-capital.html':'cost of debt & equity','wacc-build.html':'wacc build studio',
      'operating-fcf.html':'operating fcf studio','pro-forma-builder.html':'pro forma builder','mid-year-dcf.html':'mid-year dcf','sensitivity-roic.html':'sensitivity & roic','challenge.html':'case challenge'
    };
    document.querySelectorAll('.sidebar .card a.side-link').forEach(a=>{
      const label=norm(a.textContent);
      if(map[label]){ a.href=map[label]; a.classList.remove('muted'); }
      if(activeMap[page]){ if(label===activeMap[page]) a.classList.add('active'); else a.classList.remove('active'); }
    });
    document.querySelectorAll('a.btn').forEach(a=>{
      const text=norm(a.textContent);
      const href=a.getAttribute('href');
      if(page==='wacc-overview.html' && (href==='#'||text.includes('next build'))){a.href='cost-capital.html';a.textContent='Next: Cost of Debt & Equity →';}
      if(page==='cost-capital.html' && (href==='#'||text.includes('next build'))){a.href='wacc-build.html';a.textContent='Next: WACC Build Studio →';}
      if(page==='wacc-build.html' && (href==='#'||text.includes('next build'))){a.href='operating-fcf.html';a.textContent='Next: Operating FCF Studio →';}
      if(page==='operating-fcf.html' && (href==='#'||text.includes('next build'))){a.href='pro-forma-builder.html';a.textContent='Next: Pro Forma Builder →';}
      if(page==='pro-forma-builder.html' && (href==='#'||text.includes('next build'))){a.href='mid-year-dcf.html';a.textContent='Next: Mid-Year DCF →';}
      if(page==='mid-year-dcf.html' && (href==='#'||text.includes('next build'))){a.href='sensitivity-roic.html';a.textContent='Next: Sensitivity & ROIC →';}
      if(page==='sensitivity-roic.html' && (href==='#'||text.includes('next build'))){a.href='challenge.html';a.textContent='Next: Case Challenge →';}
      if(page==='challenge.html' && text.includes('previous')){a.href='sensitivity-roic.html';a.textContent='← Previous: Sensitivity & ROIC';}
    });
  }
  function cardHTML(kind){
    const notes={
      'wacc-overview.html':['Chapter 3 text connection','This page applies the Chapter 3 WACC framework: WACC is both a discount rate for operating free cash flows and a hurdle rate for projects with similar risk. It emphasizes market-value capital structure, net debt, and the treatment of negative net debt.'],
      'cost-capital.html':['Chapter 3 text connection','This page applies the Chapter 3 cost-of-capital methods: average cost of debt, rating-adjusted yield, CAPM, and the Gordon model. Students should defend method choice rather than report a rate mechanically.'],
      'wacc-build.html':['Chapter 3 text connection','This page combines market-value weights, cost of equity, cost of debt, and the corporate tax shield into WACC. The key modeling question is whether the discount rate is appropriate for operating FCF risk.'],
      'operating-fcf.html':['Chapter 4 text connection','This page applies the Chapter 4 operating FCF logic: eliminate financing effects, keep operating activities, examine investing activities carefully, and add back after-tax interest.'],
      'pro-forma-builder.html':['Chapter 4 text connection','This page applies the Chapter 4 pro forma approach: distinguish functional relationships from policy or judgment assumptions, project operating statements, and convert those statements into free cash flow.'],
      'mid-year-dcf.html':['Chapter 4 text connection','This page applies the Chapter 4 DCF template: discount explicit forecast FCFs, estimate terminal value, and compare end-year versus mid-year discounting conventions.'],
      'sensitivity-roic.html':['Chapter 4 text connection','This page applies the Chapter 4 sensitivity and ROIC material: stress-test WACC and long-term growth, and compare ROIC to WACC as a value-creation check.'],
      'challenge.html':['Syllabus and text connection','This case applies the Chapter 3 and Chapter 4 modeling sequence to a Microsoft-focused valuation memo while preserving the course requirement for case-based modeling, professional communication, and responsible stewardship.']
    };
    const page=location.pathname.split('/').pop();
    const n=notes[page]; if(!n) return '';
    return `<section class="card module2-text-connection" style="margin-bottom:22px"><span class="kicker">${n[0]}</span><h2>How this page aligns with the text</h2><p>${n[1]}</p></section>`;
  }
  function injectAlignmentCard(){
    if(!location.pathname.includes('/module2/')) return;
    if(document.querySelector('.module2-text-connection')) return;
    const panel=document.querySelector('.content-panel'); if(!panel) return;
    const html=cardHTML(); if(!html) return;
    panel.insertAdjacentHTML('afterbegin', html);
  }
  function injectModelWarnings(){
    if(!location.pathname.includes('/module2/')) return;
    const page=location.pathname.split('/').pop();
    if(!['mid-year-dcf.html','sensitivity-roic.html','challenge.html'].includes(page)) return;
    if(document.querySelector('.module2-model-warning')) return;
    const panel=document.querySelector('.content-panel'); if(!panel) return;
    const msg=page==='challenge.html' ? 'Default Microsoft values are teaching assumptions. Students should document source data, assumption dates, and any updates before interpreting the valuation.' : 'Watch for model fragility: WACC must exceed terminal growth, terminal value can dominate enterprise value, and small assumption changes can materially change implied price.';
    panel.insertAdjacentHTML('afterbegin', `<section class="card module2-model-warning" style="margin-bottom:22px"><span class="kicker">Model validity check</span><h2>Responsible valuation warning</h2><p>${msg}</p></section>`);
  }
  function injectFooterDisclaimer(){
    if(!location.pathname.includes('/module2/')) return;
    if(document.querySelector('.module2-disclaimer')) return;
    const main=document.querySelector('body'); if(!main) return;
    const div=document.createElement('div');
    div.className='module2-disclaimer';
    div.style.cssText='max-width:1180px;margin:32px auto;padding:16px 22px;color:#667085;font-size:.9rem;border-top:1px solid #E5E7EB';
    div.textContent='Educational use only: Module 2 valuations are classroom exercises and should not be interpreted as investment advice.';
    main.appendChild(div);
  }
  function mobile(){const t=document.querySelector('[data-mobile-toggle]'),l=document.querySelector('.nav-links'); if(t&&l&&!t.dataset.bound){t.dataset.bound='true';t.addEventListener('click',()=>l.classList.toggle('open'));}}
  function run(){patchModule1();patchModule2Links();injectAlignmentCard();injectModelWarnings();injectFooterDisclaimer();mobile();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
})();
