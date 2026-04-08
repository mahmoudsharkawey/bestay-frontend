import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { pricingService } from "@/features/pricing/services/pricing.api";

/**
 * Hook for on-demand pricing suggestions.
 * Uses mutations (not queries) since both actions are triggered by user interaction.
 */
export function usePricingSuggestion() {
  const suggestionMutation = useMutation({
    mutationFn: (data) => pricingService.getSuggestion(data),
  });

  const unitPricingMutation = useMutation({
    mutationFn: (unitId) => pricingService.getUnitPricing(unitId),
  });

  // Whichever mutation was last used is the "active" one
  const activeMutation = unitPricingMutation.data
    ? unitPricingMutation
    : suggestionMutation;

  const getSuggestion = useCallback(
    (data) => suggestionMutation.mutate(data),
    [suggestionMutation.mutate],
  );

  const getUnitPricing = useCallback(
    (unitId) => unitPricingMutation.mutate(unitId),
    [unitPricingMutation.mutate],
  );

  const reset = useCallback(() => {
    suggestionMutation.reset();
    unitPricingMutation.reset();
  }, [suggestionMutation.reset, unitPricingMutation.reset]);

  return {
    result: activeMutation.data?.data ?? null,
    isLoading: suggestionMutation.isPending || unitPricingMutation.isPending,
    error:
      activeMutation.error?.response?.data?.message ||
      (activeMutation.error ? "Failed to get pricing data" : null),
    isError: activeMutation.isError,
    getSuggestion,
    getUnitPricing,
    reset,
  };
}
