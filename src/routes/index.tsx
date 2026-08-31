import { createFileRoute, Link } from "@tanstack/react-router";
import { Stethoscope, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sign In · MediKiosk Doctor Portal" },
      {
        name: "description",
        content:
          "Secure sign-in for the MediKiosk Doctor Portal — review kiosk intake cases, patient history and prescriptions.",
      },
      { property: "og:title", content: "Sign In · MediKiosk Doctor Portal" },
      {
        property: "og:description",
        content: "Secure sign-in for the MediKiosk Doctor Portal clinical workstation.",
      },
    ],
  }),
  component: Login,
});

function Login() {
  return (
    <div className="grid min-h-screen bg-background lg:grid-cols-[1fr_520px]">
      <div className="hidden flex-col justify-between bg-primary p-12 lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-primary-foreground/15 text-primary-foreground">
            <Stethoscope className="size-5" />
          </span>
          <span className="text-[17px] font-extrabold tracking-tight text-primary-foreground">
            MediKiosk
          </span>
        </div>
        <div className="max-w-md">
          <h2 className="text-4xl leading-tight font-extrabold tracking-tight text-primary-foreground">
            Every case, prepared before the patient walks in.
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Kiosk intake captures vitals, history and complaints. You get a verified, summarised
            case file ready for clinical review.
          </p>
          <div className="mt-10 grid grid-cols-3 gap-4">
            {[
              ["24", "Cases today"],
              ["5", "Kiosks online"],
              ["98%", "Verified intakes"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl bg-primary-foreground/10 p-4">
                <p className="text-2xl font-extrabold text-primary-foreground">{v}</p>
                <p className="mt-1 text-xs text-primary-foreground/75">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-primary-foreground/60">
          © 2026 MediKiosk Health Systems · City Hospital deployment
        </p>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-card">
          <div className="flex flex-col items-center text-center">
            <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground">
              <Stethoscope className="size-6" />
            </span>
            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-foreground">
              Medi<span className="text-primary">Kiosk</span>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Doctor Portal</p>
          </div>

          <div className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="hid"
                className="mb-1.5 block text-xs font-semibold text-muted-foreground"
              >
                Hospital / Doctor ID
              </label>
              <input
                id="hid"
                defaultValue="CH-GASTRO-0442"
                className="h-11 w-full rounded-xl border border-border bg-muted px-3.5 text-sm outline-none focus:border-primary focus:bg-card"
              />
            </div>
            <div>
              <label
                htmlFor="pwd"
                className="mb-1.5 block text-xs font-semibold text-muted-foreground"
              >
                Password
              </label>
              <input
                id="pwd"
                type="password"
                defaultValue="password"
                className="h-11 w-full rounded-xl border border-border bg-muted px-3.5 text-sm outline-none focus:border-primary focus:bg-card"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" defaultChecked className="size-4 accent-primary" />
                Remember me
              </label>
              <span className="text-sm font-semibold text-primary">Forgot password?</span>
            </div>

            <Link
              to="/dashboard"
              className="flex h-11 w-full items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Sign In
            </Link>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="size-4 text-success" />
            Protected by hospital SSO · Prototype build
          </p>
        </div>
      </div>
    </div>
  );
}
