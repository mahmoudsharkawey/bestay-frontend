import { apiClient } from "@/shared/lib/axios";

/**
 * Bookings API service — pure HTTP calls, no React/state.
 */
export const bookingsService = {
  getMyBookings: (params = {}) =>
    apiClient.get("/bookings", { params }).then((r) => r.data),

  getBookingById: (id) => apiClient.get(`/bookings/${id}`).then((r) => r.data),

  createBooking: (data) =>
    apiClient.post("/bookings", data).then((r) => r.data),

  cancelBooking: (id) =>
    apiClient.patch(`/bookings/${id}/cancel`).then((r) => r.data),
};
