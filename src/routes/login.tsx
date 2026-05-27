import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, EyeOff, Leaf, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import authImg from "@/assets/auth-illustration.jpg";

export const Route = createFileRoute("/login")({ component: LoginPage });

function LoginPage() {
  return <AuthShell mode="login" />;
}

export function AuthShell({ mode }: { mode: "login" | "signup" }) {
  const [show, setShow] = useState(false);
  const isSignup = mode === "signup";
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={authImg} alt="Aerial view of farmland" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/70 via-primary/30 to-transparent" />
        <div className="relative flex h-full flex-col justify-between p-10 text-primary-foreground">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">AgroVision AI</span>
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="font-display text-4xl font-bold leading-tight">Smarter farms,<br />healthier crops.</h2>
            <p className="mt-3 max-w-sm text-primary-foreground/90">Join 45,000+ farmers using AI to protect their harvest.</p>
          </motion.div>
        </div>
      </div>

      <div className="flex items-center justify-center p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">AgroVision AI</span>
          </Link>
          <h1 className="mt-8 font-display text-3xl font-bold lg:mt-0">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignup ? "Start detecting crop diseases in seconds." : "Sign in to your AgroVision account."}
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Button variant="outline">Google</Button>
            <Button variant="outline">Apple</Button>
          </div>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs text-muted-foreground">OR</span>
            <Separator className="flex-1" />
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {isSignup && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input id="name" placeholder="Ravi Patel" className="pl-9" required />
                </div>
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@farm.com" className="pl-9" required />
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                {!isSignup && <Link to="/login" className="text-xs text-primary hover:underline">Forgot?</Link>}
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type={show ? "text" : "password"} placeholder="••••••••" className="pl-9 pr-9" required />
                <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Link to="/dashboard" className="block">
              <Button type="button" className="w-full gradient-primary text-primary-foreground shadow-glow">
                {isSignup ? "Create account" : "Sign in"}
              </Button>
            </Link>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account? " : "Don't have an account? "}
            <Link to={isSignup ? "/login" : "/signup"} className="font-medium text-primary hover:underline">
              {isSignup ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
