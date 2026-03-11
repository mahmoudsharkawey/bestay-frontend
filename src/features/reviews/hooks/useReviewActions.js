import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { reviewsService } from "@/features/reviews/services/reviews.api";

export function useReviewActions(unitId) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ["reviews", "unit", unitId] });
    queryClient.invalidateQueries({ queryKey: ["reviews", "my", unitId] });
    // Also invalidate the main unit query to update avg rating immediately
    queryClient.invalidateQueries({ queryKey: ["unit", unitId] });
  };

  const { mutate: createReview, isPending: isCreating } = useMutation({
    mutationFn: (data) => reviewsService.createReview({ ...data, unitId }),
    onSuccess: () => {
      toast.success(t("reviews.submitSuccess"));
      invalidate();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("common.error"));
    },
  });

  const { mutate: updateReview, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => reviewsService.updateReview(id, data),
    onSuccess: () => {
      toast.success(t("reviews.updateSuccess"));
      invalidate();
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || t("common.error"));
    },
  });

  const { mutate: deleteReview, isPending: isDeleting } = useMutation({
    mutationFn: (id) => reviewsService.deleteReview(id),
    onSuccess: () => {
      toast.success(t("reviews.deleteSuccess"));
      invalidate();
    },
    onError: (error) => {
      toast.error(t("common.error"));
    },
  });

  return {
    createReview,
    updateReview,
    deleteReview,
    isCreating,
    isUpdating,
    isDeleting,
  };
}
