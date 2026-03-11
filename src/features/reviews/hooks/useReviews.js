import { useQuery } from "@tanstack/react-query";
import { reviewsService } from "@/features/reviews/services/reviews.api";
import { useAuthStore } from "@/shared/stores/auth.store";

/**
 * Fetch public reviews for a unit.
 */
export function useUnitReviews(unitId) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["reviews", "unit", unitId],
    queryFn: () => reviewsService.getUnitReviews(unitId),
    enabled: !!unitId,
  });

  return {
    reviews: data?.data || [],
    isLoading,
    isError,
  };
}

/**
 * Fetch the logged-in user's review for a unit, to see if they already reviewed.
 */
export function useMyReviewForUnit(unitId) {
  const { user } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["reviews", "my", unitId, user?.id],
    queryFn: () => reviewsService.getMyReviewForUnit(unitId),
    enabled: !!unitId && !!user?.id,
    retry: false, // 404 is expected if no review exists
  });

  return {
    myReview: data?.data || null,
    isLoading,
  };
}
