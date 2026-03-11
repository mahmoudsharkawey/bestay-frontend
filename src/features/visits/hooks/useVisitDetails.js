import { useQuery } from "@tanstack/react-query";
import { visitsService } from "@/features/visits/services/visits.api";

export function useVisitDetails(visitId) {
  return useQuery({
    queryKey: ["visit", visitId],
    queryFn: () => visitsService.getVisitById(visitId),
    enabled: !!visitId,
  });
}
