import { useQuery } from "@tanstack/react-query";
import { landlordService } from "@/features/landlord/services/landlord.api";

/**
 * useLandlordStats — fetches consolidated statistics and activity for the landlord dashboard.
 */
export function useLandlordStats() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["landlord-dashboard-stats"],
    queryFn: landlordService.getDashboardStats,
    retry: 1,
  });

  const stats = response?.data || {};

  return {
    units: stats.myProperties || [],
    visits: stats.recentVisits || [],
    bookings: stats.recentBookings || [],
    isLoading,
    totalUnits: stats.totalProperties || 0,
    totalVisits: stats.totalVisits || 0,
    totalBookings: stats.totalBookings || 0,
  };
}
