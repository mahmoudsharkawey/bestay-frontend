import { useTranslation } from "react-i18next";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  ArrowDown,
  ArrowUp,
  DollarSign,
} from "lucide-react";

const fmt = (v) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(v);

/**
 * 2×3 grid of market statistics.
 * @param {{ marketAnalysis: object | null, price: number | "not set" }} props
 */
export default function StatsGrid({ marketAnalysis, price }) {
  const { t } = useTranslation();

  if (!marketAnalysis) return null;

  const stats = [
    {
      label: t("pricing.stats.compared"),
      value: marketAnalysis.comparableCount,
      suffix: ` ${t("pricing.stats.units")}`,
      icon: BarChart3,
      color: "text-navy bg-navy/10",
    },
    {
      label: t("pricing.stats.average"),
      value: fmt(marketAnalysis.averagePrice),
      prefix: "$",
      icon: TrendingUp,
      color: "text-emerald-600 bg-emerald-50",
    },
    {
      label: t("pricing.stats.median"),
      value: fmt(marketAnalysis.medianPrice),
      prefix: "$",
      icon: DollarSign,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: t("pricing.stats.minimum"),
      value: fmt(marketAnalysis.minPrice),
      prefix: "$",
      icon: ArrowDown,
      color: "text-cyan-600 bg-cyan-50",
    },
    {
      label: t("pricing.stats.maximum"),
      value: fmt(marketAnalysis.maxPrice),
      prefix: "$",
      icon: ArrowUp,
      color: "text-rose-600 bg-rose-50",
    },
    {
      label: t("pricing.stats.yourPrice"),
      value:
        typeof price === "number" ? fmt(price) : t("pricing.stats.notSet"),
      prefix: typeof price === "number" ? "$" : "",
      icon: DollarSign,
      color: "text-orange bg-orange/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {stats.map(({ label, value, prefix, suffix, icon: Icon, color }) => (
        <div
          key={label}
          className="rounded-xl border border-slate-100 bg-white p-4 flex flex-col gap-2"
        >
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}
          >
            <Icon className="h-4 w-4" />
          </div>
          <p className="text-xs text-slate-500">{label}</p>
          <p className="text-lg font-bold text-navy">
            {prefix}
            {value}
            {suffix}
          </p>
        </div>
      ))}
    </div>
  );
}
