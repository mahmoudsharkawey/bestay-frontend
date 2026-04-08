import { useTranslation } from "react-i18next";
import { Target } from "lucide-react";

const fmt = (v) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v);

/**
 * Displays the suggested competitive price range.
 * Only renders when suggestedRange is provided.
 * @param {{ suggestedRange: { min: number, max: number } | null }} props
 */
export default function SuggestedRangeCard({ suggestedRange }) {
  const { t } = useTranslation();

  if (!suggestedRange) return null;

  return (
    <div className="rounded-xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/80 to-teal-50/40 p-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-500/10 shrink-0">
          <Target className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-700 mb-0.5">
            {t("pricing.suggestedRange")}
          </p>
          <p className="text-xl font-bold text-emerald-600">
            ${fmt(suggestedRange.min)} — ${fmt(suggestedRange.max)}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            {t("pricing.suggestedRangeHint")}
          </p>
        </div>
      </div>
    </div>
  );
}
