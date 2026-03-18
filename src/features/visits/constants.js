// Visit status configuration and filter tabs

export const STATUS_CONFIG = {
  PENDING_OWNER: {
    label: "visits.status.pendingOwner",
    color: "bg-amber-100 text-amber-700",
  },
  APPROVED: {
    label: "visits.status.approved",
    color: "bg-green-100 text-green-700",
  },
  RESCHEDULE_PROPOSED: {
    label: "visits.status.rescheduleProposed",
    color: "bg-blue-100 text-blue-700",
  },
  CONFIRMED: {
    label: "visits.status.confirmed",
    color: "bg-emerald-100 text-emerald-800",
  },
  REJECTED_BY_OWNER: {
    label: "visits.status.rejectedByOwner",
    color: "bg-red-100 text-red-700",
  },
  REJECTED_BY_USER: {
    label: "visits.status.rejectedByUser",
    color: "bg-red-100 text-red-700",
  },
  CANCELLED_BY_USER: {
    label: "visits.status.cancelledByUser",
    color: "bg-slate-100 text-slate-500",
  },
  CANCELLED_BY_OWNER: {
    label: "visits.status.cancelledByOwner",
    color: "bg-slate-100 text-slate-500",
  },
  REFUNDED: {
    label: "visits.status.refunded",
    color: "bg-purple-100 text-purple-700",
  },
};

export const TAB_STATUSES = [
  "ALL",
  "PENDING_OWNER",
  "APPROVED",
  "RESCHEDULE_PROPOSED",
  "CONFIRMED",
  "REJECTED_BY_OWNER",
  "REJECTED_BY_USER",
  "CANCELLED_BY_USER",
  "CANCELLED_BY_OWNER",
  "REFUNDED",
];
