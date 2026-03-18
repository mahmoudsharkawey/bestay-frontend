import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Textarea } from "@/shared/components/ui/textarea";
import { useReviewActions } from "@/features/reviews/hooks/useReviewActions";
import { useReviewModal } from "@/features/reviews/hooks/useReviewModal";

export default function ReviewModal({
  isOpen,
  onClose,
  unitId,
  existingReview = null,
}) {
  const { t } = useTranslation();
  const { createReview, updateReview, isCreating, isUpdating } =
    useReviewActions(unitId);
  const {
    rating,
    setRating,
    comment,
    setComment,
    hoveredRating,
    setHoveredRating,
  } = useReviewModal({ isOpen, existingReview });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingReview) {
      updateReview(
        { id: existingReview.id, data: { rating, comment } },
        { onSuccess: onClose },
      );
    } else {
      createReview({ rating, comment }, { onSuccess: onClose });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-navy">
            {existingReview
              ? t("reviews.editReview")
              : t("reviews.writeReview")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3 text-center">
              {t("reviews.tapToRate")}
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="p-1 focus:outline-none transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={`h-8 w-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? "fill-orange text-orange"
                        : "text-slate-200"
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-sm font-medium text-orange mt-2">
              {rating} / 5
            </p>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              {t("reviews.yourExperience")}
              <span className="text-slate-400 font-normal ml-1">
                ({t("common.optional")})
              </span>
            </label>
            <Textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="rounded-xl border-slate-200 bg-slate-50 placeholder:text-slate-400 focus:border-navy focus:ring-navy text-sm resize-none"
              placeholder={t("reviews.placeholder")}
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="w-full text-slate-600 border-slate-200"
              onClick={onClose}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              className="w-full bg-navy hover:bg-navy-light text-white"
              disabled={isPending}
            >
              {isPending
                ? t("common.submitting")
                : existingReview
                  ? t("common.update")
                  : t("common.submit")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
