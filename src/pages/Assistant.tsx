import { PageHeader } from "@/components/ui/PageHeader";
import { ChatPanel } from "@/components/chat/ChatPanel";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Assistant() {
  useDocumentTitle("AI assistant");
  return (
    <>
      <PageHeader
        eyebrow="AI farm assistant"
        scene="hero"
        title={
          <>
            Ask your digital{" "}
            <em className="accent-italic !text-lime">agronomist.</em>
          </>
        }
        lead="Crop selection, planting advice, disease diagnosis, weather interpretation and market guidance — in one conversation."
      />
      <section className="wrap mt-8 max-w-3xl">
        <div className="card overflow-hidden">
          <ChatPanel tall className="h-[min(640px,75dvh)]" />
        </div>
        <p className="mt-4 text-center text-xs text-muted">
          General guidance only — for serious outbreaks or animal health
          emergencies, contact your local extension officer or vet.
        </p>
      </section>
    </>
  );
}
