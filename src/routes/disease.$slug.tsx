import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, AlertTriangle, ShieldCheck, Pill, Calendar, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { diseaseInfo } from "@/lib/mock-data";
import heroLeaf from "@/assets/hero-leaf.jpg";

export const Route = createFileRoute("/disease/$slug")({ component: DiseasePage });

function DiseasePage() {
  const d = diseaseInfo;
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-border/40">
          <img src={heroLeaf} alt={d.name} className="h-64 w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <Badge className="gradient-primary text-primary-foreground border-0">{d.severity} severity</Badge>
            <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{d.name}</h1>
            <p className="text-sm italic text-muted-foreground">{d.scientific}</p>
          </div>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-2">
          <InfoCard icon={AlertTriangle} title="Symptoms" tone="warning" items={d.symptoms} />
          <InfoCard icon={Leaf} title="Causes" tone="primary" items={d.causes} />
          <InfoCard icon={ShieldCheck} title="Prevention" tone="success" items={d.prevention} />
          <Card className="p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Pill className="h-4 w-4 text-primary" /> Recommended treatments
            </div>
            <div className="mt-4 space-y-3">
              {d.treatments.map((t) => (
                <div key={t.name} className="flex items-center justify-between rounded-xl bg-muted/40 p-3">
                  <div>
                    <p className="text-sm font-medium">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.dosage}</p>
                  </div>
                  <Badge variant="outline">{t.type}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <p className="text-xs text-muted-foreground">Affected crops</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {d.affectedCrops.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}
            </div>
          </Card>
          <Card className="p-5">
            <p className="flex items-center gap-2 text-xs text-muted-foreground"><Calendar className="h-3 w-3" /> Seasonal risk</p>
            <p className="mt-3 text-sm font-medium">{d.seasonalRisk}</p>
          </Card>
          <Card className="p-5 gradient-primary text-primary-foreground">
            <p className="flex items-center gap-2 text-xs"><Sparkles className="h-3 w-3" /> AI recommendation</p>
            <p className="mt-3 text-sm">Inspect adjacent rows weekly. Begin preventive copper spray before next humid spell.</p>
          </Card>
        </div>

        <Card className="p-5">
          <h3 className="font-semibold">Related diseases</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Late Blight", "Septoria Leaf Spot", "Bacterial Spot", "Mosaic Virus"].map((n) => (
              <div key={n} className="group cursor-pointer rounded-xl border border-border/40 p-4 transition-all hover:-translate-y-1 hover:shadow-elegant">
                <Leaf className="h-5 w-5 text-primary" />
                <p className="mt-2 text-sm font-medium">{n}</p>
                <p className="text-xs text-muted-foreground">View details →</p>
              </div>
            ))}
          </div>
        </Card>
        <Button variant="outline">Back to library</Button>
      </div>
    </DashboardLayout>
  );
}

function InfoCard({ icon: Icon, title, items, tone }: { icon: any; title: string; items: string[]; tone: string }) {
  const toneClass = tone === "warning" ? "text-warning bg-warning/10" : tone === "success" ? "text-success bg-success/10" : "text-primary bg-primary/10";
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${toneClass}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold">{title}</h3>
      </div>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((s) => <li key={s} className="flex gap-2"><span className="text-primary">•</span> {s}</li>)}
      </ul>
    </Card>
  );
}
