import { apiClient } from "@/shared/lib/axios";

export const userPreferenceService = {
  /** Create or upsert user preference */
  createOrUpdate: (data) =>
    apiClient.post("/user-preferences", data).then((res) => res.data),

  /** Get current user's preference */
  getMyPreference: () =>
    apiClient.get("/user-preferences/me").then((res) => res.data),

  /** Partial update of preference */
  update: (data) =>
    apiClient.patch("/user-preferences", data).then((res) => res.data),

  /** Delete preference */
  delete: () =>
    apiClient.delete("/user-preferences").then((res) => res.data),

  /** Get recommended/matching units */
  getMatchingUnits: () =>
    apiClient.get("/user-preferences/matching-units").then((res) => res.data),
};
