import { useQuery } from "@tanstack/react-query";
import { notificationsService } from "@/features/notifications/services/notifications.api";
import { useAuthStore } from "@/shared/stores/auth.store";

/**
 * Hook to fetch user's notifications.
 * Polls every 60 seconds if the user is authenticated.
 */
export function useNotifications() {
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => notificationsService.getMyNotifications(),
    enabled: !!user?.id,
    refetchInterval: 60000, // Background poll every 60s
  });

  const notifications = data?.data || [];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications,
    unreadCount,
    isLoading,
    isError,
  };
}
