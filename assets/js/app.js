
const AFL = {
  key: 'afl_sprint1_progress',
  defaults: { module1: 10, artifacts: 0, badges: 0, currentSection: 'overview' },
  read(){
    try { return {...this.defaults, ...JSON.parse(localStorage.getItem(this.key) || '{}')}; }
    catch(e){ return this.defaults; }
  },
  write(data){ localStorage.setItem(this.key, JSON.stringify({...this.read(), ...data})); },
  setSection(section){ this.write({currentSection: section}); },
  reset(){ localStorage.removeItem(this.key); location.reload(); }
};

document.addEventListener('DOMContentLoaded', () => {
  const data = AFL.read();
  document.querySelectorAll('[data-module-progress="1"]').forEach(el => el.style.width = `${data.module1}%`);
  document.querySelectorAll('[data-artifacts]').forEach(el => el.textContent = data.artifacts);
  document.querySelectorAll('[data-badges]').forEach(el => el.textContent = data.badges);
  document.querySelectorAll('[data-current-section]').forEach(el => el.textContent = data.currentSection.replace('-', ' '));
});
