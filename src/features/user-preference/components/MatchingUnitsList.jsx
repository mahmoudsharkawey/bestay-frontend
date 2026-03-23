import { useTranslation } from "react-i18next";
import UnitCard from "@/features/units/components/UnitCard";
import UnitCardSkeleton from "@/features/units/components/UnitCardSkeleton";
import { Search } from "lucide-react";

/**
 * Displays a grid of matching/recommended units.
 * @param {{ units: object[], isLoading: boolean }} props
 */
export default function MatchingUnitsList({ units, isLoading }) {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <UnitCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!units || units.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400">
        <Search className="h-12 w-12 mx-auto mb-3 opacity-30" />
        <p className="text-lg font-medium">
          {t("preferences.noMatches")}
        </p>
        <p className="text-sm mt-1">
          {t("preferences.noMatchesHint")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {units.map((unit) => (
        <UnitCard key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
