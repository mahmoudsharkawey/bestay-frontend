import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { notificationsService } from "@/features/notifications/services/notifications.api";
import { useAuthStore } from "@/shared/stores/auth.store";

export function useNotificationActions() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });

  const { mutate: markAsRead } = useMutation({
    mutationFn: (id) => notificationsService.markAsRead(id),
    onSuccess: () => invalidate(),
    onError: () => toast.error(t("common.error")),
  });

  const { mutate: markAllAsRead, isPending: isMarkingAllRead } = useMutation({
    mutationFn: () => notificationsService.markAllAsRead(),
    onSuccess: () => invalidate(),
    onError: () => toast.error(t("common.error")),
  });

  const { mutate: deleteNotification } = useMutation({
    mutationFn: (id) => notificationsService.deleteNotification(id),
    onSuccess: () => {
      toast.success(t("notifications.deleted"));
      invalidate();
    },
    onError: () => toast.error(t("common.error")),
  });

  return {
    markAsRead,
    markAllAsRead,
    isMarkingAllRead,
    deleteNotification,
  };
}
