import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { routes } from "@/routes/manifest";
import AppLogo from "@/components/AppLogo";
import CallToAction from "@/pages/welcome/CallToAction";
import Faq from "@/pages/welcome/Faq";
import Footer from "@/pages/welcome/Footer";

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  Code,
  Cpu,
  Database,
  FileText,
  Layers,
  Lock,
  MessageSquare,
  Play,
  RefreshCw,
  Shield,
  Zap,
} from "lucide-react";

type DemoTab = "ingest" | "group" | "trace" | "audit";

const DEMO_TABS: {
  id: DemoTab;
  label: string;
  Icon: typeof Database;
  desc: string;
}[] = [
  {
    id: "ingest",
    label: "Asynchronous Log Ingestion",
    Icon: Database,
    desc: "Validate requests via FastAPI schemas, pass Redis limit controls, and queue events.",
  },
  {
    id: "group",
    label: "Signature Issue Aggregation",
    Icon: Layers,
    desc: "Merge dynamic exception payloads into single logically trackable issue signatures.",
  },
  {
    id: "trace",
    label: "Parent-Child Span Tracing",
    Icon: Cpu,
    desc: "Correlate nested requests across isolated microservices with microsecond latency tags.",
  },
  {
    id: "audit",
    label: "Reliability Audit & PDF Reports",
    Icon: FileText,
    desc: "Automate risk scoring (0–10) for issues and export structured PDF audit reports.",
  },
];

const FEATURE_CARDS = [
  {
    Icon: Zap,
    title: "Rate-Limited HTTP Ingest",
    desc: "Protects infrastructure nodes from traffic spikes. Employs token-bucket rate validation with fallback logging in Redis.",
  },
  {
    Icon: Database,
    title: "Asynchronous Storage Client",
    desc: "Non-blocking log inserts using SQLAlchemy 2.0 AsyncSession. Eliminates database pool locking, preserving high response times.",
  },
  {
    Icon: Layers,
    title: "Auto-Grouping Log Issues",
    desc: "Regex abstraction groups millions of raw events into distinct signature incidents. Minimizes diagnostic triage duration.",
  },
  {
    Icon: MessageSquare,
    title: "Incident Notification Rules",
    desc: "Configurable webhooks trigger instantly when event thresholds are reached. Resolves alarm duplicates and prevents alert fatigue.",
  },
  {
    Icon: FileText,
    title: "Reliability Audit & PDF Reports",
    desc: "Dynamically groups logs into structured issues, calculates risk threat scores (0–10), and generates download-ready PDF reports.",
  },
  {
    Icon: Cpu,
    title: "Span Trace Timelines",
    desc: "Visually diagrams request-span cascades. Clearly separates network latency from application thread cycles.",
  },
];

const GUARANTEES = [
  {
    Icon: Shield,
    title: "Fault Tolerance & Isolation",
    desc: "Sandbox query sandbagging prevents cascading failures. If the primary PostgreSQL cluster goes offline, the API layer falls back to in-memory log caches.",
  },
  {
    Icon: RefreshCw,
    title: "Idempotency & Safe Retries",
    desc: "Every log payload is assigned an immutable uuid signature. Network retries do not introduce duplicate records or distort trend graphs.",
  },
  {
    Icon: Zap,
    title: "Token-Bucket Backpressure",
    desc: "Redis-based sliding window rate-limit shields absorb traffic spikes. Requests exceeding thresholds receive clean 429 responses instantly.",
  },
  {
    Icon: Lock,
    title: "Consistency & Security Models",
    desc: "Read-committed isolation on PostgreSQL. Auth tokens validated at router boundaries before reaching service layers — zero telemetry leak exposure.",
  },
];

