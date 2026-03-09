import { apiClient } from "@/shared/lib/axios";

export const unitsService = {
  /** Public — search/filter units */
  searchUnits: (params = {}) =>
    apiClient.get("/units", { params }).then((res) => res.data),

  /** Public — get all units (unpaginated) */
  getAllUnits: (params = {}) =>
    apiClient.get("/units/all", { params }).then((res) => res.data),

  /** Public — get single unit by id */
  getUnitById: (id) => apiClient.get(`/units/${id}`).then((res) => res.data),

  /** LANDLORD/ADMIN — get my units */
  getMyUnits: () => apiClient.get("/units/my").then((res) => res.data),

  /** LANDLORD/ADMIN — create unit */
  createUnit: (data) => apiClient.post("/units", data).then((res) => res.data),

  /** LANDLORD/ADMIN — update unit */
  updateUnit: (id, data) =>
    apiClient.put(`/units/${id}`, data).then((res) => res.data),

  /** LANDLORD/ADMIN — delete (soft) unit */
  deleteUnit: (id) => apiClient.delete(`/units/${id}`).then((res) => res.data),
};
