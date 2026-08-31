# DocMate Portal

Here's the prompt, styled after that Mediczen reference (clean white sidebar, blue accent, card-based dashboard) — color/layout language only, not a literal copy:

Prompt:

Build a static, formatted frontend-only doctor web portal (React + Tailwind CSS) called "MediKiosk — Doctor Portal." This is a UI/UX prototype with mock data only — no backend, no real auth.

Visual style (design language, not exact clone):

Clean white background, light grey (#F7F8FA) content canvas

Left sidebar: white, fixed width, logo top-left, nav items with rounded-pill active state in soft blue (#EEF3FF background, #2563EB text/icon), grouped under section labels (MAIN, SUPPORT)

Primary accent: confident blue (#2563EB) for active states, primary buttons, links, icons

Cards: white, rounded-2xl corners, subtle border or soft shadow, generous padding

Small stat cards with icon + label + big number + tiny bar-chart sparkline in top-right

Status pills: colored soft-background rounded tags (green/yellow/grey/blue/red variants) for priority/status labels

Typography: bold dark slate headings, grey secondary text, clean sans-serif

Top bar inside content area: greeting headline + subtext, icon buttons (settings, bell) + doctor avatar with dropdown chevron on the right

Data tables: clean rows, avatar + name/subtext pattern, right-aligned action buttons

Calendar/timeline widgets: minimal, dot-indicators for event types

Pages/sections to build (static, all mock data):

Login Screen — centered card, MediKiosk logo, "Doctor Portal" subtitle, Hospital/Doctor ID + Password fields, Remember me, Sign In button (blue, full width)

Sidebar navigation (persistent across all pages):

MAIN: Dashboard, Patients, Prescriptions, Medical History, Notifications

SUPPORT: Settings, Logout

Dashboard

Header: "Good Morning, Dr. Shah" + "Gastroenterology • City Hospital"

4 stat cards in a row: Today's Patients (24), Cases Ready (4), Currently in Intake (2), Waiting (6) — small icon + number + label, no sparkline needed (keep numbers modest, not analytics-heavy)

"New Case Ready" notification banner card (patient ID + "View Case" button)

"Today's Patients" table: search bar, status filter pills (All/Ready/In Intake/Waiting/Completed), rows showing patient ID, age/gender, chief complaint, status pill, kiosk number, time, "View Case" button

Patient Case (the main screen — build this as a single scrollable clinical workspace, not multiple tabs)

Header: Patient #MK1042, name, age/gender, department, visit date

Verification badges row: ✓ RFID Verified, ✓ Face Verified, ✓ Patient Confirmed (small pill badges)

"Attention Required" warning card (amber background) listing flagged items

Two-column row: Chief Complaint card (left) + Vitals card (right, small grid of vital cards inside)

"AI Case Summary" card — summary paragraph, source tags row (🎤 Patient Interview, 📄 Previous Record, 🩺 Vitals), small label "AI-generated • Doctor review required"

Clinical History section — structured key/value rows (Onset, Duration, Location, Severity, Associated symptoms, etc.)

Medical History section — Previous Conditions, Surgeries, Family History, Allergies as sub-cards

Medication History — list of medicine cards with source + date

Previous Medical Records — document cards (filename, date, "View Document" button)

Patient Health Timeline — horizontal or vertical timeline with year markers and event dots, "TODAY" highlighted

Patient Verification card — confirmation checkmarks + any "Previous → Patient confirmed" edit diffs

Doctor Consultation section (bottom): Clinical Observations, Assessment, Investigation Requests, Doctor's Notes — large text areas

Prescription builder: "+ Add Medicine" button, table with Medicine/Dosage/Frequency/Duration/Instructions columns, Investigations checklist, Advice textbox, Follow-up date picker

Bottom action bar: "Save" (secondary) + "Complete Consultation" (primary blue) buttons, sticky at bottom

Prescription Preview — formatted prescription document layout (hospital name, doctor name/dept, patient info, medicines list, investigations, advice, follow-up), Edit + Confirm Prescription buttons

Prescription Confirmation Modal — simple confirm dialog with Cancel/Confirm & Issue buttons

Patients List Page — searchable/filterable table of all patients (not just today's)

Notifications Page — simple list of notification cards, colored left-border by type (green=new case, amber=review required)

Settings Page — Doctor Profile (name, department, hospital), Preferences (language, notifications toggle), Security (change password, logout) — simple form sections

Requirements:

Fully static — use hardcoded mock data throughout, no functional backend calls

Componentize: Sidebar, TopBar, StatCard, StatusPill, PatientCase (broken into sub-sections), Timeline, DocumentCard

Desktop-first (this is a clinical workstation tool), responsive down to tablet width minimum

No animations needed beyond basic hover states — this should feel calm, clinical, and information-dense but scannable, never cluttered

Keep the Patient Case screen as the centerpiece — it should feel like the single most complete, polished screen in the build

make website ok

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cc110278-32ab-4fdb-8521-d2ac2df5ab2c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
