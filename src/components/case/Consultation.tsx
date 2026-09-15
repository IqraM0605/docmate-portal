import { useMemo, useState } from "react";
import { Plus, Trash2, CalendarDays, ChevronDown } from "lucide-react";
import { Panel } from "@/components/Card";
import { prescription } from "@/data/mock";

const drugFormulary = [
  { id: "pantoprazole-40", name: "Pantoprazole 40 mg", strengths: ["20 mg", "40 mg"] },
  { id: "pantoprazole-20", name: "Pantoprazole 20 mg", strengths: ["20 mg", "40 mg"] },
  { id: "omeprazole-20", name: "Omeprazole 20 mg", strengths: ["10 mg", "20 mg", "40 mg"] },
  { id: "ranitidine-150", name: "Ranitidine 150 mg", strengths: ["150 mg", "300 mg"] },
  { id: "domperidone-10", name: "Domperidone 10 mg", strengths: ["10 mg"] },
  { id: "sucralfate-1g", name: "Sucralfate 1 g", strengths: ["1 g"] },
  { id: "amoxicillin-500", name: "Amoxicillin 500 mg", strengths: ["250 mg", "500 mg"] },
  { id: "clarithromycin-500", name: "Clarithromycin 500 mg", strengths: ["250 mg", "500 mg"] },
  { id: "paracetamol-500", name: "Paracetamol 500 mg", strengths: ["500 mg"] },
  { id: "diclofenac-50", name: "Diclofenac 50 mg", strengths: ["50 mg"] },
  { id: "metronidazole-400", name: "Metronidazole 400 mg", strengths: ["200 mg", "400 mg"] },
  { id: "albendazole-400", name: "Albendazole 400 mg", strengths: ["400 mg"] },
] as const;

const commonInstructionPhrases = [
  "Take after food",
  "Take before food",
  "Take on empty stomach",
  "Take with plenty of water",
  "At bedtime",
  "Avoid alcohol",
  "Avoid NSAIDs",
  "Finish the full course",
  "Do not crush or chew",
  "Take as directed by doctor",
  "Monitor blood pressure regularly",
  "Report severe abdominal pain",
];

const instructionPresetOptions = [...commonInstructionPhrases, "Other (write custom)"] as const;

const frequencyOptions = [
  "Once daily",
  "Twice daily",
  "Thrice daily",
  "As needed (SOS)",
  "Before meals",
  "After meals",
  "At bedtime",
  "Other",
] as const;

const durationOptions = ["3 days", "5 days", "7 days", "14 days", "1 month", "Ongoing", "Custom"] as const;

type MedicineRow = {
  id: string;
  name: string;
  drugId: string;
  dosage: string;
  frequency: string;
  frequencyCustom: string;
  duration: string;
  durationCustomValue: string;
  durationCustomUnit: "days" | "weeks" | "months";
  instructions: string;
};

function getMedicineSuggestions(query: string) {
  const trimmed = query.trim().toLowerCase();

  if (!trimmed) {
    return drugFormulary.slice(0, 6);
  }

  return drugFormulary.filter(
    (drug) =>
      drug.name.toLowerCase().includes(trimmed) ||
      drug.id.toLowerCase().includes(trimmed),
  );
}

function getDosageOptionsForMedicine(medicineName: string) {
  const selectedDrug = drugFormulary.find(
    (drug) => drug.name.toLowerCase() === medicineName.trim().toLowerCase(),
  );

  return selectedDrug?.strengths ?? [];
}

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
      <span className="mb-2 block text-xs font-semibold text-muted-foreground">{label}</span>
      <textarea
        rows={rows}
        placeholder={hint}
        defaultValue={value}
        className="w-full resize-y rounded-2xl border border-border bg-card px-3.5 py-3 text-sm leading-relaxed text-foreground shadow-sm outline-none placeholder:text-muted-foreground transition-colors focus:border-primary focus:bg-card"
      />
    </label>
  );
}

