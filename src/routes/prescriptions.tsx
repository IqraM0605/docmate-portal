import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, FileText, PencilLine, ShieldCheck, X } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Panel } from "@/components/Card";
import { StatusPill } from "@/components/StatusPill";
import { activeCase, prescription } from "@/data/mock";

export const Route = createFileRoute("/prescriptions")({
  head: () => ({
    meta: [
      { title: "Prescriptions · MediKiosk Doctor Portal" },
      {
        name: "description",
        content:
          "Prescription preview for the selected patient, including medications, investigations and follow-up plan.",
      },
      { property: "og:title", content: "Prescriptions · MediKiosk Doctor Portal" },
      {
        property: "og:description",
        content: "Review, edit and confirm prescribed medication orders via the doctor portal.",
      },
    ],
  }),
  component: PrescriptionsPage,
});

function PrescriptionsPage() {
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  return (
    <AppLayout title="Prescriptions" subtitle="Preview and issue medication orders for the active case">
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-[28px] border border-border bg-card p-6 shadow-card">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <p className="text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                City Hospital
              </p>
              <h2 className="mt-1 text-xl font-extrabold tracking-tight text-foreground">
                Prescription
              </h2>
            </div>
            <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-primary">
              <FileText className="size-5" />
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Doctor</p>
              <p className="mt-1 text-sm font-semibold text-foreground">Dr. Aarav Shah</p>
              <p className="text-xs text-muted-foreground">Gastroenterology · City Hospital</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs font-semibold text-muted-foreground">Patient</p>
              <p className="mt-1 text-sm font-semibold text-foreground">{activeCase.name}</p>
              <p className="text-xs text-muted-foreground">
                #{activeCase.id} · {activeCase.age}/{activeCase.gender}
              </p>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-muted text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
                  <th className="px-4 py-3 font-bold">Medicine</th>
                  <th className="px-4 py-3 font-bold">Dosage</th>
                  <th className="px-4 py-3 font-bold">Frequency</th>
                  <th className="px-4 py-3 font-bold">Duration</th>
                </tr>
              </thead>
              <tbody>
                {prescription.medicines.map((m) => (
                  <tr key={m.name} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-foreground">{m.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{m.dosage}</td>
                    <td className="px-4 py-3 text-muted-foreground">{m.frequency}</td>
                    <td className="px-4 py-3 text-muted-foreground">{m.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Investigations</p>
              <ul className="mt-2 space-y-2 text-sm text-foreground/80">
                {prescription.investigations.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Follow-up</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{prescription.followUp}</p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-border bg-muted p-4">
            <p className="text-xs font-semibold text-muted-foreground">Advice</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">{prescription.advice}</p>
          </div>
        </section>

        <div className="space-y-6">
          <Panel title="Status" description="Current prescription stage">
            <div className="space-y-3">
              <StatusPill tone="warning" dot>
                Draft in review
              </StatusPill>
              <p className="text-sm text-muted-foreground">
                Prepared for {activeCase.name} with flags reviewed and confirmed by the intake workflow.
              </p>
            </div>
          </Panel>

          <Panel title="Actions" description="Review and issue the order">
            <div className="space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
              >
                <PencilLine className="size-4" /> Edit Prescription
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <ShieldCheck className="size-4" /> Confirm & Issue
              </button>
            </div>
          </Panel>
        </div>
      </div>

      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-pop">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
                  Confirm issue
                </p>
                <h3 className="mt-1 text-xl font-extrabold text-foreground">Issue prescription?</h3>
              </div>
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-border text-muted-foreground hover:bg-muted"
                aria-label="Close confirmation"
              >
                <X className="size-4" />
              </button>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This will finalise the medication order for {activeCase.name} and send the prescription to the hospital dispensing queue. Review the instructions and follow-up plan before continuing.
            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Check className="size-4" /> Confirm & Issue
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
