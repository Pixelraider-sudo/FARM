/* =========================================================
   AgriSense Chatbot — Configuration
   -----------------------------------------------------------
   1. Copy this file to "config.js" in the same folder.
   2. NEVER put a real Gemini API key here if this file will
      ship to a browser — browser-side keys are always
      extractable by anyone who opens devtools.
   3. For production, set GEMINI_ENDPOINT to your own backend
      / serverless function (e.g. a Cloudflare Worker or
      Vercel Edge Function) that holds the real key server
      side and proxies requests to Gemini. Leave API_KEY blank
      in that case — the browser never needs to see it.
========================================================= */

const CONFIG = {
  // Only used if you are calling Gemini directly from a trusted,
  // non-public environment (e.g. local testing). Leave empty in production.
  GEMINI_API_KEY: "YOUR_API_KEY_HERE",

  // Preferred: point this at your own secure backend endpoint that
  // forwards the request to Gemini using a server-side key.
  GEMINI_ENDPOINT: "/api/chat", // e.g. https://your-backend.example.com/api/chat

  GEMINI_MODEL: "gemini-2.0-flash",

  // Direct Gemini REST endpoint, only used as a fallback if no
  // backend endpoint is configured (development only).
  GEMINI_DIRECT_URL:
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",

  REQUEST_TIMEOUT_MS: 15000,
  MAX_RETRIES: 2,
  RETRY_DELAY_MS: 900,
};

// eslint-disable-next-line no-unused-vars
const __AGRISENSE_CONFIG__ = CONFIG;
