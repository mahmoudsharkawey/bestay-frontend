import { apiClient } from "@/shared/lib/axios";

export const recommendationService = {
  /** Get AI-powered unit recommendations based on user preferences */
  getRecommendations: () =>
    apiClient.get("/recommendations").then((res) => res.data),
};
