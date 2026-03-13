import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/features/admin/services/admin.api";

/**
 * useAdminReviews — paginated reviews list.
 */
export function useAdminReviews(params = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-reviews", params],
    queryFn: () => adminService.getReviews(params),
    retry: 1,
  });

  return {
    reviews: data?.data?.reviews || data?.data || [],
    total: data?.data?.pagination?.total || data?.data?.total || 0,
    isLoading,
  };
}
