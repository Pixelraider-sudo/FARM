import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface Props { open: boolean; title: string; onClose: () => void; children: ReactNode }

export function Modal({ open, title, onClose, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-[#0d1912]/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            role="dialog" aria-modal="true" aria-label={title}
            className="card relative max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8"
            initial={{ y: 30, scale: 0.97 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="display text-3xl">{title}</h3>
              <button onClick={onClose} aria-label="Close" className="grid h-10 w-10 place-items-center rounded-full border border-line hover:bg-fg hover:text-bg"><X size={18} /></button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
