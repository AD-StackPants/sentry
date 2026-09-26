import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ShieldCheck } from "lucide-react";
import { routes } from "@/routes/manifest";
import AppLogo from "@/components/AppLogo";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStep, setAuthStep] = useState<
    "idle" | "connecting" | "verifying" | "redirecting"
  >("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthStep("connecting");
    setTimeout(() => {
      setAuthStep("verifying");
      setTimeout(() => {
        setAuthStep("redirecting");
        setTimeout(() => {
          localStorage.setItem(
            "ad_sentry_user",
            JSON.stringify({ email, name: "Angelo Arcillas" }),
          );
          navigate(routes.dashboard.path);
        }, 800);
      }, 1000);
    }, 1000);
  };

  const stepLabel: Record<typeof authStep, string> = {
    idle: "",
    connecting: "Initializing secure connection...",
    verifying: "Verifying credentials...",
    redirecting: "Mounting workspace...",
  };

  const stepSub: Record<typeof authStep, string> = {
    idle: "",
    connecting: "Establishing SSL over port 443",
    verifying: "Checking session tokens",
    redirecting: "Loading dashboard metrics",
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
          {authStep === "idle" ? (
            <form onSubmit={handleSubmit}>
              <div className="card-header">
                <h1 className="card-title text-base">Sign in to console</h1>
                <p className="card-description">
                  Access your centralized telemetry logs and system metrics.
                </p>
              </div>

              <div className="card-content flex flex-col gap-4">
                <div className="form-group">
                  <label htmlFor="login-email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="login-email"
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
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="login-password" className="form-label mb-0">
                      Password
                    </label>
                    <Link
                      to={routes.forgotPassword.path}
                      className="text-xs font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="login-password"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-input"
                    autoComplete="current-password"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary w-full mt-1 cursor-pointer"
                >
                  Sign In
                </button>

                <div className="border-t border-border pt-4 text-center">
                  <span className="text-xs text-neutral-foreground">
                    Don't have an account?{" "}
                    <Link
                      to={routes.signup.path}
                      className="font-semibold text-primary hover:underline"
                    >
                      Create a free account
                    </Link>
                  </span>
                </div>
              </div>
            </form>
          ) : (
            <div className="card-content flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="icon-box w-12 h-12 rounded-xl">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground text-sm">
                  {stepLabel[authStep]}
                </h4>
                <p className="text-xs text-neutral-foreground font-mono">
                  {stepSub[authStep]}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Security note */}
        <p className="mt-4 text-center text-xs text-neutral-foreground flex items-center justify-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" />
          Secured with TLS 1.3 end-to-end encryption
        </p>
      </div>
    </div>
  );
}
