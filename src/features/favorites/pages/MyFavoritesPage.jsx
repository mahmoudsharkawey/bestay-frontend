import { useTranslation } from "react-i18next";
import { Heart, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useMyFavorites } from "@/features/favorites/hooks/useFavorites";
import UnitCard from "@/features/units/components/UnitCard";

export default function MyFavoritesPage() {
  const { t } = useTranslation();
  const { favorites, isLoading, isError } = useMyFavorites();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="h-8 bg-slate-200 rounded w-48 mb-6 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-72 bg-slate-200 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <p className="text-red-500 font-medium">{t("common.error")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-navy flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500 fill-red-500" />
            {t("favorites.myFavorites")}
          </h1>
          <p className="text-slate-500 mt-1">{t("favorites.subtitle")}</p>
        </div>

        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 text-center px-4">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-red-300" />
            </div>
            <h2 className="text-lg font-semibold text-navy mb-2">
              {t("favorites.noFavorites")}
            </h2>
            <p className="text-sm text-slate-500 max-w-sm mb-6">
              {t("favorites.noFavoritesHint")}
            </p>
            <Link
              to="/units"
              className="inline-flex items-center justify-center h-11 px-6 bg-orange hover:bg-orange-hover text-white font-medium rounded-xl transition-colors"
            >
              <Search className="h-4 w-4 mr-2" />
              {t("favorites.browseProperties")}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((favorite) => (
              <UnitCard key={favorite.id} unit={favorite.unit} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
