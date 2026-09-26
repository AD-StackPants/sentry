import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, Mail } from "lucide-react";
import { routes } from "@/routes/manifest";
import AppLogo from "@/components/AppLogo";

export default function ForgotPassword() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStep, setAuthStep] = useState<"idle" | "verifying" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
                <h1 className="card-title text-base">Recover password</h1>
                <p className="card-description">
                  Enter your email address and we'll forward a temporary reset link.
                </p>
              </div>

              <div className="card-content flex flex-col gap-4">
                <div className="form-group">
                  <label htmlFor="forgot-email" className="form-label">
                    Email Address
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="name@example.com"
                    disabled={isSubmitting}
                    autoComplete="email"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="button button-primary w-full cursor-pointer"
                >
                  Send Recovery Link
                </button>

                <div className="text-center">
                  <Link
                    to={routes.login.path}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Return to sign in
                  </Link>
                </div>
              </div>
            </form>
          )}

          {authStep === "verifying" && (
            <div className="card-content py-12 flex flex-col items-center justify-center gap-4">
              <div className="icon-box w-12 h-12 rounded-xl">
                <Loader2 className="h-5 w-5 animate-spin" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-semibold text-foreground">Dispatching Email Link</p>
                <p className="text-xs text-neutral-foreground font-mono">
                  Signing validation hashes for security link
                </p>
              </div>
            </div>
          )}

          {authStep === "success" && (
            <div className="card-content text-center py-10 flex flex-col items-center gap-5">
              <div className="icon-box w-12 h-12 rounded-xl">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-foreground">Recovery Link Forwarded</h3>
                <p className="text-xs text-neutral-foreground leading-relaxed max-w-sm mx-auto">
                  A reset link has been dispatched to{" "}
                  <span className="text-foreground font-semibold">{email}</span>.
                  Click the link inside the message to define a new password.
                </p>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Link
                  to={`${routes.resetPassword.path}?email=${encodeURIComponent(email)}`}
                  className="button button-primary w-full justify-center"
                >
                  Proceed to Reset Password
                </Link>
                <Link
                  to={routes.login.path}
                  className="text-xs text-neutral-foreground hover:text-foreground transition-colors py-1 text-center"
                >
                  Return to sign in
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
