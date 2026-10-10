import { useState, type FormEvent } from "react";
import { Heart, MessageCircle, PenLine, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { TextArea, TextField } from "@/components/ui/Field";
import { RowActions } from "@/components/ui/CrudBits";
import { useCollection } from "@/hooks/useCollection";
import { STORAGE_KEYS } from "@/lib/storage";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { timeAgo } from "@/lib/utils";
import type { CommunityPost } from "@/types";

const SEED: Array<Omit<CommunityPost, "id" | "createdAt">> = [
  { author: "Wanjiru K.", title: "Best time to top-dress maize this season?", body: "My maize is about 5 weeks old. Rains have been inconsistent — should I wait or top-dress now?", tag: "Maize", likes: 4, comments: [{ author: "Mutiso J.", text: "I'd top-dress now if there's any moisture in the soil — waiting too long costs more yield than a slightly dry application." }] },
  { author: "Achieng O.", title: "Tuta absoluta taking over my tomatoes", body: "Tried pheromone traps but still losing fruit. Any organic options that actually work?", tag: "Tomatoes", likes: 7, comments: [] },
  { author: "Otieno B.", title: "Anyone using tissue-culture bananas?", body: "Thinking of switching from suckers to tissue-culture plantlets for disease resistance. Worth the extra cost?", tag: "Banana", likes: 3, comments: [{ author: "Wanjiru K.", text: "Yes — the disease resistance alone paid for itself within two seasons for me." }] },
];
const initials = (n: string) => n.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();

function Post({ p, onLike, onComment, onDelete }: { p: CommunityPost; onLike: () => void; onComment: (a: string, t: string) => void; onDelete: () => void }) {
  const [showC, setShowC] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [liked, setLiked] = useState(false);
  return (
    <article className="card p-6">
      <div className="flex items-start gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime font-bold text-limeink">{initials(p.author)}</span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-sm"><strong>{p.author}</strong><span className="text-muted">· {timeAgo(p.createdAt)}</span>{p.tag && <span className="chip !py-0.5 !text-xs">{p.tag}</span>}</div>
          <h3 className="mt-1 text-2xl">{p.title}</h3><p className="mt-2 text-muted">{p.body}</p>
        </div>
        <RowActions label={p.title} onDelete={onDelete} />
      </div>
      <div className="mt-4 flex gap-2 pl-16">
        <button onClick={() => { if (!liked) { setLiked(true); onLike(); } }} aria-pressed={liked} className={`chip ${liked ? "!border-clay !text-clay" : ""}`}><Heart size={14} fill={liked ? "currentColor" : "none"} />{p.likes}</button>
        <button onClick={() => setShowC((s) => !s)} className="chip"><MessageCircle size={14} />{p.comments.length}</button>
      </div>
      {showC && (
        <div className="mt-4 space-y-3 pl-16">
          {p.comments.map((c, i) => <div key={i} className="rounded-2xl bg-surface2 p-4 text-sm"><strong>{c.author}</strong><p className="mt-1 text-muted">{c.text}</p></div>)}
          <form onSubmit={(e) => { e.preventDefault(); if (text.trim()) { onComment(name.trim() || "Farmer", text.trim()); setText(""); } }} className="flex flex-wrap gap-2">
            <input className="input !w-32 !rounded-full" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} aria-label="Your name" />
            <input className="input !w-0 min-w-40 flex-1 !rounded-full" placeholder="Add a reply…" value={text} onChange={(e) => setText(e.target.value)} aria-label="Reply" />
            <button className="grid h-12 w-12 place-items-center rounded-full bg-fg text-bg" aria-label="Post reply"><Send size={16} /></button>
          </form>
        </div>
      )}
    </article>
  );
}

export default function Community() {
  useDocumentTitle("Community");
  const posts = useCollection<CommunityPost>(STORAGE_KEYS.COMMUNITY_POSTS, "post", SEED);
  const [open, setOpen] = useState(false);
  const [d, setD] = useState({ author: "", title: "", body: "", tag: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!d.title.trim()) er.title = "Add a title.";
    if (!d.body.trim()) er.body = "Describe your question.";
    setErr(er);
    if (Object.keys(er).length) return;
    posts.add({ ...d, author: d.author.trim() || "Farmer", likes: 0, comments: [] });
    setD({ author: "", title: "", body: "", tag: "" }); setOpen(false);
  };
  return (
    <>
      <PageHeader eyebrow="Community" scene="community" title={<>Farmers <em className="accent-italic !text-lime">helping</em> farmers.</>} lead="Ask a question, share what worked, learn from your neighbours.">
        <Button variant="lime" onClick={() => setOpen(true)}><PenLine size={18} /> Ask a question</Button>
      </PageHeader>
      <section className="wrap mt-10 max-w-3xl space-y-4">
        {posts.items.map((p) => (
          <Post key={p.id} p={p} onLike={() => posts.update(p.id, { likes: p.likes + 1 })} onComment={(a, t) => posts.update(p.id, { comments: [...p.comments, { author: a, text: t }] })} onDelete={() => posts.remove(p.id)} />
        ))}
        <p className="pt-4 text-center text-xs text-muted">Posts are stored in this browser only until a shared backend is connected.</p>
      </section>
      <Modal open={open} onClose={() => setOpen(false)} title="Ask the community">
        <form onSubmit={submit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2"><TextField id="p-author" label="Your name" value={d.author} onChange={(e) => setD({ ...d, author: e.target.value })} /><TextField id="p-tag" label="Topic" placeholder="Maize" value={d.tag} onChange={(e) => setD({ ...d, tag: e.target.value })} /></div>
          <TextField id="p-title" label="Title" value={d.title} onChange={(e) => setD({ ...d, title: e.target.value })} error={err.title} />
          <TextArea id="p-body" label="Details" value={d.body} onChange={(e) => setD({ ...d, body: e.target.value })} error={err.body} />
          <div className="flex justify-end gap-3"><Button type="button" variant="ghost" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Post</Button></div>
        </form>
      </Modal>
    </>
  );
}
