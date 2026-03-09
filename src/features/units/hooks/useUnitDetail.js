import { useQuery } from "@tanstack/react-query";
import { unitsService } from "@/features/units/services/units.api";

/**
 * Hook for fetching a single unit by ID.
 * Handles multiple response shapes from the backend.
 */
export function useUnitDetail(id) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["unit", id],
    queryFn: () => unitsService.getUnitById(id),
    enabled: !!id,
    retry: 1,
  });

  // Support multiple response shapes:
  // 1. { data: { unit: {...} } }  (documented)
  // 2. { data: { ...unit fields } }  (some endpoints)
  // 3. { ...unit fields }  (flat)
  const rawData = data?.data;
  const unit = rawData?.unit ?? (rawData?.id ? rawData : null);

  return {
    unit,
    isLoading,
    isError,
    error,
  };
}
