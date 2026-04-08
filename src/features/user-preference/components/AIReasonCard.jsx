import { useTranslation } from "react-i18next";
import { Bot } from "lucide-react";

/**
 * Displays the AI-generated reason for why a unit matches.
 * Only renders when aiReason is provided.
 * @param {{ reason: string | null }} props
 */
export default function AIReasonCard({ reason }) {
  const { t } = useTranslation();

  if (!reason) return null;

  return (
    <div className="mt-3 rounded-xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/80 to-violet-50/40 backdrop-blur-sm p-3">
      <div className="flex items-start gap-2.5">
        <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-indigo-500/10 shrink-0">
          <Bot className="h-4 w-4 text-indigo-600" />
        </div>
        <div>
          <p className="text-xs font-semibold text-indigo-700 mb-0.5">
            {t("recommendations.whyMatch")}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{reason}</p>
        </div>
      </div>
    </div>
  );
}
