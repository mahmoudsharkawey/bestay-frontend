import { apiClient } from "@/shared/lib/axios";

/**
 * Visits API service — pure HTTP calls, no React/state.
 *
 * State machine (backend-enforced):
 *  PENDING → APPROVED → CONFIRMED
 *          → REJECTED
 *          → RESCHEDULED → ACCEPTED → APPROVED
 *                        → REJECTED → CANCELLED
 *          → CANCELLED
 */
export const visitsService = {
  /** USER — request a visit to a unit */
  scheduleVisit: (unitId, data) =>
    apiClient.post(`/visits/${unitId}`, data).then((r) => r.data),

  /** USER + LANDLORD — get own visits */
  getMyVisits: () => apiClient.get("/visits/my").then((r) => r.data),

  /** Get a single visit's details */
  getVisitById: (visitId) =>
    apiClient.get(`/visits/${visitId}`).then((r) => r.data),

  /** LANDLORD — approve a pending visit */
  approveVisit: (visitId) =>
    apiClient.put(`/visits/${visitId}/approve`).then((r) => r.data),

  /** LANDLORD — reject a pending visit */
  rejectVisit: (visitId) =>
    apiClient.post(`/visits/${visitId}/reject`).then((r) => r.data),

  /** LANDLORD — propose a new date */
  rescheduleVisit: (visitId, data) =>
    apiClient.post(`/visits/${visitId}/reschedule`, data).then((r) => r.data),

  /** USER — accept landlord's reschedule proposal */
  acceptReschedule: (visitId) =>
    apiClient.post(`/visits/${visitId}/reschedule/accept`).then((r) => r.data),

  /** USER — reject landlord's reschedule proposal → CANCELLED */
  rejectReschedule: (visitId) =>
    apiClient.post(`/visits/${visitId}/reschedule/reject`).then((r) => r.data),

  /** USER — cancel a visit before its proposed date */
  cancelVisit: (visitId) =>
    apiClient.post(`/visits/${visitId}/cancel`).then((r) => r.data),

  /** LANDLORD — confirm visit was physically completed (requires PAID payment) */
  confirmVisit: (visitId, data) =>
    apiClient.post(`/visits/${visitId}/confirm`, data).then((r) => r.data),
};
