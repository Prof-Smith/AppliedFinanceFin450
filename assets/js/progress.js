
function markModule1Started(){
  AFL.write({ module1: Math.max(AFL.read().module1, 15) });
}
function markPageVisited(section){
  const sectionProgress = {
    overview: 20,
    tvm: 30,
    pv: 38,
    fv: 46,
    npv: 56,
    irr: 66,
    'financial-statements': 76,
    'ratio-analysis': 84,
    'enterprise-value': 92,
    challenge: 96,
    'ai-reflection': 100
  };
  AFL.write({ currentSection: section, module1: Math.max(AFL.read().module1, sectionProgress[section] || 10) });
}
