import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Upload, Sparkles, Brain, Zap, Leaf, BarChart3, Languages, ShieldCheck,
  ArrowRight, Camera, ScanLine, FileText, CheckCircle2, Star,
} from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { stats, features, testimonials, faqs } from "@/lib/mock-data";
import heroLeaf from "@/assets/hero-leaf.jpg";

export const Route = createFileRoute("/")({ component: Landing });

const iconMap = { Brain, Zap, Leaf, BarChart3, Languages, ShieldCheck };

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="container relative mx-auto grid gap-10 px-4 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              <Sparkles className="h-3 w-3" /> Powered by deep learning
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
            >
              Detect crop diseases <span className="text-gradient">instantly</span> using AI
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-5 max-w-xl text-lg text-muted-foreground"
            >
              Snap a photo of any leaf and our AI identifies 120+ diseases in under 2 seconds —
              with treatment plans tailored to your farm.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <Link to="/detect">
                <Button size="lg" className="gradient-primary text-primary-foreground shadow-glow">
                  <Upload className="mr-2 h-4 w-4" /> Upload image
                </Button>
              </Link>
              <a href="#features">
                <Button size="lg" variant="outline">
                  Explore features <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-3xl shadow-glow animate-float">
              <img src={heroLeaf} alt="AI scanning a green leaf" className="h-full w-full object-cover" width={1280} height={1280} />
              <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/40 to-transparent animate-scan" />
              <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold">Healthy leaf</span>
                  <span className="text-primary">98.7% confidence</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-[98%] gradient-primary" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/40 bg-muted/30">
        <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="font-display text-3xl font-bold text-gradient md:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Everything you need to protect your crops</h2>
          <p className="mt-4 text-muted-foreground">Powerful AI tools designed for farmers, by agronomists.</p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const Icon = iconMap[f.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="group h-full p-6 transition-all hover:-translate-y-1 hover:shadow-glow">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:gradient-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.desc}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold md:text-5xl">How it works</h2>
            <p className="mt-4 text-muted-foreground">From photo to treatment plan in 4 simple steps.</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              { icon: Camera, title: "Upload image", desc: "Snap or upload a leaf photo." },
              { icon: ScanLine, title: "AI analysis", desc: "Our model scans every pixel." },
              { icon: Sparkles, title: "Disease detection", desc: "Get diagnosis with confidence." },
              { icon: FileText, title: "Treatment plan", desc: "Tailored organic & chemical options." },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-primary-foreground shadow-glow">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mt-4 text-xs font-semibold text-primary">STEP {i + 1}</div>
                <h3 className="mt-1 font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">Loved by farmers worldwide</h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
              <Card className="h-full p-6 glass">
                <div className="flex gap-1 text-warning">
                  {[...Array(5)].map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm">"{t.quote}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container mx-auto max-w-3xl px-4 py-20 md:py-28">
          <h2 className="text-center font-display text-3xl font-bold md:text-5xl">Frequently asked questions</h2>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="relative overflow-hidden rounded-3xl gradient-primary p-10 text-center shadow-glow md:p-16">
          <div className="absolute inset-0 grid-bg opacity-20" />
          <div className="relative">
            <CheckCircle2 className="mx-auto h-10 w-10 text-primary-foreground" />
            <h2 className="mt-4 font-display text-3xl font-bold text-primary-foreground md:text-5xl">
              Start protecting your crops today
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/90">
              Free to start. No credit card required.
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="mt-6">
                Get started free <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
