import * as Sentry from '@sentry/react'

export function initSentry() {
  // Only initialize in production
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [Sentry.browserTracingIntegration()],
      // Sample rate for performance monitoring (10%)
      tracesSampleRate: 0.1,
      // Don't send PII
      beforeSend(event) {
        // Scrub any sensitive data if needed
        return event
      },
    })
  }
}

export { Sentry }
