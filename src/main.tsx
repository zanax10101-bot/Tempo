import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app/App'
import { initSentry, Sentry } from './lib/sentry'
import { ErrorBoundary } from './components/feedback/ErrorBoundary'
import './styles/globals.css'
import { seedDatabase } from './db/seed'

// Initialize Sentry for error tracking (production only)
initSentry()

// Seed the database on first load
seedDatabase()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorBoundary />}>
      <App />
    </Sentry.ErrorBoundary>
  </StrictMode>
)
