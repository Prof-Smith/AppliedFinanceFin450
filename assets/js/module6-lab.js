/* Module 6 helper */
(function(){
 const STORE='module6State'; const PROGRESS='appliedFinanceProgress';
 const labels={'overview.html':'Overview','npv-vs-flexibility.html':'NPV vs Flexibility','option-to-expand.html':'Option to Expand','option-to-abandon.html':'Option to Abandon','staged-investment.html':'Staged Investment','timing-option.html':'Timing Option','strategic-flexibility-lab.html':'Strategic Flexibility Lab','challenge.html':'Case Challenge'};
 const progress={'overview.html':5,'npv-vs-flexibility.html':18,'option-to-expand.html':32,'option-to-abandon.html':46,'staged-investment.html':60,'timing-option.html':72,'strategic-flexibility-lab.html':86,'challenge.html':96};
 function read(k){try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}}
 function write(k,v){localStorage.setItem(k,JSON.stringify(v))}
 function save(section,data){const s=read(STORE);s[section]=Object.assign({},s[section]||{},data||{});s.updatedAt=new Date().toISOString();write(STORE,s);return s}
 function mark(complete){let p=read(PROGRESS);const page=location.pathname.split('/').pop();p.module6=Math.max(Number(p.module6||0),complete?100:(progress[page]||0));p.currentSection=page.replace('.html','');if(complete)p.artifacts=Object.assign({},p.artifacts||{},{module6:true});write(PROGRESS,p)}
 function nav(){const page=location.pathname.split('/').pop();document.querySelectorAll('.sidebar .side-link').forEach(a=>{a.textContent.trim()===labels[page]?a.classList.add('active'):a.classList.remove('active')});mark(false)}
 function n(id){const el=document.getElementById(id);return el?Number(el.value)||0:0}
 function fmtMoney(v){return '$'+(Number(v)||0).toFixed(2)}
 function fmtPct(v){return (Number(v)||0).toLocaleString('en-US',{style:'percent',minimumFractionDigits:2,maximumFractionDigits:2})}
 function fmtNum(v){return (Number(v)||0).toFixed(3)}
 function erf(x){const sign=x>=0?1:-1;x=Math.abs(x);const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911;const t=1/(1+p*x);const y=1-(((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);return sign*y}
 function N(x){return 0.5*(1+erf(x/Math.SQRT2))}
 function bsCall(S,X,T,r,sigma){S=Math.max(.000001,S);X=Math.max(.000001,X);T=Math.max(.000001,T);sigma=Math.max(.000001,sigma);const d1=(Math.log(S/X)+(r+.5*sigma*sigma)*T)/(sigma*Math.sqrt(T));const d2=d1-sigma*Math.sqrt(T);return S*N(d1)-X*Math.exp(-r*T)*N(d2)}
 function bsPut(S,X,T,r,sigma){S=Math.max(.000001,S);X=Math.max(.000001,X);T=Math.max(.000001,T);sigma=Math.max(.000001,sigma);const d1=(Math.log(S/X)+(r+.5*sigma*sigma)*T)/(sigma*Math.sqrt(T));const d2=d1-sigma*Math.sqrt(T);return X*Math.exp(-r*T)*N(-d2)-S*N(-d1)}
 function npv(rate,cashflows){return cashflows.reduce((acc,cf,i)=>acc+cf/Math.pow(1+rate,i),0)}
 function wire(sel,fn){document.querySelectorAll(sel).forEach(el=>{el.addEventListener('input',fn);el.addEventListener('change',fn)})}
 window.M6={read,write,save,mark,n,fmtMoney,fmtPct,fmtNum,bsCall,bsPut,npv,wire};
 document.addEventListener('DOMContentLoaded',nav);
})();
