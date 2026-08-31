import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, AlertTriangle } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { notifications } from "@/data/mock";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · MediKiosk Doctor Portal" },
      {
        name: "description",
        content:
          "Case-ready alerts, flagged vitals and review reminders from the MediKiosk intake network.",
      },
      { property: "og:title", content: "Notifications · MediKiosk Doctor Portal" },
      {
        property: "og:description",
        content: "Case-ready alerts and review reminders from the kiosk intake network.",
      },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  return (
    <AppLayout title="Notifications" subtitle="6 updates from the kiosk network today">
      <div className="max-w-3xl space-y-3">
        {notifications.map((n, i) => (
          <article
            key={i}
            className={cn(
              "flex items-start gap-4 rounded-2xl border border-border border-l-4 bg-card p-5 shadow-card",
              n.type === "new" ? "border-l-success" : "border-l-warning",
            )}
          >
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl",
                n.type === "new" ? "bg-success-soft text-success" : "bg-warning-soft text-warning",
              )}
            >
              {n.type === "new" ? (
                <BellRing className="size-5" />
              ) : (
                <AlertTriangle className="size-5" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-sm font-bold text-foreground">{n.title}</h2>
                <span className="text-xs text-muted-foreground">{n.time}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
              <Link
                to="/case/$caseId"
                params={{ caseId: "MK1042" }}
                className="mt-3 inline-flex rounded-full border border-border px-3.5 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-primary-soft"
              >
                Open case
              </Link>
            </div>
          </article>
        ))}
      </div>
    </AppLayout>
  );
}
