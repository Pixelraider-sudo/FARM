import type { ReactNode } from "react";
import { Trash2, Pencil } from "lucide-react";

export function RowActions({
  onEdit,
  onDelete,
  label,
}: {
  onEdit?: () => void;
  onDelete: () => void;
  label: string;
}) {
  return (
    <div className="flex gap-1">
      {onEdit && (
        <button
          onClick={onEdit}
          aria-label={`Edit ${label}`}
          className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-fg hover:text-bg"
        >
          <Pencil size={15} />
        </button>
      )}
      <button
        onClick={() => confirm(`Delete "${label}"?`) && onDelete()}
        aria-label={`Delete ${label}`}
        className="grid h-9 w-9 place-items-center rounded-full text-muted hover:bg-clay hover:text-white"
      >
        <Trash2 size={15} />
      </button>
    </div>
  );
}

export function StatTile({
  label,
  value,
  tone,
  sub,
}: {
  label: string;
  value: ReactNode;
  tone?: "good" | "bad";
  sub?: string;
}) {
  return (
    <div className="card p-5">
      <div className="label text-muted">{label}</div>
      <div
        className={`font-display mt-2 text-4xl leading-none ${tone === "good" ? "text-brand" : tone === "bad" ? "text-clay" : ""}`}
      >
        {value}
      </div>
      {sub && <div className="mt-1.5 text-xs text-muted">{sub}</div>}
    </div>
  );
}
