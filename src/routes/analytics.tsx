import { createFileRoute } from "@tanstack/react-router";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { diseaseTrends, diseaseDistribution, accuracyHistory } from "@/lib/mock-data";

export const Route = createFileRoute("/analytics")({ component: Analytics });

const COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)"];

function Analytics() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Analytics</h1>
          <p className="text-sm text-muted-foreground">Track crop health, disease spread, and AI performance.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Crop health score", value: "8.4 / 10", delta: "+0.6" },
            { label: "Disease incidents", value: "47", delta: "-12%" },
            { label: "Model accuracy", value: "98.7%", delta: "+0.4%" },
          ].map((k) => (
            <Card key={k.label} className="p-5">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="mt-2 font-display text-3xl font-bold">{k.value}</p>
              <p className="mt-1 text-xs text-success">{k.delta}</p>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-5">
            <h3 className="font-semibold">Disease incidence by month</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={diseaseTrends}>
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Bar dataKey="diseased" fill="var(--chart-1)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold">AI accuracy trend</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={accuracyHistory}>
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[90, 100]} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Line type="monotone" dataKey="accuracy" stroke="var(--chart-1)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <h3 className="font-semibold">Disease category split</h3>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie data={diseaseDistribution} dataKey="value" innerRadius={60} outerRadius={100} paddingAngle={3}>
                  {diseaseDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Disease spread heatmap</h3>
              <Badge variant="secondary">Last 30 days</Badge>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-1.5">
              {Array.from({ length: 12 * 7 }).map((_, i) => {
                const intensity = Math.random();
                return (
                  <div
                    key={i}
                    className="aspect-square rounded-md"
                    style={{
                      background: `color-mix(in oklab, var(--primary) ${Math.round(intensity * 90)}%, transparent)`,
                    }}
                  />
                );
              })}
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Low</span>
              <div className="flex gap-1">
                {[20, 40, 60, 80, 100].map((p) => (
                  <div key={p} className="h-3 w-6 rounded-sm" style={{ background: `color-mix(in oklab, var(--primary) ${p}%, transparent)` }} />
                ))}
              </div>
              <span>High</span>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
