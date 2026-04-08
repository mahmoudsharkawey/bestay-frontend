import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Loader2, Sparkles, SlidersHorizontal, SearchX, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useRecommendations } from "@/features/user-preference/hooks/useRecommendations";
import RecommendationCard from "@/features/user-preference/components/RecommendationCard";
import UnitCardSkeleton from "@/features/units/components/UnitCardSkeleton";

export default function RecommendationsPage() {
  const { t } = useTranslation();
  const {
    recommendations,
    total,
    isLoading,
    isError,
    is404,
    errorMessage,
    refetch,
  } = useRecommendations();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy via-navy to-indigo-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="h-8 w-8 text-orange" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t("recommendations.title")}
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            {t("recommendations.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <UnitCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* 404 — No preferences set */}
        {!isLoading && is404 && (
          <div className="text-center py-20">
            <SlidersHorizontal className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <h2 className="text-xl font-semibold text-navy mb-2">
              {t("recommendations.noPreferences")}
            </h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              {t("recommendations.noPreferencesHint")}
            </p>
            <Link to="/preferences">
              <Button className="bg-orange hover:bg-orange/90 text-white gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {t("recommendations.setPreferences")}
              </Button>
            </Link>
          </div>
        )}

        {/* Generic Error */}
        {!isLoading && isError && !is404 && (
          <div className="text-center py-20">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-300" />
            <h2 className="text-xl font-semibold text-navy mb-2">
              {t("common.error")}
            </h2>
            <p className="text-slate-500 mb-6">{errorMessage}</p>
            <Button
              onClick={refetch}
              variant="outline"
              className="gap-2"
            >
              {t("recommendations.tryAgain")}
            </Button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !isError && recommendations.length === 0 && (
          <div className="text-center py-20">
            <SearchX className="h-16 w-16 mx-auto mb-4 text-slate-300" />
            <h2 className="text-xl font-semibold text-navy mb-2">
              {t("recommendations.noResults")}
            </h2>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              {t("recommendations.noResultsHint")}
            </p>
            <Link to="/preferences">
              <Button variant="outline" className="gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                {t("recommendations.adjustPreferences")}
              </Button>
            </Link>
          </div>
        )}

        {/* Results */}
        {!isLoading && !isError && recommendations.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-navy">{total}</span>{" "}
                {t("recommendations.unitsFound")}
              </p>
              <Link to="/preferences">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {t("recommendations.adjustPreferences")}
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {recommendations.map((unit) => (
                <RecommendationCard key={unit.id} unit={unit} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
