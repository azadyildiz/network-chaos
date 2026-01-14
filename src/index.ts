import { applyFetchChaos } from './core/fetch';
import { applyXHRChaos } from './core/xhr';
import { ChaosConfig } from './types';

(async () => {
  if (typeof window === 'undefined') return;

  try {
    const res = await fetch('/chaos.config.json', { cache: 'no-store' });
    
    if (!res.ok) return;

    const config: ChaosConfig = await res.json();
    if (!config.enabled) return;
    
    const hostname = window.location.hostname;
    if (!config.domains.includes(hostname)) return;

    console.log(`😈 [Network Chaos] Active on ${hostname}`);
    console.log(`   └─ Delay: ${config.delay}ms | Error Rate: ${config.errorRate * 100}%`);

    applyFetchChaos(config);
    applyXHRChaos(config);

  } catch (e) {
    console.error('🔥 [Network Chaos] Config file found but could not be parsed!');
    console.error('   👉 Please check your "chaos.config.json" for syntax errors (missing commas, quotes, etc).');
    console.error(e);
  }
})();