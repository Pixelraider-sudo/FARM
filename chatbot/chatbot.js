/* =========================================================
   AgriSense Chatbot — Widget Controller
   Floating chat UI, localStorage memory, markdown render,
   streaming-style typing effect, quick replies.
========================================================= */

(function () {
  "use strict";

  const STORAGE_KEY = "agrisense-chat-history";
  const UNREAD_KEY = "agrisense-chat-unread";
  const MAX_HISTORY = 40;

  const QUICK_REPLIES = [
    { label: "📅 Book a Consultation", value: "I'd like to book a consultation" },
    { label: "🌾 Services", value: "What services does AgriSense offer?" },
    { label: "🌱 Crops", value: "Tell me about the crops you cover" },
    { label: "📞 Contact", value: "How can I contact the AgriSense team?" },
  ];

  const CONTACT_REPLIES = [
    { label: "📅 Book a Consultation", value: "book_consultation" },
    { label: "📞 Call Us", value: "call_us" },
    { label: "✉️ Send Email", value: "send_email" },
    { label: "📄 Request Quote", value: "request_quote" },
  ];

  let state = {
    history: [], // {role:'user'|'bot', text, time}
    open: false,
    unread: 0,
  };

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  /* Minimal, safe markdown renderer: code blocks, inline code, bold, italics, links, line breaks */
  function renderMarkdown(raw) {
    let text = escapeHtml(raw);

    text = text.replace(/```([\s\S]*?)```/g, (_, code) => `<pre><code>${code.trim()}</code></pre>`);
    text = text.replace(/`([^`]+)`/g, "<code>$1</code>");
    text = text.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    text = text.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
    text = text.replace(/\n/g, "<br>");
    return text;
  }

  function formatTime(ts) {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function loadHistory() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      state.history = raw ? JSON.parse(raw) : [];
    } catch {
      state.history = [];
    }
  }

  function saveHistory() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.history.slice(-MAX_HISTORY)));
    } catch {
      /* storage full or unavailable — fail silently */
    }
  }

  function buildWidget() {
    const launcher = document.createElement("button");
    launcher.id = "agri-chat-launcher";
    launcher.setAttribute("aria-label", "Open AgriSense assistant");
    launcher.innerHTML = `💬<span class="unread-badge" id="chat-unread-badge" style="display:none;">0</span>`;

    const win = document.createElement("div");
    win.id = "agri-chat-window";
    win.setAttribute("role", "dialog");
    win.setAttribute("aria-label", "AgriSense AI Assistant");
    win.innerHTML = `
      <div class="chat-header">
        <div class="bot-avatar">🌾</div>
        <div>
          <div class="chat-title">AgriSense Assistant</div>
          <div class="chat-subtitle"><span class="status-dot"></span> Online &middot; AI powered</div>
        </div>
        <div class="chat-header-actions">
          <button id="chat-export" title="Export conversation" aria-label="Export conversation">⬇</button>
          <button id="chat-clear" title="Clear chat" aria-label="Clear chat">🗑</button>
          <button id="chat-close" title="Close" aria-label="Close chat">✕</button>
        </div>
      </div>
      <div class="chat-messages" id="chat-messages"></div>
      <div class="quick-replies" id="chat-quick-replies"></div>
      <div class="chat-input-row">
        <textarea id="chat-input" rows="1" placeholder="Ask about crops, pests, planting…" aria-label="Message"></textarea>
        <button class="chat-send" id="chat-send" aria-label="Send message">➤</button>
      </div>
    `;

    document.body.appendChild(launcher);
    document.body.appendChild(win);

    return { launcher, win };
  }

  function renderMessages() {
    const container = document.getElementById("chat-messages");
    if (!container) return;

    if (state.history.length === 0) {
      container.innerHTML = `
        <div class="chat-empty-state">
          <div class="emoji">🌱</div>
          <p style="margin:0;">Hi! I'm your AgriSense assistant. Ask me about crops, pests, planting times, or the platform itself.</p>
        </div>`;
      return;
    }

    container.innerHTML = state.history
      .map((m) => {
        const avatar = m.role === "user" ? "🧑‍🌾" : "🌾";
        const bubble = m.streaming ? m.text : renderMarkdown(m.text);
        return `
        <div class="msg ${m.role}">
          <div class="avatar">${avatar}</div>
          <div class="msg-body">
            <div class="msg-bubble">${bubble}${m.streaming ? '<span class="chat-cursor"></span>' : ""}</div>
            <div class="msg-time">${formatTime(m.time)}</div>
            ${m.role === "bot" && !m.streaming ? `<button class="msg-copy" data-copy="${m.id}">Copy</button>` : ""}
          </div>
        </div>`;
      })
      .join("");

    container.scrollTop = container.scrollHeight;
  }

  function renderQuickReplies(list) {
    const mount = document.getElementById("chat-quick-replies");
    if (!mount) return;
    mount.innerHTML = (list || QUICK_REPLIES)
      .map((q) => `<button data-value="${escapeHtml(q.value)}">${q.label}</button>`)
      .join("");
  }

  function showTyping() {
    const container = document.getElementById("chat-messages");
    if (!container) return;
    const el = document.createElement("div");
    el.className = "msg bot";
    el.id = "typing-msg";
    el.innerHTML = `<div class="avatar">🌾</div><div class="msg-body"><div class="msg-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div></div>`;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById("typing-msg");
    if (el) el.remove();
  }

  function streamReply(fullText, msgId) {
    const container = document.getElementById("chat-messages");
    return new Promise((resolve) => {
      let i = 0;
      const chunkSize = 3;
      const speed = 14;

      function step() {
        i += chunkSize;
        const partial = fullText.slice(0, i);
        const msgObj = state.history.find((m) => m.id === msgId);
        if (msgObj) msgObj.text = partial;
        renderMessages();
        if (container) container.scrollTop = container.scrollHeight;

        if (i < fullText.length) {
          setTimeout(step, speed);
        } else {
          const finalObj = state.history.find((m) => m.id === msgId);
          if (finalObj) {
            finalObj.text = fullText;
            finalObj.streaming = false;
          }
          renderMessages();
          saveHistory();
          resolve();
        }
      }
      step();
    });
  }

  async function sendMessage(text) {
    if (!text || !text.trim()) return;
    const userMsg = { id: "m" + Date.now(), role: "user", text: text.trim(), time: Date.now() };
    state.history.push(userMsg);
    renderMessages();
    saveHistory();
    renderQuickReplies([]);

    showTyping();
    const client = typeof geminiClient !== "undefined" ? geminiClient : null;
    let result;
    try {
      result = client
        ? await client.send(
            state.history.slice(0, -1).map((h) => ({ role: h.role, text: h.text })),
            userMsg.text
          )
        : { ok: false, text: "Chat backend isn't available right now, please explore the site menu for now." };
    } catch {
      result = { ok: false, text: "Something went wrong reaching the assistant. Please try again shortly." };
    }
    hideTyping();

    const botMsg = { id: "m" + (Date.now() + 1), role: "bot", text: "", time: Date.now(), streaming: true };
    state.history.push(botMsg);
    await streamReply(result.text, botMsg.id);

    maybeShowContactReplies(userMsg.text);
    if (!state.open) bumpUnread();
  }

  function maybeShowContactReplies(userText) {
    if (/website|need a site|build.*site|develop.*site/i.test(userText)) {
      renderQuickReplies(CONTACT_REPLIES);
    } else {
      renderQuickReplies(QUICK_REPLIES);
    }
  }

  function bumpUnread() {
    state.unread += 1;
    const badge = document.getElementById("chat-unread-badge");
    if (badge) {
      badge.style.display = "flex";
      badge.textContent = String(state.unread);
    }
  }

  function clearUnread() {
    state.unread = 0;
    const badge = document.getElementById("chat-unread-badge");
    if (badge) badge.style.display = "none";
  }

  function toggleWindow(open) {
    const win = document.getElementById("agri-chat-window");
    if (!win) return;
    state.open = open ?? !win.classList.contains("open");
    win.classList.toggle("open", state.open);
    if (state.open) {
      clearUnread();
      const input = document.getElementById("chat-input");
      if (input) setTimeout(() => input.focus(), 300);
    }
  }

  function handleQuickReplyValue(value) {
    const map = {
      book_consultation: "I'd like to book a consultation. What's the best way to schedule one?",
      call_us: "How can I call the AgriSense team directly?",
      send_email: "What email address can I use to contact AgriSense?",
      request_quote: "I'd like to request a quote for a farming website / platform project.",
    };
    const text = map[value] || value;
    sendMessage(text);
  }

  function wireEvents() {
    const launcher = document.getElementById("agri-chat-launcher");
    const closeBtn = document.getElementById("chat-close");
    const sendBtn = document.getElementById("chat-send");
    const input = document.getElementById("chat-input");
    const clearBtn = document.getElementById("chat-clear");
    const exportBtn = document.getElementById("chat-export");
    const quickMount = document.getElementById("chat-quick-replies");
    const messagesMount = document.getElementById("chat-messages");

    launcher.addEventListener("click", () => toggleWindow());
    closeBtn.addEventListener("click", () => toggleWindow(false));

    function submit() {
      const text = input.value;
      input.value = "";
      input.style.height = "auto";
      sendMessage(text);
    }

    sendBtn.addEventListener("click", submit);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        submit();
      }
    });
    input.addEventListener("input", () => {
      input.style.height = "auto";
      input.style.height = Math.min(input.scrollHeight, 96) + "px";
    });

    clearBtn.addEventListener("click", () => {
      if (!confirm("Clear the whole conversation?")) return;
      state.history = [];
      saveHistory();
      renderMessages();
      renderQuickReplies(QUICK_REPLIES);
    });

    exportBtn.addEventListener("click", () => {
      const text = state.history
        .map((m) => `[${formatTime(m.time)}] ${m.role === "user" ? "You" : "AgriSense"}: ${m.text}`)
        .join("\n");
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "agrisense-conversation.txt";
      a.click();
      URL.revokeObjectURL(url);
    });

    quickMount.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;
      handleQuickReplyValue(btn.getAttribute("data-value"));
    });

    messagesMount.addEventListener("click", (e) => {
      const btn = e.target.closest(".msg-copy");
      if (!btn) return;
      const id = btn.getAttribute("data-copy");
      const msg = state.history.find((m) => m.id === id);
      if (msg) {
        navigator.clipboard?.writeText(msg.text).then(() => {
          const original = btn.textContent;
          btn.textContent = "Copied ✓";
          setTimeout(() => (btn.textContent = original), 1500);
        });
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.open) toggleWindow(false);
    });
  }

  function init() {
    loadHistory();
    buildWidget();
    renderMessages();
    renderQuickReplies(QUICK_REPLIES);
    wireEvents();
  }

  document.addEventListener("components:ready", init, { once: true });
})();
