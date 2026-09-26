import { Link } from "react-router-dom";
import { routes } from "@/routes/manifest";

export default function AppLogo() {
  return (
    <Link
      to={routes.home.path}
      className="flex items-center gap-0.5 hover:opacity-85 transition-opacity"
      aria-label="AD. Sentry — home"
    >
      <span className="text-sm font-bold tracking-tight text-foreground">
        AD<span style={{ color: "var(--primary)" }}>.</span>
      </span>
      <span className="text-sm font-bold tracking-tight" style={{ color: "var(--primary)" }}>
        Sentry
      </span>
    </Link>
  );
}
