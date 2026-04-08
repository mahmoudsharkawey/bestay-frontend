import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown, DollarSign, MapPin, Wrench, Star, TrendingUp } from "lucide-react";

const CATEGORIES = [
  { key: "price",      icon: DollarSign,  color: "bg-emerald-500" },
  { key: "location",   icon: MapPin,      color: "bg-blue-500" },
  { key: "facilities", icon: Wrench,      color: "bg-purple-500" },
  { key: "reviews",    icon: Star,        color: "bg-amber-500" },
  { key: "popularity", icon: TrendingUp,  color: "bg-rose-500" },
];

/**
 * Expandable score breakdown panel.
 * @param {{ breakdown: { price: number, location: number, facilities: number, reviews: number, popularity: number } }} props
 */
export default function ScoreBreakdown({ breakdown }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  if (!breakdown) return null;

  return (
    <div className="mt-2">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-navy transition-colors"
      >
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
        {t("recommendations.scoreDetails")}
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="space-y-2.5">
            {CATEGORIES.map(({ key, icon: Icon, color }) => (
              <div key={key} className="flex items-center gap-2.5">
                <Icon className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="text-xs text-slate-500 w-16 shrink-0">
                  {t(`recommendations.score.${key}`)}
                </span>
                <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
                    style={{ width: `${breakdown[key] || 0}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-600 w-8 text-right">
                  {Math.round(breakdown[key] || 0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
