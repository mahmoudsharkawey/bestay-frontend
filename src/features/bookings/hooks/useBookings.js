import { useQuery } from "@tanstack/react-query";
import { bookingsService } from "../services/bookings.api";

export function useMyBookings() {
  return useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => bookingsService.getMyBookings(),
  });
}
