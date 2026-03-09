import { useTranslation } from "react-i18next";
import { Search, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useUnits } from "@/features/units/hooks/useUnits";
import UnitCard from "@/features/units/components/UnitCard";
import UnitCardSkeleton from "@/features/units/components/UnitCardSkeleton";
import UnitFilters from "@/features/units/components/UnitFilters";
import { Button } from "@/shared/components/ui/button";
import { SORT_OPTIONS } from "@/features/units/constants";

export default function UnitsPage() {
  const { t } = useTranslation();
  const [showFilters, setShowFilters] = useState(false);
  const {
    units,
    total,
    page,
    limit,
    filters,
    isLoading,
    setFilters,
    setPage,
    resetFilters,
  } = useUnits();

  const totalPages = Math.ceil(total / limit);

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split("_");
    setFilters({ sortBy, sortOrder });
  };

  const currentSort = `${filters.sortBy}_${filters.sortOrder}`;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero search bar */}
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">{t("units.browseTitle")}</h1>
          <p className="text-white/70 mb-6">{t("units.browseSubtitle")}</p>
          <div className="flex gap-2 max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder={t("units.searchPlaceholder")}
                value={filters.city}
                onChange={(e) => setFilters({ city: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange"
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 rounded-xl px-4"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results info + sort */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-slate-600 text-sm">
            {isLoading ? (
              <span className="bg-slate-200 rounded animate-pulse h-4 w-32 inline-block" />
            ) : (
              <>
                {total} {t("units.resultsFound")}
                {filters.city ? ` ${t("units.inCity")} ${filters.city}` : ""}
              </>
            )}
          </p>
          <select
            value={currentSort}
            onChange={handleSortChange}
            className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-600 focus:outline-none focus:ring-1 focus:ring-orange"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {t(`units.sort.${opt.value}`, opt.label)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-6">
          {/* Filters sidebar - desktop */}
          <aside className="hidden lg:block w-72 shrink-0">
            <UnitFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={resetFilters}
            />
          </aside>

          {/* Mobile filters panel */}
          {showFilters && (
            <div
              className="lg:hidden fixed inset-0 z-40 bg-black/40"
              onClick={() => setShowFilters(false)}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-xl p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <UnitFilters
                  filters={filters}
                  onFilterChange={(f) => {
                    setFilters(f);
                  }}
                  onReset={() => {
                    resetFilters();
                    setShowFilters(false);
                  }}
                />
              </div>
            </div>
          )}

          {/* Units grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 9 }).map((_, i) => (
                  <UnitCardSkeleton key={i} />
                ))}
              </div>
            ) : units.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p className="text-lg font-medium">{t("units.noResults")}</p>
                <button
                  onClick={resetFilters}
                  className="mt-3 text-orange hover:underline text-sm"
                >
                  {t("units.clearFilters")}
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {units.map((unit) => (
                    <UnitCard key={unit.id} unit={unit} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                      onClick={() => setPage(page - 1)}
                      disabled={page === 1}
                      className="px-3 py-2 text-sm rounded-lg border border-slate-200 disabled:opacity-40 hover:border-orange transition-colors"
                    >
                      ← {t("common.previous")}
                    </button>
                    {Array.from(
                      { length: Math.min(totalPages, 5) },
                      (_, i) => i + 1,
                    ).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 text-sm rounded-lg border transition-colors ${
                          p === page
                            ? "bg-navy text-white border-navy"
                            : "border-slate-200 hover:border-navy"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                    <button
                      onClick={() => setPage(page + 1)}
                      disabled={page === totalPages}
                      className="px-3 py-2 text-sm rounded-lg border border-slate-200 disabled:opacity-40 hover:border-orange transition-colors"
                    >
                      {t("common.next")} →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
