import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { StatusPill, statusTone } from "@/components/StatusPill";
import { Panel } from "@/components/Card";
import { allPatients } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/patients")({
  head: () => ({
    meta: [
      { title: "Patients · MediKiosk Doctor Portal" },
      {
        name: "description",
        content:
          "Searchable directory of all registered patients with visit status, department and last visit date.",
      },
      { property: "og:title", content: "Patients · MediKiosk Doctor Portal" },
      {
        property: "og:description",
        content: "Searchable directory of all registered MediKiosk patients.",
      },
    ],
  }),
  component: Patients,
});

const filters = ["All patients", "Gastroenterology", "Hepatology", "Follow-up due"];

function Patients() {
  return (
    <AppLayout
      title="Patients"
      subtitle={`${allPatients.length} records in your care list`}
      showSearch
    >
      <Panel
        title="All Patients"
        description="Across all visit dates"
        bodyClassName="p-0"
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                readOnly
                placeholder="Search by name or ID"
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
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-muted"
              aria-label="More filters"
            >
              <SlidersHorizontal className="size-4" />
            </button>
          </div>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[940px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                <th className="px-6 py-3 font-bold">Patient</th>
                <th className="px-6 py-3 font-bold">Department</th>
                <th className="px-6 py-3 font-bold">Reason</th>
                <th className="px-6 py-3 font-bold">Status</th>
                <th className="px-6 py-3 font-bold">Last visit</th>
                <th className="px-6 py-3 text-right font-bold">Action</th>
              </tr>
            </thead>
            <tbody>
              {allPatients.map((p) => (
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
                        <span className="block font-semibold text-foreground">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          #{p.id} · {p.age}/{p.gender}
                        </span>
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{p.department}</td>
                  <td className="px-6 py-4 text-muted-foreground">{p.complaint}</td>
                  <td className="px-6 py-4">
                    <StatusPill tone={statusTone[p.status]} dot>
                      {p.status}
                    </StatusPill>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{p.lastVisit}</td>
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
      </Panel>
    </AppLayout>
  );
}
