import { apiClient } from "@/shared/lib/axios";

export const pricingService = {
  /** Hypothetical pricing analysis — POST /pricing/suggest */
  getSuggestion: (data) =>
    apiClient.post("/pricing/suggest", data).then((res) => res.data),

  /** Existing-unit pricing analysis — GET /pricing/unit/:unitId */
  getUnitPricing: (unitId) =>
    apiClient.get(`/pricing/unit/${unitId}`).then((res) => res.data),
};
