import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/features/admin/services/admin.api";

/**
 * useAdminVisits — paginated visits list with date filters.
 */
export function useAdminVisits(params = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-visits", params],
    queryFn: () => adminService.getVisits(params),
    retry: 1,
  });

  return {
    visits: data?.data?.visits || data?.data || [],
    total: data?.data?.pagination?.total || data?.data?.total || 0,
    isLoading,
  };
}
