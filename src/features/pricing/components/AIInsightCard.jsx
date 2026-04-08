import { useTranslation } from "react-i18next";
import { Bot } from "lucide-react";

/**
 * Displays AI-generated pricing advice.
 * Only renders when insight is provided.
 * @param {{ insight: string | null }} props
 */
export default function AIInsightCard({ insight }) {
  const { t } = useTranslation();

  if (!insight) return null;

  return (
    <div className="rounded-xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/80 to-violet-50/40 backdrop-blur-sm p-4">
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-indigo-500/10 shrink-0">
          <Bot className="h-5 w-5 text-indigo-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-indigo-700 mb-1">
            {t("pricing.aiAdvice")}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{insight}</p>
        </div>
      </div>
    </div>
  );
}
