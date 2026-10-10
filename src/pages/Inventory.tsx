import { useMemo, useState, type FormEvent } from "react";
import { AlertTriangle, Boxes, Plus } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { SelectField, TextArea, TextField } from "@/components/ui/Field";
import { Chips, EmptyState } from "@/components/ui/Misc";
import { RowActions, StatTile } from "@/components/ui/CrudBits";
import { useCollection } from "@/hooks/useCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { cn } from "@/lib/utils";
import type { InventoryItem } from "@/types";

export const INVENTORY_CATEGORIES = [
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Tools",
  "Equipment",
  "Feed",
  "Medicine",
];
export const isLowStock = (i: InventoryItem) => {
  const q = parseFloat(i.quantity),
    t = parseFloat(i.lowStockThreshold);
  return !isNaN(q) && !isNaN(t) && q <= t;
};
const BLANK = {
  name: "",
  category: "Seeds",
  quantity: "",
  unit: "",
  lowStockThreshold: "",
  notes: "",
};

export default function Inventory() {
  useDocumentTitle("Inventory");
  const inv = useCollection<InventoryItem>(STORAGE_KEYS.INVENTORY, "inv");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [d, setD] = useState(BLANK);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const set = (k: keyof typeof BLANK) => (e: { target: { value: string } }) =>
    setD((p) => ({ ...p, [k]: e.target.value }));

  const low = useMemo(() => inv.items.filter(isLowStock), [inv.items]);
  const shown = inv.items.filter((i) => cat === "All" || i.category === cat);

  const openNew = () => {
    setEditId(null);
    setD(BLANK);
    setErrors({});
    setOpen(true);
  };
  const openEdit = (i: InventoryItem) => {
    setEditId(i.id);
    setD({
      name: i.name,
      category: i.category,
      quantity: i.quantity,
      unit: i.unit,
      lowStockThreshold: i.lowStockThreshold,
      notes: i.notes,
    });
    setErrors({});
    setOpen(true);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!d.name.trim()) er.name = "Item name is required.";
    if (d.quantity === "" || isNaN(parseFloat(d.quantity)))
      er.quantity = "Enter a quantity.";
    setErrors(er);
    if (Object.keys(er).length) return;
    editId ? inv.update(editId, d) : inv.add(d);
    setOpen(false);
  };

  return (
    <>
      <PageHeader
        eyebrow="Inventory"
        scene="soil"
        title={
          <>
            Never run out{" "}
            <em className="accent-italic !text-lime">mid-season.</em>
          </>
        }
        lead="Track seed, fertilizer, feed and tools — with low-stock warnings."
      >
        <Button variant="lime" onClick={openNew}>
          <Plus size={18} /> Add item
        </Button>
      </PageHeader>
      <section className="wrap mt-10 space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatTile label="Items" value={inv.items.length} />
          <StatTile
            label="Low stock"
            value={low.length}
            tone={low.length ? "bad" : "good"}
          />
          <StatTile
            label="Categories in use"
            value={new Set(inv.items.map((i) => i.category)).size}
          />
        </div>
        {low.length > 0 && (
          <div className="flex items-start gap-3 rounded-3xl border border-clay/40 bg-clay/10 p-5">
            <AlertTriangle className="mt-0.5 shrink-0 text-clay" />
            <p>
              <strong>Running low:</strong> {low.map((i) => i.name).join(", ")}.
            </p>
          </div>
        )}
        <Chips
          options={["All", ...INVENTORY_CATEGORIES]}
          value={cat}
          onChange={setCat}
        />
        {shown.length === 0 ? (
          <EmptyState
            icon={Boxes}
            title={
              inv.items.length
                ? "Nothing in this category"
                : "Your store is empty"
            }
            body="Add seed, fertilizer, feed and tools to track quantities and get low-stock warnings."
            action={
              <Button onClick={openNew}>
                <Plus size={18} /> Add item
              </Button>
            }
          />
        ) : (
          <div className="card overflow-x-auto">
            <table className="w-full min-w-[620px] text-left">
              <thead>
                <tr className="label border-b border-line text-muted">
                  <th className="px-5 py-4">Item</th>
                  <th>Category</th>
                  <th className="text-right">Quantity</th>
                  <th className="text-right">Alert at</th>
                  <th className="w-24" />
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {shown.map((i) => (
                  <tr key={i.id} className={cn(isLowStock(i) && "bg-clay/8")}>
                    <td className="px-5 py-4">
                      <strong>{i.name}</strong>
                      {isLowStock(i) && (
                        <span className="label ml-2 rounded-full bg-clay px-2 py-0.5 text-white !text-[0.6rem]">
                          Low
                        </span>
                      )}
                      {i.notes && (
                        <div className="text-xs text-muted">{i.notes}</div>
                      )}
                    </td>
                    <td>
                      <span className="chip !py-1 !text-xs">{i.category}</span>
                    </td>
                    <td className="text-right font-mono font-semibold">
                      {i.quantity} {i.unit}
                    </td>
                    <td className="text-right font-mono text-muted">
                      {i.lowStockThreshold || "—"}
                    </td>
                    <td className="pr-3">
                      <RowActions
                        label={i.name}
                        onEdit={() => openEdit(i)}
                        onDelete={() => inv.remove(i.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={editId ? "Edit item" : "Add item"}
      >
        <form
          onSubmit={submit}
          className="grid gap-4 sm:grid-cols-2"
          noValidate
        >
          <TextField
            wrapperClassName="sm:col-span-2"
            id="i-name"
            label="Item name"
            value={d.name}
            onChange={set("name")}
            error={errors.name}
          />
          <SelectField
            id="i-cat"
            label="Category"
            value={d.category}
            onChange={set("category")}
            options={INVENTORY_CATEGORIES}
          />
          <TextField
            id="i-unit"
            label="Unit"
            placeholder="kg, litres, pieces"
            value={d.unit}
            onChange={set("unit")}
          />
          <TextField
            id="i-qty"
            label="Quantity"
            type="number"
            step="any"
            value={d.quantity}
            onChange={set("quantity")}
            error={errors.quantity}
          />
          <TextField
            id="i-low"
            label="Low-stock threshold"
            type="number"
            step="any"
            value={d.lowStockThreshold}
            onChange={set("lowStockThreshold")}
            hint="Warn when quantity falls to this level."
          />
          <TextArea
            wrapperClassName="sm:col-span-2"
            id="i-notes"
            label="Notes"
            rows={2}
            value={d.notes}
            onChange={set("notes")}
          />
          <div className="flex justify-end gap-3 sm:col-span-2">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editId ? "Save changes" : "Add item"}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
