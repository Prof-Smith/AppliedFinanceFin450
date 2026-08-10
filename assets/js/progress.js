/* Homepage progress dashboard renderer.
   Keeps module status local, transparent, and classroom-safe. */
(function(){
  const MODULES = [
    {id:'module1', title:'Module 1', href:'modules/module1/overview.html', built:true, sections:10, artifact:'Microsoft Investment Review'},
    {id:'module2', title:'Module 2', href:'modules/module2/overview.html', built:true, sections:9, artifact:'Microsoft Pro Forma DCF Memo'},
    {id:'module3', title:'Module 3', href:'#', built:false, sections:0, artifact:'Company Analysis'},
    {id:'module4', title:'Module 4', href:'#', built:false, sections:0, artifact:'Black-Scholes Case'},
    {id:'module5', title:'Module 5', href:'#', built:false, sections:0, artifact:'Greeks Risk Note'},
    {id:'module6', title:'Module 6', href:'#', built:false, sections:0, artifact:'Real Options Case'},
    {id:'module7', title:'Module 7', href:'#', built:false, sections:0, artifact:'Portfolio Analysis'},
    {id:'module8', title:'Module 8', href:'#', built:false, sections:0, artifact:'Event Study'}
  ];
  function pct(v){ return Math.max(0, Math.min(100, Number(v || 0))); }
  function statusLabel(module, value){
    if(!module.built) return 'Coming Soon';
    if(value >= 100) return 'Complete';
    if(value > 0) return 'Started';
    return 'Available';
  }
  function statusClass(label){ return label.toLowerCase().replace(/\s+/g,'-'); }
  function artifactCount(p){ return Object.values(p.artifacts || {}).filter(Boolean).length; }
  function renderStats(p){
    const module1Sections = MODULES.find(m=>m.id==='module1').sections;
    const artifacts = artifactCount(p);
    const stats = document.querySelector('[data-afl-stats]');
    if(stats){
      stats.innerHTML = `<div class="stat-card"><b>8</b><span>Course Modules</span></div><div class="stat-card"><b>${artifacts}</b><span>Artifacts Completed</span></div><div class="stat-card"><b>${module1Sections}</b><span>Module 1 Sections</span></div><div class="stat-card"><b>${Math.round(p.module2 || 0)}%</b><span>Module 2 Progress</span></div>`;
    }
    const artifactEl = document.querySelector('[data-artifacts-count]');
    if(artifactEl) artifactEl.textContent = artifacts;
  }
  function renderDashboard(p){
    const el = document.querySelector('[data-progress-dashboard]');
    if(!el) return;
    el.innerHTML = MODULES.map(m=>{
      const value = pct(p[m.id]);
      const label = statusLabel(m,value);
      const clickable = m.built;
      const href = clickable ? m.href : '#';
      const progress = m.built ? value : 0;
      return `<div class="progress-row ${statusClass(label)}"><div class="progress-row-top"><a class="module-title" href="${href}" ${clickable?'':'aria-disabled="true"'}>${m.title}</a><span class="progress-status">${label}</span></div><div class="progress-track"><div class="progress-fill" style="width:${progress}%"></div></div><div class="progress-meta"><span>${m.sections ? m.sections + ' sections' : 'Not yet built'}</span><span>${m.artifact}</span></div></div>`;
    }).join('');
  }
  function renderNote(){
    const el = document.querySelector('[data-progress-note]');
    if(el) el.innerHTML = 'Progress is saved locally in this browser. Submit exported case artifacts through the LMS for grading.';
  }
  function render(){
    const p = window.AFL ? window.AFL.read() : {};
    renderStats(p); renderDashboard(p); renderNote();
  }
  document.addEventListener('DOMContentLoaded', function(){
    render();
    // Count module artifacts when students export/copy/print deliverables from case pages.
    document.body.addEventListener('click', function(e){
      const id = e.target && e.target.id;
      if(['export-html','print-pdf','copy-md'].includes(id)){
        if(location.pathname.includes('/module2/') && window.AFL) window.AFL.markArtifact('module2');
        if(location.pathname.includes('/module1/') && window.AFL) window.AFL.markArtifact('module1');
      }
    }, true);
  });
  window.addEventListener('afl-progress-updated', render);
})();
