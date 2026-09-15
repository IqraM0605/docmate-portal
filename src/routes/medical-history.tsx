import { createFileRoute } from "@tanstack/react-router";
import { Activity, FileClock, ShieldCheck } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Panel } from "@/components/Card";
import { StatusPill } from "@/components/StatusPill";
import { Timeline } from "@/components/Timeline";
import { DocumentCard } from "@/components/DocumentCard";
import { activeCase } from "@/data/mock";

export const Route = createFileRoute("/medical-history")({
  head: () => ({
    meta: [
      { title: "Medical History · MediKiosk Doctor Portal" },
      {
        name: "description",
        content:
          "Longitudinal patient health history, previous diagnoses and uploaded records in the doctor portal.",
      },
      { property: "og:title", content: "Medical History · MediKiosk Doctor Portal" },
      {
        property: "og:description",
        content: "Track a patient’s medical history, conditions, interventions and historical documents.",
      },
    ],
  }),
  component: MedicalHistoryPage,
});

function MedicalHistoryPage() {
  return (
    <AppLayout title="Medical History" subtitle={`Longitudinal care record for ${activeCase.name}`}>
      <div className="space-y-6">
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Panel title="Clinical Timeline" description="Health events across past visits and current intake">
            <Timeline events={activeCase.timeline} />
          </Panel>

          <Panel title="Risk Summary" description="History markers requiring review">
            <div className="space-y-4">
              <div className="rounded-2xl border border-border bg-warning-soft p-4">
                <div className="flex items-center gap-2">
                  <Activity className="size-4 text-warning" />
                  <p className="text-sm font-bold text-foreground">Elevated BP</p>
                </div>
                <p className="mt-2 text-sm text-foreground/80">
                  Recorded at intake: 148/94 mmHg, elevated from prior visit baseline.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-danger-soft p-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-danger" />
                  <p className="text-sm font-bold text-foreground">Allergy</p>
                </div>
                <p className="mt-2 text-sm text-foreground/80">
                  Sulfa drugs documented as rash-causing in 2018; verify before prescription.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-info-soft p-4">
                <div className="flex items-center gap-2">
                  <FileClock className="size-4 text-info" />
                  <p className="text-sm font-bold text-foreground">NSAID use</p>
                </div>
                <p className="mt-2 text-sm text-foreground/80">
                  Chronic back-pain use reported with likely contribution to acid-peptic symptoms.
                </p>
              </div>
            </div>
          </Panel>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel title="Conditions & Diagnoses" description="Documented and current milestones">
            <ul className="space-y-3">
              {activeCase.previousConditions.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-xl border border-border bg-muted px-3 py-2 text-sm text-foreground/80">
                  <span className="mt-2 size-1.5 rounded-full bg-warning" />
                  {item}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Previous Surgeries & Family History" description="Relevant history for risk assessment">
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                  Surgeries
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {activeCase.surgeries.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-info" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2 text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                  Family history
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  {activeCase.familyHistory.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-success" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Panel>
        </div>

        <Panel title="Past Records" description="File attachments from previous care episodes">
          <div className="grid gap-3">
            {activeCase.documents.map((doc) => (
              <div key={doc.name} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {doc.date} · {doc.meta}
                  </p>
                </div>
                <StatusPill tone="info" className="mr-auto sm:mr-0">
                  Archived
                </StatusPill>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppLayout>
  );
}
