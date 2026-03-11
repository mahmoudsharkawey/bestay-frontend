import { useMutation, useQuery } from "@tanstack/react-query";
import { paymentsService } from "../services/payments.api";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export function useCreatePaymentIntent() {
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (visitId) => paymentsService.createIntent(visitId),
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("common.error"));
    },
  });
}

export function usePaymentHistory() {
  return useQuery({
    queryKey: ["my-payments"],
    queryFn: () => paymentsService.getMyPayments(),
  });
}
