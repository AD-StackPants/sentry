import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Report } from "@/lib/api";
import {
  Calendar,
  FileText,
  RefreshCw,
} from "lucide-react";

export default function ReportsList() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadReports = async () => {
    try {
      const data = await api.getReports();
      setReports(data);
    } catch (err) {
      console.error("Failed to load reports:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadReports();
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin" style={{ color: "var(--primary)" }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Reliability & SLA Reports</h2>
          <p className="text-neutral-foreground text-sm">
            Auditable system reliability, incident summaries, and service level agreements (SLA) status.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="button button-outline flex items-center gap-2 cursor-pointer"
          disabled={refreshing}
          type="button"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="card p-6 gap-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="icon-box shrink-0">
                  <FileText className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground">{report.title}</h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-foreground mt-0.5">
                    <Calendar className="h-3 w-3" aria-hidden="true" />
                    <span>Period: {report.period}</span>
                  </div>
                </div>
              </div>
              <span className="badge badge-neutral badge-mono">
                {report.id}
              </span>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="card-well p-3 text-center">
                <span className="text-[10px] text-neutral-foreground block uppercase tracking-wider font-bold">
                  Total Events
                </span>
                <span className="stat-value text-lg mt-1 block">
                  {report.total_events}
                </span>
              </div>
              <div className="card-well p-3 text-center">
                <span className="text-[10px] text-neutral-foreground block uppercase tracking-wider font-bold">
                  Incidents
                </span>
                <span
                  className={`stat-value text-lg mt-1 block ${
                    report.incidents_count > 0 ? "text-danger" : "text-success"
                  }`}
                >
                  {report.incidents_count}
                </span>
              </div>
              <div className="card-well p-3 text-center">
                <span className="text-[10px] text-neutral-foreground block uppercase tracking-wider font-bold">
                  Avg MTTR
                </span>
                <span className="stat-value text-lg mt-1 block font-mono">
                  {report.avg_mttr}
                </span>
              </div>
            </div>

            {/* Service Uptime Table */}
            <div>
              <span className="text-[10px] font-bold text-neutral-foreground uppercase tracking-wider block mb-2">
                Service SLA Uptime
              </span>
              <div className="table-container">
                <table className="table table-compact">
                  <thead>
                    <tr>
                      <th>Service Node</th>
                      <th className="text-right">SLA Target</th>
                      <th className="text-right">Current Uptime</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(report.service_uptime).map(([node, uptime]) => {
                      const uptimeStr = uptime as string;
                      return (
                        <tr key={node}>
                          <td className="font-semibold">{node}</td>
                          <td className="text-right font-mono text-neutral-foreground">99.90%</td>
                          <td
                            className={`text-right font-bold font-mono ${
                              parseFloat(uptimeStr) >= 99.9
                                ? "text-success"
                                : parseFloat(uptimeStr) >= 99.0
                                ? "text-warning"
                                : "text-danger"
                            }`}
                          >
                            {uptimeStr}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Summary Comments */}
            <div className="card-well p-3 text-xs italic text-neutral-foreground leading-relaxed">
              <strong className="not-italic font-semibold text-foreground">Executive Summary:</strong>{" "}{report.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
