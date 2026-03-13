import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/features/admin/services/admin.api";

/**
 * useAdminBookings — paginated bookings list with date filters.
 */
export function useAdminBookings(params = {}) {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-bookings", params],
    queryFn: () => adminService.getBookings(params),
    retry: 1,
  });

  return {
    bookings: data?.data?.bookings || data?.data || [],
    total: data?.data?.pagination?.total || data?.data?.total || 0,
    isLoading,
  };
}
