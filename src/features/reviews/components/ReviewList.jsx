import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { enUS, ar } from "date-fns/locale";
import { Star, MessageSquare } from "lucide-react";
import { useUiStore } from "@/shared/stores/ui.store";
import { useUnitReviews } from "@/features/reviews/hooks/useReviews";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shared/components/ui/avatar";
import { getInitials } from "@/shared/utils/user";

export default function ReviewList({ unitId }) {
  const { t } = useTranslation();
  const { language } = useUiStore();
  const dateLocale = language === "ar" ? ar : enUS;

  const { reviews, isLoading, isError } = useUnitReviews(unitId);

  if (isLoading) {
    return (
      <div className="mt-8 pt-8 border-t border-slate-100 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-32 mb-6" />
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="flex gap-4">
              <div className="h-10 w-10 bg-slate-200 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-1/4" />
                <div className="h-3 bg-slate-200 rounded w-1/6" />
                <div className="h-16 bg-slate-200 rounded w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return null; // Fail silently, just don't show reviews section

  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-8 pt-8 border-t border-slate-100">
        <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-slate-400" />
          {t("reviews.guestReviews")}
        </h3>
        <p className="text-slate-500 text-sm">{t("reviews.noReviewsYet")}</p>
      </div>
    );
  }

  const avgRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="mt-8 pt-8 border-t border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-navy flex items-center gap-2">
          <Star className="h-5 w-5 text-orange fill-orange" />
          {avgRating} · {reviews.length} {t("reviews.reviewsCount")}
        </h3>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="pb-6 border-b border-slate-50 last:border-0 last:pb-0"
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="h-10 w-10 bg-slate-100 border border-slate-200">
                <AvatarImage src={review.user?.picture} />
                <AvatarFallback className="text-sm font-semibold text-slate-500">
                  {getInitials(review.user?.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-semibold text-navy text-sm">
                  {review.user?.name || "Anonymous User"}
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center text-orange font-medium">
                    {review.rating}{" "}
                    <Star className="h-3 w-3 ml-0.5 fill-orange" />
                  </span>
                  <span>·</span>
                  <span>
                    {format(new Date(review.createdAt), "MMM d, yyyy", {
                      locale: dateLocale,
                    })}
                  </span>
                </div>
              </div>
            </div>
            {review.comment && (
              <p className="text-slate-600 text-sm leading-relaxed">
                {review.comment}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
