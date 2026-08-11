/* Module 3 integrated production helper */
(function(){
 const STORE='module3IntegratedState';
 const PROGRESS='appliedFinanceProgress';
 const pages={
  'overview.html':'Overview','financial-statements.html':'Financial Statement Import','economic-balance-sheet.html':'Economic Balance Sheet','sales-product-transition.html':'Sales & Product Transition','operating-cost-drivers.html':'Operating Cost Drivers','asset-intensity-reinvestment.html':'Asset Intensity & Reinvestment','roic-value-creation.html':'ROIC & Value Creation','valuation-cross-check.html':'Valuation Cross-Check','challenge.html':'Case Challenge'};
 const progressMap={'overview.html':5,'financial-statements.html':15,'economic-balance-sheet.html':25,'sales-product-transition.html':36,'operating-cost-drivers.html':48,'asset-intensity-reinvestment.html':60,'roic-value-creation.html':72,'valuation-cross-check.html':84,'challenge.html':96};
 function load(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch(e){return {}}}
 function save(section,data){const s=load();s[section]=Object.assign({},s[section]||{},data||{});s.updatedAt=new Date().toISOString();localStorage.setItem(STORE,JSON.stringify(s));return s}
 function read(section){return load()[section]||{}}
 function mark(complete){let p={};try{p=JSON.parse(localStorage.getItem(PROGRESS)||'{}')}catch(e){} const page=location.pathname.split('/').pop();p.module3=Math.max(Number(p.module3||0),complete?100:(progressMap[page]||0));p.currentSection=page.replace('.html','');p.updatedAt=new Date().toISOString();if(complete){p.artifacts=Object.assign({},p.artifacts||{},{module3:true});}localStorage.setItem(PROGRESS,JSON.stringify(p));if(window.AFL&&window.AFL.write){const patch={module3:p.module3,currentSection:p.currentSection};if(complete)patch.artifacts={module3:true};window.AFL.write(patch);}}
 function nav(){const page=location.pathname.split('/').pop();document.querySelectorAll('.sidebar .side-link').forEach(a=>{const label=a.textContent.trim();if(label===pages[page])a.classList.add('active');else a.classList.remove('active');}); mark(false);}
 function money(v){return '$'+Math.round(Number(v)||0).toLocaleString('en-US')+'M'}
 function price(v){return '$'+(Number(v)||0).toFixed(2)}
 function pct(v){return (Number(v)||0).toLocaleString('en-US',{style:'percent',minimumFractionDigits:2,maximumFractionDigits:2})}
 function mult(v){return (Number(v)||0).toFixed(2)+'x'}
 function n(id){const el=document.getElementById(id);return el?Number(el.value)||0:0}
 function v(id){const el=document.getElementById(id);return el?String(el.value||'').trim():''}
 function wire(selector,fn){document.querySelectorAll(selector).forEach(el=>{el.addEventListener('input',fn);el.addEventListener('change',fn);});}
 function inputTable(target,rows,years,prefix,cls){document.getElementById(target).innerHTML='<table class="input-table"><tr><th>Line Item</th>'+years.map(y=>'<th>'+y+'</th>').join('')+'</tr>'+rows.map(r=>'<tr><td>'+r[1]+'</td>'+years.map((y,i)=>'<td><input id="'+prefix+r[0]+'-'+y+'" type="number" value="'+r[i+2]+'" step="100" class="'+cls+'"></td>').join('')+'</tr>').join('')+'</table>';}
 function simpleInputTable(target,rows,cls){document.getElementById(target).innerHTML='<table class="input-table"><tr><th>Line Item</th><th>Value</th></tr>'+rows.map(r=>'<tr><td>'+r[1]+'</td><td><input id="'+r[0]+'" type="number" value="'+r[2]+'" step="100" class="'+cls+'"></td></tr>').join('')+'</table>';}
 function ratioTable(metrics,years){return '<table class="mini-table"><tr><th>Metric</th>'+years.map(y=>'<th>'+y+'</th>').join('')+'</tr>'+metrics.map(r=>'<tr><td>'+r[0]+'</td>'+r[1].map(x=>'<td>'+r[2](x)+'</td>').join('')+'</tr>').join('')+'</table>';}
 function sourcePanel(){return {source:v('data-source'),asOf:v('data-date'),confidence:v('data-confidence'),notes:v('data-notes')}}
 function setSourceDefaults(){ if(document.getElementById('data-source')&&!v('data-source')) document.getElementById('data-source').value='AbbVie annual report, investor release, or instructor-provided dataset'; if(document.getElementById('data-date')&&!v('data-date')) document.getElementById('data-date').value='Student update required'; }
 window.M3={load,save,read,mark,money,price,pct,mult,n,v,wire,inputTable,simpleInputTable,ratioTable,sourcePanel,setSourceDefaults};
 document.addEventListener('DOMContentLoaded',nav);
})();
