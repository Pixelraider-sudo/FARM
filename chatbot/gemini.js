/* =========================================================
   AgriSense Chatbot — Gemini Integration Layer
   Handles all network communication: timeout, retries,
   rate-limit backoff and graceful fallback if the API
   is unreachable or misconfigured.
========================================================= */

const SYSTEM_PROMPT = `You are the AgriSense virtual farm advisor, a friendly, knowledgeable representative of AgriSense — a smart farming platform.
You help visitors with:
- Platform features (crop guides, pest & disease ID, planting calendar, weather-based alerts, farmer community)
- How the platform works and how to get started (registering an account, browsing crops, checking alerts)
- General guidance about the crops covered on the platform: maize, beans, tomatoes, potatoes, rice, coffee, tea
- Basic best-practice farming information (planting windows, common pests/diseases, soil needs) in general terms

Keep replies concise (2-5 sentences unless asked for detail), warm, and practical, like a helpful agronomist colleague.
If someone says something like "I need a website", a consultation, or a business inquiry, politely suggest they use the quick-reply options to book a consultation, view services, or contact the team.
If a question is outside farming/platform topics (e.g. unrelated trivia, legal/medical advice, coding help), politely say that's outside what you can help with here, and redirect to how AgriSense can help with their farming needs instead.
Never claim to give exact real-time weather, prices, or medical/legal advice — note that for exact numbers they should check the relevant AgriSense page.`;

class GeminiClient {
  constructor(config) {
    this.config = config || (typeof __AGRISENSE_CONFIG__ !== "undefined" ? __AGRISENSE_CONFIG__ : null);
  }

  hasConfig() {
    return !!this.config;
  }

  async send(history, userMessage) {
    if (!this.hasConfig()) {
      return this._fallback(userMessage, "not_configured");
    }

    const useBackend = this.config.GEMINI_ENDPOINT && !this.config.GEMINI_ENDPOINT.includes("YOUR_");
    const useDirect =
      this.config.GEMINI_API_KEY && this.config.GEMINI_API_KEY !== "YOUR_API_KEY_HERE";

    if (!useBackend && !useDirect) {
      return this._fallback(userMessage, "no_key");
    }

    let lastError = null;
    const maxRetries = this.config.MAX_RETRIES ?? 2;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const text = useBackend
          ? await this._callBackend(history, userMessage)
          : await this._callDirect(history, userMessage);
        return { ok: true, text };
      } catch (err) {
        lastError = err;
        if (err.name === "RateLimitError") {
          await this._delay((this.config.RETRY_DELAY_MS ?? 800) * (attempt + 1));
          continue;
        }
        if (err.name === "AbortError") {
          break; // timeout — no point retrying immediately
        }
        await this._delay(this.config.RETRY_DELAY_MS ?? 800);
      }
    }

    return this._fallback(userMessage, "error", lastError);
  }

  async _callBackend(history, userMessage) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), this.config.REQUEST_TIMEOUT_MS ?? 15000);
    try {
      const res = await fetch(this.config.GEMINI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ history, message: userMessage, system: SYSTEM_PROMPT }),
        signal: controller.signal,
      });
      if (res.status === 429) {
        const e = new Error("Rate limited");
        e.name = "RateLimitError";
        throw e;
      }
      if (!res.ok) throw new Error(`Backend error ${res.status}`);
      const data = await res.json();
      return data.reply || data.text || "";
    } finally {
      clearTimeout(t);
    }
  }

  async _callDirect(history, userMessage) {
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), this.config.REQUEST_TIMEOUT_MS ?? 15000);
    try {
      const contents = [
        { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
        { role: "model", parts: [{ text: "Understood — I'll act as the AgriSense farm advisor." }] },
        ...history.map((h) => ({
          role: h.role === "bot" ? "model" : "user",
          parts: [{ text: h.text }],
        })),
        { role: "user", parts: [{ text: userMessage }] },
      ];

      const url = `${this.config.GEMINI_DIRECT_URL}?key=${this.config.GEMINI_API_KEY}`;
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
        signal: controller.signal,
      });
      if (res.status === 429) {
        const e = new Error("Rate limited");
        e.name = "RateLimitError";
        throw e;
      }
      if (!res.ok) throw new Error(`Gemini error ${res.status}`);
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("") || "";
      return text;
    } finally {
      clearTimeout(t);
    }
  }

  _delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  _fallback(userMessage, reason) {
    const msg = (userMessage || "").toLowerCase();
    let text;

    if (reason === "not_configured" || reason === "no_key") {
      text =
        "I'm running in demo mode right now (no live AI connection configured), but I can still help! " +
        this._ruleBasedReply(msg);
    } else {
      text =
        "I'm having trouble reaching the AI assistant right now, so here's what I can tell you offline: " +
        this._ruleBasedReply(msg);
    }

    return { ok: false, text, fallback: true };
  }

  _ruleBasedReply(msg) {
    if (/price|cost|pricing/.test(msg)) {
      return "AgriSense is free to register for. Premium alerts and consultations may vary — check the Register page for the latest details.";
    }
    if (/pest|disease|bug|insect/.test(msg)) {
      return "Visit the Pests & Diseases page for symptoms, control methods, and recommended treatments for maize, beans, tomatoes, potatoes, rice, coffee and tea.";
    }
    if (/plant|calendar|season|when/.test(msg)) {
      return "Check the Planting Calendar page — it shows the best months to plant each crop based on long and short rains.";
    }
    if (/weather/.test(msg)) {
      return "The Weather & Seasons page has region-based seasonal guidance to help you time your planting.";
    }
    if (/website|consult|business|quote/.test(msg)) {
      return "It sounds like you might want to talk to our team directly — try 'Book a Consultation' below.";
    }
    return "You can explore Crops, Pests & Diseases, the Planting Calendar, and Alerts from the menu above, or ask me something specific about farming!";
  }
}

// eslint-disable-next-line no-unused-vars
const geminiClient = new GeminiClient();
