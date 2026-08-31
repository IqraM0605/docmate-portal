import { AlertTriangle, CheckCircle2, Sparkles, Pill, ArrowRight } from "lucide-react";
import { Panel } from "@/components/Card";
import { StatusPill, type PillTone } from "@/components/StatusPill";
import { activeCase } from "@/data/mock";
import { cn } from "@/lib/utils";

export function CaseHeader() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="grid size-14 place-items-center rounded-2xl bg-primary-soft text-lg font-bold text-primary">
            RM
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-extrabold tracking-tight text-foreground">
                Patient #{activeCase.id}
              </h2>
              <StatusPill tone="success" dot>
                Ready for review
              </StatusPill>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeCase.name} · {activeCase.age}/{activeCase.gender} · Blood group{" "}
              {activeCase.bloodGroup}
            </p>
            <p className="text-sm text-muted-foreground">
              {activeCase.department} · {activeCase.visitDate} · {activeCase.kiosk}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["RFID Verified", "Face Verified", "Patient Confirmed"].map((b) => (
            <StatusPill key={b} tone="success">
              <CheckCircle2 className="size-3.5" /> {b}
            </StatusPill>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AttentionCard() {
  return (
    <div className="rounded-2xl border border-warning/30 bg-warning-soft p-5">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" />
        <div>
          <h3 className="text-sm font-bold text-foreground">Attention Required</h3>
          <ul className="mt-2 space-y-1.5">
            {activeCase.flags.map((f) => (
              <li key={f} className="flex gap-2 text-sm text-foreground/80">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ComplaintAndVitals() {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Panel title="Chief Complaint" description="Captured at kiosk intake">
        <p className="text-sm leading-relaxed text-foreground/85">{activeCase.chiefComplaint}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <StatusPill tone="danger">Severity 8/10</StatusPill>
          <StatusPill tone="warning">Duration 5 days</StatusPill>
          <StatusPill tone="info">Epigastric</StatusPill>
        </div>
      </Panel>

      <Panel title="Vitals" description="Recorded at Kiosk 03 · 09:05 AM">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {activeCase.vitals.map((v) => (
            <div key={v.label} className="rounded-xl border border-border p-3">
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
    >
      <p className="text-sm leading-relaxed text-foreground/85">{activeCase.aiSummary}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2">
        {activeCase.sources.map((s) => (
          <span
            key={s.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground"
          >
            <span aria-hidden>{s.icon}</span>
            {s.label}
          </span>
        ))}
      </div>
      <p className="mt-4 border-t border-border pt-4 text-xs text-muted-foreground">
        AI-generated • Doctor review required
      </p>
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
  return (
    <Panel title="Medical History" description="From hospital record and patient interview">
      <div className="grid gap-4 md:grid-cols-2">
        <SubCard title="Previous Conditions" items={activeCase.previousConditions} tone="warning" />
        <SubCard title="Surgeries" items={activeCase.surgeries} tone="info" />
        <SubCard title="Family History" items={activeCase.familyHistory} tone="neutral" />
        <SubCard title="Allergies" items={activeCase.allergies} tone="danger" />
      </div>
    </Panel>
  );
}

export function MedicationHistory() {
  return (
    <Panel title="Medication History" description="Reported and prescribed medicines">
      <div className="grid gap-3 md:grid-cols-2">
        {activeCase.medications.map((m) => (
          <div key={m.name} className="flex items-start gap-3 rounded-2xl border border-border p-4">
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
          <li key={v.label} className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" />
            <div>
              <p className="text-sm font-semibold text-foreground">{v.label}</p>
              <p className="text-xs text-muted-foreground">{v.detail}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t border-border pt-4">
        <h3 className="text-[11px] font-bold tracking-[0.12em] text-muted-foreground uppercase">
          Patient-confirmed edits
        </h3>
        <ul className="mt-3 space-y-2">
          {activeCase.edits.map((e) => (
            <li
              key={e.field}
              className="flex flex-wrap items-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm"
            >
              <span className="font-semibold text-foreground">{e.field}</span>
              <span className="text-muted-foreground line-through">{e.from}</span>
              <ArrowRight className="size-3.5 text-muted-foreground" />
              <span className="font-semibold text-primary">{e.to}</span>
            </li>
          ))}
        </ul>
      </div>
    </Panel>
  );
}
