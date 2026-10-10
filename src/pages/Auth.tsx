import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Img } from "@/components/ui/Img";
import { Button, LinkButton } from "@/components/ui/Button";
import { SelectField, TextField } from "@/components/ui/Field";
import { Logo } from "@/components/layout/Logo";
import { SCENES } from "@/data/images";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import type { ReactNode } from "react";

/** TODO: replace with real authentication. Nothing is stored or transmitted here. */
const fakeRequest = () => new Promise<void>((r) => setTimeout(r, 1000));
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Shell({
  scene,
  quote,
  children,
}: {
  scene: string[];
  quote: string;
  children: ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden overflow-hidden bg-[#12261b] lg:block">
        <Img srcs={scene} alt="" className="!absolute inset-0" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[#12261b] via-[#12261b]/20 to-[#12261b]/30" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-[#f4efe4]">
          <p className="display max-w-lg text-5xl">{quote}</p>
        </div>
      </div>
      <div className="flex flex-col px-5 py-8 sm:px-12">
        <div className="mb-8">
          <Logo />
        </div>
        <div className="m-auto w-full max-w-md py-8">{children}</div>
      </div>
    </div>
  );
}

function Password({
  id,
  label,
  value,
  onChange,
  error,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <TextField
        id={id}
        label={label}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        error={error}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-3 top-[2.35rem] grid h-8 w-8 place-items-center rounded-full text-muted hover:bg-surface2"
      >
        {show ? <EyeOff size={17} /> : <Eye size={17} />}
      </button>
    </div>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <div className="text-center">
      <CheckCircle2 size={60} className="mx-auto text-brand" />
      <h2 className="display mt-4 text-4xl">{title}</h2>
      <p className="mt-2 text-muted">{body}</p>
      <div className="mt-6 flex justify-center gap-3">
        <LinkButton to="/dashboard">Go to dashboard</LinkButton>
        <LinkButton to="/crops" variant="outline">
          Browse crops
        </LinkButton>
      </div>
    </div>
  );
}

export function Login() {
  useDocumentTitle("Log in");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!EMAIL_RE.test(email)) er.email = "Enter a valid email address.";
    if (pw.length < 6) er.pw = "Password must be at least 6 characters.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    await fakeRequest();
    setBusy(false);
    setDone(true);
  };
  return (
    <Shell scene={SCENES.login} quote="Welcome back to the field.">
      {done ? (
        <Success title="Welcome back!" body="You're signed in (demo)." />
      ) : (
        <>
          <span className="label text-clay">Welcome back</span>
          <h1 className="display mb-8 mt-2 text-5xl">Log in</h1>
          <form onSubmit={submit} noValidate className="space-y-4">
            <TextField
              id="l-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={err.email}
            />
            <Password
              id="l-pw"
              label="Password"
              value={pw}
              onChange={setPw}
              error={err.pw}
              autoComplete="current-password"
            />
            <Button type="submit" size="lg" className="w-full" disabled={busy}>
              {busy ? "Signing in…" : "Log in"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            New to AgriSense?{" "}
            <Link
              to="/register"
              className="font-bold text-brand hover:underline"
            >
              Create an account
            </Link>
          </p>
        </>
      )}
    </Shell>
  );
}

export function Register() {
  useDocumentTitle("Register");
  const [d, setD] = useState({
    name: "",
    phone: "",
    email: "",
    county: "",
    crop: "",
    pw: "",
  });
  const [err, setErr] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const set = (k: keyof typeof d) => (e: { target: { value: string } }) =>
    setD((p) => ({ ...p, [k]: e.target.value }));
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const er: Record<string, string> = {};
    if (!d.name.trim()) er.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{6,}$/.test(d.phone.trim()))
      er.phone = "Enter a valid phone number.";
    if (!EMAIL_RE.test(d.email)) er.email = "Enter a valid email address.";
    if (!d.county.trim()) er.county = "Tell us your county or region.";
    if (d.pw.length < 8) er.pw = "Use at least 8 characters.";
    setErr(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    await fakeRequest();
    setBusy(false);
    setDone(true);
  };
  return (
    <Shell scene={SCENES.register} quote="Harvest success starts here.">
      {done ? (
        <Success
          title="Welcome to AgriSense!"
          body="Your account is ready (demo)."
        />
      ) : (
        <>
          <span className="label text-clay">Join free</span>
          <h1 className="display mb-2 mt-2 text-5xl">Create account</h1>
          <p className="mb-7 text-muted">
            Get personalised planting alerts and save your farms, stock and
            finances.
          </p>
          <form
            onSubmit={submit}
            noValidate
            className="grid gap-4 sm:grid-cols-2"
          >
            <TextField
              wrapperClassName="sm:col-span-2"
              id="r-name"
              label="Full name"
              autoComplete="name"
              value={d.name}
              onChange={set("name")}
              error={err.name}
            />
            <TextField
              id="r-phone"
              label="Phone number"
              type="tel"
              autoComplete="tel"
              value={d.phone}
              onChange={set("phone")}
              error={err.phone}
            />
            <TextField
              id="r-email"
              label="Email"
              type="email"
              autoComplete="email"
              value={d.email}
              onChange={set("email")}
              error={err.email}
            />
            <TextField
              id="r-county"
              label="County / region"
              value={d.county}
              onChange={set("county")}
              error={err.county}
            />
            <SelectField
              id="r-crop"
              label="Main crop"
              value={d.crop}
              onChange={set("crop")}
              options={[
                { value: "", label: "Select a crop" },
                ...[
                  "Maize",
                  "Beans",
                  "Tomatoes",
                  "Potatoes",
                  "Rice",
                  "Coffee",
                  "Tea",
                  "Other",
                ],
              ]}
            />
            <div className="sm:col-span-2">
              <Password
                id="r-pw"
                label="Password"
                value={d.pw}
                onChange={(v) => setD((p) => ({ ...p, pw: v }))}
                error={err.pw}
                autoComplete="new-password"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full sm:col-span-2"
              disabled={busy}
            >
              {busy ? "Creating…" : "Create account"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            Already registered?{" "}
            <Link to="/login" className="font-bold text-brand hover:underline">
              Log in
            </Link>
          </p>
        </>
      )}
    </Shell>
  );
}
