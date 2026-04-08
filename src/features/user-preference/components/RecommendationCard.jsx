import { Link } from "react-router-dom";
import { MapPin, GraduationCap, Heart, BedDouble, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCheckIsFavorited } from "@/features/favorites/hooks/useFavorites";
import { useFavoriteActions } from "@/features/favorites/hooks/useFavoriteActions";
import { useAuthStore } from "@/shared/stores/auth.store";
import MatchScoreBadge from "./MatchScoreBadge";
import ScoreBreakdown from "./ScoreBreakdown";
import AIReasonCard from "./AIReasonCard";

const GENDER_COLORS = {
  MALE_ONLY: "bg-blue-100 text-blue-700",
  FEMALE_ONLY: "bg-pink-100 text-pink-700",
};

const ROOM_COLORS = {
  SINGLE: "bg-green-100 text-green-700",
  DOUBLE: "bg-yellow-100 text-yellow-700",
  SHARED: "bg-slate-100 text-slate-700",
};

/**
 * Premium recommendation card that extends UnitCard with AI match info.
 * @param {{ unit: object }} props
 */
export default function RecommendationCard({ unit }) {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { isFavorited } = useCheckIsFavorited(unit.id);
  const { toggleFavorite, isPending } = useFavoriteActions();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleFavorite({ unitId: unit.id, currentlyFavorited: isFavorited });
  };

  const image =
    unit?.images?.[0] ||
    "https://placehold.co/400x260/1B3D6F/white?text=BeStay";

  return (
    <Link
      to={`/units/${unit.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 relative"
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={unit.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {unit.roomType && (
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${ROOM_COLORS[unit.roomType] || "bg-slate-100 text-slate-600"}`}
            >
              {unit.roomType}
            </span>
          )}
          {unit.genderType && (
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${GENDER_COLORS[unit.genderType] || "bg-slate-100 text-slate-600"}`}
            >
              {unit.genderType}
            </span>
          )}
        </div>

        {/* Match Score Badge — top right overlay */}
        <div className="absolute top-3 right-3 z-10">
          <MatchScoreBadge score={unit.matchScore} size="sm" />
        </div>

        {/* Favorite Heart */}
        {user && (
          <button
            onClick={handleFavoriteClick}
            disabled={isPending}
            className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
              isFavorited
                ? "bg-white/90 shadow-sm"
                : "bg-black/20 hover:bg-white/90 hover:shadow-sm text-white hover:text-red-500"
            }`}
            aria-label={
              isFavorited ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                isFavorited ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-navy text-base leading-tight mb-1 line-clamp-1 group-hover:text-orange transition-colors">
          {unit.title}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-3">
          {unit.description}
        </p>

        <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5 text-orange" />
            {unit.city}
          </span>
          {unit.university && (
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3.5 w-3.5 text-orange" />
              <span className="line-clamp-1">{unit.university}</span>
            </span>
          )}
          {unit.rooms && (
            <span className="flex items-center gap-1">
              <BedDouble className="h-3.5 w-3.5 text-orange" />
              {unit.rooms} {t("units.rooms")}
            </span>
          )}
        </div>

        {/* Rating */}
        {unit.averageRating > 0 && (
          <div className="flex items-center gap-1 text-xs text-slate-500 mb-3">
            <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />
            <span className="font-medium">{unit.averageRating.toFixed(1)}</span>
            {unit._count?.reviews > 0 && (
              <span className="text-slate-400">
                ({unit._count.reviews} {t("units.reviews")})
              </span>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-navy">${unit.price}</span>
            <span className="text-xs text-slate-400 ml-1">
              /{t("units.month")}
            </span>
          </div>
          <span className="text-xs font-medium text-orange border border-orange rounded-full px-3 py-1 group-hover:bg-orange group-hover:text-white transition-colors">
            {t("units.viewDetails")}
          </span>
        </div>

        {/* Score Breakdown (expandable) */}
        <ScoreBreakdown breakdown={unit.scoreBreakdown} />

        {/* AI Reason */}
        <AIReasonCard reason={unit.aiReason} />
      </div>
    </Link>
  );
}
