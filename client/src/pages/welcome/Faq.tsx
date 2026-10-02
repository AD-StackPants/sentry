import { ChevronDown } from "lucide-react";

const FAQ_ITEMS: { q: string; a: string }[] = [
    {
        q: "What log formats does AD. Sentry accept?",
        a: "The ingestion endpoint accepts structured JSON payloads over HTTP. Any service that can emit a POST request with a service name, level, message, and optional span IDs is compatible out of the box.",
    },
    {
        q: "How does automatic issue grouping work?",
        a: "A regex abstraction engine strips dynamic tokens — user IDs, IP addresses, timestamps — from raw log messages to extract a stable signature. Logs sharing the same signature are merged into a single grouped incident.",
    },
    {
        q: "What is the SLA risk score?",
        a: "Each grouped issue is assigned a 0–10 risk score computed from occurrence frequency, severity level, and recency. Scores above 7 are flagged as critical and surface at the top of the audit report.",
    },
    {
        q: "How are PDF audit reports generated?",
        a: "Audit reports are generated on demand from grouped issue data. Each report includes risk scores, occurrence timelines, and actionable remediation steps, exported as a structured, download-ready PDF.",
    },
    {
        q: "What happens when the rate limit is hit?",
        a: "Requests exceeding the Redis token-bucket threshold receive a clean HTTP 429 response with X-RateLimit-Remaining headers. No events are silently dropped — excess requests are queued for the next window.",
    },
    {
        q: "Is span tracing available across multiple services?",
        a: "Yes. Each log payload accepts a span_id and parent_span_id field. The trace explorer reconstructs the full parent-child request cascade across isolated microservices with microsecond-precision latency tags.",
    },
];

export default function Faq() {
    return (
        <section
            id="faq"
            className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    Frequently Asked Questions
                </h2>
                <p className="text-neutral-foreground mt-3 text-sm leading-relaxed">
                    Common questions about the ingestion pipeline, issue
                    grouping, and SLA reporting engine.
                </p>
            </div>

            <div className="max-w-3xl mx-auto divide-y divide-border space-y-3">
                {FAQ_ITEMS.map(({ q, a }) => (
                    <details key={q} className="group px-5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 transition-colors">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold text-foreground select-none">
                            <span>{q}</span>
                            <ChevronDown
                                className="h-4 w-4 shrink-0 text-neutral-foreground transition-transform duration-200 group-open:rotate-180"
                                aria-hidden="true"
                            />
                        </summary>
                        <p className="pb-5 text-xs leading-relaxed text-neutral-foreground">
                            {a}
                        </p>
                    </details>
                ))}
            </div>
        </section>
    );
}
