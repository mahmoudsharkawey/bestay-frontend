import { apiClient } from "@/shared/lib/axios";

/**
 * Admin API service — pure HTTP calls, no React/state.
 * Base path: /admin
 */
export const adminService = {
  /* ── Overview & KPIs ────────────────────────────────── */
  getOverview: () =>
    apiClient.get("/admin/dashboard/overview").then((r) => r.data),

  /* ── Visits & Traffic Analytics ─────────────────────── */
  getVisitsStats: (params = {}) =>
    apiClient.get("/admin/dashboard/visits-stats", { params }).then((r) => r.data),

  getTopUnits: (params = {}) =>
    apiClient.get("/admin/dashboard/top-units", { params }).then((r) => r.data),

  getConversionFunnel: () =>
    apiClient.get("/admin/charts/conversion-funnel").then((r) => r.data),

  getVisitsStatus: () =>
    apiClient.get("/admin/charts/visits-status").then((r) => r.data),

  /* ── Bookings & Revenue Analytics ───────────────────── */
  getBookingsStats: (params = {}) =>
    apiClient.get("/admin/dashboard/bookings-stats", { params }).then((r) => r.data),

  getRevenueStats: (params = {}) =>
    apiClient.get("/admin/dashboard/revenue-stats", { params }).then((r) => r.data),

  getBookingsStatus: () =>
    apiClient.get("/admin/charts/bookings-status").then((r) => r.data),

  /* ── Users & Growth Charts ──────────────────────────── */
  getUsersGrowth: (params = {}) =>
    apiClient.get("/admin/charts/users-growth", { params }).then((r) => r.data),

  getUsersByRole: () =>
    apiClient.get("/admin/charts/users-by-role").then((r) => r.data),

  /* ── Ratings ────────────────────────────────────────── */
  getRatingsSummary: () =>
    apiClient.get("/admin/dashboard/ratings-summary").then((r) => r.data),

  /* ── User Management ────────────────────────────────── */
  getUsers: (params = {}) =>
    apiClient.get("/admin/users", { params }).then((r) => r.data),

  getUser: (id) =>
    apiClient.get(`/admin/users/${id}`).then((r) => r.data),

  blockUser: (id) =>
    apiClient.patch(`/admin/users/${id}/block`).then((r) => r.data),

  unblockUser: (id) =>
    apiClient.patch(`/admin/users/${id}/unblock`).then((r) => r.data),

  changeRole: (id, role) =>
    apiClient.patch(`/admin/users/${id}/role`, { role }).then((r) => r.data),

  /* ── Bookings Monitoring ────────────────────────────── */
  getBookings: (params = {}) =>
    apiClient.get("/admin/bookings", { params }).then((r) => r.data),

  getBooking: (id) =>
    apiClient.get(`/admin/bookings/${id}`).then((r) => r.data),

  /* ── Visits Monitoring ──────────────────────────────── */
  getVisits: (params = {}) =>
    apiClient.get("/admin/visits", { params }).then((r) => r.data),

  getVisit: (id) =>
    apiClient.get(`/admin/visits/${id}`).then((r) => r.data),

  /* ── Reviews ────────────────────────────────────────── */
  getReviews: (params = {}) =>
    apiClient.get("/admin/reviews", { params }).then((r) => r.data),

  /* ── Payments ───────────────────────────────────────── */
  getPayments: (params = {}) =>
    apiClient.get("/payments", { params }).then((r) => r.data),

  refundPayment: (id) =>
    apiClient.post(`/payments/${id}/refund`).then((r) => r.data),
};
