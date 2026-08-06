/* =========================================================
   AgriSense — Finance Service (ES6 Module)
========================================================= */

import { getAll, create, remove, STORAGE_KEYS } from "./storage-service.js";

export function getTransactions() {
  return getAll(STORAGE_KEYS.FINANCE).sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function addTransaction(data) {
  return create(STORAGE_KEYS.FINANCE, data, "txn");
}

export function deleteTransaction(id) {
  return remove(STORAGE_KEYS.FINANCE, id);
}

export function getSummary() {
  const txns = getTransactions();
  const income = txns.filter((t) => t.type === "income").reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  const expenses = txns.filter((t) => t.type === "expense").reduce((sum, t) => sum + parseFloat(t.amount || 0), 0);
  return { income, expenses, profit: income - expenses };
}

export function getMonthlyBreakdown() {
  const txns = getTransactions();
  const byMonth = {};
  txns.forEach((t) => {
    const month = (t.date || "").slice(0, 7); // YYYY-MM
    if (!byMonth[month]) byMonth[month] = { income: 0, expenses: 0 };
    if (t.type === "income") byMonth[month].income += parseFloat(t.amount || 0);
    else byMonth[month].expenses += parseFloat(t.amount || 0);
  });
  return Object.entries(byMonth)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, vals]) => ({ month, ...vals }));
}
