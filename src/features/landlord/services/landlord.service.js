import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/shared/lib/axios";

// Landlord: get visits for their units
export const landlordService = {
  getMyUnitsStats: () => apiClient.get("/units/my").then((r) => r.data),

  getVisitsForLandlord: (params = {}) =>
    apiClient.get("/visits", { params }).then((r) => r.data),

  getBookingsForLandlord: (params = {}) =>
    apiClient.get("/bookings", { params }).then((r) => r.data),
};

export function useLandlordStats() {
  const { data: unitsData, isLoading: unitsLoading } = useQuery({
    queryKey: ["landlord-units"],
    queryFn: landlordService.getMyUnitsStats,
    retry: 1,
  });

  const { data: visitsData, isLoading: visitsLoading } = useQuery({
    queryKey: ["landlord-visits"],
    queryFn: () => landlordService.getVisitsForLandlord({ limit: 5 }),
    retry: 1,
  });

  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ["landlord-bookings"],
    queryFn: () => landlordService.getBookingsForLandlord({ limit: 5 }),
    retry: 1,
  });

  const units = unitsData?.data?.units || unitsData?.data || [];
  const visits = visitsData?.data?.visits || visitsData?.data || [];
  const bookings = bookingsData?.data?.bookings || bookingsData?.data || [];

  return {
    units: Array.isArray(units) ? units : [],
    visits: Array.isArray(visits) ? visits : [],
    bookings: Array.isArray(bookings) ? bookings : [],
    isLoading: unitsLoading || visitsLoading || bookingsLoading,
    totalUnits: Array.isArray(units) ? units.length : 0,
    totalVisits: Array.isArray(visits) ? visits.length : 0,
    totalBookings: Array.isArray(bookings) ? bookings.length : 0,
  };
}
