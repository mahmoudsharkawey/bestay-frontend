import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Calendar,
  MapPin,
  GraduationCap,
  Star,
  Clock,
  Info,
  ChevronRight,
  Home,
  ArrowLeft,
} from "lucide-react";
import { useScheduleVisit } from "@/features/visits/hooks/useScheduleVisit";
import { useUnitDetail } from "@/features/units/hooks/useUnitDetail";
import { Button } from "@/shared/components/ui/button";

export default function ScheduleVisitPage() {
  const { unitId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { unit, isLoading: unitLoading } = useUnitDetail(unitId);
  const { proposedDate, setProposedDate, handleSubmit, isSubmitting } =
    useScheduleVisit(unitId);

  console.log(proposedDate);
  // Minimum date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const avgRating = unit?.reviews?.length
    ? (
        unit.reviews.reduce((s, r) => s + r.rating, 0) / unit.reviews.length
      ).toFixed(1)
    : null;

  if (unitLoading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/3 mb-8" />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="h-32 bg-slate-200 rounded-2xl" />
            <div className="h-64 bg-slate-200 rounded-2xl" />
          </div>
          <div className="h-64 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
          <Link
            to="/"
            className="hover:text-orange transition-colors flex items-center gap-1"
          >
            <Home className="h-3.5 w-3.5" />
            {t("nav.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/units" className="hover:text-orange transition-colors">
            {t("nav.findHousing")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          {unit && (
            <>
              <Link
                to={`/units/${unitId}`}
                className="hover:text-orange transition-colors line-clamp-1 max-w-[200px]"
              >
                {unit.title}
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
            </>
          )}
          <span className="text-navy font-medium">
            {t("visits.scheduleTitle")}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Left: main content ─────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-2xl font-bold text-navy">
              {t("visits.requestVisit")}
            </h1>

            {/* Unit preview card */}
            {unit && (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex gap-4">
                {unit.images?.[0] ? (
                  <img
                    src={unit.images[0]}
                    alt={unit.title}
                    className="w-24 h-20 object-cover rounded-xl shrink-0"
                  />
                ) : (
                  <div className="w-24 h-20 rounded-xl bg-navy/10 shrink-0 flex items-center justify-center text-navy/30 text-2xl">
                    🏠
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-navy text-base line-clamp-1">
                    {unit.title}
                  </h2>
                  <div className="flex items-center gap-3 text-sm text-slate-500 mt-1 flex-wrap">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5 text-orange" />
                      {unit.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-3.5 w-3.5 text-orange" />
                      {unit.university}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-navy">
                      ${unit.price}
                      <span className="text-sm font-normal text-slate-400 ml-1">
                        /{t("units.month")}
                      </span>
                    </span>
                    {avgRating && (
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <strong className="text-slate-700">{avgRating}</strong>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Date picker */}
            <form onSubmit={handleSubmit} id="schedule-form">
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                <h2 className="text-base font-semibold text-navy mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange" />
                  {t("visits.chooseDateLabel")}
                </h2>
                <input
                  id="visit-date-input"
                  type="date"
                  min={minDate}
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-base text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange/40 focus:border-orange transition bg-white"
                  required
                />
                <p className="text-xs text-slate-400 mt-3 flex items-start gap-1.5">
                  <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-300" />
                  {t("visits.landlordReviewNote")}
                </p>
              </div>
            </form>
          </div>

          {/* ── Right: summary sidebar ─────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-24">
              <h2 className="text-base font-semibold text-navy mb-5">
                {t("visits.summary")}
              </h2>

              {unit && (
                <p className="text-sm font-medium text-slate-700 mb-4 line-clamp-2">
                  {unit.title}
                </p>
              )}

              <div className="space-y-3 text-sm text-slate-500 mb-6">
                <div className="flex items-start gap-2">
                  <Calendar className="h-4 w-4 text-orange shrink-0 mt-0.5" />
                  <span>
                    {proposedDate ? (
                      <span className="text-slate-800 font-medium">
                        {new Date(
                          proposedDate + "T00:00:00",
                        ).toLocaleDateString(undefined, {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    ) : (
                      <span className="italic text-slate-400">
                        {t("visits.noDateSelected")}
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>{t("visits.responseTime")}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-slate-300 shrink-0 mt-0.5" />
                  <span>{t("visits.noPaymentNow")}</span>
                </div>
              </div>

              <Button
                type="submit"
                form="schedule-form"
                disabled={isSubmitting || !proposedDate}
                className="w-full h-12 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl text-base disabled:opacity-60"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {isSubmitting
                  ? t("visits.submitting")
                  : t("visits.requestVisitBtn")}
              </Button>
              <p className="text-xs text-center text-slate-400 mt-3">
                {t("visits.freeCancellation")}
              </p>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full mt-3 flex items-center justify-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t("common.back")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
