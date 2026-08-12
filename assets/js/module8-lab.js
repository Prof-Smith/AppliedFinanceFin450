/* Module 8 helper */
(function(){
 const STORE='module8State'; const PROGRESS='appliedFinanceProgress';
 const labels={'overview.html':'Overview','event-study-basics.html':'Event Study Basics','benchmark-model.html':'Benchmark Model','abnormal-returns.html':'Abnormal Returns','event-window-analysis.html':'Event Window Analysis','market-reaction-dashboard.html':'Market Reaction Dashboard','final-briefing-lab.html':'Final Briefing Lab','challenge.html':'Case Challenge'};
 const progress={'overview.html':5,'event-study-basics.html':18,'benchmark-model.html':32,'abnormal-returns.html':46,'event-window-analysis.html':60,'market-reaction-dashboard.html':76,'final-briefing-lab.html':90,'challenge.html':96};
 function read(k){try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}}
 function write(k,v){localStorage.setItem(k,JSON.stringify(v))}
 function save(section,data){const s=read(STORE);s[section]=Object.assign({},s[section]||{},data||{});s.updatedAt=new Date().toISOString();write(STORE,s);return s}
 function mark(complete){let p=read(PROGRESS);const page=location.pathname.split('/').pop();p.module8=Math.max(Number(p.module8||0),complete?100:(progress[page]||0));p.currentSection=page.replace('.html','');if(complete)p.artifacts=Object.assign({},p.artifacts||{},{module8:true});write(PROGRESS,p)}
 function nav(){const page=location.pathname.split('/').pop();document.querySelectorAll('.sidebar .side-link').forEach(a=>{a.textContent.trim()===labels[page]?a.classList.add('active'):a.classList.remove('active')});mark(false)}
 function n(id){const el=document.getElementById(id);return el?Number(el.value)||0:0}
 function fmtPct(v){return (Number(v)||0).toLocaleString('en-US',{style:'percent',minimumFractionDigits:2,maximumFractionDigits:2})}
 function fmtNum(v){return (Number(v)||0).toFixed(3)}
 function wire(sel,fn){document.querySelectorAll(sel).forEach(el=>{el.addEventListener('input',fn);el.addEventListener('change',fn)})}
 window.M8={read,write,save,mark,n,fmtPct,fmtNum,wire};
 document.addEventListener('DOMContentLoaded',nav);
})();
