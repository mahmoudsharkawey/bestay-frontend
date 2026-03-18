import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { bookingsService } from "../services/bookings.api";

export function useMyBookings() {
  const [statusFilter, setStatusFilter] = useState("ALL");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: () => bookingsService.getMyBookings(),
  });

  const allBookings = data?.data || [];
  const bookings =
    statusFilter === "ALL"
      ? allBookings
      : allBookings.filter((b) => b.status === statusFilter);

  return {
    bookings,
    allBookings,
    isLoading,
    isError,
    statusFilter,
    setStatusFilter,
  };
}
