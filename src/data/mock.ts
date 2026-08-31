export type Status = "Ready" | "In Intake" | "Waiting" | "Completed";

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "M" | "F";
  complaint: string;
  status: Status;
  kiosk: string;
  time: string;
  department: string;
  lastVisit: string;
};

export const doctor = {
  name: "Dr. Aarav Shah",
  short: "Dr. Shah",
  department: "Gastroenterology",
  hospital: "City Hospital",
  regNo: "MMC/GA/44821",
  initials: "AS",
};

export const stats = [
  { label: "Today's Patients", value: 24, icon: "users", tone: "info" as const },
  { label: "Cases Ready", value: 4, icon: "check", tone: "success" as const },
  { label: "Currently in Intake", value: 2, icon: "activity", tone: "warning" as const },
  { label: "Waiting", value: 6, icon: "clock", tone: "neutral" as const },
];

export const todaysPatients: Patient[] = [
  { id: "MK1042", name: "Rohan Mehta", age: 42, gender: "M", complaint: "Upper abdominal pain, 5 days", status: "Ready", kiosk: "Kiosk 03", time: "09:10", department: "Gastroenterology", lastVisit: "12 Mar 2026" },
  { id: "MK1043", name: "Priya Nair", age: 34, gender: "F", complaint: "Acid reflux, recurring", status: "Ready", kiosk: "Kiosk 01", time: "09:25", department: "Gastroenterology", lastVisit: "02 Jan 2026" },
  { id: "MK1044", name: "Imran Qureshi", age: 57, gender: "M", complaint: "Chronic constipation", status: "In Intake", kiosk: "Kiosk 04", time: "09:40", department: "Gastroenterology", lastVisit: "18 Nov 2025" },
  { id: "MK1045", name: "Sneha Kulkarni", age: 29, gender: "F", complaint: "Nausea and vomiting", status: "Waiting", kiosk: "Kiosk 02", time: "09:55", department: "Gastroenterology", lastVisit: "—" },
  { id: "MK1046", name: "Vikram Rao", age: 61, gender: "M", complaint: "Jaundice, follow-up", status: "Ready", kiosk: "Kiosk 03", time: "10:05", department: "Hepatology", lastVisit: "20 Jul 2026" },
  { id: "MK1047", name: "Ananya Desai", age: 46, gender: "F", complaint: "Bloating, weight loss", status: "Waiting", kiosk: "Kiosk 05", time: "10:20", department: "Gastroenterology", lastVisit: "09 Feb 2026" },
  { id: "MK1048", name: "Farhan Shaikh", age: 38, gender: "M", complaint: "Post-endoscopy review", status: "Completed", kiosk: "Kiosk 01", time: "08:40", department: "Gastroenterology", lastVisit: "15 Aug 2026" },
  { id: "MK1049", name: "Meera Joshi", age: 52, gender: "F", complaint: "Gallstone consultation", status: "In Intake", kiosk: "Kiosk 02", time: "10:35", department: "Gastroenterology", lastVisit: "30 May 2026" },
];

export const allPatients: Patient[] = [
  ...todaysPatients,
  { id: "MK0981", name: "Sunil Patil", age: 66, gender: "M", complaint: "Liver cirrhosis follow-up", status: "Completed", kiosk: "Kiosk 02", time: "24 Aug", department: "Hepatology", lastVisit: "24 Aug 2026" },
  { id: "MK0974", name: "Kavya Iyer", age: 24, gender: "F", complaint: "IBS management", status: "Completed", kiosk: "Kiosk 01", time: "21 Aug", department: "Gastroenterology", lastVisit: "21 Aug 2026" },
  { id: "MK0968", name: "Deepak Chauhan", age: 49, gender: "M", complaint: "Peptic ulcer review", status: "Completed", kiosk: "Kiosk 04", time: "19 Aug", department: "Gastroenterology", lastVisit: "19 Aug 2026" },
  { id: "MK0955", name: "Ritu Bansal", age: 31, gender: "F", complaint: "Celiac screening", status: "Completed", kiosk: "Kiosk 03", time: "14 Aug", department: "Gastroenterology", lastVisit: "14 Aug 2026" },
  { id: "MK0940", name: "Joseph Fernandes", age: 58, gender: "M", complaint: "Colonoscopy pre-assessment", status: "Completed", kiosk: "Kiosk 05", time: "08 Aug", department: "Gastroenterology", lastVisit: "08 Aug 2026" },
];

