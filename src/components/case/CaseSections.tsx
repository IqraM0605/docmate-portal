import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Pill,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Panel } from "@/components/Card";
import { StatusPill, type PillTone } from "@/components/StatusPill";
import { activeCase } from "@/data/mock";
import { cn } from "@/lib/utils";

export function CaseHeader() {
  return (
    <div className="sticky top-0 z-30 rounded-[22px] border border-border bg-background/90 px-4 py-3 shadow-card backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-sm font-bold text-primary">
            {activeCase.name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </span>
          <div>
            <p className="text-[11px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
              Patient · #{activeCase.id}
            </p>
            <p className="text-sm font-extrabold text-foreground">{activeCase.name}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusPill tone="warning" dot>
            BP 148/94
          </StatusPill>
          <StatusPill tone="danger" dot>
            Sulfa allergy
          </StatusPill>
        </div>
      </div>
    </div>
  );
}

export function AttentionCard() {
  return (
    <div className="rounded-[24px] border border-warning/30 bg-warning-soft p-5 shadow-card">
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-2xl bg-warning/12 text-warning">
          <AlertTriangle className="size-4" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold text-foreground">Attention required</h3>
          <ul className="mt-2 space-y-2">
            {activeCase.flags.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground/80">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function PatientConfirmedEdits() {
  return (
    <div className="rounded-[24px] border border-primary/20 bg-primary-soft p-5 shadow-card">
      <div className="flex items-center gap-2">
        <div className="grid size-8 place-items-center rounded-xl bg-primary text-primary-foreground">
          <ShieldAlert className="size-4" />
        </div>
        <div>
          <p className="text-[11px] font-bold tracking-[0.12em] text-primary uppercase">
            Patient-confirmed changes
          </p>
          <h3 className="text-base font-bold text-foreground">What changed</h3>
        </div>
      </div>
      <ul className="mt-4 space-y-3">
        {activeCase.edits.map((e) => (
          <li key={e.field} className="rounded-2xl border border-border bg-card/80 px-3 py-2.5">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-foreground">{e.field}</span>
              <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">
                Updated
              </span>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span className="line-through">{e.from}</span>
              <ArrowRight className="size-3.5" />
              <span className="font-semibold text-foreground">{e.to}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ComplaintAndVitals() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
      <Panel title="Chief Complaint" description="Captured at kiosk intake" className="border-primary/10 bg-card">
        <p className="text-sm leading-relaxed text-foreground/85">{activeCase.chiefComplaint}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <StatusPill tone="danger">Severity 8/10</StatusPill>
          <StatusPill tone="warning">Duration 5 days</StatusPill>
          <StatusPill tone="info">Epigastric</StatusPill>
        </div>
      </Panel>

      <Panel title="Vitals" description="Recorded at Kiosk 03 · 09:05 AM" className="border-border bg-card">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {activeCase.vitals.map((v) => (
            <div
              key={v.label}
              className={cn(
                "rounded-2xl border p-3 transition-colors",
                v.tone === "warning"
                  ? "border-warning/30 bg-warning-soft"
                  : "border-border bg-muted/40",
              )}
            >
              <p className="text-[11px] font-semibold text-muted-foreground">{v.label}</p>
              <p
                className={cn(
                  "mt-1 text-lg font-extrabold tracking-tight",
                  v.tone === "warning" ? "text-warning" : "text-foreground",
                )}
              >
                {v.value}
              </p>
              <p className="text-[11px] text-muted-foreground">{v.unit}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

export function AiSummary() {
  return (
    <Panel
      title="AI Case Summary"
      description="Compiled from kiosk intake and hospital records"
      action={
        <span className="grid size-9 place-items-center rounded-xl bg-primary-soft text-primary">
          <Sparkles className="size-4" />
        </span>
      }
      className="border-primary/15 bg-gradient-to-br from-primary-soft/55 to-card"
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1.5 text-[11px] font-bold tracking-[0.08em] text-primary uppercase">
        <Sparkles className="size-3.5" />
        AI-generated · needs review
      </div>
      <p className="text-sm leading-relaxed text-foreground/85">{activeCase.aiSummary}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {activeCase.sources.map((s) => (
          <span
            key={s.label}
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold text-muted-foreground"
          >
            <span aria-hidden>{s.icon}</span>
            {s.label}
          </span>
        ))}
      </div>
    </Panel>
  );
}

export function ClinicalHistory() {
  return (
    <Panel title="Clinical History" description="Structured intake questionnaire" bodyClassName="p-0">
      <dl className="divide-y divide-border">
        {activeCase.clinicalHistory.map(([k, v]) => (
          <div key={k} className="grid gap-1 px-6 py-3.5 sm:grid-cols-[220px_1fr] sm:gap-4">
            <dt className="text-sm font-semibold text-muted-foreground">{k}</dt>
            <dd className="text-sm text-foreground">{v}</dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

function SubCard({ title, items, tone }: { title: string; items: string[]; tone: PillTone }) {
  return (
    <div className="rounded-2xl border border-border p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">{title}</h3>
        <StatusPill tone={tone}>{items.length}</StatusPill>
      </div>
      <ul className="mt-3 space-y-2">
        {items.map((i) => (
          <li key={i} className="flex gap-2 text-sm text-muted-foreground">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-border" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MedicalHistorySection() {
  const groups = [
    { title: "Previous Conditions", items: activeCase.previousConditions, tone: "warning" as const },
    { title: "Surgeries", items: activeCase.surgeries, tone: "info" as const },
    { title: "Family History", items: activeCase.familyHistory, tone: "neutral" as const },
    { title: "Allergies", items: activeCase.allergies, tone: "danger" as const },
  ];

  return (
    <Panel title="Medical History" description="Reference-only record" className="border-border/80">
      <div className="space-y-3">
        {groups.map((group) => (
          <details key={group.title} className="group overflow-hidden rounded-[20px] border border-border bg-muted/20">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-left">
              <span className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="grid size-7 place-items-center rounded-xl bg-card text-muted-foreground">
                  <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                </span>
                {group.title}
              </span>
              <StatusPill tone={group.tone}>{group.items.length}</StatusPill>
            </summary>
            <div className="border-t border-border px-4 py-3">
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/30" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        ))}
      </div>
    </Panel>
  );
}

export function MedicationHistory() {
  return (
    <Panel title="Medication History" description="Reported and prescribed medicines">
      <div className="grid gap-3 md:grid-cols-2">
        {activeCase.medications.map((m) => (
          <div key={m.name} className="flex items-start gap-3 rounded-[20px] border border-border bg-muted/25 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
              <Pill className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">{m.name}</p>
              <p className="text-xs text-muted-foreground">{m.detail}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                {m.source} · {m.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}

export function VerificationCard() {
  return (
    <Panel title="Patient Verification" description="Identity and intake confirmation">
      <ul className="space-y-3">
        {activeCase.verification.map((v) => (
          <li key={v.label} className="flex items-start gap-3 rounded-2xl border border-border bg-muted/20 p-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
            <div>
              <p className="text-sm font-semibold text-foreground">{v.label}</p>
              <p className="text-xs text-muted-foreground">{v.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
