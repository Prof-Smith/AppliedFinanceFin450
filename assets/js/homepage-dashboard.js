/* Homepage dashboard status refresh with Modules 1-8 active. */
(function(){
  const artifacts={1:'Microsoft Investment Review',2:'Microsoft Pro Forma DCF Memo',3:'AbbVie Company Analysis Memo',4:'SPY Option Pricing Memo',5:'SPY Greeks Risk Note',6:'Strategic Flexibility Memo',7:'Deal or Restructuring Recommendation Memo',8:'Market Reaction and Final Analyst Briefing'};
  const builds={1:'10 sections',2:'9 sections',3:'9 sections',4:'9 sections',5:'8 sections',6:'8 sections',7:'8 sections',8:'8 sections'};
  function read(key){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch(e){return {}}}
  function write(key,val){localStorage.setItem(key,JSON.stringify(val))}
  function normalizeProgress(){const p=read('appliedFinanceProgress');const moduleStores={3:'module3IntegratedState',4:'module4State',5:'module5State',6:'module6State',7:'module7State',8:'module8State'};Object.keys(moduleStores).forEach(k=>{const state=read(moduleStores[k]);const key='module'+k;const completed=Number(p[key]||0)>=100 || Boolean(p.artifacts&&p.artifacts[key]) || Boolean(state.challenge&&state.challenge.completed);if(completed){p[key]=100;p.artifacts=Object.assign({},p.artifacts||{}, {[key]:true});}});write('appliedFinanceProgress',p);return p}
  function pill(s){return '<span class="status-pill status-'+s.cls+'">'+s.text+'</span>'}
  function statusFor(n,p){const key='module'+n;const val=Number(p[key]||0);if(val>=100||(p.artifacts&&p.artifacts[key]))return {text:'Complete',cls:'complete'};if(val>0)return {text:'Started',cls:'started'};return {text:'Available',cls:'ready'};}
  function update(){const p=normalizeProgress();document.querySelectorAll('[data-module-status]').forEach(el=>{const n=Number(el.getAttribute('data-module-status'));el.innerHTML=pill(statusFor(n,p));});document.querySelectorAll('[data-module-progress]').forEach(el=>{const n=Number(el.getAttribute('data-module-progress'));el.textContent=builds[n]||'Available';});document.querySelectorAll('[data-module-artifact]').forEach(el=>{const n=Number(el.getAttribute('data-module-artifact'));el.textContent=artifacts[n]||'Portfolio artifact';});}
  document.addEventListener('DOMContentLoaded',update);
})();
