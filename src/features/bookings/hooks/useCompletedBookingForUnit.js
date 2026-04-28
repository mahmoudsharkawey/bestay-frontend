import { useQuery } from "@tanstack/react-query";
import { bookingsService } from "../services/bookings.api";

export function useCompletedBookingForUnit(unitId) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => bookingsService.getMyBookings(),
  });

  const allBookings = data?.data?.bookings || data?.data || [];
  
  const hasCompletedBooking = allBookings.some((booking) => {
    if (booking.unitId !== unitId) return false;
    
    // Check if status is CONFIRMED or BOOKED
    if (booking.status !== "CONFIRMED" && booking.status !== "BOOKED") return false;
    
    // Check if endDate has passed
    const endDate = new Date(booking.endDate);
    const now = new Date();
    return endDate < now;
  });

  return {
    hasCompletedBooking,
    isLoading,
    isError,
  };
}
