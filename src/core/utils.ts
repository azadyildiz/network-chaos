import { ChaosConfig } from '../types';

export const shouldIntercept = (url: string, config: ChaosConfig): boolean => {
  const urlLower = url.toLowerCase();
  
  if (config.excludes?.some(term => urlLower.includes(term.toLowerCase()))) {
    return false;
  }
  
  if (config.includes && config.includes.length > 0) {
    return config.includes.some(term => urlLower.includes(term.toLowerCase()));
  }

  return true;
};