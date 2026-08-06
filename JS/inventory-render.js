import { getInventory, createItem, updateItem, deleteItem, isLowStock, INVENTORY_CATEGORIES } from "./services/inventory-service.js";

function escapeHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

let activeCategory = "all";

function renderFilters() {
  const mount = document.getElementById("inventory-filters");
  const buttons = ['<button class="pd-filter-btn active" data-filter="all">All</button>'];
  INVENTORY_CATEGORIES.forEach((c) => buttons.push(`<button class="pd-filter-btn" data-filter="${c}">${c}</button>`));
  mount.innerHTML = buttons.join("");
  mount.addEventListener("click", (e) => {
    const btn = e.target.closest(".pd-filter-btn");
    if (!btn) return;
    mount.querySelectorAll(".pd-filter-btn").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.getAttribute("data-filter");
    render();
  });
}

function renderStats(items) {
  const mount = document.getElementById("inventory-stats");
  const low = items.filter(isLowStock).length;
  mount.innerHTML = `
    <div class="stat-tile"><div class="stat-tile-label">Total Items</div><div class="stat-tile-value">${items.length}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Low Stock</div><div class="stat-tile-value ${low ? "negative" : "positive"}">${low}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Categories</div><div class="stat-tile-value">${new Set(items.map((i) => i.category)).size}</div></div>
    <div class="stat-tile"><div class="stat-tile-label">Well Stocked</div><div class="stat-tile-value positive">${items.length - low}</div></div>
  `;
}

function render() {
  const all = getInventory();
  renderStats(all);
  const items = activeCategory === "all" ? all : all.filter((i) => i.category === activeCategory);

  const empty = document.getElementById("inventory-empty");
  const tableWrap = document.getElementById("inventory-table-wrap");
  const tbody = document.getElementById("inventory-tbody");

  if (!all.length) {
    empty.style.display = "block";
    tableWrap.style.display = "none";
    return;
  }
  empty.style.display = "none";
  tableWrap.style.display = "block";

  tbody.innerHTML = items
    .map((item) => {
      const low = isLowStock(item);
      return `
      <tr data-id="${item.id}">
        <td><strong>${escapeHtml(item.name)}</strong>${item.notes ? `<br><span style="color:var(--text-muted); font-size:.78rem;">${escapeHtml(item.notes)}</span>` : ""}</td>
        <td>${escapeHtml(item.category)}</td>
        <td class="num">${escapeHtml(item.quantity)}</td>
        <td>${escapeHtml(item.unit || "-")}</td>
        <td><span class="status-badge ${low ? "low" : "ok"}">${low ? "Low Stock" : "OK"}</span></td>
        <td>
          <div class="row-actions">
            <button class="icon-btn" data-action="edit" title="Edit"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></button>
            <button class="icon-btn danger" data-action="delete" title="Delete"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path></svg></button>
          </div>
        </td>
      </tr>`;
    })
    .join("");
}

function openModal(item) {
  const overlay = document.getElementById("item-modal-overlay");
  const form = document.getElementById("item-form");
  form.reset();
  document.getElementById("item-id").value = item ? item.id : "";
  document.getElementById("item-modal-title").textContent = item ? "Edit Item" : "Add Item";
  if (item) {
    document.getElementById("item-name").value = item.name || "";
    document.getElementById("item-category").value = item.category || "Seeds";
    document.getElementById("item-unit").value = item.unit || "";
    document.getElementById("item-quantity").value = item.quantity || "";
    document.getElementById("item-threshold").value = item.lowStockThreshold || "";
    document.getElementById("item-notes").value = item.notes || "";
  }
  overlay.classList.add("open");
}
function closeModal() {
  document.getElementById("item-modal-overlay").classList.remove("open");
}

function wireEvents() {
  document.getElementById("add-item-btn")?.addEventListener("click", () => openModal(null));
  document.getElementById("add-item-btn-2")?.addEventListener("click", () => openModal(null));
  document.getElementById("item-modal-close")?.addEventListener("click", closeModal);
  document.getElementById("item-modal-overlay")?.addEventListener("click", (e) => {
    if (e.target.id === "item-modal-overlay") closeModal();
  });

  document.getElementById("item-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("item-id").value;
    const data = {
      name: document.getElementById("item-name").value.trim(),
      category: document.getElementById("item-category").value,
      unit: document.getElementById("item-unit").value.trim(),
      quantity: document.getElementById("item-quantity").value,
      lowStockThreshold: document.getElementById("item-threshold").value,
      notes: document.getElementById("item-notes").value.trim(),
    };
    if (!data.name) return;
    if (id) updateItem(id, data);
    else createItem(data);
    closeModal();
    render();
  });

  document.getElementById("inventory-tbody")?.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    if (!row) return;
    const id = row.getAttribute("data-id");
    if (e.target.closest('[data-action="edit"]')) {
      const item = getInventory().find((i) => i.id === id);
      openModal(item);
    } else if (e.target.closest('[data-action="delete"]')) {
      if (confirm("Delete this inventory item?")) {
        deleteItem(id);
        render();
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderFilters();
  render();
  wireEvents();
});
