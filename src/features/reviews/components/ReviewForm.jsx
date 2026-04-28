import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { useReviewActions } from "@/features/reviews/hooks/useReviewActions";

export default function ReviewForm({ unitId, existingReview, onCancel }) {
  const { t } = useTranslation();
  const { createReview, updateReview, isCreating, isUpdating } = useReviewActions(unitId);

  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (existingReview) {
      setRating(existingReview.rating || 0);
      setComment(existingReview.comment || "");
    } else {
      setRating(0);
      setComment("");
    }
  }, [existingReview]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) return; // Rating is required

    const onSuccess = () => {
      if (onCancel) onCancel(); // Collapse or hide form on success
    };

    if (existingReview) {
      updateReview(
        { id: existingReview.id, data: { rating, comment } },
        { onSuccess }
      );
    } else {
      createReview({ rating, comment }, { onSuccess });
    }
  };

  const isPending = isCreating || isUpdating;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8 mt-8">
      <h3 className="text-xl font-bold text-navy mb-4">
        {existingReview ? t("reviews.editReview") : t("reviews.writeReview")}
      </h3>
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

        <div className="flex gap-3 justify-end">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              className="text-slate-600 border-slate-200"
              onClick={onCancel}
              disabled={isPending}
            >
              {t("common.cancel")}
            </Button>
          )}
          <Button
            type="submit"
            className="bg-navy hover:bg-navy-light text-white px-8"
            disabled={isPending || rating === 0}
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
  );
}
