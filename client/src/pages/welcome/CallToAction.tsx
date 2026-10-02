import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, CheckCircle2 } from "lucide-react";
import { routes } from "@/routes/manifest";

export default function CallToAction() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        // TODO: Submit email to API
        setSubscribed(true);
    };
    return (
        <section className="border-t border-border bg-card py-20 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* CTA Grid Area */}
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
                    {/* Left Column */}
                    <div className="space-y-6 lg:col-span-7">
                        <span className="badge badge-info">
                            Reliability-First Observability Platform
                        </span>

                        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                            Ready to secure your telemetry stream?
                        </h2>

                        <p className="max-w-xl text-base leading-relaxed text-neutral-foreground sm:text-lg">
                            Gain immediate access to our low-latency console
                            dashboard. Run simulated log loads, inspect span
                            traces, and audit service uptimes in real time.
                        </p>

                        {/* Guarantees */}
                        <div className="space-y-3 pt-2">
                            {[
                                {
                                    title: "Async Log Ingestion Pipeline:",
                                    desc: "Token-bucket rate limiting via Redis absorbs traffic spikes. Payloads are queued, validated, and written non-blocking at p99 latency under 4.8ms.",
                                },
                                {
                                    title: "Deterministic Issue Grouping:",
                                    desc: "Regex abstraction strips dynamic tokens (IDs, IPs, timestamps) from raw logs and merges millions of events into distinct grouped incidents.",
                                },
                                {
                                    title: "SLA Risk Scoring & PDF Reports:",
                                    desc: "Automated reliability audits score each issue from 0–10 based on frequency and severity, then export structured PDF audit reports on demand.",
                                },
                            ].map(({ title, desc }) => (
                                <div key={title} className="flex items-start gap-3">
                                    <div className="icon-box icon-box-success shrink-0 mt-0.5">
                                        <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                    </div>

                                    <p className="text-xs text-neutral-foreground sm:text-sm">
                                        <strong className="font-semibold text-foreground">
                                            {title}
                                        </strong>{" "}
                                        {desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-5">
                        <div className="card p-6 space-y-5">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">
                                    Get Early Access
                                </h3>
                                <p className="mt-1 text-sm leading-relaxed text-neutral-foreground">
                                    Enter your work email to request access.
                                    Setup takes under five minutes — no credit
                                    card required.
                                </p>
                            </div>

                            {!subscribed ? (
                                <form onSubmit={handleSubmit} className="space-y-3.5">
                                    <div>
                                        <label
                                            htmlFor="cta-email"
                                            className="mb-1.5 block text-xs font-semibold text-foreground"
                                        >
                                            Work Email
                                        </label>
                                        <input
                                            id="cta-email"
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@company.com"
                                            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-neutral-foreground transition-colors focus:outline-none focus:ring-2"
                                            style={{ "--tw-ring-color": "var(--primary)" } as React.CSSProperties}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="button button-primary button-lg cursor-pointer w-full justify-center"
                                    >
                                        Request Access
                                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                                    </button>

                                    <div className="flex items-center justify-between pt-1 text-xs text-neutral-foreground">
                                        <span>✓ No credit card required</span>
                                        <span>✓ Quick setup</span>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-2 rounded-xl border border-border bg-card p-4 text-center" style={{ borderColor: "var(--success-border)", background: "var(--success-tint)" }}>
                                    <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-full" style={{ background: "var(--success-tint)", color: "var(--success)" }}>
                                        <CheckCircle2 className="h-5 w-5" />
                                    </div>
                                    <h4 className="text-sm font-bold text-foreground">
                                        Access Requested!
                                    </h4>
                                    <p className="text-xs leading-relaxed text-neutral-foreground">
                                        We'll email you shortly with your workspace onboarding link.
                                    </p>
                                </div>
                            )}

                            <div className="border-t border-border pt-4">
                                <p className="text-xs text-neutral-foreground text-center">
                                    Already have a workspace?{" "}
                                    <Link
                                        to={routes.login.path}
                                        className="inline-flex items-center gap-1 font-semibold text-foreground hover:underline"
                                        style={{ color: "var(--primary)" }}
                                    >
                                        Sign in to workspace
                                        <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}