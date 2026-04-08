import { useTranslation } from "react-i18next";

/**
 * Horizontal bar chart showing the market distribution with the landlord's price marked.
 * @param {{ marketAnalysis: object | null, price: number | "not set", suggestedRange: object | null }} props
 */
export default function MarketRangeChart({
  marketAnalysis,
  price,
  suggestedRange,
}) {
  const { t } = useTranslation();

  if (!marketAnalysis) return null;

  const { minPrice, maxPrice, percentile25, percentile75, medianPrice } =
    marketAnalysis;

  const range = maxPrice - minPrice || 1;
  const toPercent = (val) =>
    Math.min(100, Math.max(0, ((val - minPrice) / range) * 100));

  const p25Pct = toPercent(percentile25);
  const p75Pct = toPercent(percentile75);
  const medianPct = toPercent(medianPrice);

  const hasPrice = typeof price === "number";
  const pricePct = hasPrice ? toPercent(price) : 0;

  const fmt = (v) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h4 className="text-sm font-semibold text-navy mb-4">
        {t("pricing.marketRange")}
      </h4>

      {/* Labels */}
      <div className="relative h-20 mb-2">
        {/* Full bar (min–max) */}
        <div className="absolute top-8 left-0 right-0 h-3 bg-slate-100 rounded-full" />

        {/* Suggested range highlight (P25–P75) */}
        <div
          className="absolute top-8 h-3 bg-gradient-to-r from-emerald-200 to-emerald-300 rounded-full"
          style={{ left: `${p25Pct}%`, width: `${p75Pct - p25Pct}%` }}
        />

        {/* Median marker */}
        <div
          className="absolute top-6 flex flex-col items-center"
          style={{ left: `${medianPct}%`, transform: "translateX(-50%)" }}
        >
          <span className="text-[10px] font-medium text-slate-500 whitespace-nowrap mb-0.5">
            {t("pricing.median")}
          </span>
          <div className="w-0.5 h-7 bg-slate-400 rounded" />
        </div>

        {/* User price marker */}
        {hasPrice && (
          <div
            className="absolute top-[18px] flex flex-col items-center z-10"
            style={{ left: `${pricePct}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-5 h-5 rounded-full bg-orange border-2 border-white shadow-md flex items-center justify-center">
              <span className="text-[8px] text-white font-bold">$</span>
            </div>
            <div className="w-0.5 h-5 bg-orange rounded" />
            <span className="text-[10px] font-bold text-orange whitespace-nowrap mt-0.5">
              {fmt(price)}
            </span>
          </div>
        )}
      </div>

      {/* Bottom labels */}
      <div className="flex justify-between text-[10px] text-slate-400 mt-1">
        <span>{fmt(minPrice)}</span>
        <span>{fmt(maxPrice)}</span>
      </div>

      {/* Suggested range text */}
      {suggestedRange && (
        <div className="mt-4 text-center">
          <span className="text-xs text-slate-500">
            {t("pricing.suggestedRange")}:{" "}
          </span>
          <span className="text-sm font-bold text-emerald-600">
            ${fmt(suggestedRange.min)} — ${fmt(suggestedRange.max)}
          </span>
        </div>
      )}
    </div>
  );
}
