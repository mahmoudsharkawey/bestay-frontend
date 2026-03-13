import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/features/admin/services/admin.api";

/**
 * useAdminDashboard — fetches overview KPIs and chart data for the main dashboard.
 */
export function useAdminDashboard() {
  const overview = useQuery({
    queryKey: ["admin-overview"],
    queryFn: adminService.getOverview,
    retry: 1,
  });

  const revenueStats = useQuery({
    queryKey: ["admin-revenue-stats"],
    queryFn: () => adminService.getRevenueStats({ period: "monthly" }),
    retry: 1,
  });

  const bookingsStats = useQuery({
    queryKey: ["admin-bookings-stats"],
    queryFn: () => adminService.getBookingsStats({ period: "monthly" }),
    retry: 1,
  });

  const usersGrowth = useQuery({
    queryKey: ["admin-users-growth"],
    queryFn: () => adminService.getUsersGrowth({ period: "monthly" }),
    retry: 1,
  });

  const visitsStatus = useQuery({
    queryKey: ["admin-visits-status"],
    queryFn: adminService.getVisitsStatus,
    retry: 1,
  });

  const usersByRole = useQuery({
    queryKey: ["admin-users-by-role"],
    queryFn: adminService.getUsersByRole,
    retry: 1,
  });

  const bookingsStatus = useQuery({
    queryKey: ["admin-bookings-status"],
    queryFn: adminService.getBookingsStatus,
    retry: 1,
  });

  const kpis = overview.data?.data || {};

  return {
    kpis,
    revenueData: revenueStats.data?.data || {},
    bookingsData: bookingsStats.data?.data || {},
    usersGrowthData: usersGrowth.data?.data || {},
    visitsStatusData: visitsStatus.data?.data || {},
    usersByRoleData: usersByRole.data?.data || {},
    bookingsStatusData: bookingsStatus.data?.data || {},
    isLoading: overview.isLoading,
    isChartsLoading:
      revenueStats.isLoading ||
      bookingsStats.isLoading ||
      usersGrowth.isLoading ||
      visitsStatus.isLoading,
  };
}