export default function Welcome() {
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const [activeTab, setActiveTab] = useState<DemoTab>("ingest");

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AppLogo />
            <span className="badge badge-neutral badge-mono hidden sm:inline-flex">
              v0.1.0 · pre-alpha
            </span>
          </div>
          <nav aria-label="Site navigation" className="flex items-center gap-3">
            <a
              href="#deep-dive"
              className="text-xs font-medium text-neutral-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Engineering Notes
            </a>
            <Link
              to={routes.login.path}
              className="button button-primary button-sm cursor-pointer"
            >
              Launch Console
            </Link>
          </nav>
        </div>
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Eyebrow tag — rectangular badge per DS spec */}
          <span className="badge badge-info inline-flex items-center gap-1.5 mb-6">
            <Activity className="h-3 w-3" aria-hidden="true" />
            Reliability-First Observability Platform
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-none">
            Transform Raw Telemetry into{" "}
            <span style={{ color: "var(--primary)" }}>
              Actionable Incidents
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-neutral-foreground max-w-2xl mx-auto leading-relaxed">
            AD. Sentry is a centralized logging engine that ingests,
            persistence-guarantees, and regex-categorizes distributed trace
            spans into logical system issues.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to={routes.login.path}
              className="button button-primary button-lg cursor-pointer"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Live Console Demo
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-outline button-lg cursor-pointer"
            >
              <Code className="h-4 w-4" aria-hidden="true" />
              GitHub Repository
            </a>
            <a
              href="#deep-dive"
              className="button button-ghost button-lg cursor-pointer"
            >
              Engineering Notes
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── Capability Strip ── */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { stat: "< 1.2ms", label: "Average Ingestion Latency" },
              { stat: "100%", label: "Immutable Audit Trail" },
              { stat: "Zero", label: "Ingest Lock Blocking" },
              { stat: "Real-time", label: "Issue Signature Grouping" },
            ].map(({ stat, label }) => (
              <div key={label}>
                <div
                  className="stat-value text-xl"
                  style={{ color: "var(--primary)" }}
                >
                  {stat}
                </div>
                <div className="text-[10px] text-neutral-foreground mt-1 uppercase tracking-wider font-semibold">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem & Solution ── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              The Observability Tax: Noise, Stale Diagnostics, and High
              Latencies
            </h2>
            <p className="text-sm text-neutral-foreground leading-relaxed">
              Standard log solutions partition raw events into massive data
              lakes. When production incidents occur, engineers are forced to
              run expensive query commands to parse and filter millions of lines
              manually.
            </p>
            <div className="space-y-4">
              {[
                {
                  title: "Alert Fatigue",
                  desc: "Same warnings trigger thousands of notifications instead of aggregating into a single alert incident card.",
                },
                {
                  title: "Trace Fragmentation",
                  desc: "Logs lack parent-child correlation, making nested service request tracing highly manual.",
                },
              ].map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <div className="icon-box icon-box-rose shrink-0 mt-0.5">
                    <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {title}
                    </h4>
                    <p className="text-xs text-neutral-foreground mt-0.5 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-8 relative">
            <div className="icon-box mb-4">
              <Zap className="h-4 w-4" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">
              Our Solution: Deduplication & Contextualized Grouping
            </h3>
            <p className="text-sm text-neutral-foreground leading-relaxed mb-5">
              AD. Sentry captures raw telemetry logs asynchronously, filters out
              dynamic data parameters (IDs, IPs, timestamps) to extract exact
              message signatures, and resolves duplicates immediately into
              grouped Issues.
            </p>
            <ul className="space-y-2">
              {[
                "Deterministic Regex Grouping Engine",
                "Distributed Parent-Child Trace Span Maps",
                "Redis Rate Limit Shielding",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm">
                  <CheckCircle
                    className="h-3.5 w-3.5 shrink-0 text-success"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Interactive Demo ── */}
      <section id="demo" className="py-16 border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Interactive Platform Demo
            </h2>
            <p className="text-neutral-foreground mt-2 text-sm">
              Explore the exact schema structures and telemetry interfaces
              mapped directly from our production repository.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tab buttons */}
            <div className="flex flex-col gap-2">
              {DEMO_TABS.map(({ id, label, Icon, desc }, idx) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                    activeTab === id
                      ? "border-primary-border bg-primary-tint text-primary"
                      : "border-border bg-background hover:bg-neutral text-neutral-foreground"
                  }`}
                  type="button"
                  aria-pressed={activeTab === id}
                >
                  <div className="font-semibold text-xs flex items-center gap-2">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>
                      {idx + 1}. {label}
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-foreground mt-1">
                    {desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Code panel */}
            <div
              className="lg:col-span-2 p-5 rounded-xl border border-border bg-background font-mono text-xs overflow-hidden"
              style={{ minHeight: "300px" }}
              role="region"
              aria-label={`Demo panel: ${DEMO_TABS.find((t) => t.id === activeTab)?.label}`}
            >
              <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
                <div className="flex gap-1.5" aria-hidden="true">
                  <div className="h-2.5 w-2.5 rounded-full bg-danger" />
                  <div className="h-2.5 w-2.5 rounded-full bg-warning" />
                  <div className="h-2.5 w-2.5 rounded-full bg-success" />
                </div>
                <span className="text-neutral-foreground text-[10px]">
                  {activeTab === "ingest" && "POST /v1/logs"}
                  {activeTab === "group" && "GROUP_ENGINE.py"}
                  {activeTab === "trace" && "TRACE_EXPLORER.tsx"}
                  {activeTab === "audit" && "AUDIT_ENGINE.py"}
                </span>
              </div>

              <div
                className="space-y-2 text-neutral-foreground overflow-y-auto"
                style={{ maxHeight: "230px" }}
              >
                {activeTab === "ingest" && (
                  <>
                    <p className="text-success">
                      // Ingestion request verification
                    </p>
                    <p>{"{"}</p>
                    <p className="pl-4">
                      "service":{" "}
                      <span className="text-primary">"payment-gateway"</span>,
                    </p>
                    <p className="pl-4">
                      "level": <span className="text-warning">"ERROR"</span>,
                    </p>
                    <p className="pl-4">
                      "message":{" "}
                      <span className="text-success">
                        "Database connection timeout on pool-size 50"
                      </span>
                      ,
                    </p>
                    <p className="pl-4">
                      "span_id":{" "}
                      <span className="text-primary">"spn_f274a"</span>,
                    </p>
                    <p className="pl-4">
                      "parent_span_id":{" "}
                      <span className="text-neutral-foreground">
                        "spn_root"
                      </span>
                    </p>
                    <p>{"}"}</p>
                    <p className="text-success">
                      // Redis Rate Limiter Response
                    </p>
                    <p className="text-foreground">HTTP/1.1 201 Created</p>
                    <p className="text-neutral-foreground">
                      X-RateLimit-Limit: 100 | X-RateLimit-Remaining: 99
                    </p>
                  </>
                )}
                {activeTab === "group" && (
                  <>
                    <p className="text-success">
                      // Match signature and merge occurrences
                    </p>
                    <p className="text-foreground">
                      Input Log:{" "}
                      <span className="text-neutral-foreground">
                        "User with ID 84729 failed checkout after 3000ms"
                      </span>
                    </p>
                    <p className="text-foreground">
                      Input Log:{" "}
                      <span className="text-neutral-foreground">
                        "User with ID 10924 failed checkout after 1500ms"
                      </span>
                    </p>
                    <div
                      className="p-2 border rounded-md mt-2"
                      style={{
                        borderColor: "var(--primary-border)",
                        background: "var(--primary-tint)",
                        color: "var(--primary)",
                      }}
                    >
                      <p className="font-semibold font-sans text-xs">
                        Grouped Issue Match Identified:
                      </p>
                      <p className="mt-1">
                        Pattern: "User with ID * failed checkout after *ms"
                      </p>
                      <p className="mt-0.5 text-[10px] text-neutral-foreground">
                        Count updated: 2 events | Status: Active
                      </p>
                    </div>
                  </>
                )}
                {activeTab === "trace" && (
                  <div className="space-y-3 font-sans">
                    <div
                      className="flex items-center justify-between border-l-2 pl-2"
                      style={{ borderColor: "var(--primary)" }}
                    >
                      <div>
                        <span className="font-semibold text-foreground block text-xs">
                          gateway (Root Span)
                        </span>
                        <span className="text-[10px] text-neutral-foreground">
                          API GET /checkout
                        </span>
                      </div>
                      <span
                        className="font-mono text-[10px] font-bold"
                        style={{ color: "var(--primary)" }}
                      >
                        148ms
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between border-l-2 pl-2 ml-4"
                      style={{ borderColor: "var(--warning)" }}
                    >
                      <div>
                        <span className="font-semibold text-foreground block text-xs">
                          auth-service
                        </span>
                        <span className="text-[10px] text-neutral-foreground">
                          Bearer Token Validation
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-warning">
                        12ms
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between border-l-2 pl-2 ml-4"
                      style={{ borderColor: "var(--danger)" }}
                    >
                      <div>
                        <span className="font-semibold text-foreground block text-xs">
                          payment-api
                        </span>
                        <span className="text-[10px] font-bold text-danger">
                          Database connection timeout
                        </span>
                      </div>
                      <span className="font-mono text-[10px] font-bold text-danger">
                        136ms
                      </span>
                    </div>
                  </div>
                )}
                {activeTab === "audit" && (
                  <>
                    <p className="text-success">
                      // Reliability Audit Scorecard & Risk Assessment
                    </p>
                    <p>{"{"}</p>
                    <p className="pl-4">
                      "reliability_score":{" "}
                      <span className="text-success">"89.2 / 100"</span>,
                    </p>
                    <p className="pl-4">"identified_issues": [</p>
                    <p className="pl-8">
                      {
                        '{ "id": "CRI-DI-001", "category": "DI", "risk_score": 8.92 }'
                      }
                      ,
                    </p>
                    <p className="pl-8">
                      {
                        '{ "id": "CRI-SEC-001", "category": "SEC", "risk_score": 9.40 }'
                      }
                    </p>
                    <p className="pl-4">],</p>
                    <p className="pl-4">
                      "pdf_export_hash":{" "}
                      <span style={{ color: "var(--primary)" }}>
                        "sha256_ef920b7..."
                      </span>
                      ,
                    </p>
                    <p className="pl-4">
                      "actionable_remediation":{" "}
                      <span className="text-warning">
                        "Immediate: Add distributed lock on checkout endpoint."
                      </span>
                    </p>
                    <p>{"}"}</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Features ── */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Built for Production Environments
          </h2>
          <p className="text-neutral-foreground mt-3 text-sm leading-relaxed">
            Eliminate operational blindspots with lightweight, performant, and
            zero-compromise telemetry features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURE_CARDS.map(({ Icon, title, desc }) => (
            <div
              key={title}
              className="card p-5 hover:border-primary-border transition-colors"
            >
              <div className="icon-box mb-4">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              <h3 className="font-semibold text-foreground text-sm mb-2">
                {title}
              </h3>
              <p className="text-xs text-neutral-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-20 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Four Steps to Full Observability
            </h2>
            <p className="text-neutral-foreground mt-2 text-sm">
              Set up centralized instrumentation in minutes without deploying
              heavy sidecars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Create Log Payload",
                desc: "Connect your service client to our HTTP API gateway using standard payload properties.",
              },
              {
                step: "2",
                title: "Configure Rule Policies",
                desc: "Define metric thresholds, email digest routes, and Slack hook channels in the Alerts center.",
              },
              {
                step: "3",
                title: "Execute Operations",
                desc: "Run services in staging or production. Logs stream asynchronously under rate-limit caps.",
              },
              {
                step: "4",
                title: "Observe Incidents",
                desc: "Track ingestion metrics, inspect span trace cascades, and resolve grouped issues directly.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col gap-3">
                <div
                  className="h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm font-mono"
                  style={{
                    backgroundColor: "var(--primary-tint)",
                    color: "var(--primary)",
                    border: "1px solid var(--primary-border)",
                  }}
                >
                  {step}
                </div>
                <h4 className="font-semibold text-foreground text-sm">
                  {title}
                </h4>
                <p className="text-xs text-neutral-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Reliability Guarantees ── */}
      <section id="reliability" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            System & Reliability Guarantees
          </h2>
          <p className="text-neutral-foreground mt-3 text-sm leading-relaxed">
            Detailed engineering commitments ensuring service availability,
            database safety, and event integrity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {GUARANTEES.map(({ Icon, title, desc }) => (
            <div key={title} className="card p-5">
              <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                <Icon
                  className="h-4 w-4 shrink-0"
                  style={{ color: "var(--primary)" }}
                  aria-hidden="true"
                />
                {title}
              </h4>
              <p className="text-xs text-neutral-foreground mt-2 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Engineering Deep Dive ── */}
      <section id="deep-dive" className="py-20 border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Engineering Deep Dive
            </h2>
            <p className="text-neutral-foreground mt-2 text-sm">
              Technical tradeoffs, performance parameters, and backend execution
              policies.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-5">
              <h3 className="text-base font-bold text-foreground">
                Asynchronous Execution Pipeline
              </h3>
              <p className="text-xs text-neutral-foreground leading-relaxed">
                By relying exclusively on Python 3.12+ async syntax, the FastAPI
                ingestion engine operates on an event-loop that frees the CPU to
                handle concurrent connection polls while waiting on external
                database writes.
              </p>
              <p className="text-xs text-neutral-foreground leading-relaxed">
                Using SQLAlchemy's{" "}
                <code className="font-mono bg-neutral px-1 py-0.5 rounded-sm text-foreground">
                  AsyncSession
                </code>{" "}
                context managers, sessions are bound to specific HTTP
                transaction lifecycles and automatically recycled after request
                completion.
              </p>
              <div className="card-well font-mono text-[11px] text-neutral-foreground p-4">
                <p># Performance Benchmark Statistics</p>
                <p>
                  Concurrent Connections:{" "}
                  <span className="text-success">10,000+ / sec</span>
                </p>
                <p>
                  Ingestion Endpoint Latency (p99):{" "}
                  <span className="text-success">4.8ms</span>
                </p>
                <p>
                  Database Query Latency:{" "}
                  <span className="text-success">0.9ms</span>
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-base font-bold text-foreground">
                Architectural Tradeoffs
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground text-xs">
                    In-Memory Logging vs. Persistent Message Queues
                  </h4>
                  <p className="text-xs text-neutral-foreground mt-1 leading-relaxed">
                    To maintain microsecond ingestion cycles without introducing
                    RabbitMQ or Kafka dependencies, the platform groups log
                    traces in memory and flushes them to the DB pool via async
                    bulk sessions.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-xs">
                    Regex Grouping Signature Performance
                  </h4>
                  <p className="text-xs text-neutral-foreground mt-1 leading-relaxed">
                    The LogService grouping engine performs regex replacement
                    scans to scrub variable data tokens. Compiling is optimized
                    via Python's built-in LRU caching mechanisms, avoiding regex
                    recompilation overhead.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Faq />

      <CallToAction />
      <Footer />
    </div>
  );
}
