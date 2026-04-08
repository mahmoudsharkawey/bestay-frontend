import { useTranslation } from "react-i18next";

const POSITION_CONFIG = {
  COMPETITIVE: {
    icon: "✅",
    bg: "bg-emerald-500/15",
    text: "text-emerald-600",
    ring: "ring-emerald-500/30",
  },
  BELOW_MARKET: {
    icon: "⬇",
    bg: "bg-blue-500/15",
    text: "text-blue-600",
    ring: "ring-blue-500/30",
  },
  ABOVE_MARKET: {
    icon: "⬆",
    bg: "bg-orange-500/15",
    text: "text-orange-600",
    ring: "ring-orange-500/30",
  },
  PREMIUM: {
    icon: "👑",
    bg: "bg-purple-500/15",
    text: "text-purple-600",
    ring: "ring-purple-500/30",
  },
  NO_DATA: {
    icon: "❓",
    bg: "bg-slate-500/15",
    text: "text-slate-500",
    ring: "ring-slate-500/30",
  },
  NOT_PROVIDED: {
    icon: "💡",
    bg: "bg-slate-500/15",
    text: "text-slate-500",
    ring: "ring-slate-500/30",
  },
};

/**
 * Displays a color-coded badge for the price position in the market.
 * @param {{ position: string }} props
 */
export default function PricePositionBadge({ position }) {
  const { t } = useTranslation();
  const config = POSITION_CONFIG[position] || POSITION_CONFIG.NO_DATA;

  return (
    <div
      className={`
        inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold ring-1
        ${config.bg} ${config.text} ${config.ring}
        animate-in fade-in zoom-in-95 duration-300
      `}
    >
      <span className="text-lg">{config.icon}</span>
      <div className="flex flex-col">
        <span className="text-sm font-bold leading-tight">
          {t(`pricing.position.${position}`)}
        </span>
        <span className="text-xs font-medium opacity-75">
          {t(`pricing.positionDesc.${position}`)}
        </span>
      </div>
    </div>
  );
}
