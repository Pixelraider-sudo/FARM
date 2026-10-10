import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, Sprout, X } from "lucide-react";
import { ChatPanel } from "./ChatPanel";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog" aria-label="AgriSense advisor"
            initial={{ opacity: 0, y: 24, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="card fixed bottom-24 right-4 z-[55] flex h-[min(620px,calc(100dvh-8rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden origin-bottom-right"
          >
            <div className="flex items-center gap-3 bg-[#12261b] px-5 py-4 text-[#f4efe4]">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-lime text-limeink"><Sprout size={20} /></span>
              <div className="flex-1"><div className="font-display text-xl leading-none">Farm Advisor</div><div className="mt-1 flex items-center gap-1.5 text-xs text-white/60"><span className="h-1.5 w-1.5 rounded-full bg-lime" />Online</div></div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"><X size={18} /></button>
            </div>
            <ChatPanel className="min-h-0 flex-1" />
          </motion.section>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)} aria-label={open ? "Close chat" : "Open farm advisor chat"} aria-expanded={open}
        className="fixed bottom-5 right-4 z-[55] flex items-center gap-2 rounded-full bg-lime py-3.5 pl-5 pr-6 font-bold text-limeink shadow-[0_14px_34px_-10px_rgb(0_0_0/0.5)] transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}<span className="hidden sm:inline">{open ? "Close" : "Ask the advisor"}</span>
      </button>
    </>
  );
}
