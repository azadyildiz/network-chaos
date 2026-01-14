import { ChaosConfig } from '../types';
import { shouldIntercept } from './utils';

const OriginalXHR = window.XMLHttpRequest;

export const applyXHRChaos = (config: ChaosConfig) => {
  const originalOpen = OriginalXHR.prototype.open;
  const originalSend = OriginalXHR.prototype.send;

  OriginalXHR.prototype.open = function(method: string, url: string | URL) {
    // @ts-ignore
    this._chaosUrl = url.toString();
    // @ts-ignore
    return originalOpen.apply(this, arguments);
  };

  OriginalXHR.prototype.send = function() {
    // @ts-ignore
    const url = this._chaosUrl;

    if (!url || !shouldIntercept(url, config)) {
      // @ts-ignore
      return originalSend.apply(this, arguments);
    }

    const executeSend = () => {
      if (Math.random() < config.errorRate) {
        console.warn(`🔥 [XHR] Chaos blocked: ${url}`);
        this.dispatchEvent(new ProgressEvent('error'));
        this.dispatchEvent(new Event('readystatechange'));
        return;
      }
      // @ts-ignore
      originalSend.apply(this, arguments);
    };

    if (config.delay > 0) {
      setTimeout(executeSend, config.delay);
    } else {
      executeSend();
    }
  };
};