import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, ScanLine, History, BarChart3, Leaf, Settings, Shield, Bell, Search, Moon, Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";
import type { ReactNode } from "react";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/detect", label: "Detect Disease", icon: ScanLine },
  { to: "/disease/early-blight", label: "Disease Library", icon: Leaf },
  { to: "/history", label: "Scan History", icon: History },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin", label: "Admin Panel", icon: Shield },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function DashboardLayout({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/40 bg-sidebar lg:flex lg:flex-col">
        <Link to="/" className="flex h-16 items-center gap-2 border-b border-border/40 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-base font-bold">AgroVision <span className="text-gradient">AI</span></span>
        </Link>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((item) => {
            const active = path === item.to || (item.to !== "/dashboard" && path.startsWith(item.to.split("/").slice(0, 2).join("/")));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "text-sidebar-foreground hover:bg-sidebar-accent"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border/40 p-3">
          <div className="glass rounded-xl p-4 text-xs">
            <p className="font-semibold">Upgrade to Pro</p>
            <p className="mt-1 text-muted-foreground">Unlock unlimited scans & API access.</p>
            <Button size="sm" className="mt-3 w-full gradient-primary text-primary-foreground">Upgrade</Button>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-border/40 bg-background/80 px-4 backdrop-blur-xl md:px-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search scans, diseases, crops..." className="pl-9 bg-muted/50 border-border/40" />
          </div>
          <Button variant="ghost" size="icon" onClick={toggle}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-2 rounded-full">
                <Avatar className="h-9 w-9 ring-2 ring-primary/30">
                  <AvatarFallback className="gradient-primary text-primary-foreground">RP</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div>
                  <p className="text-sm font-medium">Ravi Patel</p>
                  <p className="text-xs text-muted-foreground">ravi@agrovision.ai</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/settings">Profile settings</Link></DropdownMenuItem>
              <DropdownMenuItem asChild><Link to="/history">Scan history</Link></DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><Link to="/login">Sign out</Link></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
