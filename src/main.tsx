import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './mumbai.css'
import App from './App.tsx'
import { initPostHog } from './service-site/lib/posthog'

// Initialise PostHog once, before render. Autocapture + auto-pageview are off;
// all events are fired intentionally from the funnel helpers. Safe no-op if the
// key is missing, and never throws into startup.
initPostHog()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
