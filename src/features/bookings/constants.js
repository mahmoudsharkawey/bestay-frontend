// Bookings status configuration and filter tabs

export const STATUS_CONFIG = {
  PENDING: {
    label: "bookings.status.pending",
    color: "bg-amber-100 text-amber-700",
  },
  CONFIRMED: {
    label: "bookings.status.confirmed",
    color: "bg-emerald-100 text-emerald-800",
  },
  COMPLETED: {
    label: "bookings.status.completed",
    color: "bg-blue-100 text-blue-700",
  },
  CANCELLED: {
    label: "bookings.status.cancelled",
    color: "bg-slate-100 text-slate-500",
  },
};

export const TAB_STATUSES = ["ALL", "CONFIRMED", "COMPLETED", "CANCELLED", "PENDING"];
