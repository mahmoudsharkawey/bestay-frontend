import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { XCircle, CalendarCheck, ChevronRight } from "lucide-react";
import { useMyVisits } from "@/features/visits/hooks/useMyVisits";
import { useVisitActions } from "@/features/visits/hooks/useVisitActions";
import { useAuthStore } from "@/shared/stores/auth.store";
import VisitCard from "@/features/visits/components/VisitCard";
import VisitFilters from "@/features/visits/components/VisitFilters";

export default function MyVisitsPage() {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const role = user?.role || "USER";

  const {
    visits,
    allVisits,
    isLoading,
    isError,
    statusFilter,
    setStatusFilter,
  } = useMyVisits();
  const actions = useVisitActions();

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-28 bg-slate-200 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 text-center px-4">
        <XCircle className="h-10 w-10 text-red-400" />
        <p className="text-slate-500">{t("common.error")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-navy">
            {t("visits.myVisits")}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {t("visits.myVisitsSubtitle")}
          </p>
        </div>

        {/* Filter tabs */}
        <VisitFilters
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          allVisits={allVisits}
        />

        {/* Visit list */}
        {visits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center gap-3">
            <CalendarCheck className="h-12 w-12 text-slate-200" />
            <p className="text-slate-400 font-medium">{t("visits.noVisits")}</p>
            <p className="text-slate-300 text-sm">{t("visits.noVisitsHint")}</p>
            {role === "USER" && (
              <Link
                to="/units"
                className="mt-2 inline-flex items-center gap-1.5 text-sm text-orange hover:text-orange-hover font-medium transition-colors"
              >
                {t("visits.browseUnits")}
                <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {visits.map((visit) => (
              <VisitCard
                key={visit.id}
                visit={visit}
                role={role}
                actions={actions}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