export const activeCase = {
  id: "MK1042",
  name: "Rohan Mehta",
  age: 42,
  gender: "Male",
  department: "Gastroenterology",
  visitDate: "31 Aug 2026 · 09:10 AM",
  kiosk: "Kiosk 03",
  bloodGroup: "B+",
  flags: [
    "Reported severity 8/10 — higher than previous visit (5/10)",
    "Known allergy to Sulfa drugs — verify prescription",
    "Blood pressure elevated at intake (148/94 mmHg)",
  ],
  chiefComplaint:
    "Burning pain in the upper abdomen for the past 5 days, worse at night and 2–3 hours after meals. Reports partial relief with over-the-counter antacids. Associated with nausea and a bitter taste in the mouth. No vomiting, no black stools.",
  vitals: [
    { label: "Blood Pressure", value: "148/94", unit: "mmHg", tone: "warning" as const },
    { label: "Pulse", value: "88", unit: "bpm", tone: "success" as const },
    { label: "Temperature", value: "98.6", unit: "°F", tone: "success" as const },
    { label: "SpO₂", value: "98", unit: "%", tone: "success" as const },
    { label: "Weight", value: "78.4", unit: "kg", tone: "neutral" as const },
    { label: "Height", value: "174", unit: "cm", tone: "neutral" as const },
    { label: "BMI", value: "25.9", unit: "kg/m²", tone: "warning" as const },
    { label: "Resp. Rate", value: "16", unit: "/min", tone: "success" as const },
  ],
  aiSummary:
    "42-year-old male presenting with a 5-day history of epigastric burning pain, nocturnal and post-prandial, partially relieved by antacids. Symptoms are consistent with an acid-peptic disorder; a prior 2024 endoscopy documented mild antral gastritis. Patient reports irregular meal timings, high NSAID use for recurring back pain, and daily coffee intake. Elevated blood pressure noted at intake, which is a new finding compared with the last recorded visit. No alarm features (weight loss, melena, dysphagia) reported at intake.",
  sources: [
    { icon: "🎤", label: "Patient Interview" },
    { icon: "📄", label: "Previous Record" },
    { icon: "🩺", label: "Vitals" },
  ],
  clinicalHistory: [
    ["Onset", "Gradual, 5 days ago"],
    ["Duration", "5 days, continuous with flare-ups"],
    ["Location", "Epigastrium, radiating slightly to back"],
    ["Character", "Burning, gnawing"],
    ["Severity", "8 / 10 at worst, 4 / 10 at rest"],
    ["Aggravating factors", "Spicy food, empty stomach, NSAIDs"],
    ["Relieving factors", "Antacids, small bland meals"],
    ["Associated symptoms", "Nausea, bitter regurgitation, early satiety"],
    ["Negative findings", "No melena, no vomiting, no dysphagia, no fever"],
    ["Diet & lifestyle", "Irregular meals, 4 cups coffee/day, non-smoker"],
  ] as [string, string][],
  previousConditions: ["Antral gastritis (2024)", "Hypertension — borderline, untreated", "Lumbar disc bulge (2022)"],
  surgeries: ["Appendectomy — 2011", "Right inguinal hernia repair — 2019"],
  familyHistory: ["Father — Type 2 Diabetes, Hypertension", "Mother — Hypothyroidism", "No family history of GI malignancy"],
  allergies: ["Sulfa drugs — rash, documented 2018", "No known food allergies"],
  medications: [
    { name: "Pantoprazole 40 mg", detail: "Once daily before breakfast", source: "Self-medicated (OTC)", date: "Since 26 Aug 2026" },
    { name: "Diclofenac 50 mg", detail: "As needed for back pain, ~4/week", source: "Prior prescription", date: "Since 14 Feb 2026" },
    { name: "Antacid gel", detail: "2 tsp at bedtime", source: "Self-medicated (OTC)", date: "Since 27 Aug 2026" },
    { name: "Multivitamin", detail: "Once daily", source: "Self-medicated (OTC)", date: "Since 2024" },
  ],
  documents: [
    { name: "Upper GI Endoscopy Report.pdf", date: "18 Sep 2024", meta: "City Hospital · 2 pages" },
    { name: "Complete Blood Count.pdf", date: "12 Mar 2026", meta: "Lab Services · 1 page" },
    { name: "Liver Function Test.pdf", date: "12 Mar 2026", meta: "Lab Services · 1 page" },
    { name: "Abdominal Ultrasound.pdf", date: "04 Jan 2025", meta: "Radiology · 3 pages" },
  ],
  timeline: [
    { year: "2019", title: "Hernia repair", detail: "Right inguinal, uneventful recovery", type: "surgery" as const },
    { year: "2022", title: "Lumbar disc bulge", detail: "Started intermittent NSAID use", type: "condition" as const },
    { year: "2024", title: "Upper GI endoscopy", detail: "Mild antral gastritis, H. pylori negative", type: "test" as const },
    { year: "2026", title: "Routine health check", detail: "CBC and LFT within normal limits", type: "test" as const },
    { year: "TODAY", title: "Epigastric pain, 5 days", detail: "Kiosk intake complete · case ready for review", type: "today" as const },
  ],
  verification: [
    { label: "RFID card verified", detail: "Card #8842-1190 matched at Kiosk 03 · 09:02 AM" },
    { label: "Face verification passed", detail: "Confidence 98.4% · 09:03 AM" },
    { label: "Patient confirmed intake summary", detail: "Digitally acknowledged · 09:08 AM" },
  ],
  edits: [
    { field: "Pain severity", from: "6 / 10", to: "8 / 10" },
    { field: "Coffee intake", from: "2 cups/day", to: "4 cups/day" },
    { field: "Smoking status", from: "Occasional", to: "Non-smoker (quit 2021)" },
  ],
};

