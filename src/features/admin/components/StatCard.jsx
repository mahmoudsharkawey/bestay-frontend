import { cn } from "@/shared/utils/cn";
import { Card, CardContent } from "@/shared/components/ui/card";

/**
 * StatCard — KPI stat card with icon, value, label, and optional description.
 * Follows the BeStay design system (navy/orange/slate palette).
 */
export default function StatCard({
  icon: Icon,
  label,
  value,
  description,
  iconClassName,
  className,
}) {
  return (
    <Card
      className={cn(
        "border-slate-100 shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <CardContent className="flex items-center gap-4 py-5 px-5">
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            iconClassName || "bg-navy/10 text-navy"
          )}
        >
          {Icon && <Icon className="h-5 w-5" />}
        </div>
        <div className="min-w-0">
          <p className="text-2xl font-bold text-slate-800 leading-none">
            {value ?? "—"}
          </p>
          <p className="text-sm text-slate-500 mt-1">{label}</p>
          {description && (
            <p className="text-xs text-slate-400 mt-0.5">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
