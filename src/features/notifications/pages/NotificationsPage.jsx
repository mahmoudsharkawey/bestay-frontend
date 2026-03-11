import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { enUS, ar } from "date-fns/locale";
import {
  Bell,
  CheckCircle2,
  Trash2,
  CalendarCheck,
  CalendarX,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { useUiStore } from "@/shared/stores/ui.store";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useNotificationActions } from "@/features/notifications/hooks/useNotificationActions";
import { Button } from "@/shared/components/ui/button";

export default function NotificationsPage() {
  const { t } = useTranslation();
  const { language } = useUiStore();
  const dateLocale = language === "ar" ? ar : enUS;

  const { notifications, isLoading, isError, unreadCount } = useNotifications();
  const { markAsRead, markAllAsRead, isMarkingAllRead, deleteNotification } =
    useNotificationActions();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="h-8 bg-slate-200 rounded w-48 mb-6 animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-slate-200 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <p className="text-red-500 font-medium">{t("common.error")}</p>
      </div>
    );
  }

  const getIconForType = (type) => {
    switch (type) {
      case "VISIT_REQUEST":
      case "VISIT_RESCHEDULED":
      case "BOOKING_RESCHEDULED":
        return <CalendarCheck className="h-5 w-5 text-orange" />;
      case "VISIT_APPROVED":
      case "VISIT_CONFIRMED":
      case "BOOKING_CONFIRMED":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "VISIT_REJECTED":
      case "VISIT_CANCELLED":
      case "BOOKING_CANCELLED":
      case "BOOKING_REJECTED":
        return <CalendarX className="h-5 w-5 text-red-500" />;
      case "PAYMENT_CONFIRMED":
      case "PAYMENT_RECEIVED":
        return <CreditCard className="h-5 w-5 text-blue-500" />;
      case "PAYMENT_REFUNDED":
        return <CreditCard className="h-5 w-5 text-orange" />;
      case "NEW_REVIEW":
        return <MessageSquare className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-navy" />;
    }
  };

  const getTitleForType = (type) => {
    switch (type) {
      case "VISIT_REQUEST":
        return t("notifications.types.VISIT_REQUEST");
      case "VISIT_APPROVED":
        return t("notifications.types.VISIT_APPROVED");
      case "VISIT_RESCHEDULED":
        return t("notifications.types.VISIT_RESCHEDULED");
      case "VISIT_REJECTED":
        return t("notifications.types.VISIT_REJECTED");
      case "PAYMENT_CONFIRMED":
        return t("notifications.types.PAYMENT_CONFIRMED");
      case "BOOKING_CONFIRMED":
        return t("notifications.types.BOOKING_CONFIRMED");
      case "BOOKING_CANCELLED":
        return t("notifications.types.BOOKING_CANCELLED");
      case "BOOKING_RESCHEDULED":
        return t("notifications.types.BOOKING_RESCHEDULED");
      case "BOOKING_REJECTED":
        return t("notifications.types.BOOKING_REJECTED");
      case "VISIT_CANCELLED":
        return t("notifications.types.VISIT_CANCELLED");
      case "PAYMENT_REFUNDED":
        return t("notifications.types.PAYMENT_REFUNDED");
      case "VISIT_CONFIRMED":
        return t("notifications.types.VISIT_CONFIRMED");
      default:
        return type;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
              <Bell className="h-6 w-6 text-orange" />
              {t("notifications.title")}
            </h1>
            <p className="text-slate-500 mt-1">
              {t("notifications.youHave")}{" "}
              <span className="font-semibold text-navy">{unreadCount}</span>{" "}
              {t("notifications.unread")}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button
              variant="outline"
              disabled={isMarkingAllRead}
              onClick={() => markAllAsRead()}
              className="w-full sm:w-auto text-sm"
            >
              <CheckCircle2 className="h-4 w-4 mr-2" />
              {t("notifications.markAllRead")}
            </Button>
          )}
        </div>

        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 text-center px-4">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-slate-300" />
            </div>
            <h2 className="text-lg font-semibold text-navy mb-2">
              {t("notifications.noNotifications")}
            </h2>
            <p className="text-sm text-slate-500 max-w-sm">
              {t("notifications.allCaughtUp")}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification._id || notification.id}
                className={`flex gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${
                  notification.isRead
                    ? "bg-white border-slate-100 opacity-75"
                    : "bg-blue-50/50 border-blue-100 shadow-sm"
                }`}
                onClick={() => {
                  if (!notification.isRead)
                    markAsRead(notification._id || notification.id);
                }}
              >
                <div className="shrink-0 mt-1">
                  {getIconForType(notification.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-1">
                    <h3
                      className={`font-semibold text-sm sm:text-base ${notification.isRead ? "text-slate-700" : "text-navy"}`}
                    >
                      {getTitleForType(notification.type)}
                    </h3>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                        locale: dateLocale,
                      })}
                    </span>
                  </div>
                  <p
                    className={`text-sm ${notification.isRead ? "text-slate-500" : "text-slate-600"} mb-3`}
                  >
                    {notification.message}
                  </p>

                  {/* Action buttons mapping could go here if links were provided in DB */}
                </div>

                <div className="shrink-0 flex flex-col justify-start">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification._id || notification.id);
                    }}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Delete notification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
