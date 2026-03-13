import { apiClient } from "@/shared/lib/axios";

/**
 * Landlord API service — pure HTTP calls, no React/state.
 */
export const landlordService = {
  getDashboardStats: () =>
    apiClient.get("/landlord/dashboard").then((r) => r.data),
};
