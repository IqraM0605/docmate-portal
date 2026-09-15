import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Search, ShieldAlert, Sparkles, ArrowRight } from "lucide-react";
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

const filters = ["All", "Ready", "In Intake", "Waiting", "Completed"] as const;
type FilterValue = (typeof filters)[number];

type DashboardAlert = {
  id: string;
  severity: "critical" | "attention";
  title: string;
  detail: string;
};

const dashboardAlerts: DashboardAlert[] = [
  {
    id: "MK1042",
    severity: "critical",
    title: "Critical alert",
    detail: "Sulfa allergy conflict and BP 148/94 require review before prescription.",
  },
  {
    id: "MK1043",
    severity: "attention",
    title: "Needs attention",
    detail: "Repeat blood pressure check recommended for borderline reading.",
  },
];

function Dashboard() {
  const [selectedFilter, setSelectedFilter] = useState<FilterValue>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [dismissedAlerts, setDismissedAlerts] = useState<Record<string, boolean>>({});
  const [openedCaseIds, setOpenedCaseIds] = useState<string[]>([]);

  const filteredPatients = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return todaysPatients.filter((patient) => {
      const matchesStatus = selectedFilter === "All" || patient.status === selectedFilter;
      const matchesSearch =
        query.length === 0 ||
        patient.name.toLowerCase().includes(query) ||
        patient.id.toLowerCase().includes(query) ||
        patient.complaint.toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, selectedFilter]);

  const activeAlerts = dashboardAlerts.filter(
    (alert) => !dismissedAlerts[alert.id] && !openedCaseIds.includes(alert.id),
  );

  const handleOpenCase = (patientId: string) => {
    setOpenedCaseIds((current) => (current.includes(patientId) ? current : [...current, patientId]));
  };

  return (
    <AppLayout
      title={`Good Morning, ${doctor.short}`}
      subtitle={`${doctor.department} • ${doctor.hospital}`}
    >
      <div className="space-y-6">
        {activeAlerts.length > 0 && (
          <div className="space-y-3">
            {activeAlerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border px-4 py-3 shadow-card sm:flex-row sm:items-center sm:justify-between",
                  alert.severity === "critical"
                    ? "border-red-200 bg-red-950 text-red-50"
                    : "border-amber-200 bg-amber-100 text-amber-950",
                )}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    className={cn(
                      "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full",
                      alert.severity === "critical" ? "bg-red-800/60 text-red-100" : "bg-amber-200/80 text-amber-900",
                    )}
                  >
                    {alert.severity === "critical" ? (
                      <ShieldAlert className="size-4" />
                    ) : (
                      <AlertTriangle className="size-4" />
                    )}
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold tracking-[0.12em] uppercase opacity-90">
                        {alert.severity === "critical" ? "Critical" : "Needs attention"}
                      </span>
                      <span className="text-xs opacity-80">Patient #{alert.id}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold">{alert.detail}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDismissedAlerts((current) => ({ ...current, [alert.id]: true }))}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    alert.severity === "critical"
                      ? "bg-red-100 text-red-900 hover:bg-red-50"
                      : "bg-amber-900 text-amber-50 hover:bg-amber-800",
                  )}
                >
                  {alert.severity === "critical" ? "Acknowledge" : "Dismiss"}
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        <div className="rounded-[24px] border border-border bg-card p-4 shadow-card sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
                <Sparkles className="size-5" />
              </span>
              <div className="min-w-[220px] flex-1">
                <p className="text-[11px] font-bold tracking-[0.12em] text-primary uppercase">
                  New case ready
                </p>
                <p className="mt-1 text-lg font-bold text-foreground">Patient #MK1042 · Rohan Mehta</p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  Verified intake · AI summary generated · BP 148/94 flagged for review.
                </p>
              </div>
            </div>
            <Link
              to="/case/$caseId"
              params={{ caseId: "MK1042" }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              View Case <ArrowRight className="size-4" />
            </Link>
          </div>
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
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search patient or ID"
                  aria-label="Search patient or ID"
                  className="h-9 w-56 rounded-full border border-border bg-muted pr-3 pl-9 text-sm outline-none focus:border-primary"
                />
              </div>
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedFilter(f)}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-xs font-semibold transition-colors",
                    selectedFilter === f
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:bg-muted",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          <PatientTable
            patients={filteredPatients}
            openedCaseIds={openedCaseIds}
            onOpenCase={handleOpenCase}
          />
        </Panel>
      </div>
    </AppLayout>
  );
}

function PatientTable({
  patients,
  openedCaseIds,
  onOpenCase,
}: {
  patients: typeof todaysPatients;
  openedCaseIds: string[];
  onOpenCase: (patientId: string) => void;
}) {
  const alertByPatientId = Object.fromEntries(
    dashboardAlerts
      .filter((alert) => !openedCaseIds.includes(alert.id))
      .map((alert) => [alert.id, alert]),
  );

  if (patients.length === 0) {
    return (
      <div className="flex min-h-32 items-center justify-center px-6 py-10 text-center text-sm text-muted-foreground">
        No patients match the current search or status filter.
      </div>
    );
  }

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
          {patients.map((p) => {
            const patientAlert = alertByPatientId[p.id];

            return (
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
                  <div
                    className={cn(
                      "flex items-center gap-2 border-l-2 pl-2",
                      patientAlert?.severity === "critical"
                        ? "border-red-500"
                        : patientAlert
                          ? "border-amber-500"
                          : "border-transparent",
                    )}
                  >
                    {patientAlert && (
                      <span
                        className={cn(
                          "grid size-5 place-items-center rounded-full text-[10px] font-bold",
                          patientAlert.severity === "critical"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700",
                        )}
                        aria-label={patientAlert.severity === "critical" ? "Critical alert" : "Needs attention"}
                      >
                        {patientAlert.severity === "critical" ? "!" : "•"}
                      </span>
                    )}
                    <StatusPill tone={statusTone[p.status]} dot>
                      {p.status}
                    </StatusPill>
                  </div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{p.kiosk}</td>
                <td className="px-6 py-4 text-muted-foreground">{p.time}</td>
                <td className="px-6 py-4 text-right">
                  <Link
                    to="/case/$caseId"
                    params={{ caseId: p.id }}
                    onClick={() => onOpenCase(p.id)}
                    className="inline-flex rounded-full border border-border px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft"
                  >
                    View Case
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
