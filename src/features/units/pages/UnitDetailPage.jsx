import { useParams, Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  MapPin,
  GraduationCap,
  Star,
  Shield,
  Calendar,
  ArrowLeft,
  ChevronRight,
  BedDouble,
  Sofa,
  Navigation,
  Home,
  Heart,
} from "lucide-react";
import { useUnitDetail } from "@/features/units/hooks/useUnitDetail";
import UnitGallery from "@/features/units/components/UnitGallery";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/shared/stores/auth.store";
import { useCheckIsFavorited } from "@/features/favorites/hooks/useFavorites";
import { useFavoriteActions } from "@/features/favorites/hooks/useFavoriteActions";
import ReviewList from "@/features/reviews/components/ReviewList";
import LeafletMap from "@/shared/components/LeafletMap";

export default function UnitDetailPage() {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { unit, isLoading, isError, error } = useUnitDetail(id);

  const { isFavorited } = useCheckIsFavorited(unit?.id);
  const { toggleFavorite, isPending: isFavoritePending } = useFavoriteActions();

  const handleFavoriteClick = () => {
    if (!isAuthenticated) return navigate("/login");
    toggleFavorite({ unitId: unit.id, currentlyFavorited: isFavorited });
  };

  if (isLoading)
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        <div className="h-80 bg-slate-200 rounded-2xl mb-8" />
        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2 space-y-4">
            <div className="h-8 bg-slate-200 rounded w-2/3" />
            <div className="h-4 bg-slate-200 rounded w-full" />
            <div className="h-4 bg-slate-200 rounded w-4/5" />
          </div>
          <div className="h-48 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );

  if (isError || !unit)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center px-4">
        {error?.response?.status === 401 ? (
          <>
            <p className="text-slate-500 text-lg font-medium">
              Please log in to view this property
            </p>
            <Button
              onClick={() => navigate("/login")}
              className="bg-orange hover:bg-orange-hover text-white rounded-xl"
            >
              Log In
            </Button>
          </>
        ) : (
          <>
            <p className="text-slate-400 text-lg">{t("units.notFound")}</p>
            <p className="text-xs text-slate-300">
              ID: {id} &nbsp;·&nbsp; {error?.response?.status || error?.message}
            </p>
            <Button onClick={() => navigate("/units")} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t("units.backToListings")}
            </Button>
          </>
        )}
      </div>
    );

  const avgRating = unit.reviews?.length
    ? (
        unit.reviews.reduce((s, r) => s + r.rating, 0) / unit.reviews.length
      ).toFixed(2)
    : null;

  const handleScheduleVisit = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/visits/schedule/${unit.id}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-6">
          <Link to="/" className="hover:text-orange transition-colors">
            {t("nav.home")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/units" className="hover:text-orange transition-colors">
            {t("nav.findHousing")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-700 font-medium line-clamp-1">
            {unit.city}
          </span>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-navy font-medium line-clamp-1">
            {unit.title}
          </span>
        </nav>

        {/* Gallery */}
        <UnitGallery images={unit.images || []} />

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left: info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title + badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy/10 text-navy">
                  {t(`units.roomTypes.${unit.roomType}`, unit.roomType)}
                </span>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    unit.genderType === "MALE_ONLY"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-pink-100 text-pink-700"
                  }`}
                >
                  {t(`units.genderTypes.${unit.genderType}`, unit.genderType)}
                </span>
                {unit.furnished && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                    <Sofa className="inline h-3 w-3 mr-1" />
                    {t("units.furnished")}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <h1 className="text-2xl font-bold text-navy">{unit.title}</h1>
                {user && (
                  <button
                    onClick={handleFavoriteClick}
                    disabled={isFavoritePending}
                    className="p-2.5 rounded-full bg-white border border-slate-200 shadow-sm hover:border-red-200 hover:bg-red-50 transition-colors shrink-0"
                    aria-label={
                      isFavorited ? "Remove favorite" : "Add favorite"
                    }
                  >
                    <Heart
                      className={`h-5 w-5 transition-colors ${
                        isFavorited
                          ? "fill-red-500 text-red-500"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-orange" />
                  {unit.address || unit.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-orange" />
                  {unit.university}
                  {unit.distance && (
                    <span className="text-slate-400">· {unit.distance} km</span>
                  )}
                </span>
                {unit.rooms && (
                  <span className="flex items-center gap-1.5">
                    <BedDouble className="h-4 w-4 text-orange" />
                    {unit.rooms} {t("units.rooms")}
                  </span>
                )}
                {avgRating && (
                  <span className="flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <strong className="text-slate-700">{avgRating}</strong>
                    <span>
                      · {unit.reviews.length} {t("units.reviews")}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* About */}
            <div>
              <h2 className="text-lg font-semibold text-navy mb-3">
                {t("units.aboutPlace")}
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {unit.description}
              </p>
            </div>

            {/* Facilities */}
            {unit.facilities?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-navy mb-3">
                  {t("units.facilities")}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {unit.facilities.map((fac) => (
                    <div
                      key={fac}
                      className="flex items-center gap-2 text-sm text-slate-600 bg-white rounded-xl px-3 py-2 border border-slate-100"
                    >
                      <span className="w-2 h-2 rounded-full bg-orange shrink-0" />
                      {t(`units.facilityLabels.${fac}`, fac.replace(/_/g, " "))}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {(unit.latitude || unit.longitude) && (
              <div>
                <h2 className="text-lg font-semibold text-navy mb-3">
                  {t("units.location")}
                </h2>
                <LeafletMap
                  mode="display"
                  initialPosition={{
                    lat: parseFloat(unit.latitude),
                    lng: parseFloat(unit.longitude),
                  }}
                  className="h-[350px] w-full rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                />
                <p className="mt-2 text-sm text-slate-500 flex items-center gap-1.5">
                  <Navigation className="h-3.5 w-3.5 text-orange" />
                  {unit.address}
                </p>
              </div>
            )}

            {/* Reviews */}
            {unit.reviews?.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold text-navy mb-4">
                  <Star className="inline h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
                  {avgRating} · {unit.reviews.length} {t("units.reviews")}
                </h2>
                <div className="space-y-4">
                  {unit.reviews.slice(0, 5).map((review) => (
                    <div
                      key={review.id}
                      className="bg-white rounded-xl p-4 border border-slate-100"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center text-navy font-semibold text-sm">
                          {review.user?.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            {review.user?.name || "Anonymous"}
                          </p>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      {review.comment && (
                        <p className="text-sm text-slate-500">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Landlord info */}
            {unit.owner && (
              <div className="bg-white rounded-2xl p-5 border border-slate-100">
                <h2 className="text-base font-semibold text-navy mb-3">
                  {t("units.landlord")}
                </h2>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-lg overflow-hidden">
                    {unit.owner.picture ? (
                      <img
                        src={unit.owner.picture}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      unit.owner.name?.[0]?.toUpperCase()
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {unit.owner.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {t("units.landlordSince")}{" "}
                      {new Date(unit.owner.createdAt).getFullYear()}
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs bg-green-50 text-green-700 rounded-lg px-3 py-2 w-fit">
                  <Shield className="h-3.5 w-3.5" />
                  {t("units.bestayVerified")}
                </div>
              </div>
            )}

            {/* Reviews Section */}
            <ReviewList unitId={unit.id} />
          </div>

          {/* Right: booking sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm sticky top-24">
              <div className="mb-4">
                <span className="text-3xl font-bold text-navy">
                  ${unit.price}
                </span>
                <span className="text-slate-400 text-sm ml-1">
                  /{t("units.month")}
                </span>
              </div>
              {avgRating && (
                <div className="flex items-center gap-1 text-sm text-slate-500 mb-5">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <strong className="text-slate-700">{avgRating}</strong>
                  <span>
                    · {unit.reviews.length} {t("units.reviews")}
                  </span>
                </div>
              )}
              <Button
                onClick={handleScheduleVisit}
                className="w-full h-12 bg-orange hover:bg-orange-hover text-white font-semibold rounded-xl text-base"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {t("units.scheduleVisit")}
              </Button>
              <p className="text-xs text-center text-slate-400 mt-3">
                {t("units.noChargeYet")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
