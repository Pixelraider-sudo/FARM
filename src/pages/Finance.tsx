import { useMemo, useState, type FormEvent } from "react";
import { ArrowDownRight, ArrowUpRight, Plus, Wallet } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SelectField, TextField } from "@/components/ui/Field";
import { Chips, EmptyState } from "@/components/ui/Misc";
import { RowActions, StatTile } from "@/components/ui/CrudBits";
import { useCollection } from "@/hooks/useCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn, fmtDate, fmtMoney, todayISO } from "@/lib/utils";
import type { Transaction } from "@/types";

const blank = () => ({
  type: "expense" as "income" | "expense",
  amount: "",
  category: "",
  date: todayISO(),
  description: "",
});

export default function Finance() {
  useDocumentTitle("Finance");
  const fin = useCollection<Transaction>(STORAGE_KEYS.FINANCE, "txn");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);
  const [d, setD] = useState(blank());
  const [errors, setErrors] = useState<Record<string, string>>({});

  const txns = useMemo(
    () => [...fin.items].sort((a, b) => b.date.localeCompare(a.date)),
    [fin.items],
  );
  const sum = useMemo(() => {
    const income = txns
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
    const expenses = txns
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + (parseFloat(t.amount) || 0), 0);
    return { income, expenses, profit: income - expenses };
  }, [txns]);
  const monthly = useMemo(() => {
    const by: Record<string, { income: number; expenses: number }> = {};
    txns.forEach((t) => {
      const m = t.date.slice(0, 7);
      by[m] ??= { income: 0, expenses: 0 };
      by[m][t.type === "income" ? "income" : "expenses"] +=
        parseFloat(t.amount) || 0;
    });
    return Object.entries(by)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6);
  }, [txns]);
  const maxM = Math.max(
    1,
    ...monthly.flatMap(([, v]) => [v.income, v.expenses]),
  );
  const shown = txns.filter(
    (t) => filter === "All" || t.type === filter.toLowerCase(),
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!(parseFloat(d.amount) > 0)) er.amount = "Enter an amount above 0.";
    if (!d.date) er.date = "Pick a date.";
    setErrors(er);
    if (Object.keys(er).length) return;
    fin.add(d);
    setOpen(false);
  };

  return (
    <>
      <PageHeader
        eyebrow="Finance"
        scene="market"
        title={
          <>
            Know your <em className="accent-italic !text-lime">margin.</em>
          </>
        }
        lead="Log income and expenses and watch profit by month."
      >
        <Button
          variant="lime"
          onClick={() => {
            setD(blank());
            setErrors({});
            setOpen(true);
          }}
        >
          <Plus size={18} /> Add transaction
        </Button>
      </PageHeader>
      <section className="wrap mt-10 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatTile label="Income" value={fmtMoney(sum.income)} tone="good" />
          <StatTile
            label="Expenses"
            value={fmtMoney(sum.expenses)}
            tone="bad"
          />
          <StatTile
            label="Net profit"
            value={fmtMoney(sum.profit)}
            tone={sum.profit >= 0 ? "good" : "bad"}
            sub={
              sum.income
                ? `${((sum.profit / sum.income) * 100).toFixed(0)}% margin`
                : undefined
            }
          />
        </div>

        {monthly.length > 0 && (
          <div className="card p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-3xl">By month</h3>
              <div className="flex gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <i className="h-3 w-3 rounded bg-brand" />
                  Income
                </span>
                <span className="flex items-center gap-1.5">
                  <i className="h-3 w-3 rounded bg-clay" />
                  Expenses
                </span>
              </div>
            </div>
            <div
              className="flex h-48 items-end gap-3 sm:gap-6"
              role="img"
              aria-label="Monthly income and expenses bar chart"
            >
              {monthly.map(([m, v]) => (
                <div
                  key={m}
                  className="flex h-full flex-1 flex-col justify-end gap-2"
                >
                  <div className="flex flex-1 items-end justify-center gap-1.5">
                    <div
                      title={fmtMoney(v.income)}
                      className="w-full max-w-8 rounded-t-lg bg-brand transition-all"
                      style={{ height: `${(v.income / maxM) * 100}%` }}
                    />
                    <div
                      title={fmtMoney(v.expenses)}
                      className="w-full max-w-8 rounded-t-lg bg-clay transition-all"
                      style={{ height: `${(v.expenses / maxM) * 100}%` }}
                    />
                  </div>
                  <span className="label text-center text-muted !text-[0.62rem]">
                    {m}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Chips
          options={["All", "Income", "Expense"]}
          value={filter}
          onChange={setFilter}
        />
        {shown.length === 0 ? (
          <EmptyState
            icon={Wallet}
            title="No transactions yet"
            body="Record seed purchases, labour, and sales to see your real margin."
            action={
              <Button onClick={() => setOpen(true)}>
                <Plus size={18} /> Add transaction
              </Button>
            }
          />
        ) : (
          <ul className="card divide-y divide-line overflow-hidden">
            {shown.map((t) => (
              <li key={t.id} className="flex items-center gap-4 px-5 py-4">
                <span
                  className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-full",
                    t.type === "income"
                      ? "bg-brand/12 text-brand"
                      : "bg-clay/12 text-clay",
                  )}
                >
                  {t.type === "income" ? <ArrowUpRight /> : <ArrowDownRight />}
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block truncate">
                    {t.category || (t.type === "income" ? "Income" : "Expense")}
                  </strong>
                  <span className="block truncate text-sm text-muted">
                    {fmtDate(t.date)}
                    {t.description && ` · ${t.description}`}
                  </span>
                </span>
                <span
                  className={cn(
                    "font-mono font-bold",
                    t.type === "income" ? "text-brand" : "text-clay",
                  )}
                >
                  {t.type === "income" ? "+" : "−"}
                  {fmtMoney(parseFloat(t.amount) || 0)}
                </span>
                <RowActions
                  label={t.category || "transaction"}
                  onDelete={() => fin.remove(t.id)}
                />
              </li>
            ))}
          </ul>
        )}
      </section>
      <Modal open={open} onClose={() => setOpen(false)} title="Add transaction">
        <form
          onSubmit={submit}
          className="grid gap-4 sm:grid-cols-2"
          noValidate
        >
          <SelectField
            id="t-type"
            label="Type"
            value={d.type}
            onChange={(e) =>
              setD({ ...d, type: e.target.value as "income" | "expense" })
            }
            options={[
              { value: "income", label: "Income" },
              { value: "expense", label: "Expense" },
            ]}
          />
          <TextField
            id="t-amount"
            label="Amount (KSh)"
            type="number"
            step="0.01"
            value={d.amount}
            onChange={(e) => setD({ ...d, amount: e.target.value })}
            error={errors.amount}
          />
          <TextField
            id="t-cat"
            label="Category"
            placeholder="Seed purchase, Maize sale"
            value={d.category}
            onChange={(e) => setD({ ...d, category: e.target.value })}
          />
          <TextField
            id="t-date"
            label="Date"
            type="date"
            value={d.date}
            onChange={(e) => setD({ ...d, date: e.target.value })}
            error={errors.date}
          />
          <TextField
            wrapperClassName="sm:col-span-2"
            id="t-desc"
            label="Description"
            value={d.description}
            onChange={(e) => setD({ ...d, description: e.target.value })}
          />
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
