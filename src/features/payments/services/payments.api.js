import { apiClient } from "@/shared/lib/axios";

export const paymentsService = {
  createIntent: async (visitId) => {
    const response = await apiClient.post("/payments/intent", { visitId });
    return response.data;
  },

  getMyPayments: async () => {
    const response = await apiClient.get("/payments/my");
    return response.data;
  },
};
