import { Plus, Trash2, CalendarDays } from "lucide-react";
import { Panel } from "@/components/Card";
import { prescription } from "@/data/mock";

function Area({
  label,
  hint,
  value,
  rows = 4,
}: {
  label: string;
  hint: string;
  value: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">{label}</span>
      <textarea
        rows={rows}
        placeholder={hint}
        defaultValue={value}
        className="w-full resize-y rounded-xl border border-border bg-muted p-3.5 text-sm leading-relaxed outline-none placeholder:text-muted-foreground focus:border-primary focus:bg-card"
      />
    </label>
  );
}

export function ConsultationSection() {
  return (
    <Panel title="Doctor Consultation" description="Your clinical entry for this visit">
      <div className="grid gap-5 xl:grid-cols-2">
        <Area
          label="Clinical Observations"
          hint="Examination findings…"
          value="Epigastric tenderness on deep palpation. No guarding or rigidity. Bowel sounds normal. No organomegaly. No pallor or icterus."
        />
        <Area
          label="Assessment / Provisional Diagnosis"
          hint="Working diagnosis…"
          value="NSAID-induced gastritis with acid-peptic disease. Rule out H. pylori reinfection. Newly detected elevated blood pressure — needs repeat measurement."
        />
        <Area
          label="Investigation Requests"
          hint="Tests to order…"
          value="Upper GI endoscopy, H. pylori stool antigen, CBC, serum lipase."
        />
        <Area
          label="Doctor's Notes"
          hint="Internal notes…"
          value="Counselled on NSAID cessation and diet. Advised home BP log; refer to Medicine OPD if readings remain >140/90."
        />
      </div>
    </Panel>
  );
}

export function PrescriptionBuilder() {
  return (
    <Panel
      title="Prescription Builder"
      description="Draft for review before issue"
      action={
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" /> Add Medicine
        </button>
      }
    >
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
              <th className="px-4 py-3 font-bold">Medicine</th>
              <th className="px-4 py-3 font-bold">Dosage</th>
              <th className="px-4 py-3 font-bold">Frequency</th>
              <th className="px-4 py-3 font-bold">Duration</th>
              <th className="px-4 py-3 font-bold">Instructions</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {prescription.medicines.map((m) => (
              <tr key={m.name} className="border-b border-border last:border-0">
                <td className="px-4 py-3 font-semibold text-foreground">{m.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.dosage}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.frequency}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.duration}</td>
                <td className="px-4 py-3 text-muted-foreground">{m.instructions}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    aria-label={`Remove ${m.name}`}
                    className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-danger-soft hover:text-danger"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold text-muted-foreground">Investigations</h3>
          <div className="mt-2 space-y-2">
            {prescription.investigations.map((inv) => (
              <label
                key={inv}
                className="flex items-center gap-3 rounded-xl border border-border px-4 py-3 text-sm text-foreground"
              >
                <input type="checkbox" defaultChecked className="size-4 accent-primary" />
                {inv}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Advice</span>
            <textarea
              rows={6}
              defaultValue={prescription.advice}
              className="w-full resize-y rounded-xl border border-border bg-muted p-3.5 text-sm leading-relaxed outline-none focus:border-primary focus:bg-card"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">
              Follow-up date
            </span>
            <span className="relative block">
              <CalendarDays className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="date"
                defaultValue="2026-09-14"
                className="h-11 w-full rounded-xl border border-border bg-muted pr-3 pl-10 text-sm outline-none focus:border-primary focus:bg-card"
              />
            </span>
          </label>
        </div>
      </div>
    </Panel>
  );
}