export const prescription = {
  medicines: [
    { name: "Pantoprazole 40 mg", dosage: "1 tablet", frequency: "Once daily (before breakfast)", duration: "14 days", instructions: "Take 30 min before food" },
    { name: "Sucralfate suspension", dosage: "10 ml", frequency: "Three times daily", duration: "10 days", instructions: "1 hour before meals" },
    { name: "Domperidone 10 mg", dosage: "1 tablet", frequency: "Twice daily", duration: "7 days", instructions: "Before lunch and dinner" },
    { name: "Paracetamol 500 mg", dosage: "1 tablet", frequency: "As needed (max 3/day)", duration: "5 days", instructions: "Replaces Diclofenac for back pain" },
  ],
  investigations: ["Upper GI Endoscopy", "H. pylori stool antigen test", "Complete Blood Count", "Serum Lipase"],
  advice:
    "Stop all NSAIDs immediately. Small frequent bland meals; avoid spicy and fried food, coffee and late-night eating. Elevate head end of bed. Monitor blood pressure daily and record readings. Report immediately if black stools, vomiting blood, or severe pain occur.",
  followUp: "14 Sep 2026",
};

export const notifications = [
  { type: "new" as const, title: "New case ready for review", body: "Patient #MK1042 · Rohan Mehta completed kiosk intake at Kiosk 03.", time: "2 min ago" },
  { type: "review" as const, title: "Review required — flagged vitals", body: "Patient #MK1042 recorded BP 148/94 mmHg, above threshold.", time: "8 min ago" },
  { type: "new" as const, title: "New case ready for review", body: "Patient #MK1043 · Priya Nair completed kiosk intake at Kiosk 01.", time: "26 min ago" },
  { type: "review" as const, title: "Allergy conflict warning", body: "Prescription draft for #MK1039 contains a Sulfa-class drug.", time: "1 hr ago" },
  { type: "new" as const, title: "Lab report uploaded", body: "Liver Function Test for #MK1046 · Vikram Rao is now available.", time: "2 hr ago" },
  { type: "review" as const, title: "Pending consultation notes", body: "3 consultations from yesterday are awaiting your sign-off.", time: "Yesterday" },
];
