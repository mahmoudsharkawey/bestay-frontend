import { useTranslation } from "react-i18next";

const SCORE_CONFIG = {
  excellent: { min: 80, bg: "bg-emerald-500/15", text: "text-emerald-600", ring: "ring-emerald-500/30" },
  good:      { min: 60, bg: "bg-amber-500/15",   text: "text-amber-600",   ring: "ring-amber-500/30" },
  fair:      { min: 40, bg: "bg-orange-500/15",   text: "text-orange-600",  ring: "ring-orange-500/30" },
  weak:      { min: 0,  bg: "bg-slate-500/15",    text: "text-slate-500",   ring: "ring-slate-500/30" },
};

function getScoreConfig(score) {
  if (score >= 80) return SCORE_CONFIG.excellent;
  if (score >= 60) return SCORE_CONFIG.good;
  if (score >= 40) return SCORE_CONFIG.fair;
  return SCORE_CONFIG.weak;
}

function getScoreLabelKey(score) {
  if (score >= 80) return "recommendations.excellentMatch";
  if (score >= 60) return "recommendations.goodMatch";
  if (score >= 40) return "recommendations.fairMatch";
  return "recommendations.weakMatch";
}

/**
 * Displays a color-coded match score badge.
 * @param {{ score: number, size?: 'sm' | 'md' | 'lg' }} props
 */
export default function MatchScoreBadge({ score, size = "md" }) {
  const { t } = useTranslation();
  const config = getScoreConfig(score);

  const sizes = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5",
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-full ring-1
        ${config.bg} ${config.text} ${config.ring} ${sizes[size]}
        animate-in fade-in zoom-in-95 duration-300
      `}
    >
      <span className="font-bold">{Math.round(score)}%</span>
      <span className="font-medium opacity-80">{t(getScoreLabelKey(score))}</span>
    </span>
  );
}
