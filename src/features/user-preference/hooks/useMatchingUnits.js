import { useQuery } from "@tanstack/react-query";
import { userPreferenceService } from "@/features/user-preference/services/userPreference.api";

/**
 * Hook for fetching matching/recommended units based on preference.
 * Only enabled when a preference exists.
 */
export function useMatchingUnits({ enabled = true } = {}) {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["matching-units"],
    queryFn: () => userPreferenceService.getMatchingUnits(),
    enabled,
  });

  return {
    units: data?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
}
