import { useTranslation } from "react-i18next";
import { Calendar, Clock } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function RecentVisits({ visits, isLoading }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-navy flex items-center gap-2">
          <Calendar className="h-4 w-4 text-orange" />
          {t("landlord.recentVisits")}
        </h2>
      </div>
      {isLoading ? (
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 animate-pulse bg-slate-50 rounded-xl"
            />
          ))}
        </div>
      ) : visits.length === 0 ? (
        <div className="text-center py-10 text-slate-300">
          <Calendar className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm text-slate-400">
            {t("landlord.noVisits")}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {visits.slice(0, 5).map((visit) => (
            <div
              key={visit.id}
              className="flex items-center justify-between px-6 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {visit.user?.name || "Student"}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {visit.proposedDate
                    ? new Date(visit.proposedDate).toLocaleDateString()
                    : "—"}
                </p>
              </div>
              <StatusBadge status={visit.status} type="visit" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
