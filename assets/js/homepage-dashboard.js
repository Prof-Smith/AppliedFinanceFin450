/* Landing page dashboard status refresh with Modules 1-5 active. */
(function(){
 function read(key){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch(e){return {}}}
 function write(key,val){localStorage.setItem(key,JSON.stringify(val))}
 function normalizeProgress(){const p=read('appliedFinanceProgress');const m3=read('module3IntegratedState');const m4=read('module4State');const m5=read('module5State');const complete3=(Number(p.module3||0)>=100)||Boolean(p.artifacts&&p.artifacts.module3)||Boolean(m3.challenge);const complete4=(Number(p.module4||0)>=100)||Boolean(p.artifacts&&p.artifacts.module4)||Boolean(m4.caseChallenge&&m4.caseChallenge.spyWorkflow);const complete5=(Number(p.module5||0)>=100)||Boolean(p.artifacts&&p.artifacts.module5)||Boolean(m5.challenge);if(complete3){p.module3=100;p.artifacts=Object.assign({},p.artifacts||{},{module3:true});}if(complete4){p.module4=100;p.artifacts=Object.assign({},p.artifacts||{},{module4:true});}if(complete5){p.module5=100;p.artifacts=Object.assign({},p.artifacts||{},{module5:true});}write('appliedFinanceProgress',p);return p;}
 function label(status){return '<span class="status-pill status-'+status.cls+'">'+status.text+'</span>'}
 function moduleStatus(moduleNum,p){
   if(moduleNum<=5){const key='module'+moduleNum;const v=Number(p[key]||0);if(v>=100||(p.artifacts&&p.artifacts[key]))return {text:'Complete',cls:'complete'};if(v>0)return {text:'Started',cls:'started'};return {text:'Available',cls:'ready'};}
   return {text:'Coming Soon',cls:'soon'};
 }
 function update(){const p=normalizeProgress();document.querySelectorAll('[data-module-status]').forEach(el=>{const n=Number(el.getAttribute('data-module-status'));el.innerHTML=label(moduleStatus(n,p));});document.querySelectorAll('[data-module-progress]').forEach(el=>{const n=Number(el.getAttribute('data-module-progress'));let text='Not yet built';if(n===1)text='10 sections';if(n===2)text='9 sections';if(n===3)text='9 sections';if(n===4)text='9 sections';if(n===5)text='8 sections';el.textContent=text;});document.querySelectorAll('[data-module-artifact]').forEach(el=>{const n=Number(el.getAttribute('data-module-artifact'));const map={1:'Microsoft Investment Review',2:'Microsoft Pro Forma DCF Memo',3:'AbbVie Company Analysis Memo',4:'SPY Option Pricing Memo',5:'SPY Greeks Risk Note',6:'Real Options Case',7:'Deal Recommendation Memo',8:'Market Reaction Briefing'};el.textContent=map[n]||'Artifact';});}
 document.addEventListener('DOMContentLoaded',update);
})();
