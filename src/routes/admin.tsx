import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Database, Image as ImageIcon, Activity, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/admin")({ component: Admin });

function Admin() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Admin Panel</h1>
          <p className="text-sm text-muted-foreground">Platform-wide management and monitoring.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: "Total users", value: "12,840" },
            { icon: Database, label: "Diseases in DB", value: "127" },
            { icon: ImageIcon, label: "Images processed", value: "1.2M" },
            { icon: Activity, label: "Model uptime", value: "99.98%" },
          ].map((k) => (
            <Card key={k.label} className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{k.label}</p>
                <k.icon className="h-4 w-4 text-primary" />
              </div>
              <p className="mt-2 font-display text-2xl font-bold">{k.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h3 className="font-semibold">Recent users</h3>
            <div className="mt-3 space-y-2 text-sm">
              {[
                ["Aisha N.", "aisha@farm.io", "Pro"],
                ["Tom B.", "tom@green.co", "Free"],
                ["Lin W.", "lin@harvest.cn", "Pro"],
                ["Carlos M.", "carlos@agro.mx", "Enterprise"],
              ].map(([n, e, p]) => (
                <div key={n} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                  <div>
                    <p className="font-medium">{n}</p>
                    <p className="text-xs text-muted-foreground">{e}</p>
                  </div>
                  <Badge variant="outline">{p}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold">Pending disease report approvals</h3>
            <div className="mt-3 space-y-2 text-sm">
              {[
                ["Citrus Greening", "submitted by Lin W."],
                ["Banana Black Sigatoka", "submitted by Carlos M."],
                ["Wheat Rust Race 99", "submitted by Aisha N."],
              ].map(([t, by]) => (
                <div key={t} className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                  <div>
                    <p className="font-medium">{t}</p>
                    <p className="text-xs text-muted-foreground">{by}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-success"><CheckCircle2 className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive"><XCircle className="h-4 w-4" /></Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Model monitoring</h3>
            <Badge className="bg-success/15 text-success border-0">All systems operational</Badge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              ["Inference latency", "142ms", "p95"],
              ["Throughput", "8.4k", "scans/hr"],
              ["Drift score", "0.02", "stable"],
            ].map(([l, v, sub]) => (
              <div key={l} className="rounded-xl bg-muted/40 p-4">
                <p className="text-xs text-muted-foreground">{l}</p>
                <p className="mt-1 font-display text-xl font-bold">{v}</p>
                <p className="text-xs text-success">{sub}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
