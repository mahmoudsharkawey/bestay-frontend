import { apiClient } from "@/shared/lib/axios";

/**
 * Admin API service — pure HTTP calls, no React/state.
 */
export const adminService = {
  getOverview: () => apiClient.get("/admin/overview").then((r) => r.data),

  getUsers: (params = {}) =>
    apiClient.get("/admin/users", { params }).then((r) => r.data),

  getUnits: (params = {}) =>
    apiClient.get("/admin/units", { params }).then((r) => r.data),

  getVisits: (params = {}) =>
    apiClient.get("/admin/visits", { params }).then((r) => r.data),

  getBookings: (params = {}) =>
    apiClient.get("/admin/bookings", { params }).then((r) => r.data),

  getRevenue: (params = {}) =>
    apiClient.get("/admin/revenue", { params }).then((r) => r.data),
};
