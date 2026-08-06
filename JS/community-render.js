/* =========================================================
   AgriSense — Community Renderer (ES6 Module)
========================================================= */

import { getPosts, createPost, likePost, addComment } from "./services/community-service.js";

function escapeHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function timeAgo(ts) {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function postCard(post) {
  const comments = (post.comments || [])
    .map((c) => `<div class="comment-row"><strong>${escapeHtml(c.author)}:</strong> ${escapeHtml(c.text)}</div>`)
    .join("");

  return `
    <article class="app-card reveal" data-id="${post.id}" style="margin-bottom:18px;">
      <div class="app-card-head">
        <h3>${escapeHtml(post.title)}</h3>
        ${post.tag ? `<span class="tag">${escapeHtml(post.tag)}</span>` : ""}
      </div>
      <p class="app-card-meta">${escapeHtml(post.author)} &middot; ${timeAgo(post.createdAt)}</p>
      <p style="margin-bottom:14px;">${escapeHtml(post.body)}</p>
      <div style="display:flex; gap:10px; margin-bottom:${comments ? "12px" : "0"};">
        <button class="btn btn-ghost" data-action="like" style="border:1px solid var(--border); padding:7px 14px; font-size:.82rem;">Like (${post.likes || 0})</button>
        <button class="btn btn-ghost" data-action="comment" style="border:1px solid var(--border); padding:7px 14px; font-size:.82rem;">Comment</button>
      </div>
      ${comments ? `<div class="comments-block">${comments}</div>` : ""}
      <div class="comment-input-row" style="display:none; margin-top:12px; gap:8px;">
        <input type="text" class="comment-input" placeholder="Write a reply...">
        <button class="btn btn-primary" data-action="submit-comment" style="padding:8px 16px; font-size:.82rem;">Send</button>
      </div>
    </article>`;
}

function render() {
  const mount = document.getElementById("posts-list");
  if (!mount) return;
  mount.innerHTML = getPosts().map(postCard).join("");
  document.dispatchEvent(new CustomEvent("components:ready"));
}

function wireEvents() {
  document.getElementById("new-post-btn")?.addEventListener("click", () => {
    document.getElementById("post-modal-overlay").classList.add("open");
  });
  document.getElementById("post-modal-close")?.addEventListener("click", () => {
    document.getElementById("post-modal-overlay").classList.remove("open");
  });
  document.getElementById("post-modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "post-modal-overlay") e.target.classList.remove("open");
  });

  document.getElementById("post-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const author = document.getElementById("post-author").value.trim();
    const title = document.getElementById("post-title").value.trim();
    const tag = document.getElementById("post-tag").value.trim();
    const body = document.getElementById("post-body").value.trim();
    if (!author || !title || !body) return;
    createPost({ author, title, tag, body });
    document.getElementById("post-modal-overlay").classList.remove("open");
    document.getElementById("post-form").reset();
    render();
  });

  document.getElementById("posts-list")?.addEventListener("click", (e) => {
    const card = e.target.closest(".app-card");
    if (!card) return;
    const id = card.getAttribute("data-id");

    if (e.target.closest('[data-action="like"]')) {
      likePost(id);
      render();
      return;
    }
    if (e.target.closest('[data-action="comment"]')) {
      card.querySelector(".comment-input-row").style.display = "flex";
      card.querySelector(".comment-input")?.focus();
      return;
    }
    if (e.target.closest('[data-action="submit-comment"]')) {
      const input = card.querySelector(".comment-input");
      const text = input.value.trim();
      if (!text) return;
      addComment(id, "You", text);
      render();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  render();
  wireEvents();
});
