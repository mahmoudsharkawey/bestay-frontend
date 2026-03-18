// Notification type configuration — icon and title mappings

import {
  Bell,
  CheckCircle2,
  CalendarCheck,
  CalendarX,
  CreditCard,
  MessageSquare,
} from "lucide-react";

export const NOTIFICATION_ICON_MAP = {
  VISIT_REQUEST: { icon: CalendarCheck, className: "text-orange" },
  VISIT_RESCHEDULED: { icon: CalendarCheck, className: "text-orange" },
  BOOKING_RESCHEDULED: { icon: CalendarCheck, className: "text-orange" },
  VISIT_APPROVED: { icon: CheckCircle2, className: "text-green-500" },
  VISIT_CONFIRMED: { icon: CheckCircle2, className: "text-green-500" },
  BOOKING_CONFIRMED: { icon: CheckCircle2, className: "text-green-500" },
  VISIT_REJECTED: { icon: CalendarX, className: "text-red-500" },
  VISIT_CANCELLED: { icon: CalendarX, className: "text-red-500" },
  BOOKING_CANCELLED: { icon: CalendarX, className: "text-red-500" },
  BOOKING_REJECTED: { icon: CalendarX, className: "text-red-500" },
  PAYMENT_CONFIRMED: { icon: CreditCard, className: "text-blue-500" },
  PAYMENT_RECEIVED: { icon: CreditCard, className: "text-blue-500" },
  PAYMENT_REFUNDED: { icon: CreditCard, className: "text-orange" },
  NEW_REVIEW: { icon: MessageSquare, className: "text-purple-500" },
};

export const DEFAULT_NOTIFICATION_ICON = { icon: Bell, className: "text-navy" };

// Types that have direct translation keys
export const NOTIFICATION_TYPES = [
  "VISIT_REQUEST",
  "VISIT_APPROVED",
  "VISIT_RESCHEDULED",
  "VISIT_REJECTED",
  "VISIT_CONFIRMED",
  "VISIT_CANCELLED",
  "PAYMENT_CONFIRMED",
  "PAYMENT_REFUNDED",
  "BOOKING_CONFIRMED",
  "BOOKING_CANCELLED",
  "BOOKING_RESCHEDULED",
  "BOOKING_REJECTED",
];
