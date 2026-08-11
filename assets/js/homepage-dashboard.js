/* Landing page dashboard status repair with Module 4 available. */
(function(){
 function read(key){try{return JSON.parse(localStorage.getItem(key)||'{}')}catch(e){return {}}}
 function write(key,val){localStorage.setItem(key,JSON.stringify(val))}
 function statusFromProgress(){const p=read('appliedFinanceProgress');const m3=read('module3IntegratedState');const complete3=(Number(p.module3||0)>=100)||Boolean(p.artifacts&&p.artifacts.module3)||Boolean(m3.challenge)||p.currentSection==='challenge';if(complete3){p.module3=100;p.artifacts=Object.assign({},p.artifacts||{},{module3:true});write('appliedFinanceProgress',p);}return p;}
 function label(status){return '<span class="status-pill status-'+status.cls+'">'+status.text+'</span>'}
 function moduleStatus(moduleNum,p){
   if(moduleNum===1){const v=Number(p.module1||0);return v>=100?{text:'Complete',cls:'complete'}:{text:'Started',cls:'started'};}
   if(moduleNum===2){const v=Number(p.module2||0);return (v>=100||(p.artifacts&&p.artifacts.module2))?{text:'Complete',cls:'complete'}:{text:'Started',cls:'started'};}
   if(moduleNum===3){const v=Number(p.module3||0);return (v>=100||(p.artifacts&&p.artifacts.module3))?{text:'Complete',cls:'complete'}:{text:'Started',cls:'started'};}
   if(moduleNum===4){const v=Number(p.module4||0);return v>0?{text:'Started',cls:'started'}:{text:'Available',cls:'started'};}
   return {text:'Coming Soon',cls:'soon'};
 }
 function update(){const p=statusFromProgress();document.querySelectorAll('[data-module-status]').forEach(el=>{const n=Number(el.getAttribute('data-module-status'));el.innerHTML=label(moduleStatus(n,p));});document.querySelectorAll('[data-module-progress]').forEach(el=>{const n=Number(el.getAttribute('data-module-progress'));let text='Not yet built';if(n===1)text='10 sections';if(n===2)text='9 sections';if(n===3)text='9 sections';if(n===4)text='9 sections';el.textContent=text;});document.querySelectorAll('[data-module-artifact]').forEach(el=>{const n=Number(el.getAttribute('data-module-artifact'));const map={1:'Microsoft Investment Review',2:'Microsoft Pro Forma DCF Memo',3:'AbbVie Company Analysis Memo',4:'Option Pricing Memo',5:'Greeks Risk Note',6:'Real Options Case',7:'Portfolio Analysis',8:'Event Study'};el.textContent=map[n]||'Artifact';});}
 document.addEventListener('DOMContentLoaded',update);
})();
