/* Applied Finance Lab navigation controller
   Restores Module 1 DCF Valuation navigation and preserves active links for Modules 2-8. */
(function () {
  'use strict';
  const clean = s => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const file = () => (location.pathname.split('/').pop() || 'overview.html').toLowerCase();
  const moduleMatch = location.pathname.match(/\/module(\d+)\//i);
  const moduleNumber = moduleMatch ? Number(moduleMatch[1]) : null;

  const moduleMaps = {
    1: {
      'overview': 'overview.html',
      'time value of money': 'tvm.html',
      'present value': 'present-value.html',
      'future value': 'future-value.html',
      'npv': 'npv.html',
      'irr': 'irr.html',
      'financial statements': 'financial-statements.html',
      'ratio analysis': 'ratio-analysis.html',
      'dcf valuation': 'dcf-valuation.html',
      'enterprise value': 'enterprise-value.html',
      'case challenge': 'challenge.html',
      'ai reflection': 'ai-reflection.html'
    },
    2: {'overview':'overview.html','wacc & capital structure':'wacc-overview.html','cost of debt & equity':'cost-capital.html','wacc build studio':'wacc-build.html','operating fcf studio':'operating-fcf.html','pro forma builder':'pro-forma-builder.html','mid-year dcf':'mid-year-dcf.html','sensitivity & roic':'sensitivity-roic.html','case challenge':'challenge.html'},
    3: {'overview':'overview.html','financial statement import':'financial-statements.html','economic balance sheet':'economic-balance-sheet.html','sales & product transition':'sales-product-transition.html','operating cost drivers':'operating-cost-drivers.html','asset intensity & reinvestment':'asset-intensity-reinvestment.html','roic & value creation':'roic-value-creation.html','valuation cross-check':'valuation-cross-check.html','case challenge':'challenge.html'},
    4: {'overview':'overview.html','options foundations':'options-foundations.html','binomial pricing':'binomial-pricing.html','state prices & risk-neutral probability':'risk-neutral-pricing.html','multi-period trees':'multi-period-trees.html','american options':'american-options.html','black-scholes/merton':'black-scholes.html','volatility lab':'volatility-lab.html','case challenge':'challenge.html'},
    5: {'overview':'overview.html','greeks dashboard':'greeks-dashboard.html','delta & gamma':'delta-gamma.html','theta & vega':'theta-vega.html','rho & rates':'rho-rates.html','scenario risk lab':'scenario-lab.html','hedging lab':'hedging-lab.html','case challenge':'challenge.html'},
    6: {'overview':'overview.html','npv vs flexibility':'npv-vs-flexibility.html','option to expand':'option-to-expand.html','option to abandon':'option-to-abandon.html','staged investment':'staged-investment.html','timing option':'timing-option.html','strategic flexibility lab':'strategic-flexibility-lab.html','case challenge':'challenge.html'},
    7: {'overview':'overview.html','deal thesis & standalone value':'deal-thesis-standalone.html','synergy analysis':'synergy-analysis.html','financing structure':'financing-structure.html','accretion / dilution':'accretion-dilution.html','debt capacity':'debt-capacity.html','restructuring lab':'restructuring-lab.html','case challenge':'challenge.html'},
    8: {'overview':'overview.html','event study basics':'event-study-basics.html','benchmark model':'benchmark-model.html','abnormal returns':'abnormal-returns.html','event window analysis':'event-window-analysis.html','market reaction dashboard':'market-reaction-dashboard.html','final briefing lab':'final-briefing-lab.html','case challenge':'challenge.html'}
  };

  function ensureModule1Dcf(card) {
    const links = [...card.querySelectorAll('a.side-link, a')];
    let dcf = links.find(a => clean(a.textContent) === 'dcf valuation' || clean(a.getAttribute('href')) === 'dcf-valuation.html');
    if (!dcf) {
      dcf = document.createElement('a');
      dcf.className = 'side-link';
      dcf.href = 'dcf-valuation.html';
      dcf.textContent = 'DCF Valuation';
      const ratio = links.find(a => clean(a.textContent) === 'ratio analysis');
      const ev = links.find(a => clean(a.textContent) === 'enterprise value');
      if (ratio) ratio.insertAdjacentElement('afterend', dcf);
      else if (ev) ev.insertAdjacentElement('beforebegin', dcf);
      else card.appendChild(dcf);
    }
    dcf.href = 'dcf-valuation.html';
    dcf.classList.remove('muted', 'disabled', 'locked');
    dcf.removeAttribute('aria-disabled');
    dcf.style.pointerEvents = '';
    dcf.style.opacity = '';
  }

  function patchSidebar() {
    if (!moduleNumber || !moduleMaps[moduleNumber]) return;
    if (moduleNumber === 1) document.querySelectorAll('.sidebar .card, .module-nav, [data-module-nav]').forEach(ensureModule1Dcf);
    const current = file();
    document.querySelectorAll('.sidebar a, .module-nav a, [data-module-nav] a').forEach(a => {
      const label = clean(a.textContent);
      const target = moduleMaps[moduleNumber][label];
      if (target) {
        a.href = target;
        a.classList.remove('muted', 'disabled', 'locked');
        a.removeAttribute('aria-disabled');
        a.style.pointerEvents = '';
        a.style.opacity = '';
        a.classList.toggle('active', target === current);
      }
    });
  }

  function patchModule1Buttons() {
    if (moduleNumber !== 1) return;
    const current = file();
    document.querySelectorAll('a.btn, .button-row a, .page-actions a').forEach(a => {
      const txt = clean(a.textContent);
      const href = clean(a.getAttribute('href'));
      if (current === 'ratio-analysis.html' && (txt.includes('next') || href === 'enterprise-value.html')) {
        a.href = 'dcf-valuation.html'; a.textContent = 'Next: DCF Valuation →';
      }
      if (current === 'dcf-valuation.html' && txt.includes('previous')) {
        a.href = 'ratio-analysis.html'; a.textContent = '← Previous: Ratio Analysis';
      }
      if (current === 'dcf-valuation.html' && txt.includes('next')) {
        a.href = 'enterprise-value.html'; a.textContent = 'Next: Enterprise Value →';
      }
      if (current === 'enterprise-value.html' && (txt.includes('previous') || href === 'ratio-analysis.html')) {
        a.href = 'dcf-valuation.html'; a.textContent = '← Previous: DCF Valuation';
      }
    });
  }

  function patchOverviewCards() {
    if (moduleNumber !== 1 || file() !== 'overview.html') return;
    document.querySelectorAll('a, .card').forEach(el => {
      const txt = clean(el.textContent);
      if (txt.includes('dcf valuation')) {
        if (el.tagName === 'A') el.href = 'dcf-valuation.html';
        el.classList.remove('muted', 'disabled', 'locked');
        el.style.pointerEvents = ''; el.style.opacity = '';
      }
    });
  }

  function mobileMenu() {
    const toggle = document.querySelector('[data-mobile-toggle]');
    const links = document.querySelector('.nav-links');
    if (toggle && links && !toggle.dataset.bound) {
      toggle.dataset.bound = 'true';
      toggle.addEventListener('click', () => links.classList.toggle('open'));
    }
  }

  function run() { patchSidebar(); patchModule1Buttons(); patchOverviewCards(); mobileMenu(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
