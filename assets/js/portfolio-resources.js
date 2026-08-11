/* Portfolio and Resources integration helper */
(function(){
 const artifacts = [
  {module:1,key:'module1',title:'Microsoft Investment Review Memo',skill:'Foundational valuation and financial analysis',href:'../modules/module1/challenge.html'},
  {module:2,key:'module2',title:'Microsoft Pro Forma DCF Valuation Memo',skill:'WACC, FCF forecasting, DCF, sensitivity, ROIC',href:'../modules/module2/challenge.html'},
  {module:3,key:'module3',title:'AbbVie Company Analysis Memo',skill:'Financial statement diagnosis, ROIC, product transition, valuation cross-check',href:'../modules/module3/challenge.html'},
  {module:4,key:'module4',title:'SPY Option Pricing and Strategy Memo',skill:'Options, binomial pricing, Black-Scholes/Merton, volatility, quote verification',href:'../modules/module4/challenge.html'},
  {module:5,key:'module5',title:'Options Greeks Risk Management Note',skill:'Delta, gamma, theta, vega, rho, hedge interpretation',href:'#'},
  {module:6,key:'module6',title:'Real Options Strategic Flexibility Case',skill:'Growth, abandonment, staging, timing',href:'#'},
  {module:7,key:'module7',title:'Portfolio Construction Recommendation',skill:'Allocation, risk-return, efficient frontier, client communication',href:'#'},
  {module:8,key:'module8',title:'Event Study and Final Analyst Presentation',skill:'Abnormal returns, event interpretation, evidence storytelling',href:'#'}
 ];
 function read(k){try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}}
 function statusFor(a,p){if(a.module>4)return {text:'Coming Soon',cls:'soon'};if((p.artifacts&&p.artifacts[a.key])||Number(p[a.key]||0)>=100)return {text:'Complete',cls:'complete'};if(Number(p[a.key]||0)>0)return {text:'Started',cls:'started'};return {text:'Ready',cls:'ready'}}
 function pill(s){return '<span class="status-pill status-'+s.cls+'">'+s.text+'</span>'}
 function renderPortfolio(){const p=read('appliedFinanceProgress');const grid=document.querySelector('[data-artifact-grid]');if(grid){grid.innerHTML=artifacts.map(a=>{const s=statusFor(a,p);const ready=a.module<=4;return '<article class="artifact-card"><span class="module-tag">Module '+a.module+'</span><h3>'+a.title+'</h3><p>'+a.skill+'</p><div class="skill-list"><span class="skill-pill">Memo artifact</span><span class="skill-pill">Responsible stewardship</span></div><p>'+pill(s)+'</p><div class="artifact-actions">'+(ready?'<a class="btn btn-primary" href="'+a.href+'">Open Challenge</a>':'<span class="status-pill status-soon">Future build</span>')+'</div></article>'}).join('')}
 const table=document.querySelector('[data-portfolio-table]');if(table){table.innerHTML=artifacts.map(a=>{const s=statusFor(a,p);return '<tr><td>Module '+a.module+'</td><td>'+a.title+'</td><td>'+pill(s)+'</td><td>'+a.skill+'</td></tr>'}).join('')}
 const count=document.querySelector('[data-complete-count]');if(count){const completed=artifacts.filter(a=>statusFor(a,p).text==='Complete').length;count.textContent=completed+' of 8 artifacts complete locally'}
 }
 function renderResources(){document.querySelectorAll('[data-current-build]').forEach(el=>el.textContent='Modules 1-4 active, Modules 5-8 coming soon')}
 document.addEventListener('DOMContentLoaded',function(){renderPortfolio();renderResources();});
})();
