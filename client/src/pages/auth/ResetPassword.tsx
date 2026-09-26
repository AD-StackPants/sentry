import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { routes } from "@/routes/manifest";
import AppLogo from "@/components/AppLogo";

export default function ResetPassword() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStep, setAuthStep] = useState<"idle" | "updating" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    setIsSubmitting(true);
    setAuthStep("updating");
    setTimeout(() => {
      setAuthStep("success");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased flex flex-col items-center justify-center py-12 px-4">
      <div className="flex items-center gap-2.5 mb-8">
        <AppLogo />
        <span className="badge badge-neutral badge-mono">v0.1.0 · pre-alpha</span>
      </div>

      <div className="w-full max-w-md">
        <div className="card">
          {authStep === "idle" && (
            <form onSubmit={handleSubmit}>
              <div className="card-header">
                <h1 className="card-title text-base">Reset password</h1>
                <p className="card-description">
                  Define a new secure password for{" "}
                  {emailParam && (
                    <span className="text-foreground font-semibold">{emailParam}</span>
                  )}.
                </p>
              </div>

              <div className="card-content flex flex-col gap-4">
                <div className="form-group">
                  <label htmlFor="reset-password" className="form-label">
                    New Password
                  </label>
                  <input
                    id="reset-password"
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
                  <label htmlFor="reset-confirm" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    id="reset-confirm"
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
                  className="button button-primary w-full cursor-pointer"
                >
                  Reset Password
                </button>
              </div>
            </form>
          )}

          {authStep === "updating" && (
            <div className="card-content flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="icon-box w-12 h-12 rounded-xl">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground text-sm">Updating security profiles...</h4>
                <p className="text-xs text-neutral-foreground font-mono">
                  Hashing new credential payload values
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
                <h3 className="text-base font-bold text-foreground">Password Updated</h3>
                <p className="text-xs text-neutral-foreground leading-relaxed max-w-sm mx-auto">
                  Your security credentials have been refreshed. You can now use
                  your new password to sign into the system console.
                </p>
              </div>
              <Link
                to={routes.login.path}
                className="button button-primary w-full justify-center"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
