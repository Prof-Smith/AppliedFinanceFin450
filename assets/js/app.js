/* Applied Finance Lab core progress utilities.
   Static GitHub Pages note: progress is local to each browser/device. */
(function(){
  const STORE_KEY = 'appliedFinanceProgress';
  const LEGACY_KEYS = ['AFL_PROGRESS','aflProgress','appliedFinanceLabProgress','afl-progress'];
  const SECTION_MAP = {
    'module1-overview': ['module1', 5],
    'tvm-studio': ['module1', 15],
    'pv-fv-studio': ['module1', 25],
    'npv-studio': ['module1', 35],
    'irr-studio': ['module1', 45],
    'financial-statement-explorer': ['module1', 55],
    'ratio-analysis': ['module1', 65],
    'dcf-valuation': ['module1', 80],
    'enterprise-value': ['module1', 90],
    'module1-challenge': ['module1', 100],
    'module2-overview': ['module2', 5],
    'wacc-overview': ['module2', 12],
    'cost-capital': ['module2', 24],
    'wacc-build': ['module2', 36],
    'operating-fcf': ['module2', 48],
    'pro-forma-builder': ['module2', 60],
    'mid-year-dcf': ['module2', 72],
    'sensitivity-roic': ['module2', 84],
    'challenge': ['module2', 100],
    'module2-challenge': ['module2', 100]
  };
  function blank(){
    return {
      module1:0,module2:0,module3:0,module4:0,module5:0,module6:0,module7:0,module8:0,
      artifacts:{},currentSection:'',lastVisited:'',updatedAt:''
    };
  }
  function safeParse(value){
    if(!value) return null;
    try { return JSON.parse(value); } catch(e) { return null; }
  }
  function normalize(raw){
    const base = blank();
    if(!raw || typeof raw !== 'object') return base;
    Object.keys(base).forEach(k=>{
      if(k.startsWith('module')) base[k] = Math.max(0, Math.min(100, Number(raw[k] || 0)));
    });
    base.artifacts = raw.artifacts && typeof raw.artifacts === 'object' ? raw.artifacts : {};
    // Support earlier boolean artifact fields if they exist.
    ['module1Artifact','module2Artifact','module3Artifact','module4Artifact','module5Artifact','module6Artifact','module7Artifact','module8Artifact'].forEach(k=>{
      if(raw[k]) base.artifacts[k.replace('Artifact','')] = true;
    });
    base.currentSection = raw.currentSection || '';
    base.lastVisited = raw.lastVisited || '';
    base.updatedAt = raw.updatedAt || '';
    return base;
  }
  function read(){
    let stored = safeParse(localStorage.getItem(STORE_KEY));
    if(!stored){
      for(const key of LEGACY_KEYS){
        stored = safeParse(localStorage.getItem(key));
        if(stored) break;
      }
    }
    return normalize(stored);
  }
  function write(patch){
    const current = read();
    const next = Object.assign({}, current, patch || {});
    if(patch && patch.artifacts){ next.artifacts = Object.assign({}, current.artifacts, patch.artifacts); }
    Object.keys(next).forEach(k=>{
      if(k.startsWith('module')) next[k] = Math.max(0, Math.min(100, Number(next[k] || 0)));
    });
    next.updatedAt = new Date().toISOString();
    localStorage.setItem(STORE_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent('afl-progress-updated', {detail: next}));
    return next;
  }
  function markSection(section){
    const pair = SECTION_MAP[section];
    if(!pair){ write({currentSection:section,lastVisited:location.pathname}); return read(); }
    const current = read();
    const module = pair[0], value = pair[1];
    const patch = {currentSection:section,lastVisited:location.pathname};
    patch[module] = Math.max(Number(current[module] || 0), value);
    return write(patch);
  }
  function markArtifact(moduleName){
    const artifacts = {}; artifacts[moduleName] = true;
    const patch = {artifacts}; patch[moduleName] = 100;
    return write(patch);
  }
  function artifactCount(){
    const p = read();
    return Object.values(p.artifacts || {}).filter(Boolean).length;
  }
  function reset(){ localStorage.removeItem(STORE_KEY); window.dispatchEvent(new CustomEvent('afl-progress-updated', {detail: read()})); }
  window.AFL = {read, write, markSection, markArtifact, artifactCount, reset};
  window.markPageVisited = markSection;

  // Automatically infer page progress when pages load.
  document.addEventListener('DOMContentLoaded', function(){
    const page = location.pathname.split('/').pop();
    const path = location.pathname;
    if(path.includes('/module1/')){
      const key = page.replace('.html','');
      markSection(key === 'overview' ? 'module1-overview' : key);
    }
    if(path.includes('/module2/')){
      const key = page.replace('.html','');
      const normalized = key === 'overview' ? 'module2-overview' : key;
      markSection(normalized);
    }
  });
})();
