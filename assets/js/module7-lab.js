/* Module 7 helper */
(function(){
 const STORE='module7State'; const PROGRESS='appliedFinanceProgress';
 const labels={'overview.html':'Overview','deal-thesis-standalone.html':'Deal Thesis & Standalone Value','synergy-analysis.html':'Synergy Analysis','financing-structure.html':'Financing Structure','accretion-dilution.html':'Accretion / Dilution','debt-capacity.html':'Debt Capacity','restructuring-lab.html':'Restructuring Lab','challenge.html':'Case Challenge'};
 const progress={'overview.html':5,'deal-thesis-standalone.html':18,'synergy-analysis.html':32,'financing-structure.html':46,'accretion-dilution.html':60,'debt-capacity.html':72,'restructuring-lab.html':86,'challenge.html':96};
 function read(k){try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}}
 function write(k,v){localStorage.setItem(k,JSON.stringify(v))}
 function save(section,data){const s=read(STORE);s[section]=Object.assign({},s[section]||{},data||{});s.updatedAt=new Date().toISOString();write(STORE,s);return s}
 function mark(complete){let p=read(PROGRESS);const page=location.pathname.split('/').pop();p.module7=Math.max(Number(p.module7||0),complete?100:(progress[page]||0));p.currentSection=page.replace('.html','');if(complete)p.artifacts=Object.assign({},p.artifacts||{},{module7:true});write(PROGRESS,p)}
 function nav(){const page=location.pathname.split('/').pop();document.querySelectorAll('.sidebar .side-link').forEach(a=>{a.textContent.trim()===labels[page]?a.classList.add('active'):a.classList.remove('active')});mark(false)}
 function n(id){const el=document.getElementById(id);return el?Number(el.value)||0:0}
 function fmtMoney(v){return '$'+(Number(v)||0).toFixed(2)}
 function fmtPct(v){return (Number(v)||0).toLocaleString('en-US',{style:'percent',minimumFractionDigits:2,maximumFractionDigits:2})}
 function fmtNum(v){return (Number(v)||0).toFixed(2)}
 function wire(sel,fn){document.querySelectorAll(sel).forEach(el=>{el.addEventListener('input',fn);el.addEventListener('change',fn)})}
 window.M7={read,write,save,mark,n,fmtMoney,fmtPct,fmtNum,wire};
 document.addEventListener('DOMContentLoaded',nav);
})();
