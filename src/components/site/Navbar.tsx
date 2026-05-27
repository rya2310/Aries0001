import { Link, useRouterState } from "@tanstack/react-router";
import { Leaf, Moon, Sun, Menu } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/detect", label: "Detect" },
  { to: "/analytics", label: "Analytics" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-glow">
            <Leaf className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">AgroVision <span className="text-gradient">AI</span></span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent ${
                path === l.to ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Link to="/login" className="hidden md:block">
            <Button variant="ghost" size="sm">Sign in</Button>
          </Link>
          <Link to="/signup" className="hidden md:block">
            <Button size="sm" className="gradient-primary text-primary-foreground shadow-glow">
              Get started
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {open && (
        <div className="border-t border-border/40 bg-background/95 md:hidden">
          <div className="container mx-auto flex flex-col gap-1 px-4 py-3">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-accent">
                {l.label}
              </Link>
            ))}
            <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm hover:bg-accent">Sign in</Link>
          </div>
        </div>
      )}
    </motion.header>
  );
}
