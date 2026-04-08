import { useTranslation } from "react-i18next";
import { SearchX } from "lucide-react";
import PricePositionBadge from "./PricePositionBadge";
import MarketRangeChart from "./MarketRangeChart";
import StatsGrid from "./StatsGrid";
import SuggestedRangeCard from "./SuggestedRangeCard";
import AIInsightCard from "./AIInsightCard";

/**
 * Composite panel that assembles all pricing result components.
 * Handles edge cases: no comparables, no price provided, null AI insight.
 * @param {{ result: object }} props — PricingSuggestion from API
 */
export default function PricingResultPanel({ result }) {
  const { t } = useTranslation();

  if (!result) return null;

  const {
    unitSummary,
    marketAnalysis,
    pricePosition,
    suggestedRange,
    aiInsight,
  } = result;

  const price = unitSummary?.price;

  // No comparable units found
  if (!marketAnalysis) {
    return (
      <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Position badge */}
        <div className="flex justify-center">
          <PricePositionBadge position={pricePosition} />
        </div>

        {/* Empty state */}
        <div className="text-center py-10 rounded-xl border border-slate-200 bg-white">
          <SearchX className="h-12 w-12 mx-auto mb-3 text-slate-300" />
          <h3 className="text-lg font-semibold text-navy mb-1">
            {t("pricing.noComparables")}
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            {t("pricing.noComparablesHint")}
          </p>
        </div>

        {/* AI insight (may still be available even with no stats) */}
        <AIInsightCard insight={aiInsight} />
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Position badge */}
      <div className="flex justify-center">
        <PricePositionBadge position={pricePosition} />
      </div>

      {/* Market range visualization */}
      <MarketRangeChart
        marketAnalysis={marketAnalysis}
        price={price}
        suggestedRange={suggestedRange}
      />

      {/* Stats grid */}
      <StatsGrid marketAnalysis={marketAnalysis} price={price} />

      {/* Suggested range */}
      <SuggestedRangeCard suggestedRange={suggestedRange} />

      {/* AI insight */}
      <AIInsightCard insight={aiInsight} />
    </div>
  );
}
