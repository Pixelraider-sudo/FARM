import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EntityCard } from "@/components/ui/Misc";
import { ARTICLES, getArticle } from "@/data";
import { entityImages } from "@/data/images";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import NotFound from "./NotFound";

export default function ArticleDetail() {
  const { slug } = useParams();
  const a = getArticle(slug);
  useDocumentTitle(a?.title);
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const h = document.documentElement; setP(Math.min(100, (window.scrollY / Math.max(1, h.scrollHeight - h.clientHeight)) * 100)); };
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  if (!a) return <NotFound what="article" />;
  const more = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={a.category} title={a.title} image={entityImages("article", a.slug, a.title)}
        crumbs={[{ label: "Home", to: "/" }, { label: "Learning", to: "/learn" }, { label: a.category }]}>
        <span className="label inline-flex items-center gap-2 text-white/70"><Clock size={14} />{a.readTime} · {Math.round(p)}% read</span>
      </PageHeader>
      <article className="wrap mt-12">
        <div className="mx-auto max-w-2xl">
          <p className="font-display text-2xl italic leading-snug text-muted">{a.excerpt}</p>
          <div className="mt-8 space-y-6 text-[1.08rem] leading-[1.8]">
            {a.body.map((para, i) => (
              <p key={i} className={i === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-clay" : ""}>{para}</p>
            ))}
          </div>
          <Link to="/learn" className="mt-10 inline-flex items-center gap-2 font-bold text-brand hover:underline"><ArrowLeft size={16} /> All articles</Link>
        </div>
      </article>
      <section className="wrap mt-20">
        <h2 className="display mb-6 text-4xl">Keep reading</h2>
        <div className="grid gap-5 md:grid-cols-3">
          {more.map((m) => <EntityCard key={m.slug} kind="article" slug={m.slug} name={m.title} to={`/learn/${m.slug}`} meta={m.category} blurb={m.excerpt} />)}
        </div>
      </section>
    </>
  );
}
