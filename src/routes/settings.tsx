import { createFileRoute, Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Panel } from "@/components/Card";
import { doctor } from "@/data/mock";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · MediKiosk Doctor Portal" },
      {
        name: "description",
        content:
          "Manage your doctor profile, portal preferences and account security in the MediKiosk Doctor Portal.",
      },
      { property: "og:title", content: "Settings · MediKiosk Doctor Portal" },
      {
        property: "og:description",
        content: "Manage your doctor profile, preferences and account security.",
      },
    ],
  }),
  component: SettingsPage,
});

function Field({
  label,
  value,
  type = "text",
}: {
  label: string;
  value: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={value}
        className="h-11 w-full rounded-xl border border-border bg-muted px-3.5 text-sm outline-none focus:border-primary focus:bg-card"
      />
    </label>
  );
}

function Toggle({ label, hint, on = true }: { label: string; hint: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border p-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
      </div>
      <label className="relative inline-flex cursor-pointer items-center">
        <input type="checkbox" defaultChecked={on} className="peer sr-only" />
        <span className="h-6 w-11 rounded-full bg-input transition-colors peer-checked:bg-primary" />
        <span className="absolute left-1 size-4 rounded-full bg-card transition-transform peer-checked:translate-x-5" />
      </label>
    </div>
  );
}

function SettingsPage() {
  return (
    <AppLayout title="Settings" subtitle="Profile, preferences and account security">
      <div className="grid max-w-5xl gap-6 lg:grid-cols-2">
        <Panel title="Doctor Profile" description="Visible to hospital staff" className="lg:col-span-2">
          <div className="flex flex-wrap items-center gap-4 pb-6">
            <span className="grid size-16 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
              {doctor.initials}
            </span>
            <div>
              <p className="text-base font-bold text-foreground">{doctor.name}</p>
              <p className="text-sm text-muted-foreground">
                {doctor.department} · Reg. {doctor.regNo}
              </p>
            </div>
            <button
              type="button"
              className="ml-auto rounded-full border border-border px-4 py-2 text-xs font-semibold text-primary hover:bg-primary-soft"
            >
              Change photo
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value={doctor.name} />
            <Field label="Department" value={doctor.department} />
            <Field label="Hospital" value={doctor.hospital} />
            <Field label="Medical registration no." value={doctor.regNo} />
            <Field label="Email" value="aarav.shah@cityhospital.in" type="email" />
            <Field label="Contact number" value="+91 98200 41122" />
          </div>
        </Panel>

        <Panel title="Preferences" description="Portal behaviour">
          <div className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
                Language
              </span>
              <select className="h-11 w-full rounded-xl border border-border bg-muted px-3 text-sm outline-none focus:border-primary focus:bg-card">
                <option>English (India)</option>
                <option>हिन्दी</option>
                <option>मराठी</option>
              </select>
            </label>
            <Toggle label="Case-ready notifications" hint="Alert me when a kiosk intake completes" />
            <Toggle label="Flagged vitals alerts" hint="Alert me on out-of-range readings" />
            <Toggle label="Daily summary email" hint="Sent at 8:00 PM each working day" on={false} />
          </div>
        </Panel>

        <Panel title="Security" description="Account access">
          <div className="space-y-4">
            <Field label="Current password" value="password" type="password" />
            <Field label="New password" value="" type="password" />
            <Field label="Confirm new password" value="" type="password" />
            <div className="flex flex-wrap gap-3 pt-1">
              <button
                type="button"
                className="rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Update password
              </button>
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold text-destructive hover:bg-danger-soft"
              >
                <LogOut className="size-4" /> Logout
              </Link>
            </div>
          </div>
        </Panel>
      </div>
    </AppLayout>
  );
}
