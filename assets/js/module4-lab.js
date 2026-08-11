/* Module 4 starter helper */
(function(){
 const STORE='module4State';
 const PROGRESS='appliedFinanceProgress';
 const labels={'overview.html':'Overview','options-foundations.html':'Options Foundations','binomial-pricing.html':'Binomial Pricing','risk-neutral-pricing.html':'State Prices & Risk-Neutral Probability','multi-period-trees.html':'Multi-Period Trees','american-options.html':'American Options','black-scholes.html':'Black-Scholes/Merton','volatility-lab.html':'Volatility Lab','challenge.html':'Case Challenge'};
 const progress={'overview.html':5,'options-foundations.html':15,'binomial-pricing.html':28,'risk-neutral-pricing.html':40,'multi-period-trees.html':52,'american-options.html':64,'black-scholes.html':76,'volatility-lab.html':88,'challenge.html':96};
 function read(k){try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}}
 function write(k,v){localStorage.setItem(k,JSON.stringify(v))}
 function save(section,data){const s=read(STORE);s[section]=Object.assign({},s[section]||{},data||{});s.updatedAt=new Date().toISOString();write(STORE,s);return s}
 function mark(complete){let p=read(PROGRESS);const page=location.pathname.split('/').pop();p.module4=Math.max(Number(p.module4||0),complete?100:(progress[page]||0));p.currentSection=page.replace('.html','');if(complete)p.artifacts=Object.assign({},p.artifacts||{},{module4:true});write(PROGRESS,p);if(window.AFL&&window.AFL.write){const patch={module4:p.module4,currentSection:p.currentSection};if(complete)patch.artifacts={module4:true};window.AFL.write(patch);}}
 function nav(){const page=location.pathname.split('/').pop();document.querySelectorAll('.sidebar .side-link').forEach(a=>{a.textContent.trim()===labels[page]?a.classList.add('active'):a.classList.remove('active')});mark(false)}
 function n(id){const el=document.getElementById(id);return el?Number(el.value)||0:0}
 function pct(v){return (Number(v)||0).toLocaleString('en-US',{style:'percent',minimumFractionDigits:2,maximumFractionDigits:2})}
 function money(v){return '$'+(Number(v)||0).toFixed(2)}
 function wire(sel,fn){document.querySelectorAll(sel).forEach(el=>{el.addEventListener('input',fn);el.addEventListener('change',fn)})}
 window.M4={read,write,save,mark,n,pct,money,wire};
 document.addEventListener('DOMContentLoaded',nav);
})();
