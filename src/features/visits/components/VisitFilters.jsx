import { useTranslation } from "react-i18next";
import { TAB_STATUSES } from "@/features/visits/constants";

export default function VisitFilters({
  statusFilter,
  setStatusFilter,
  allVisits,
}) {
  const { t } = useTranslation();

  return (
    <div className="flex gap-1 flex-wrap mb-6">
      {TAB_STATUSES.map((s) => {
        const count =
          s === "ALL"
            ? allVisits.length
            : allVisits.filter((v) => v.status === s).length;
        return (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              statusFilter === s
                ? "bg-orange text-white shadow-sm"
                : "bg-white text-slate-500 border border-slate-200 hover:border-orange/30 hover:text-orange"
            }`}
          >
            {t(
              `visits.tabs.${s.toLowerCase()}`,
              s.charAt(0) + s.slice(1).toLowerCase(),
            )}
            {count > 0 && (
              <span
                className={`ml-1.5 inline-block text-[10px] rounded-full px-1.5 py-0.5 ${
                  statusFilter === s ? "bg-white/20" : "bg-slate-100"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
