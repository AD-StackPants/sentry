import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";
import { routes } from "@/routes/manifest";
import AppLogo from "@/components/AppLogo";

export default function Signup() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStep, setAuthStep] = useState<
    "idle" | "creating" | "sending" | "success"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    setAuthStep("creating");
    setTimeout(() => {
      setAuthStep("sending");
      setTimeout(() => {
        setAuthStep("success");
        setIsSubmitting(false);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col items-center justify-center py-12 px-4">
      {/* Logo + version */}
      <div className="flex items-center gap-2.5 mb-8">
        <AppLogo />
        <span className="badge badge-neutral badge-mono">v0.1.0 · pre-alpha</span>
      </div>

      <div className="w-full max-w-md">
        <div className="card">
          {authStep === "idle" && (
            <form onSubmit={handleSubmit}>
              <div className="card-header">
                <h1 className="card-title text-base">Create an account</h1>
                <p className="card-description">
                  Start monitoring your distributed systems with AD. Sentry.
                </p>
              </div>

              <div className="card-content flex flex-col gap-4">
                <div className="form-group">
                  <label htmlFor="signup-name" className="form-label">
                    Full Name
                  </label>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-password" className="form-label">
                    Password
                  </label>
                  <input
                    id="signup-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    autoComplete="new-password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="signup-confirm" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="signup-confirm"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-input"
                    autoComplete="new-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary w-full mt-1 cursor-pointer"
                >
                  Create Account
                </button>

                <div className="border-t border-border pt-4 text-center">
                  <span className="text-xs text-neutral-foreground">
                    Already have an account?{" "}
                    <Link
                      to={routes.login.path}
                      className="font-semibold text-primary hover:underline"
                    >
                      Sign In
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          )}

          {(authStep === "creating" || authStep === "sending") && (
            <div className="card-content flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="icon-box w-12 h-12 rounded-xl">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground text-sm">
                  {authStep === "creating" && "Provisioning user workspace..."}
                  {authStep === "sending" && "Sending 6-digit confirmation pin..."}
                </h4>
                <p className="text-xs text-neutral-foreground font-mono">
                  {authStep === "creating" && "Syncing credential signatures"}
                  {authStep === "sending" && `Forwarding trace verification to ${email}`}
                </p>
              </div>
            </div>
          )}

          {authStep === "success" && (
            <div className="card-content text-center py-10 flex flex-col items-center gap-5">
              <div className="icon-box icon-box-emerald w-12 h-12 rounded-xl">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-foreground">
                  Verification Email Sent
                </h3>
                <p className="text-xs text-neutral-foreground leading-relaxed max-w-sm mx-auto">
                  We've sent a 6-digit confirmation pin to{" "}
                  <span className="text-foreground font-semibold">{email}</span>
                  . Enter the code on the verification page to activate your workspace.
                </p>
              </div>
              <Link
                to={`${routes.verifyEmail.path}?email=${encodeURIComponent(email)}`}
                className="button button-primary w-full justify-center"
              >
                Go to Verification
              </Link>
            </div>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-neutral-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secured with TLS 1.3 end-to-end encryption
        </p>
      </div>
    </div>
  );
}
