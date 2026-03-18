import { useTranslation } from "react-i18next";
import { Bell, CheckCircle2 } from "lucide-react";
import { useNotifications } from "@/features/notifications/hooks/useNotifications";
import { useNotificationActions } from "@/features/notifications/hooks/useNotificationActions";
import { Button } from "@/shared/components/ui/button";
import NotificationItem from "@/features/notifications/components/NotificationItem";

export default function NotificationsPage() {
  const { t } = useTranslation();

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
              <NotificationItem
                key={notification._id || notification.id}
                notification={notification}
                onMarkAsRead={markAsRead}
                onDelete={deleteNotification}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
