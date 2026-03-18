// Landlord dashboard status styles and configuration

export const STATUS_STYLES = {
  PENDING_OWNER: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED_BY_OWNER: "bg-red-100 text-red-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-slate-100 text-slate-500",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  BOOKED: "bg-green-100 text-green-700",
};

// Map API status (UPPER_SNAKE) to translation key (camelCase)
export const STATUS_TRANSLATION_MAP = {
  PENDING_OWNER: "pendingOwner",
  APPROVED: "approved",
  REJECTED_BY_OWNER: "rejectedByOwner",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  BOOKED: "confirmed", // Bookings use 'confirmed' for 'BOOKED'
};
