import { apiClient } from "@/shared/lib/axios";

/**
 * Landlord API service — pure HTTP calls, no React/state.
 */
export const landlordService = {
  getMyUnits: () => apiClient.get("/units/my").then((r) => r.data),

  getVisits: (params = {}) =>
    apiClient.get("/visits", { params }).then((r) => r.data),

  getBookings: (params = {}) =>
    apiClient.get("/bookings", { params }).then((r) => r.data),
};
