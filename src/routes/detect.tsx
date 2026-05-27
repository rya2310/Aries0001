import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Upload, Camera, ScanLine, X, Sparkles, Leaf, AlertTriangle, RefreshCw, FileText } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

export const Route = createFileRoute("/detect")({ component: Detect });

type Stage = "idle" | "preview" | "scanning" | "result";

function Detect() {
  const [stage, setStage] = useState<Stage>("idle");
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file);
    setImage(url);
    setStage("preview");
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
    else toast.error("Please drop an image file");
  };

  const startScan = () => {
    setStage("scanning");
    setProgress(0);
    const t = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) { clearInterval(t); setTimeout(() => setStage("result"), 300); return 100; }
        return p + 5;
      });
    }, 80);
  };

  const reset = () => { setImage(null); setStage("idle"); setProgress(0); };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-3xl font-bold">AI Disease Detection</h1>
          <p className="text-sm text-muted-foreground">Upload a leaf image and get instant diagnosis with treatment plans.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Uploader */}
          <Card className="lg:col-span-3 p-6">
            <AnimatePresence mode="wait">
              {stage === "idle" && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onDragOver={(e) => e.preventDefault()} onDrop={onDrop}
                  className="flex min-h-[420px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-10 text-center transition-colors hover:border-primary hover:bg-primary/5"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-glow animate-float">
                    <Upload className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-bold">Drop your image here</h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">PNG, JPG, or WEBP — max 10MB. For best results use a clear close-up of a single leaf.</p>
                  <div className="mt-6 flex flex-wrap justify-center gap-2">
                    <Button onClick={() => inputRef.current?.click()} className="gradient-primary text-primary-foreground shadow-glow">
                      <Upload className="mr-2 h-4 w-4" /> Choose file
                    </Button>
                    <Button variant="outline" onClick={() => toast.info("Camera capture (demo)")}>
                      <Camera className="mr-2 h-4 w-4" /> Use camera
                    </Button>
                  </div>
                  <input ref={inputRef} type="file" accept="image/*" hidden
                    onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
                </motion.div>
              )}

              {stage === "preview" && image && (
                <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img src={image} alt="Preview" className="h-[380px] w-full object-cover" />
                    <Button size="icon" variant="secondary" className="absolute right-3 top-3" onClick={reset}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button className="w-full gradient-primary text-primary-foreground shadow-glow" onClick={startScan}>
                    <ScanLine className="mr-2 h-4 w-4" /> Analyze image
                  </Button>
                </motion.div>
              )}

              {stage === "scanning" && image && (
                <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img src={image} alt="Scanning" className="h-[380px] w-full object-cover" />
                    <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/60 to-transparent animate-scan" />
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <div className="absolute bottom-4 left-4 right-4 glass rounded-xl p-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Sparkles className="h-4 w-4 text-primary animate-pulse" /> AI analyzing leaf patterns…
                      </div>
                      <Progress value={progress} className="mt-2 h-1.5" />
                    </div>
                  </div>
                </motion.div>
              )}

              {stage === "result" && image && (
                <motion.div key="result" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <div className="relative overflow-hidden rounded-2xl">
                    <img src={image} alt="Result" className="h-[300px] w-full object-cover" />
                    <Badge className="absolute left-3 top-3 gradient-primary text-primary-foreground border-0">
                      <Sparkles className="mr-1 h-3 w-3" /> Analysis complete
                    </Badge>
                  </div>
                  <div className="rounded-2xl border border-border/40 bg-muted/30 p-4">
                    <div className="text-xs font-semibold text-muted-foreground">GRAD-CAM VISUALIZATION</div>
                    <div className="mt-2 grid h-32 place-items-center rounded-xl bg-gradient-to-br from-primary/30 via-warning/20 to-destructive/30 text-xs text-muted-foreground">
                      Heatmap overlay (demo)
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" onClick={reset}>
                      <RefreshCw className="mr-2 h-4 w-4" /> Try another image
                    </Button>
                    <Button className="flex-1 gradient-primary text-primary-foreground" asChild>
                      <Link to="/disease/$slug" params={{ slug: "early-blight" }}>
                        <FileText className="mr-2 h-4 w-4" /> Full report
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>

          {/* Result panel */}
          <div className="space-y-4 lg:col-span-2">
            {stage === "result" ? (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <Card className="p-6 glass">
                  <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                    <Leaf className="h-3 w-3" /> DETECTED DISEASE
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold">Tomato Early Blight</h2>
                  <p className="text-xs italic text-muted-foreground">Alternaria solani</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Confidence</p>
                      <p className="mt-1 font-display text-xl font-bold text-primary">96.4%</p>
                    </div>
                    <div className="rounded-xl bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">Severity</p>
                      <p className="mt-1 font-display text-xl font-bold text-warning">Moderate</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-5">
                  <h4 className="text-sm font-semibold">Recommended treatment</h4>
                  <ul className="mt-3 space-y-2 text-sm">
                    <li className="flex gap-2"><span className="text-primary">•</span> Apply Chlorothalonil 2g/L every 7-10 days.</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Remove and destroy affected lower leaves.</li>
                    <li className="flex gap-2"><span className="text-primary">•</span> Switch to drip irrigation to reduce leaf wetness.</li>
                  </ul>
                </Card>
                <Card className="p-5">
                  <h4 className="text-sm font-semibold flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-warning" /> Prevention tips</h4>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                    <li>• Rotate crops every 2-3 years</li>
                    <li>• Mulch to prevent soil splash</li>
                    <li>• Stake plants for better airflow</li>
                  </ul>
                </Card>
              </motion.div>
            ) : (
              <Card className="flex h-full min-h-[420px] flex-col items-center justify-center p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="mt-4 text-sm font-medium">Awaiting analysis</p>
                <p className="mt-1 text-xs text-muted-foreground">Upload an image to see the diagnosis report here.</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
