import { apiClient } from "@/shared/lib/axios";

/**
 * Favorites API service
 */
export const favoritesService = {
  /** USER / LANDLORD — Add a unit to favorites */
  addFavorite: (userId, unitId) =>
    apiClient.post("/favorites", { userId, unitId }).then((r) => r.data),

  /** USER / LANDLORD — Remove a unit from favorites */
  removeFavorite: (userId, unitId) =>
    apiClient
      .delete(`/favorites/${unitId}`, { data: { userId } })
      .then((r) => r.data),

  /** Any logged in user — Get all favorites for a user */
  getUserFavorites: (userId) =>
    apiClient.get(`/favorites/user/${userId}`).then((r) => r.data),

  /** Any logged in user — Check if a unit is favorited by a user */
  checkIsFavorited: (unitId, userId) =>
    apiClient.get(`/favorites/check/${unitId}/${userId}`).then((r) => r.data),
};
