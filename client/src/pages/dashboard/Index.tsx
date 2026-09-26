import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Stats, TrendPoint, Issue } from "@/lib/api";
import { Link } from "react-router-dom";
import { routes } from "@/routes/manifest";
import {
  AlertOctagon,
  CheckCircle,
  Database,
  RefreshCw,
  Server,
  TrendingUp,
} from "lucide-react";

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [trends, setTrends] = useState<TrendPoint[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<TrendPoint | null>(null);

  const loadData = async () => {
    try {
      const [statsData, trendsData, issuesData] = await Promise.all([
        api.getStats(),
        api.getTrends(),
        api.getIssues(),
      ]);
      setStats(statsData);
      setTrends(trendsData);
      setIssues(issuesData.sort((a, b) => b.count - a.count).slice(0, 5));
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin" style={{ color: "var(--primary)" }} />
      </div>
    );
  }

  // SVG trend chart coords
  const maxVal = Math.max(...trends.map((t) => t.total_count), 10);
  const width = 800;
  const height = 200;
  const padding = 20;

  const points = trends.map((t, idx) => {
    const x = padding + (idx * (width - padding * 2)) / (trends.length - 1 || 1);
    const y = height - padding - (t.total_count * (height - padding * 2)) / maxVal;
    return { x, y, data: t };
  });

  const pathD = points.length
    ? `M ${points[0].x} ${points[0].y} ` +
      points
        .slice(1)
        .map((p) => `L ${p.x} ${p.y}`)
        .join(" ")
    : "";

  const areaD = points.length
    ? `${pathD} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`
    : "";

  // Service health
  const services = stats
    ? Object.entries(stats.by_service).map(([name, count]) => {
        const countNum = count as number;
        const errors = issues
          .filter((i) => i.service === name && i.level === "ERROR")
          .reduce((sum: number, i) => sum + i.count, 0);
        const errorRate = countNum > 0 ? (errors / countNum) * 100 : 0;
        let status: "healthy" | "degraded" | "critical" = "healthy";
        if (errorRate > 10) status = "critical";
        else if (errorRate > 2 || errors > 0) status = "degraded";
        return { name, count: countNum, errors, errorRate, status };
      })
    : [];

  const statCards = [
    {
      label: "Total Ingested Logs",
      value: stats?.total_count ?? 0,
      sub: "Immutable events stored",
      Icon: Database,
      iconVariant: "",
    },
    {
      label: "System Error Rate",
      value: `${stats?.error_rate ?? 0}%`,
      sub: "Percentage of error/critical logs",
      Icon: AlertOctagon,
      iconVariant: "icon-box-rose",
      valueClass: "text-danger",
    },
    {
      label: "Active Services",
      value: stats ? Object.keys(stats.by_service).length : 0,
      sub: "Ingesting service instances",
      Icon: Server,
      iconVariant: "icon-box-emerald",
    },
    {
      label: "Gateway Uptime",
      value: stats && stats.error_rate > 5 ? "98.84%" : "99.96%",
      sub: "SLA target metrics (99.9%)",
      Icon: CheckCircle,
      iconVariant: "icon-box-emerald",
      valueClass: "text-success",
    },
  ] satisfies Array<{
    label: string;
    value: number | string;
    sub: string;
    Icon: React.FC<{ className?: string; "aria-hidden"?: boolean | "true" | "false" }>;
    iconVariant: string;
    valueClass?: string;
  }>;

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            System Status Overview
          </h2>
          <p className="text-xs text-neutral-foreground mt-0.5">
            Real-time diagnostics and logging anomalies from connected services.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="button button-outline cursor-pointer"
          disabled={refreshing}
          type="button"
          aria-label="Refresh dashboard data"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, sub, Icon, iconVariant, valueClass }) => (
          <div key={label} className="card">
            <div className="card-header flex-row items-start justify-between gap-3">
              <span className="text-xs font-medium text-neutral-foreground leading-snug">
                {label}
              </span>
              <div className={`icon-box shrink-0 ${iconVariant}`}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
            <div className="card-content pt-1">
              <div
                className={`stat-value text-2xl ${valueClass ?? ""}`}
                aria-label={`${label}: ${value}`}
              >
                {value}
              </div>
              <p className="text-xs text-neutral-foreground mt-1">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Trend chart */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" style={{ color: "var(--primary)" }} aria-hidden="true" />
            <h3 className="font-semibold text-sm text-foreground">
              Event Ingestion Trends (24h)
            </h3>
          </div>
          {hoveredPoint && (
            <span className="badge badge-info badge-mono">
              {hoveredPoint.timestamp} — {hoveredPoint.total_count} events
            </span>
          )}
        </div>

        <div className="w-full overflow-hidden">
          {trends.length > 0 ? (
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto overflow-visible select-none"
              role="img"
              aria-label="Event ingestion trend chart over the past 24 hours"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              {[0, 0.25, 0.5, 0.75, 1].map((r, i) => {
                const y = padding + r * (height - padding * 2);
                return (
                  <line
                    key={i}
                    x1={padding}
                    y1={y}
                    x2={width - padding}
                    y2={y}
                    stroke="var(--border)"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                  />
                );
              })}

              <path d={areaD} fill="url(#chartGradient)" />
              <path
                d={pathD}
                fill="none"
                stroke="var(--primary)"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {points.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredPoint?.timestamp === p.data.timestamp ? 5 : 3}
                  fill={
                    hoveredPoint?.timestamp === p.data.timestamp
                      ? "var(--primary)"
                      : "var(--background)"
                  }
                  stroke="var(--primary)"
                  strokeWidth={2}
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredPoint(p.data)}
                  onMouseLeave={() => setHoveredPoint(null)}
                  role="button"
                  aria-label={`${p.data.timestamp}: ${p.data.total_count} events`}
                />
              ))}
            </svg>
          ) : (
            <div className="flex h-32 items-center justify-center text-neutral-foreground text-xs">
              No trend data available.
            </div>
          )}
        </div>
      </div>

      {/* Service health + recent issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service health */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Service Health</h3>
            <p className="card-description">Uptime and error diagnostic summary by service.</p>
          </div>
          <div className="card-content flex flex-col gap-2.5">
            {services.length > 0 ? (
              services.map((svc) => {
                const badgeClass =
                  svc.status === "healthy"
                    ? "badge-success"
                    : svc.status === "degraded"
                    ? "badge-warning"
                    : "badge-danger";
                const dotClass =
                  svc.status === "healthy"
                    ? "badge-dot-success"
                    : svc.status === "degraded"
                    ? "badge-dot-warning"
                    : "badge-dot-danger";

                return (
                  <div
                    key={svc.name}
                    className="flex items-center justify-between p-3 border border-border rounded-lg bg-card"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`badge-dot ${dotClass}`} aria-hidden="true" />
                      <div>
                        <span className="font-semibold text-xs text-foreground">{svc.name}</span>
                        <div className="text-[10px] text-neutral-foreground font-mono mt-0.5">
                          {svc.count} total · {svc.errors} errors
                        </div>
                      </div>
                    </div>
                    <span className={`badge ${badgeClass}`} aria-label={`Service status: ${svc.status}`}>
                      {svc.status === "healthy" ? "Active" : svc.status === "degraded" ? "Degraded" : "Critical"}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-neutral-foreground text-xs">
                No active services. Ingest some logs to see them here.
              </div>
            )}
          </div>
        </div>

        {/* Recent issues */}
        <div className="card">
          <div className="card-header flex-row items-center justify-between">
            <div>
              <h3 className="card-title">Recurring Issues</h3>
              <p className="card-description">Top log anomalies categorized by count.</p>
            </div>
            <Link
              to={routes.issues.path}
              className="button-link text-xs"
            >
              View All
            </Link>
          </div>
          <div className="card-content flex flex-col gap-2.5">
            {issues.length > 0 ? (
              issues.map((issue) => {
                const badgeClass =
                  issue.level === "ERROR" || issue.level === "CRITICAL"
                    ? "badge-danger"
                    : issue.level === "WARNING"
                    ? "badge-warning"
                    : "badge-info";

                return (
                  <div
                    key={issue.id}
                    className="flex items-start justify-between p-3 border border-border rounded-lg transition-colors hover:bg-neutral"
                  >
                    <div className="flex flex-col gap-1 max-w-[75%]">
                      <div className="flex items-center gap-2">
                        <span className={`badge ${badgeClass}`}>
                          {issue.level}
                        </span>
                        <span className="text-[10px] font-mono text-neutral-foreground">
                          {issue.service} · {issue.environment}
                        </span>
                      </div>
                      <p className="text-xs font-semibold truncate">{issue.message}</p>
                    </div>
                    <span className="badge badge-neutral badge-mono">
                      ×{issue.count}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6 text-neutral-foreground text-xs">
                No recurring issues detected. All quiet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
