import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useTheme } from "@/lib/theme";
import { Smartphone, Laptop, Tablet } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({ component: Settings });

function Settings() {
  const { theme, toggle } = useTheme();
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your profile, preferences, and security.</p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="devices">Devices</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 ring-2 ring-primary/30">
                  <AvatarFallback className="gradient-primary text-primary-foreground text-lg">RP</AvatarFallback>
                </Avatar>
                <div>
                  <Button size="sm" variant="outline">Upload photo</Button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG or PNG, max 2MB</p>
                </div>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <Field label="Full name" defaultValue="Ravi Patel" />
                <Field label="Email" defaultValue="ravi@agrovision.ai" />
                <Field label="Farm name" defaultValue="Green Acres" />
                <Field label="Location" defaultValue="Gujarat, India" />
              </div>
              <Button className="mt-6 gradient-primary text-primary-foreground" onClick={() => toast.success("Profile saved")}>Save changes</Button>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-6 space-y-4">
              {[
                ["Disease alerts", "Get notified when high-risk diseases are detected"],
                ["Weekly reports", "Receive weekly farm health summaries by email"],
                ["Product updates", "News about new features and AI improvements"],
              ].map(([t, d]) => (
                <div key={t} className="flex items-center justify-between border-b border-border/40 pb-4 last:border-0">
                  <div>
                    <p className="text-sm font-medium">{t}</p>
                    <p className="text-xs text-muted-foreground">{d}</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={toggle} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Language</p>
                  <p className="text-xs text-muted-foreground">Display language</p>
                </div>
                <Select defaultValue="en">
                  <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-6 space-y-4">
              <Field label="Current password" type="password" />
              <Field label="New password" type="password" />
              <Field label="Confirm new password" type="password" />
              <Button className="gradient-primary text-primary-foreground" onClick={() => toast.success("Password updated")}>Update password</Button>
            </Card>
          </TabsContent>

          <TabsContent value="devices">
            <Card className="p-6 space-y-3">
              {[
                { icon: Laptop, name: "MacBook Pro", loc: "Mumbai, IN", active: true },
                { icon: Smartphone, name: "iPhone 15", loc: "Mumbai, IN", active: false },
                { icon: Tablet, name: "iPad Air", loc: "Ahmedabad, IN", active: false },
              ].map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-xl border border-border/40 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <d.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{d.name} {d.active && <span className="ml-2 text-xs text-success">• Active now</span>}</p>
                      <p className="text-xs text-muted-foreground">{d.loc}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Sign out</Button>
                </div>
              ))}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function Field({ label, ...rest }: { label: string } & React.ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input {...rest} />
    </div>
  );
}
