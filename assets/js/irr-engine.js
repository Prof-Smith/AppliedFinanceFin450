/* Applied Finance Lab: IRR Studio visual hotfix. Plotly-first, direct rendering. */
function compactMoney(v){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Number(v)||0);} 
function fullMoney(v){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:2,maximumFractionDigits:2}).format(Number(v)||0);} 
function getIRRInputs(){
  const initial=-Math.abs(FinanceCore.toNumber(document.querySelector('#irr-initial')?.value,10000));
  const hurdleRate=FinanceCore.rateDecimal(document.querySelector('#irr-hurdle')?.value||9);
  const cashflows=[];
  for(let i=1;i<=5;i++){cashflows.push(FinanceCore.toNumber(document.querySelector(`#irr-cf-${i}`)?.value,0));}
  return{initial,hurdleRate,cashflows};
}
function npvAtRate(initial,cashflows,rate){return initial+cashflows.reduce((sum,cf,i)=>sum+cf/Math.pow(1+rate,i+1),0);}
function calcIRR(initial,cashflows){
  let low=-0.9999, high=10;
  let fLow=npvAtRate(initial,cashflows,low), fHigh=npvAtRate(initial,cashflows,high);
  let expansions=0;
  while(fLow*fHigh>0 && expansions<10){high*=2;fHigh=npvAtRate(initial,cashflows,high);expansions++;}
  if(fLow*fHigh>0)return NaN;
  for(let i=0;i<160;i++){
    const mid=(low+high)/2;
    const fMid=npvAtRate(initial,cashflows,mid);
    if(Math.abs(fMid)<1e-8)return mid;
    if(fLow*fMid<0){high=mid;fHigh=fMid;}else{low=mid;fLow=fMid;}
  }
  return (low+high)/2;
}
function hasNonNormalCashflows(data){
  const signs=[data.initial,...data.cashflows].filter(v=>v!==0).map(v=>v>0?1:-1);
  let changes=0;
  for(let i=1;i<signs.length;i++){if(signs[i]!==signs[i-1])changes++;}
  return changes>1;
}
function baseLayout(title,xTitle,yTitle,yExtras={}){
  return {
    title:{text:title,font:{size:18,color:'#0B3558'}},
    paper_bgcolor:'rgba(0,0,0,0)',
    plot_bgcolor:'rgba(0,0,0,0)',
    margin:{t:60,r:24,b:58,l:78},
    xaxis:{title:xTitle,gridcolor:'#E5E7EB',zerolinecolor:'#CBD5E1'},
    yaxis:{title:yTitle,gridcolor:'#E5E7EB',zerolinecolor:'#CBD5E1',...yExtras},
    font:{family:'Segoe UI, Arial, sans-serif',color:'#17212B'},
    showlegend:false
  };
}
function renderFallbackMessage(targetId, message){
  const target=document.getElementById(targetId);
  if(!target)return;
  target.innerHTML=`<div class="chart-fallback"><strong>Visualization fallback</strong><br>${message}</div>`;
}
async function plotIRRProfileDirect(data){
  const targetId='irr-profile-chart';
  const target=document.getElementById(targetId); if(!target)return;
  target.style.minHeight='430px';
  const xs=[], ys=[];
  const maxRate=Math.max(50,Math.ceil((Number.isFinite(data.irr)?data.irr:.2)*100+25));
  for(let r=0;r<=maxRate;r++){
    xs.push(r);
    ys.push(npvAtRate(data.initial,data.cashflows,r/100));
  }
  const traces=[{x:xs,y:ys,type:'scatter',mode:'lines',name:'NPV Profile',line:{width:4,color:'#0B3558'},hovertemplate:'Discount rate %{x}%<br>NPV %{y:$,.2f}<extra></extra>'}];
  const layout=baseLayout('IRR: Where NPV Crosses Zero','Discount Rate (%)','NPV',{tickprefix:'$'});
  layout.shapes=[{type:'line',x0:0,x1:maxRate,y0:0,y1:0,line:{color:'#EB5757',width:2,dash:'dash'}}];
  if(Number.isFinite(data.irr)){
    layout.shapes.push({type:'line',x0:data.irr*100,x1:data.irr*100,y0:Math.min(...ys),y1:Math.max(...ys),line:{color:'#27AE60',width:2,dash:'dot'}});
    layout.annotations=[{x:data.irr*100,y:0,text:`IRR ${(data.irr*100).toFixed(2)}%`,showarrow:true,arrowhead:2,ax:50,ay:-40,bgcolor:'#E9F8EF',bordercolor:'#27AE60'}];
  }
  try{await PlotlySafe.ready(); Plotly.react(targetId,traces,layout,{responsive:true,displayModeBar:true});}
  catch(e){console.error('IRR profile Plotly error:',e); renderFallbackMessage(targetId,'Plotly could not load for the IRR profile. Calculations are still available above.');}
}
async function plotIRRComparisonDirect(data){
  const targetId='irr-comparison-chart';
  const target=document.getElementById(targetId); if(!target)return;
  target.style.minHeight='360px';
  const irr=Number.isFinite(data.irr)?data.irr*100:0;
  const hurdle=data.hurdleRate*100;
  const labels=['IRR','Required Return'];
  const values=[irr,hurdle];
  const colors=[irr>=hurdle?'#27AE60':'#EB5757','#2F80ED'];
  const traces=[{x:labels,y:values,type:'bar',marker:{color:colors},hovertemplate:'%{x}<br>%{y:.2f}%<extra></extra>'}];
  const layout=baseLayout('IRR vs. Required Return','Metric','Percent',{ticksuffix:'%'});
  try{await PlotlySafe.ready(); Plotly.react(targetId,traces,layout,{responsive:true,displayModeBar:true});}
  catch(e){console.error('IRR comparison Plotly error:',e); renderFallbackMessage(targetId,'Plotly could not load for the IRR comparison chart.');}
}
async function plotIRRCashFlowsDirect(data){
  const targetId='irr-cashflow-chart';
  const target=document.getElementById(targetId); if(!target)return;
  target.style.minHeight='360px';
  const labels=['Initial',...data.cashflows.map((_,i)=>`Year ${i+1}`)];
  const values=[data.initial,...data.cashflows];
  const colors=values.map(v=>v<0?'#EB5757':'#27AE60');
  const traces=[{x:labels,y:values,type:'bar',marker:{color:colors},hovertemplate:'%{x}<br>Cash flow %{y:$,.2f}<extra></extra>'}];
  const layout=baseLayout('Project Cash Flows','Period','Cash Flow',{tickprefix:'$'});
  try{await PlotlySafe.ready(); Plotly.react(targetId,traces,layout,{responsive:true,displayModeBar:true});}
  catch(e){console.error('IRR cash flow Plotly error:',e); renderFallbackMessage(targetId,'Plotly could not load for the cash-flow chart.');}
}
function renderIRRStudio(){
  try{
    const data=getIRRInputs();
    const irr=calcIRR(data.initial,data.cashflows);
    data.irr=irr;
    const npv=npvAtRate(data.initial,data.cashflows,data.hurdleRate);
    const accept=Number.isFinite(irr)&&irr>data.hurdleRate;
    const nonNormal=hasNonNormalCashflows(data);
    const set=(id,val)=>{const el=document.querySelector(id);if(el)el.textContent=val;};
    set('#irr-result',Number.isFinite(irr)?(irr*100).toFixed(2)+'%':'No IRR');
    set('#irr-hurdle-result',(data.hurdleRate*100).toFixed(2)+'%');
    set('#irr-spread',Number.isFinite(irr)?((irr-data.hurdleRate)*100).toFixed(2)+' pts':'N/A');
    set('#irr-npv-at-hurdle',compactMoney(npv));
    const badge=document.querySelector('#irr-recommendation-badge');
    if(badge){badge.textContent=accept?'Accept':'Review';badge.style.background=accept?'#E9F8EF':'#FFF6DB';badge.style.color=accept?'#176B3A':'#7A5A00';}
    const warning=document.querySelector('#irr-warning');
    if(warning){warning.innerHTML=nonNormal?'<strong>Analyst warning:</strong> This cash-flow pattern has more than one sign change. IRR may be misleading or multiple IRRs may exist. Use NPV as the primary decision rule.':'<strong>Cash-flow pattern:</strong> This appears to be a conventional investment pattern. IRR is easier to interpret, but NPV remains the primary value-creation rule.';}
    const interp=document.querySelector('#irr-interpretation');
    if(interp){interp.innerHTML=Number.isFinite(irr)?`The project IRR is <strong>${(irr*100).toFixed(2)}%</strong>. The required return is <strong>${(data.hurdleRate*100).toFixed(2)}%</strong>. At the required return, the project NPV is <strong>${fullMoney(npv)}</strong>.`:`The model did not find a reliable IRR for this cash-flow pattern. Review the timing and signs of the cash flows, and rely on NPV for the decision.`;}
    plotIRRProfileDirect(data);
    plotIRRComparisonDirect(data);
    plotIRRCashFlowsDirect(data);
    if(typeof AFL!=='undefined')AFL.write({module1:Math.max(AFL.read().module1,68),currentSection:'irr'});
  }catch(e){console.error('IRR Studio error:',e);}
}
function wireIRRStudio(){
  document.querySelectorAll('[data-irr-input]').forEach(i=>{i.addEventListener('input',renderIRRStudio);i.addEventListener('change',renderIRRStudio);});
  const reset=document.querySelector('#reset-irr');
  if(reset)reset.addEventListener('click',()=>{
    document.querySelector('#irr-initial').value=10000;
    document.querySelector('#irr-hurdle').value=9;
    document.querySelector('#irr-cf-1').value=3000;
    document.querySelector('#irr-cf-2').value=4000;
    document.querySelector('#irr-cf-3').value=5000;
    document.querySelector('#irr-cf-4').value=2500;
    document.querySelector('#irr-cf-5').value=1500;
    renderIRRStudio();
  });
  setTimeout(renderIRRStudio,150);
}
document.addEventListener('DOMContentLoaded',wireIRRStudio);
window.addEventListener('load',renderIRRStudio);
