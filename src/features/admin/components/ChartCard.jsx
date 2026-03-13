import { cn } from "@/shared/utils/cn";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";

/**
 * ChartCard — wrapper card for Recharts charts with title and optional actions.
 */
export default function ChartCard({ title, action, children, className }) {
  return (
    <Card className={cn("border-slate-100 shadow-sm", className)}>
      <CardHeader className="border-b border-slate-50 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold text-slate-800">
            {title}
          </CardTitle>
          {action && <div>{action}</div>}
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
    </Card>
  );
}
