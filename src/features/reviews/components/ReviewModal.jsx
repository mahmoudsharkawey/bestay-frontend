import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Star, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useReviewActions } from "@/features/reviews/hooks/useReviewActions";

export default function ReviewModal({
  isOpen,
  onClose,
  unitId,
  existingReview = null,
}) {
  const { t } = useTranslation();
  const { createReview, updateReview, isCreating, isUpdating } =
    useReviewActions(unitId);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  useEffect(() => {
    if (isOpen) {
      if (existingReview) {
        setRating(existingReview.rating);
        setComment(existingReview.comment || "");
      } else {
        setRating(5);
        setComment("");
      }
    }
  }, [isOpen, existingReview]);

  if (!isOpen) return null;

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-navy">
            {existingReview
              ? t("reviews.editReview")
              : t("reviews.writeReview")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-navy hover:bg-slate-50 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
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

          <div className="mb-6">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              {t("reviews.yourExperience")}
              <span className="text-slate-400 font-normal ml-1">
                ({t("common.optional")})
              </span>
            </label>
            <textarea
              id="comment"
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded-xl border-slate-200 bg-slate-50 placeholder:text-slate-400 focus:border-navy focus:ring-navy text-sm p-3 resize-none"
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
      </div>
    </div>
  );
}
