import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { StatCard } from "@/components/StatCard";
import { StatusPill, statusTone } from "@/components/StatusPill";
import { Panel } from "@/components/Card";
import { doctor, stats, todaysPatients } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard · MediKiosk Doctor Portal" },
      {
        name: "description",
        content:
          "Today's kiosk intake queue, ready cases and patient status at a glance for the attending doctor.",
      },
      { property: "og:title", content: "Dashboard · MediKiosk Doctor Portal" },
      {
        property: "og:description",
        content: "Today's kiosk intake queue and ready cases at a glance.",
      },
    ],
  }),
  component: Dashboard,
});

const filters = ["All", "Ready", "In Intake", "Waiting", "Completed"];

function Dashboard() {
  return (
    <AppLayout
      title={`Good Morning, ${doctor.short}`}
      subtitle={`${doctor.department} • ${doctor.hospital}`}
      showSearch
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-primary/25 bg-primary-soft p-5">
          <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-5" />
          </span>
          <div className="min-w-[220px] flex-1">
            <p className="text-sm font-bold text-foreground">New Case Ready — Patient #MK1042</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Rohan Mehta, 42/M · Kiosk intake complete with AI summary and verified identity.
            </p>
          </div>
          <Link
            to="/case/$caseId"
            params={{ caseId: "MK1042" }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            View Case <ArrowRight className="size-4" />
          </Link>
        </div>

        <Panel
          title="Today's Patients"
          description="24 scheduled · 4 ready for review"
          bodyClassName="p-0"
          action={
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  readOnly
                  placeholder="Search patient or ID"
                  className="h-9 w-56 rounded-full border border-border bg-muted pr-3 pl-9 text-sm outline-none focus:border-primary"
                />
              </div>
              {filters.map((f, i) => (
                <button
                  key={f}
                  type="button"
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:bg-muted",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          <PatientTable />
        </Panel>
      </div>
    </AppLayout>
  );
}

function PatientTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-border text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
            <th className="px-6 py-3 font-bold">Patient</th>
            <th className="px-6 py-3 font-bold">Chief complaint</th>
            <th className="px-6 py-3 font-bold">Status</th>
            <th className="px-6 py-3 font-bold">Kiosk</th>
            <th className="px-6 py-3 font-bold">Time</th>
            <th className="px-6 py-3 text-right font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {todaysPatients.map((p) => (
            <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/60">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">
                    {p.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">#{p.id}</span>
                    <span className="block text-xs text-muted-foreground">
                      {p.name} · {p.age}/{p.gender}
                    </span>
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-muted-foreground">{p.complaint}</td>
              <td className="px-6 py-4">
                <StatusPill tone={statusTone[p.status]} dot>
                  {p.status}
                </StatusPill>
              </td>
              <td className="px-6 py-4 text-muted-foreground">{p.kiosk}</td>
              <td className="px-6 py-4 text-muted-foreground">{p.time}</td>
              <td className="px-6 py-4 text-right">
                <Link
                  to="/case/$caseId"
                  params={{ caseId: p.id }}
                  className="inline-flex rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft"
                >
                  View Case
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
