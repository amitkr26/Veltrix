type LogLevel = "info" | "warn" | "error" | "debug";

class ObservabilityServiceImpl {
  private isProduction = process.env.NODE_ENV === "production";

  /**
   * Dispatches structured events to monitoring systems
   */
  log(level: LogLevel, message: string, data?: Record<string, unknown>) {
    const timestamp = new Date().toISOString();
    const payload = {
      timestamp,
      level,
      message,
      context: data,
      platform: "Veltrix-Web",
    };

    if (this.isProduction) {
      // In production, payload would be sent to Sentry / PostHog
      console.log(`[PROD][${level.toUpperCase()}] ${message}`, payload);
    } else {
      console.log(`[STAGING][${level.toUpperCase()}] ${message}`, payload);
    }
  }

  /**
   * Specialized error tracking for runtime failures
   */
  trackError(error: Error, context?: string) {
    this.log("error", error.message, { 
      stack: error.stack as unknown as string, 
      context,
      url: typeof window !== "undefined" ? window.location.href : "SSR"
    });
  }

  /**
   * Performance instrumentation for critical paths
   */
  measure(label: string, duration: number) {
    this.log("debug", `Performance: ${label}`, { durationMs: duration });
  }
}

export const Observability = new ObservabilityServiceImpl();
