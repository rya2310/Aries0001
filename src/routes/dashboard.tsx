import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ScanLine, TrendingUp, Leaf, AlertTriangle, Upload, ArrowUpRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Legend,
} from "recharts";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { recentScans, diseaseTrends, diseaseDistribution } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({ component: Dashboard });

const PIE_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">Welcome back, Ravi 🌱</h1>
            <p className="text-sm text-muted-foreground">Here's what's happening across your fields.</p>
          </div>
          <Link to="/detect"><Button className="gradient-primary text-primary-foreground shadow-glow">
            <Upload className="mr-2 h-4 w-4" /> New scan
          </Button></Link>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total Scans", value: "1,284", delta: "+12.4%", icon: ScanLine, tone: "primary" },
            { label: "Healthy Crops", value: "78%", delta: "+3.2%", icon: Leaf, tone: "success" },
            { label: "Diseased Crops", value: "22%", delta: "-1.8%", icon: AlertTriangle, tone: "destructive" },
            { label: "AI Confidence", value: "98.7%", delta: "+0.4%", icon: TrendingUp, tone: "primary" },
          ].map((k, i) => (
            <motion.div key={k.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">{k.label}</p>
                    <p className="mt-2 font-display text-3xl font-bold">{k.value}</p>
                    <p className="mt-1 text-xs text-success">{k.delta} vs last week</p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <k.icon className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-5 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Disease trends</h3>
                <p className="text-xs text-muted-foreground">Scans vs diseased detections</p>
              </div>
              <Badge variant="secondary">Last 6 months</Badge>
            </div>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={diseaseTrends}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-4)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--chart-4)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="scans" stroke="var(--chart-1)" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="diseased" stroke="var(--chart-4)" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold">Disease distribution</h3>
            <p className="text-xs text-muted-foreground">By category</p>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={diseaseDistribution} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                  {diseaseDistribution.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Quick action + recent */}
        <div className="grid gap-4 lg:grid-cols-3">
          <Link to="/detect" className="lg:col-span-1">
            <Card className="group h-full overflow-hidden p-6 gradient-primary text-primary-foreground transition-transform hover:-translate-y-1">
              <Upload className="h-8 w-8" />
              <h3 className="mt-4 font-display text-xl font-bold">Quick scan</h3>
              <p className="mt-1 text-sm text-primary-foreground/90">Drop an image and get an instant diagnosis.</p>
              <div className="mt-6 inline-flex items-center text-sm font-medium">
                Start now <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Card>
          </Link>

          <Card className="lg:col-span-2 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Recent predictions</h3>
              <Link to="/history" className="text-xs text-primary hover:underline">View all</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-muted-foreground">
                  <tr>
                    <th className="pb-3 font-medium">Scan</th>
                    <th className="pb-3 font-medium">Crop</th>
                    <th className="pb-3 font-medium">Disease</th>
                    <th className="pb-3 font-medium">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {recentScans.slice(0, 5).map((s) => (
                    <tr key={s.id} className="hover:bg-muted/40">
                      <td className="py-3 font-mono text-xs">{s.id}</td>
                      <td className="py-3">{s.crop}</td>
                      <td className="py-3">
                        <Badge variant={s.disease === "Healthy" ? "secondary" : "outline"} className={s.disease === "Healthy" ? "bg-success/15 text-success" : ""}>
                          {s.disease}
                        </Badge>
                      </td>
                      <td className="py-3 text-primary">{s.confidence}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
