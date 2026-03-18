import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { enUS, ar } from "date-fns/locale";
import { Trash2 } from "lucide-react";
import { useUiStore } from "@/shared/stores/ui.store";
import {
  NOTIFICATION_ICON_MAP,
  DEFAULT_NOTIFICATION_ICON,
} from "@/features/notifications/constants";

export default function NotificationItem({
  notification,
  onMarkAsRead,
  onDelete,
}) {
  const { t } = useTranslation();
  const { language } = useUiStore();
  const dateLocale = language === "ar" ? ar : enUS;

  const iconConfig =
    NOTIFICATION_ICON_MAP[notification.type] || DEFAULT_NOTIFICATION_ICON;
  const IconComponent = iconConfig.icon;

  const title = t(
    `notifications.types.${notification.type}`,
    notification.type,
  );

  return (
    <div
      className={`flex gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${
        notification.isRead
          ? "bg-white border-slate-100 opacity-75"
          : "bg-blue-50/50 border-blue-100 shadow-sm"
      }`}
      onClick={() => {
        if (!notification.isRead)
          onMarkAsRead(notification._id || notification.id);
      }}
    >
      <div className="shrink-0 mt-1">
        <IconComponent className={`h-5 w-5 ${iconConfig.className}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-1">
          <h3
            className={`font-semibold text-sm sm:text-base ${notification.isRead ? "text-slate-700" : "text-navy"}`}
          >
            {title}
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
      </div>

      <div className="shrink-0 flex flex-col justify-start">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(notification._id || notification.id);
          }}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          aria-label="Delete notification"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
