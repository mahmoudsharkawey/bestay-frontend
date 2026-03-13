import { useQuery } from "@tanstack/react-query";
import { favoritesService } from "@/features/favorites/services/favorites.api";
import { useAuthStore } from "@/shared/stores/auth.store";

/**
 * Hook to fetch user's favorited units.
 */
export function useMyFavorites() {
  const { user } = useAuthStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-favorites", user?.id],
    queryFn: () => favoritesService.getUserFavorites(user.id),
    enabled: !!user?.id,
  });

  return {
    favorites: data?.data || [],
    isLoading,
    isError,
  };
}

/**
 * Hook to check if a specific unit is favorited by the current user.
 * (Useful for UnitDetailPage initial state).
 */
export function useCheckIsFavorited(unitId) {
  const { user } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["favorite-status", unitId, user?.id],
    queryFn: () => favoritesService.checkIsFavorited(unitId, user.id),
    enabled: !!user?.id && !!unitId,
  });

  return {
    isFavorited: !!data?.data?.isFavorited,
    isLoading,
  };
}
