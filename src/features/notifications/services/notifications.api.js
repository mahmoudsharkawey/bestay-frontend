import { apiClient } from "@/shared/lib/axios";

/**
 * Notifications API service
 */
export const notificationsService = {
  /** USER / LANDLORD — Get all my notifications */
  getMyNotifications: () =>
    apiClient.get("/notifications/my").then((r) => r.data),

  /** USER / LANDLORD — Mark a specific notification as read */
  markAsRead: (id) =>
    apiClient.patch(`/notifications/${id}/read`).then((r) => r.data),

  /** USER / LANDLORD — Mark all as read */
  markAllAsRead: () =>
    apiClient.patch("/notifications/read-all").then((r) => r.data),

  /** USER / LANDLORD — Delete a notification */
  deleteNotification: (id) =>
    apiClient.delete(`/notifications/${id}`).then((r) => r.data),
};
