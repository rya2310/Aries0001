import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Download, Eye, Filter } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { recentScans } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/history")({ component: HistoryPage });

function HistoryPage() {
  const [q, setQ] = useState("");
  const [crop, setCrop] = useState("all");
  const [open, setOpen] = useState<typeof recentScans[number] | null>(null);

  const filtered = recentScans.filter(s =>
    (crop === "all" || s.crop === crop) &&
    (s.disease.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Scan history</h1>
          <p className="text-sm text-muted-foreground">All your previous detections in one place.</p>
        </div>

        <Card className="p-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by disease or scan ID" className="pl-9" />
            </div>
            <Select value={crop} onValueChange={setCrop}>
              <SelectTrigger className="w-[160px]"><Filter className="mr-1 h-3 w-3" /><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All crops</SelectItem>
                {[...new Set(recentScans.map(s => s.crop))].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={() => toast.success("Report exported")}>
              <Download className="mr-2 h-4 w-4" /> Export
            </Button>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs text-muted-foreground">
                <tr className="border-b border-border/40">
                  <th className="pb-3 pt-1 font-medium">Scan ID</th>
                  <th className="pb-3 pt-1 font-medium">Date</th>
                  <th className="pb-3 pt-1 font-medium">Crop</th>
                  <th className="pb-3 pt-1 font-medium">Disease</th>
                  <th className="pb-3 pt-1 font-medium">Severity</th>
                  <th className="pb-3 pt-1 font-medium">Confidence</th>
                  <th className="pb-3 pt-1 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filtered.map((s, i) => (
                  <motion.tr key={s.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-muted/40">
                    <td className="py-3 font-mono text-xs">{s.id}</td>
                    <td className="py-3 text-muted-foreground">{s.date}</td>
                    <td className="py-3">{s.crop}</td>
                    <td className="py-3">
                      <Badge variant={s.disease === "Healthy" ? "secondary" : "outline"} className={s.disease === "Healthy" ? "bg-success/15 text-success" : ""}>
                        {s.disease}
                      </Badge>
                    </td>
                    <td className="py-3 text-sm">{s.severity}</td>
                    <td className="py-3 text-primary font-medium">{s.confidence}%</td>
                    <td className="py-3 text-right">
                      <Button variant="ghost" size="sm" onClick={() => setOpen(s)}><Eye className="h-4 w-4" /></Button>
                    </td>
                  </motion.tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">No scans match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Scan {open?.id}</DialogTitle>
            </DialogHeader>
            {open && (
              <div className="space-y-3 text-sm">
                <Row k="Crop" v={open.crop} />
                <Row k="Disease" v={open.disease} />
                <Row k="Severity" v={open.severity} />
                <Row k="Confidence" v={`${open.confidence}%`} />
                <Row k="Date" v={open.date} />
                <Button className="w-full gradient-primary text-primary-foreground"><Download className="mr-2 h-4 w-4" /> Download report</Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between rounded-lg bg-muted/40 px-3 py-2">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-medium">{v}</span>
    </div>
  );
}
