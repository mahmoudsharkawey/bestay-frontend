import { apiClient } from "@/shared/lib/axios";

export const bookingsService = {
  getMyBookings: async () => {
    const response = await apiClient.get("/bookings/my");
    return response.data;
  },
};
