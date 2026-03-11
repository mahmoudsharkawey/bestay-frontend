import { apiClient } from "@/shared/lib/axios";

/**
 * Reviews API service
 */
export const reviewsService = {
  /** Public — Get all reviews for a unit */
  getUnitReviews: (unitId) =>
    apiClient.get(`/reviews/unit/${unitId}`).then((r) => r.data),

  /** USER — Get my review for a specific unit */
  getMyReviewForUnit: (unitId) =>
    apiClient.get(`/reviews/my/${unitId}`).then((r) => r.data),

  /** USER — Submit a new review */
  createReview: (reviewData) =>
    apiClient.post("/reviews", reviewData).then((r) => r.data),

  /** USER — Update an existing review */
  updateReview: (id, reviewData) =>
    apiClient.patch(`/reviews/${id}`, reviewData).then((r) => r.data),

  /** USER / ADMIN — Delete a review */
  deleteReview: (id) => apiClient.delete(`/reviews/${id}`).then((r) => r.data),
};
