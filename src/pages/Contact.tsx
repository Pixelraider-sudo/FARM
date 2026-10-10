import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/Button";
import { TextArea, TextField } from "@/components/ui/Field";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

/** TODO: replace with a real POST to your backend / form service. */
const sendMessage = (_data: Record<string, string>) =>
  new Promise<void>((r) => setTimeout(r, 900));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  useDocumentTitle("Contact");
  const [d, setD] = useState({ name: "", email: "", subject: "", message: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const bind = (k: keyof typeof d) => ({
    value: d[k],
    onChange: (e: { target: { value: string } }) =>
      setD((p) => ({ ...p, [k]: e.target.value })),
    error: err[k],
  });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!d.name.trim()) er.name = "Please enter your name.";
    if (!EMAIL_RE.test(d.email)) er.email = "Please enter a valid email.";
    if (!d.subject.trim()) er.subject = "Please enter a subject.";
    if (!d.message.trim()) er.message = "Please enter a message.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    await sendMessage(d);
    setBusy(false);
    setDone(true);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        scene="community"
        title={
          <>
            Let's <em className="accent-italic !text-lime">talk.</em>
          </>
        }
        lead="Questions, feedback or partnership ideas — we reply within one to two business days."
      />
      <section className="wrap mt-10 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <div className="card flex items-center gap-4 p-6">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-lime text-limeink">
              <Mail size={20} />
            </span>
            <div>
              <div className="label text-muted">Email</div>
              <strong>hello@agrisense.example</strong>
            </div>
          </div>
          <div className="card flex items-center gap-4 p-6">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-lime text-limeink">
              <MapPin size={20} />
            </span>
            <div>
              <div className="label text-muted">Based in</div>
              <strong>Kenya · serving East Africa</strong>
            </div>
          </div>
        </div>
        <div className="card p-6 sm:p-8">
          {done ? (
            <div className="grid place-items-center py-10 text-center">
              <CheckCircle2 size={56} className="text-brand" />
              <h3 className="mt-4 text-4xl">Message sent</h3>
              <p className="mt-2 text-muted">
                Thanks for reaching out — we'll reply within 1–2 business days.
              </p>
              <Button
                className="mt-6"
                variant="outline"
                onClick={() => {
                  setDone(false);
                  setD({ name: "", email: "", subject: "", message: "" });
                }}
              >
                Send another
              </Button>
            </div>
          ) : (
            <form
              onSubmit={submit}
              noValidate
              className="grid gap-4 sm:grid-cols-2"
            >
              <TextField
                id="c-name"
                label="Full name"
                autoComplete="name"
                {...bind("name")}
              />
              <TextField
                id="c-email"
                label="Email"
                type="email"
                autoComplete="email"
                {...bind("email")}
              />
              <TextField
                wrapperClassName="sm:col-span-2"
                id="c-subject"
                label="Subject"
                {...bind("subject")}
              />
              <TextArea
                wrapperClassName="sm:col-span-2"
                id="c-msg"
                label="Message"
                rows={6}
                {...bind("message")}
              />
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={busy}>
                  {busy ? (
                    "Sending…"
                  ) : (
                    <>
                      Send message <Send size={16} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
