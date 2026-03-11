import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { favoritesService } from "@/features/favorites/services/favorites.api";
import { useAuthStore } from "@/shared/stores/auth.store";

export function useFavoriteActions() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const { mutate: toggleFavorite, isPending } = useMutation({
    mutationFn: async ({ unitId, currentlyFavorited }) => {
      if (!user) {
        throw new Error("User must be logged in to favorite");
      }
      if (currentlyFavorited) {
        return favoritesService.removeFavorite(user.id, unitId);
      } else {
        return favoritesService.addFavorite(user.id, unitId);
      }
    },
    // ON MUTATE: Optimistic UI Update
    onMutate: async ({ unitId, currentlyFavorited }) => {
      // Cancel any outgoing refetches for this query
      await queryClient.cancelQueries({
        queryKey: ["favorite-status", unitId, user?.id],
      });

      // Snapshot the previous value
      const previousValue = queryClient.getQueryData([
        "favorite-status",
        unitId,
        user?.id,
      ]);

      // Optimistically update the single unit favorite status
      queryClient.setQueryData(["favorite-status", unitId, user?.id], {
        data: { isFavorited: !currentlyFavorited },
      });

      // Update lists of units if we have them (e.g. searching/browsing)
      // This is complex because units lists use infinite queries or regular arrays
      // so we invalidate them on success instead of modifying nested infinite query pages.

      return { previousValue };
    },
    // ON ERROR: Rollback
    onError: (err, { unitId }, context) => {
      queryClient.setQueryData(
        ["favorite-status", unitId, user?.id],
        context.previousValue,
      );

      // Only toast error if it's not the "User must be logged in" dummy error we threw
      if (user) {
        toast.error(t("common.error"));
      }
    },
    // ON SETTLED: Invalidate all relevant queries to ensure true state
    onSettled: (data, error, { unitId }) => {
      // Background refetch to sync true server state
      queryClient.invalidateQueries({
        queryKey: ["favorite-status", unitId, user?.id],
      });
      // Invalidate the favorites list
      queryClient.invalidateQueries({
        queryKey: ["my-favorites", user?.id],
      });
      // Invalidate unit lists the user might be viewing
      queryClient.invalidateQueries({ queryKey: ["units"] });
    },
  });

  return { toggleFavorite, isPending };
}
