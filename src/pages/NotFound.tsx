import { Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function NotFound({ what = "page" }: { what?: string }) {
  useDocumentTitle("Not found");
  return (
    <section className="wrap grid min-h-[70vh] place-items-center pt-32 text-center">
      <div>
        <div className="display stroke-text text-[clamp(7rem,24vw,16rem)]">
          404
        </div>
        <Compass className="mx-auto -mt-4 text-clay" size={36} />
        <h1 className="display mt-4 text-4xl">That {what} wandered off.</h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The link may be broken or the entry has moved. Let's get you back to
          firm ground.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <LinkButton to="/">Go home</LinkButton>
          <LinkButton to="/search" variant="outline">
            Search
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
