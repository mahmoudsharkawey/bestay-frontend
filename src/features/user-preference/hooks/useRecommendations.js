import { useQuery } from "@tanstack/react-query";
import { recommendationService } from "@/features/user-preference/services/recommendation.api";

/**
 * Hook for fetching AI-powered unit recommendations.
 * Returns recommendations sorted by matchScore (descending).
 */
export function useRecommendations() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["recommendations"],
    queryFn: () => recommendationService.getRecommendations(),
    retry: (failureCount, err) => {
      // Don't retry on 404 (no preferences set)
      if (err?.response?.status === 404) return false;
      return failureCount < 2;
    },
  });

  const is404 = error?.response?.status === 404;

  return {
    recommendations: data?.data?.recommendations || [],
    total: data?.data?.total || 0,
    isLoading,
    isError,
    is404,
    error,
    errorMessage:
      error?.response?.data?.message || "Failed to load recommendations",
    refetch,
  };
}
