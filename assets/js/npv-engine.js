/* Applied Finance Lab: NPV Studio. Sprint 2C. */
function compactMoney(v){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(v)||0);} 
function getNPVInputs(){
  const initial=-Math.abs(FinanceCore.toNumber(document.querySelector('#npv-initial')?.value,10000));
  const discountRate=FinanceCore.rateDecimal(document.querySelector('#npv-rate')?.value||9);
  const cashflows=[];
  for(let i=1;i<=5;i++){cashflows.push(FinanceCore.toNumber(document.querySelector(`#npv-cf-${i}`)?.value,0));}
  return {initial,discountRate,cashflows};
}
function calcNPV(data){return data.initial + data.cashflows.reduce((sum,cf,i)=>sum + cf/Math.pow(1+data.discountRate,i+1),0);}
function calcPI(data){const pvInflows=data.cashflows.reduce((sum,cf,i)=>sum+cf/Math.pow(1+data.discountRate,i+1),0);return Math.abs(data.initial)>0?pvInflows/Math.abs(data.initial):0;}
function calcPayback(data){let cumulative=data.initial; for(let i=0;i<data.cashflows.length;i++){const prev=cumulative; cumulative+=data.cashflows[i]; if(cumulative>=0){const needed=Math.abs(prev); const frac=data.cashflows[i]!==0?needed/data.cashflows[i]:0; return i+frac+1;}} return null;}
function renderNPVStudio(){try{const data=getNPVInputs(); const npv=calcNPV(data); const profitability=calcPI(data); const payback=calcPayback(data); const recommendation=npv>0?'Accept':'Reject'; const badge=document.querySelector('#npv-recommendation-badge'); if(badge){badge.textContent=recommendation; badge.style.background=npv>0?'#E9F8EF':'#FDECEC'; badge.style.color=npv>0?'#176B3A':'#9B1C1C';}
 const set=(id,val)=>{const el=document.querySelector(id); if(el)el.textContent=val;};
 set('#npv-result',compactMoney(npv)); set('#npv-profitability-index',profitability.toFixed(2)+'x'); set('#npv-payback',payback?payback.toFixed(2)+' yrs':'No payback'); set('#npv-wealth-created',compactMoney(npv));
 const interp=document.querySelector('#npv-interpretation'); if(interp){interp.innerHTML= npv>0 ? `At a discount rate of <strong>${FinanceCore.percent(data.discountRate)}</strong>, this project has an NPV of <strong>${FinanceCore.money2(npv)}</strong>. Under the NPV rule, the project is expected to create value and should be considered for acceptance.` : `At a discount rate of <strong>${FinanceCore.percent(data.discountRate)}</strong>, this project has an NPV of <strong>${FinanceCore.money2(npv)}</strong>. Under the NPV rule, the project is expected to destroy value and should be rejected or redesigned.`;}
 FinanceCharts.plotNPVCashFlows('npv-cashflow-chart',data); FinanceCharts.plotNPVProfile('npv-profile-chart',data); FinanceCharts.plotNPVSensitivity('npv-sensitivity-chart',data);
 if(typeof AFL!=='undefined')AFL.write({module1:Math.max(AFL.read().module1,58),currentSection:'npv'});
 }catch(e){console.error('NPV Studio error:',e);}}
function wireNPVStudio(){document.querySelectorAll('[data-npv-input]').forEach(i=>{i.addEventListener('input',renderNPVStudio);i.addEventListener('change',renderNPVStudio);});const reset=document.querySelector('#reset-npv'); if(reset)reset.addEventListener('click',()=>{document.querySelector('#npv-initial').value=10000;document.querySelector('#npv-rate').value=9;document.querySelector('#npv-cf-1').value=3000;document.querySelector('#npv-cf-2').value=4000;document.querySelector('#npv-cf-3').value=5000;document.querySelector('#npv-cf-4').value=2500;document.querySelector('#npv-cf-5').value=1500;renderNPVStudio();}); setTimeout(renderNPVStudio,100);}document.addEventListener('DOMContentLoaded',wireNPVStudio);window.addEventListener('load',renderNPVStudio);
