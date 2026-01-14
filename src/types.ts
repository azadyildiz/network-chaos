export interface ChaosConfig {
  /**
   * Master switch to enable or disable network chaos.
   * @default true
   */
  enabled: boolean;

  /**
   * List of allowed domains where chaos can run.
   * Typically includes 'localhost' or '127.0.0.1'.
   * This prevents accidental chaos in production environments.
   */
  domains: string[];

  /**
   * Artificial latency added to requests in milliseconds.
   * @example 1500 (for 1.5 seconds delay)
   */
  delay: number;

  /**
   * Probability of a request failing.
   * Value must be between 0.0 and 1.0.
   * @example 0.1 (means 10% of requests will fail)
   */
  errorRate: number;

  /**
   * Specific URL patterns to apply chaos to.
   * If empty, applies to all URLs (except excludes).
   * @example ["/api", "graphql"]
   */
  includes?: string[];

  /**
   * URL patterns to ignore.
   * Useful for static assets like images, CSS, fonts.
   * @default [".png", ".css", "node_modules", ...]
   */
  excludes?: string[];

  /**
   * Custom error message to be thrown when a request is blocked.
   */
  errorMessage?: string;
}