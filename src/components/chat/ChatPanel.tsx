import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { RotateCcw, SendHorizonal, Sprout } from "lucide-react";
import { QUICK_REPLIES, useChat } from "@/lib/chat";
import { cn } from "@/lib/utils";

export function ChatPanel({
  tall,
  className,
}: {
  tall?: boolean;
  className?: string;
}) {
  const { messages, loading, send, reset, live } = useChat();
  const [text, setText] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    send(text);
    setText("");
  };

  return (
    <div className={cn("flex flex-col overflow-hidden", className)}>
      <div
        className={cn(
          "flex-1 space-y-4 overflow-y-auto bg-bg2/60 p-4 sm:p-5",
          tall ? "min-h-[420px]" : "min-h-0",
        )}
        role="log"
        aria-live="polite"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex gap-2.5",
              m.role === "user" && "flex-row-reverse",
            )}
          >
            {m.role === "bot" && (
              <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-limeink">
                <Sprout size={16} />
              </span>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-3xl px-4 py-3 text-[0.94rem] leading-relaxed",
                m.role === "user"
                  ? "rounded-br-lg bg-fg text-bg"
                  : "rounded-bl-lg border border-line bg-surface",
              )}
            >
              {m.text}
              {m.links && m.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {m.links.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="rounded-full bg-lime px-3 py-1 text-xs font-bold text-limeink hover:brightness-95"
                    >
                      {l.label} →
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-limeink">
              <Sprout size={16} />
            </span>
            <div
              className="typing rounded-3xl rounded-bl-lg border border-line bg-surface px-4 py-4 text-muted"
              aria-label="Typing"
            >
              <span />
              <span />
              <span />
            </div>
          </div>
        )}
        <div ref={end} />
      </div>

      <div className="border-t border-line bg-surface p-3 sm:p-4">
        {messages.length <= 1 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {QUICK_REPLIES.map((q) => (
              <button key={q} onClick={() => send(q)} className="chip !text-xs">
                {q}
              </button>
            ))}
          </div>
        )}
        <form onSubmit={submit} className="flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask about crops, pests, prices…"
            aria-label="Message"
            className="input !rounded-full"
            maxLength={500}
          />
          <button
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-fg text-bg hover:bg-brand hover:text-brandfg disabled:opacity-40"
            disabled={!text.trim() || loading}
            aria-label="Send"
          >
            <SendHorizonal size={18} />
          </button>
        </form>
        <div className="mt-2 flex items-center justify-between text-[0.7rem] text-muted">
          <span>
            {live
              ? "Live AI advisor"
              : "Offline advisor · answers from the AgriSense library"}
          </span>
          <button
            onClick={reset}
            className="flex items-center gap-1 hover:text-fg"
          >
            <RotateCcw size={11} /> New chat
          </button>
        </div>
      </div>
    </div>
  );
}
