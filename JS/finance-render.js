import { getTransactions, addTransaction, deleteTransaction, getSummary, getMonthlyBreakdown } from "./services/finance-service.js";

function escapeHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function fmt(n) {
  return Number(n || 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function renderStats() {
  const { income, expenses, profit } = getSummary();
  document.getElementById("finance-stats").innerHTML = `
    <div class="stat-tile"><div class="stat-tile-label">Total Income</div><div class="stat-tile-value positive">${fmt(income)}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Total Expenses</div><div class="stat-tile-value negative">${fmt(expenses)}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Net Profit</div><div class="stat-tile-value ${profit >= 0 ? "positive" : "negative"}">${fmt(profit)}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Transactions</div><div class="stat-tile-value">${getTransactions().length}</div></div>
  `;
}

function renderChart() {
  const mount = document.getElementById("finance-chart");
  const data = getMonthlyBreakdown();
  if (!data.length) {
    mount.innerHTML = `<p style="color:var(--text-muted); margin:0;">No data yet — add a transaction to see the chart.</p>`;
    return;
  }

  const width = 640;
  const height = 220;
  const padding = 32;
  const maxVal = Math.max(...data.map((d) => Math.max(d.income, d.expenses)), 1);
  const barGroupWidth = (width - padding * 2) / data.length;
  const barWidth = Math.min(24, barGroupWidth / 3);

  let bars = "";
  data.forEach((d, i) => {
    const groupX = padding + i * barGroupWidth + barGroupWidth / 2;
    const incomeH = (d.income / maxVal) * (height - padding * 2);
    const expenseH = (d.expenses / maxVal) * (height - padding * 2);
    bars += `
      <rect x="${groupX - barWidth - 2}" y="${height - padding - incomeH}" width="${barWidth}" height="${incomeH}" fill="var(--green-500)" rx="3"></rect>
      <rect x="${groupX + 2}" y="${height - padding - expenseH}" width="${barWidth}" height="${expenseH}" fill="#dc2626" rx="3"></rect>
      <text x="${groupX}" y="${height - 8}" text-anchor="middle" font-size="10" fill="var(--text-muted)">${escapeHtml(d.month)}</text>
    `;
  });

  mount.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:auto; max-width:100%;">
      <line x1="${padding}" y1="${height - padding}" x2="${width - padding}" y2="${height - padding}" stroke="var(--border)" stroke-width="1"></line>
      ${bars}
    </svg>
    <div style="display:flex; gap:20px; margin-top:8px; font-size:.8rem; color:var(--text-muted);">
      <span><span style="display:inline-block; width:10px; height:10px; background:var(--green-500); border-radius:2px; margin-right:6px;"></span>Income</span>
      <span><span style="display:inline-block; width:10px; height:10px; background:#dc2626; border-radius:2px; margin-right:6px;"></span>Expenses</span>
    </div>
  `;
}

function renderTable() {
  const txns = getTransactions();
  const empty = document.getElementById("finance-empty");
  const wrap = document.getElementById("finance-table-wrap");
  const tbody = document.getElementById("finance-tbody");

  if (!txns.length) {
    empty.style.display = "block";
    wrap.style.display = "none";
    return;
  }
  empty.style.display = "none";
  wrap.style.display = "block";

  tbody.innerHTML = txns
    .map(
      (t) => `
    <tr data-id="${t.id}">
      <td>${escapeHtml(t.date)}</td>
      <td><span class="status-badge ${t.type === "income" ? "ok" : "low"}">${t.type === "income" ? "Income" : "Expense"}</span></td>
      <td>${escapeHtml(t.category)}</td>
      <td>${escapeHtml(t.description)}</td>
      <td class="num">${t.type === "income" ? "+" : "-"}${fmt(t.amount)}</td>
      <td><button class="icon-btn danger" data-action="delete" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path></svg></button></td>
    </tr>`
    )
    .join("");
}

function renderAll() {
  renderStats();
  renderChart();
  renderTable();
}

function openModal(type) {
  const overlay = document.getElementById("txn-modal-overlay");
  document.getElementById("txn-form").reset();
  document.getElementById("txn-type").value = type;
  document.getElementById("txn-modal-title").textContent = type === "income" ? "Add Income" : "Add Expense";
  document.getElementById("txn-date").value = new Date().toISOString().slice(0, 10);
  overlay.classList.add("open");
}
function closeModal() {
  document.getElementById("txn-modal-overlay").classList.remove("open");
}

function wireEvents() {
  document.getElementById("add-income-btn")?.addEventListener("click", () => openModal("income"));
  document.getElementById("add-expense-btn")?.addEventListener("click", () => openModal("expense"));
  document.getElementById("txn-modal-close")?.addEventListener("click", closeModal);
  document.getElementById("txn-modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "txn-modal-overlay") closeModal();
  });

  document.getElementById("txn-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = {
      type: document.getElementById("txn-type").value,
      date: document.getElementById("txn-date").value,
      amount: document.getElementById("txn-amount").value,
      category: document.getElementById("txn-category").value.trim(),
      description: document.getElementById("txn-description").value.trim(),
    };
    if (!data.date || !data.amount) return;
    addTransaction(data);
    closeModal();
    renderAll();
  });

  document.getElementById("finance-tbody")?.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row || !e.target.closest('[data-action="delete"]')) return;
    if (confirm("Delete this transaction?")) {
      deleteTransaction(row.getAttribute("data-id"));
      renderAll();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderAll();
  wireEvents();
});
