import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Loader2,
  DollarSign,
  Building2,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useMyUnits } from "@/features/units/hooks/useMyUnits";
import { usePricingSuggestion } from "@/features/pricing/hooks/usePricingSuggestion";
import PricingExplorerForm from "@/features/pricing/components/PricingExplorerForm";
import PricingResultPanel from "@/features/pricing/components/PricingResultPanel";

const TABS = ["explore", "myUnits"];

export default function PricingToolPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("explore");
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  const { result, isLoading, error, isError, getSuggestion, getUnitPricing, reset } =
    usePricingSuggestion();

  const resultRef = useRef(null);

  // Auto-scroll to results when they arrive
  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [result]);

  const {
    units,
    isLoading: unitsLoading,
  } = useMyUnits();

  const handleUnitPricing = (unitId) => {
    setSelectedUnitId(unitId);
    reset();
    getUnitPricing(unitId);
  };

  const handleExploreSubmit = (data) => {
    setSelectedUnitId(null);
    reset();
    getSuggestion(data);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-navy via-navy to-indigo-900 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <DollarSign className="h-8 w-8 text-orange" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            {t("pricing.title")}
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl border border-slate-200 p-1 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                reset();
                setSelectedUnitId(null);
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-orange text-white shadow-sm"
                  : "text-slate-500 hover:text-navy hover:bg-slate-50"
              }`}
            >
              {tab === "explore" ? (
                <Sparkles className="h-4 w-4" />
              ) : (
                <Building2 className="h-4 w-4" />
              )}
              {t(`pricing.tabs.${tab}`)}
            </button>
          ))}
        </div>

        {/* Explore Tab */}
        {activeTab === "explore" && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-navy mb-5">
                {t("pricing.exploreTitle")}
              </h2>
              <PricingExplorerForm
                onSubmit={handleExploreSubmit}
                isLoading={isLoading}
              />
            </div>

            {/* Error */}
            {isError && (
              <div className="text-center py-8 bg-white rounded-2xl border border-red-100">
                <AlertCircle className="h-10 w-10 mx-auto mb-3 text-red-300" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Result */}
            {result && !isError && (
              <div ref={resultRef} className="scroll-mt-8">
                <PricingResultPanel result={result} />
              </div>
            )}
          </div>
        )}

        {/* My Units Tab */}
        {activeTab === "myUnits" && (
          <div className="space-y-6">
            {/* Loading */}
            {unitsLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-orange" />
              </div>
            )}

            {/* Empty */}
            {!unitsLoading && units.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
                <Building2 className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                <h3 className="text-lg font-semibold text-navy mb-1">
                  {t("pricing.noUnits")}
                </h3>
                <p className="text-sm text-slate-500">
                  {t("pricing.noUnitsHint")}
                </p>
              </div>
            )}

            {/* Unit list */}
            {!unitsLoading && units.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {units.map((unit) => (
                  <div
                    key={unit.id}
                    className={`bg-white rounded-xl border p-4 transition-all cursor-pointer hover:shadow-md ${
                      selectedUnitId === unit.id
                        ? "border-orange ring-2 ring-orange/20"
                        : "border-slate-200"
                    }`}
                    onClick={() => handleUnitPricing(unit.id)}
                  >
                    <div className="flex items-start gap-3">
                      {/* Thumbnail */}
                      <img
                        src={
                          unit.images?.[0] ||
                          "https://placehold.co/80x80/1B3D6F/white?text=Unit"
                        }
                        alt={unit.title}
                        className="w-16 h-16 object-cover rounded-lg shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="font-semibold text-navy text-sm leading-tight line-clamp-1">
                          {unit.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {unit.city} · {unit.rooms} {t("units.rooms")} ·{" "}
                          {t(`units.roomTypes.${unit.roomType}`)}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-navy">
                            ${unit.price}
                            <span className="text-xs text-slate-400 font-normal">
                              /{t("units.month")}
                            </span>
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 text-xs gap-1 border-orange text-orange hover:bg-orange hover:text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUnitPricing(unit.id);
                            }}
                            disabled={isLoading && selectedUnitId === unit.id}
                          >
                            {isLoading && selectedUnitId === unit.id ? (
                              <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                              <DollarSign className="h-3 w-3" />
                            )}
                            {t("pricing.getInsight")}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="text-center py-8 bg-white rounded-2xl border border-red-100">
                <AlertCircle className="h-10 w-10 mx-auto mb-3 text-red-300" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Result for selected unit */}
            {result && !isError && (
              <div ref={resultRef} className="mt-4 scroll-mt-8">
                <PricingResultPanel result={result} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
