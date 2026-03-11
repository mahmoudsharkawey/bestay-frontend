import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { visitsService } from "@/features/visits/services/visits.api";

/**
 * Hook for the "My Visits" page — fetches visits and provides client-side
 * status filter for the tab UI.
 */
export function useMyVisits() {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-visits"],
    queryFn: () => visitsService.getMyVisits(),
  });

  const allVisits = data?.data || [];

  const visits =
    statusFilter === "ALL"
      ? allVisits
      : allVisits.filter((v) => v.status === statusFilter);

  return {
    visits,
    allVisits,
    isLoading,
    isError,
    statusFilter,
    setStatusFilter,
  };
}