export function ConsultationSection() {
  return (
    <Panel title="Doctor Consultation" description="Clinical entry for this visit" className="border-border/80">
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
  const [medicines, setMedicines] = useState<MedicineRow[]>(() =>
    prescription.medicines.map((m, index) => ({
      id: `${m.name}-${index}`,
      name: m.name,
      drugId: drugFormulary.find((drug) => drug.name === m.name)?.id ?? "",
      dosage: m.dosage,
      frequency: m.frequency,
      frequencyCustom: "",
      duration: m.duration,
      durationCustomValue: "",
      durationCustomUnit: "days",
      instructions: m.instructions,
    })),
  );

  const [selectedInvestigations, setSelectedInvestigations] = useState<string[]>(() =>
    prescription.investigations,
  );
  const [advice, setAdvice] = useState(() => prescription.advice);
  const [followUp, setFollowUp] = useState(() => prescription.followUp);

  const addMedicine = () => {
    setMedicines((current) => [
      ...current,
      {
        id: `new-${Date.now()}-${current.length}`,
        name: "",
        drugId: "",
        dosage: "",
        frequency: "",
        frequencyCustom: "",
        duration: "",
        durationCustomValue: "",
        durationCustomUnit: "days",
        instructions: "",
      },
    ]);
  };

  const removeMedicine = (id: string) => {
    setMedicines((current) => current.filter((medicine) => medicine.id !== id));
  };

  const updateMedicine = (id: string, field: keyof Omit<MedicineRow, "id">, value: string) => {
    setMedicines((current) =>
      current.map((medicine) =>
        medicine.id === id ? { ...medicine, [field]: value } : medicine,
      ),
    );
  };

  const updateMedicineRow = (
    id: string,
    updates: Partial<MedicineRow>,
  ) => {
    setMedicines((current) =>
      current.map((medicine) =>
        medicine.id === id ? { ...medicine, ...updates } : medicine,
      ),
    );
  };

  const investigationsCount = useMemo(
    () => selectedInvestigations.length,
    [selectedInvestigations],
  );

  return (
    <Panel
      title="Prescription Builder"
      description="Draft for review before issue"
      action={
        <button
          type="button"
          onClick={addMedicine}
          className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="size-4" /> Add Medicine
        </button>
      }
      className="border-border/80"
    >
      <div className="overflow-x-auto rounded-[20px] border border-border bg-muted/20">
        <table className="w-full min-w-[920px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-card text-[11px] tracking-[0.08em] text-muted-foreground uppercase">
              <th className="px-4 py-3 font-bold">Medicine</th>
              <th className="px-4 py-3 font-bold">Dosage</th>
              <th className="px-4 py-3 font-bold">Frequency</th>
              <th className="px-4 py-3 font-bold">Duration</th>
              <th className="px-4 py-3 font-bold">Instructions</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {medicines.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No medicines added yet. Use the add button to create a prescription.
                </td>
              </tr>
            ) : (
              medicines.map((m) => (
                <tr key={m.id} className="border-b border-border last:border-0 align-top">
                  <td className="px-4 py-3">
                    <div className="relative">
                      <input
                        value={m.name}
                        onChange={(event) => {
                          const value = event.target.value;
                          const match = drugFormulary.find(
                            (drug) => drug.name.toLowerCase() === value.trim().toLowerCase(),
                          );

                          updateMedicineRow(m.id, {
                            name: value,
                            drugId: match?.id ?? "",
                            dosage: match ? (m.dosage && getDosageOptionsForMedicine(value).includes(m.dosage) ? m.dosage : match.strengths[0] ?? "") : m.dosage,
                          });
                        }}
                        placeholder="Medicine name"
                        list={`medicine-suggestions-${m.id}`}
                        className="w-full rounded-xl border border-border bg-card px-2.5 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                      <datalist id={`medicine-suggestions-${m.id}`}>
                        {getMedicineSuggestions(m.name).map((drug) => (
                          <option key={drug.id} value={drug.name} />
                        ))}
                      </datalist>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={m.dosage}
                      disabled={!m.drugId}
                      onChange={(event) => updateMedicine(m.id, "dosage", event.target.value)}
                      className="w-full rounded-xl border border-border bg-card px-2.5 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {!m.drugId ? (
                        <option value="">Select medicine first</option>
                      ) : (
                        <>
                          <option value="">Select dosage</option>
                          {getDosageOptionsForMedicine(m.name).map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </>
                      )}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <select
                        value={m.frequency === "Other" ? "Other" : m.frequency}
                        onChange={(event) => {
                          const value = event.target.value;
                          updateMedicineRow(m.id, {
                            frequency: value === "Other" ? "Other" : value,
                            frequencyCustom: value === "Other" ? m.frequencyCustom : "",
                          });
                        }}
                        className="w-full rounded-xl border border-border bg-card px-2.5 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary"
                      >
                        <option value="">Select frequency</option>
                        {frequencyOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {m.frequency === "Other" && (
                        <input
                          value={m.frequencyCustom}
                          onChange={(event) =>
                            updateMedicine(m.id, "frequencyCustom", event.target.value)
                          }
                          placeholder="Specify frequency"
                          className="w-full rounded-xl border border-border bg-card px-2.5 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                        />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-2">
                      <select
                        value={m.duration === "Custom" ? "Custom" : m.duration}
                        onChange={(event) => {
                          const value = event.target.value;
                          updateMedicineRow(m.id, {
                            duration: value === "Custom" ? "Custom" : value,
                            durationCustomValue:
                              value === "Custom" ? m.durationCustomValue : "",
                          });
                        }}
                        className="w-full rounded-xl border border-border bg-card px-2.5 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary"
                      >
                        <option value="">Select duration</option>
                        {durationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {m.duration === "Custom" && (
                        <div className="flex gap-2">
                          <input
                            type="number"
                            min={1}
                            value={m.durationCustomValue}
                            onChange={(event) =>
                              updateMedicine(m.id, "durationCustomValue", event.target.value)
                            }
                            placeholder="7"
                            className="w-20 rounded-xl border border-border bg-card px-2.5 py-2 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                          />
                          <select
                            value={m.durationCustomUnit}
                            onChange={(event) =>
                              updateMedicine(
                                m.id,
                                "durationCustomUnit",
                                event.target.value,
                              )
                            }
                            className="w-full rounded-xl border border-border bg-card px-2.5 py-2 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary"
                          >
                            <option value="days">Days</option>
                            <option value="weeks">Weeks</option>
                            <option value="months">Months</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <input
                        value={m.instructions}
                        onChange={(event) =>
                          updateMedicine(m.id, "instructions", event.target.value)
                        }
                        placeholder="Instruction"
                        list={`instruction-presets-${m.id}`}
                        aria-label={`Instructions for ${m.name || "medicine"}`}
                        className="w-full rounded-xl border border-border bg-card px-2.5 py-2 pr-8 text-sm text-foreground shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                      />
                      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <datalist id={`instruction-presets-${m.id}`}>
                        {instructionPresetOptions.map((instruction) => (
                          <option key={instruction} value={instruction} />
                        ))}
                      </datalist>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      aria-label={`Remove ${m.name || "medicine"}`}
                      onClick={() => removeMedicine(m.id)}
                      className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-danger-soft hover:text-danger"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center justify-between gap-3">
            <h3 className="text-xs font-semibold text-muted-foreground">Investigations</h3>
            <span className="text-[11px] font-semibold text-muted-foreground">
              {investigationsCount} selected
            </span>
          </div>
          <div className="mt-2 space-y-2">
            {prescription.investigations.map((inv) => (
              <label
                key={inv}
                className="flex items-center gap-3 rounded-2xl border border-border bg-muted/25 px-4 py-3 text-sm text-foreground"
              >
                <input
                  type="checkbox"
                  checked={selectedInvestigations.includes(inv)}
                  onChange={() => {
                    setSelectedInvestigations((current) =>
                      current.includes(inv)
                        ? current.filter((item) => item !== inv)
                        : [...current, inv],
                    );
                  }}
                  className="size-4 accent-primary"
                />
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
              value={advice}
              onChange={(event) => setAdvice(event.target.value)}
              className="w-full resize-y rounded-2xl border border-border bg-card p-3.5 text-sm leading-relaxed text-foreground shadow-sm outline-none transition-colors focus:border-primary"
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
                value={followUp}
                onChange={(event) => setFollowUp(event.target.value)}
                className="h-11 w-full rounded-2xl border border-border bg-card pr-3 pl-10 text-sm text-foreground shadow-sm outline-none transition-colors focus:border-primary"
              />
            </span>
          </label>
        </div>
      </div>
    </Panel>
  );
}
