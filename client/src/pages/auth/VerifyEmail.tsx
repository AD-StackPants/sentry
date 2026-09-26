import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { routes } from "@/routes/manifest";
import AppLogo from "@/components/AppLogo";

export default function VerifyEmail() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStep, setAuthStep] = useState<"idle" | "verifying" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 6) {
      alert("Please enter a 6-digit code.");
      return;
    }
    setIsSubmitting(true);
    setAuthStep("verifying");
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
                <h1 className="card-title text-base">Verify your email</h1>
                <p className="card-description">
                  We've sent a 6-digit verification code to{" "}
                  {email && <span className="text-foreground font-semibold">{email}</span>}.
                  Enter it below to activate your account.
                </p>
              </div>

              <div className="card-content flex flex-col gap-4">
                <div className="form-group">
                  <label htmlFor="verify-code" className="form-label">
                    Verification Code
                  </label>
                  <input
                    id="verify-code"
                    type="text"
                    required
                    maxLength={6}
                    placeholder="123456"
                    value={code}
                    onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                    className="form-input font-mono text-center tracking-widest text-lg"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary w-full cursor-pointer"
                >
                  Verify Account
                </button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => alert("Verification code resent.")}
                    className="button-link text-xs cursor-pointer"
                  >
                    Resend verification code
                  </button>
                </div>
              </div>
            </form>
          )}

          {authStep === "verifying" && (
            <div className="card-content flex flex-col items-center justify-center py-12 text-center gap-4">
              <div className="icon-box w-12 h-12 rounded-xl">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-foreground text-sm">Verifying security payload...</h4>
                <p className="text-xs text-neutral-foreground font-mono">
                  Performing cryptographic checks on verification signature
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
                <h3 className="text-base font-bold text-foreground">Verification Complete</h3>
                <p className="text-xs text-neutral-foreground leading-relaxed max-w-sm mx-auto">
                  Your email address{" "}
                  <span className="text-foreground font-semibold">{email}</span>{" "}
                  has been confirmed. You can now log into your console dashboard.
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
