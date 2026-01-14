import { ChaosConfig } from '../types';
import { shouldIntercept } from './utils';

const originalFetch = window.fetch;

export const applyFetchChaos = (config: ChaosConfig) => {
  window.fetch = async (...args) => {
    const [resource] = args;
    const url = typeof resource === 'string' ? resource : resource instanceof Request ? resource.url : String(resource);

    if (!shouldIntercept(url, config)) return originalFetch(...args);

    if (config.delay > 0) {
      await new Promise(r => setTimeout(r, config.delay));
    }

    if (Math.random() < config.errorRate) {
      console.warn(`🔥 [Fetch] Chaos blocked: ${url}`);
      return Promise.reject(new TypeError(config.errorMessage || 'Network Chaos Error'));
    }

    return originalFetch(...args);
  };
};