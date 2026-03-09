import { useQuery } from "@tanstack/react-query";
import { landlordService } from "@/features/landlord/services/landlord.api";

/**
 * useLandlordStats — fetches units, visits, and bookings for the landlord dashboard.
 */
export function useLandlordStats() {
  const { data: unitsData, isLoading: unitsLoading } = useQuery({
    queryKey: ["landlord-units"],
    queryFn: landlordService.getMyUnits,
    retry: 1,
  });

  const { data: visitsData, isLoading: visitsLoading } = useQuery({
    queryKey: ["landlord-visits"],
    queryFn: () => landlordService.getVisits({ limit: 5 }),
    retry: 1,
  });

  const { data: bookingsData, isLoading: bookingsLoading } = useQuery({
    queryKey: ["landlord-bookings"],
    queryFn: () => landlordService.getBookings({ limit: 5 }),
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
