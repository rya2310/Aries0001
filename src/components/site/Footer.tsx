import { Leaf, Twitter, Github, Linkedin } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">AgroVision AI</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">AI-powered crop disease detection for the modern farm.</p>
        </div>
        {[
          { title: "Product", links: [["Dashboard", "/dashboard"], ["Detect", "/detect"], ["Analytics", "/analytics"]] },
          { title: "Company", links: [["About", "/"], ["Careers", "/"], ["Blog", "/"]] },
          { title: "Resources", links: [["Docs", "/"], ["Support", "/"], ["Privacy", "/"]] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="mb-3 text-sm font-semibold">{col.title}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.links.map(([l, href]) => (
                <li key={l}><Link to={href} className="hover:text-foreground">{l}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/40">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© 2026 AgroVision AI. All rights reserved.</p>
          <div className="flex gap-3">
            <a href="#" aria-label="Twitter"><Twitter className="h-4 w-4 hover:text-foreground" /></a>
            <a href="#" aria-label="GitHub"><Github className="h-4 w-4 hover:text-foreground" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="h-4 w-4 hover:text-foreground" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
