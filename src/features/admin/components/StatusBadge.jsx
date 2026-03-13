import { Badge } from "@/shared/components/ui/badge";
import { cn } from "@/shared/utils/cn";

const STATUS_VARIANTS = {
  // Visit statuses
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  PENDING_OWNER: "bg-yellow-100 text-yellow-700 border-yellow-200",
  APPROVED: "bg-blue-100 text-blue-700 border-blue-200",
  REJECTED: "bg-red-100 text-red-700 border-red-200",
  REJECTED_BY_OWNER: "bg-red-100 text-red-700 border-red-200",
  CONFIRMED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-slate-100 text-slate-500 border-slate-200",
  COMPLETED: "bg-emerald-100 text-emerald-700 border-emerald-200",
  RESCHEDULED: "bg-purple-100 text-purple-700 border-purple-200",
  // Booking statuses
  BOOKED: "bg-green-100 text-green-700 border-green-200",
  ACTIVE: "bg-green-100 text-green-700 border-green-200",
  // Payment statuses
  PAID: "bg-green-100 text-green-700 border-green-200",
  REFUNDED: "bg-orange-light text-orange border-orange/20",
  FAILED: "bg-red-100 text-red-700 border-red-200",
  // User statuses
  BLOCKED: "bg-red-100 text-red-700 border-red-200",
  // Roles
  ADMIN: "bg-purple-100 text-purple-700 border-purple-200",
  LANDLORD: "bg-blue-100 text-blue-700 border-blue-200",
  USER: "bg-slate-100 text-slate-600 border-slate-200",
};

/**
 * StatusBadge — renders a styled badge based on a status string.
 */
export default function StatusBadge({ status, className }) {
  if (!status) return null;

  const variant = STATUS_VARIANTS[status] || "bg-slate-100 text-slate-500 border-slate-200";

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-medium text-xs px-2.5 py-0.5 rounded-full border",
        variant,
        className
      )}
    >
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
