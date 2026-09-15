import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Download, Save } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Panel } from "@/components/Card";
import { DocumentCard } from "@/components/DocumentCard";
import { Timeline } from "@/components/Timeline";
import { ConsultationSection, PrescriptionBuilder } from "@/components/case/Consultation";
import {
  AiSummary,
  AttentionCard,
  CaseHeader,
  ClinicalHistory,
  ComplaintAndVitals,
  MedicalHistorySection,
  MedicationHistory,
  PatientConfirmedEdits,
  VerificationCard,
} from "@/components/case/CaseSections";
import { activeCase } from "@/data/mock";

export const Route = createFileRoute("/case/$caseId")({
  head: () => ({
    meta: [
      { title: "Case Review · MediKiosk Doctor Portal" },
      {
        name: "description",
        content:
          "Clinical review workspace for the active patient case, including intake summary, history and prescription builder.",
      },
      { property: "og:title", content: "Case Review · MediKiosk Doctor Portal" },
      {
        property: "og:description",
        content: "Review the active medical case with AI summary, verified history and consultation notes.",
      },
    ],
  }),
  component: CaseReviewPage,
});

function CaseReviewPage() {
  const { caseId } = Route.useParams();
  const patientId = caseId || activeCase.id;

  return (
    <AppLayout
      title={`Patient #${patientId}`}
      subtitle={`${activeCase.name} · ${activeCase.age}/${activeCase.gender} · ${activeCase.department}`}
    >
      <div className="space-y-6 pb-28">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            <ArrowLeft className="size-4" /> Back to dashboard
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-2 text-sm text-muted-foreground">
            <span className="grid size-7 place-items-center rounded-full bg-success-soft text-success">
              <CheckCircle2 className="size-4" />
            </span>
            Verified intake
          </div>
        </div>

        <CaseHeader />
        <AttentionCard />
        <PatientConfirmedEdits />
        <ComplaintAndVitals />
        <AiSummary />

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <ClinicalHistory />
          <div className="space-y-6">
            <VerificationCard />
            <Panel title="Previous Medical Records" description="Uploaded documents and reports" bodyClassName="space-y-3">
              {activeCase.documents.map((doc) => (
                <DocumentCard key={doc.name} name={doc.name} date={doc.date} meta={doc.meta} />
              ))}
            </Panel>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <MedicalHistorySection />
          <div className="space-y-6">
            <MedicationHistory />
            <Panel title="Patient Health Timeline" description="Past events and current visit">
              <Timeline events={activeCase.timeline} />
            </Panel>
          </div>
        </div>

        <ConsultationSection />
        <PrescriptionBuilder />
      </div>

      <div className="sticky bottom-0 z-20 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-end gap-3 px-6 py-4">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <Save className="size-4" /> Save
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <Download className="size-4" /> Complete Consultation
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
