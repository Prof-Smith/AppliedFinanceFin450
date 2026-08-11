/* Module 5 helper */
(function(){
 const STORE='module5State'; const PROGRESS='appliedFinanceProgress';
 const labels={'overview.html':'Overview','greeks-dashboard.html':'Greeks Dashboard','delta-gamma.html':'Delta & Gamma','theta-vega.html':'Theta & Vega','rho-rates.html':'Rho & Rates','scenario-lab.html':'Scenario Risk Lab','hedging-lab.html':'Hedging Lab','challenge.html':'Case Challenge'};
 const progress={'overview.html':5,'greeks-dashboard.html':18,'delta-gamma.html':32,'theta-vega.html':46,'rho-rates.html':58,'scenario-lab.html':72,'hedging-lab.html':86,'challenge.html':96};
 function read(k){try{return JSON.parse(localStorage.getItem(k)||'{}')}catch(e){return {}}}
 function write(k,v){localStorage.setItem(k,JSON.stringify(v))}
 function save(section,data){const s=read(STORE);s[section]=Object.assign({},s[section]||{},data||{});s.updatedAt=new Date().toISOString();write(STORE,s);return s}
 function mark(complete){let p=read(PROGRESS);const page=location.pathname.split('/').pop();p.module5=Math.max(Number(p.module5||0),complete?100:(progress[page]||0));p.currentSection=page.replace('.html','');if(complete)p.artifacts=Object.assign({},p.artifacts||{},{module5:true});write(PROGRESS,p)}
 function nav(){const page=location.pathname.split('/').pop();document.querySelectorAll('.sidebar .side-link').forEach(a=>{a.textContent.trim()===labels[page]?a.classList.add('active'):a.classList.remove('active')});mark(false)}
 function n(id){const el=document.getElementById(id);return el?Number(el.value)||0:0}
 function fmtMoney(v){return '$'+(Number(v)||0).toFixed(2)}
 function fmtPct(v){return (Number(v)||0).toLocaleString('en-US',{style:'percent',minimumFractionDigits:2,maximumFractionDigits:2})}
 function fmtNum(v){return (Number(v)||0).toFixed(4)}
 function erf(x){const sign=x>=0?1:-1;x=Math.abs(x);const a1=0.254829592,a2=-0.284496736,a3=1.421413741,a4=-1.453152027,a5=1.061405429,p=0.3275911;const t=1/(1+p*x);const y=1-(((((a5*t+a4)*t)+a3)*t+a2)*t+a1)*t*Math.exp(-x*x);return sign*y}
 function N(x){return 0.5*(1+erf(x/Math.SQRT2))}
 function pdf(x){return Math.exp(-0.5*x*x)/Math.sqrt(2*Math.PI)}
 function bsGreeks(S,X,T,r,sigma,q,type){S=Math.max(.000001,S);X=Math.max(.000001,X);T=Math.max(.000001,T);sigma=Math.max(.000001,sigma);const sqrtT=Math.sqrt(T);const d1=(Math.log(S/X)+(r-q+.5*sigma*sigma)*T)/(sigma*sqrtT);const d2=d1-sigma*sqrtT;const discR=Math.exp(-r*T),discQ=Math.exp(-q*T);const call=S*discQ*N(d1)-X*discR*N(d2);const put=X*discR*N(-d2)-S*discQ*N(-d1);const deltaCall=discQ*N(d1);const deltaPut=discQ*(N(d1)-1);const gamma=discQ*pdf(d1)/(S*sigma*sqrtT);const vega=S*discQ*pdf(d1)*sqrtT/100;const thetaCall=(-(S*discQ*pdf(d1)*sigma)/(2*sqrtT)-r*X*discR*N(d2)+q*S*discQ*N(d1))/365;const thetaPut=(-(S*discQ*pdf(d1)*sigma)/(2*sqrtT)+r*X*discR*N(-d2)-q*S*discQ*N(-d1))/365;const rhoCall=X*T*discR*N(d2)/100;const rhoPut=-X*T*discR*N(-d2)/100;return {d1,d2,call,put,delta:type==='Put'?deltaPut:deltaCall,gamma,vega,theta:type==='Put'?thetaPut:thetaCall,rho:type==='Put'?rhoPut:rhoCall,deltaCall,deltaPut,thetaCall,thetaPut,rhoCall,rhoPut}}
 function wire(sel,fn){document.querySelectorAll(sel).forEach(el=>{el.addEventListener('input',fn);el.addEventListener('change',fn)})}
 window.M5={read,write,save,mark,n,fmtMoney,fmtPct,fmtNum,bsGreeks,wire};
 document.addEventListener('DOMContentLoaded',nav);
})();
