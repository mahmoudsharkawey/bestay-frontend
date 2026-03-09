import { useTranslation } from "react-i18next";
import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  ROOM_TYPES,
  GENDER_TYPES,
  FACILITIES,
} from "@/features/units/constants";

export default function UnitFilters({ filters, onFilterChange, onReset }) {
  const { t } = useTranslation();

  const toggleFacility = (fac) => {
    const current = filters.facilities
      ? filters.facilities.split(",").filter(Boolean)
      : [];
    const updated = current.includes(fac)
      ? current.filter((f) => f !== fac)
      : [...current, fac];
    onFilterChange({ facilities: updated.join(",") });
  };

  const activeFacilities = filters.facilities
    ? filters.facilities.split(",").filter(Boolean)
    : [];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 space-y-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-navy">
          <SlidersHorizontal className="h-4 w-4 text-orange" />
          {t("units.filters")}
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-orange flex items-center gap-1 transition-colors"
        >
          <X className="h-3 w-3" />
          {t("units.resetFilters")}
        </button>
      </div>

      {/* City */}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
          {t("units.city")}
        </label>
        <Input
          placeholder={t("units.cityPlaceholder")}
          value={filters.city}
          onChange={(e) => onFilterChange({ city: e.target.value })}
          className="h-9 text-sm rounded-lg border-slate-200"
        />
      </div>

      {/* University */}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
          {t("units.university")}
        </label>
        <Input
          placeholder={t("units.universityPlaceholder")}
          value={filters.university}
          onChange={(e) => onFilterChange({ university: e.target.value })}
          className="h-9 text-sm rounded-lg border-slate-200"
        />
      </div>

      {/* Price Range */}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
          {t("units.priceRange")}
        </label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder={t("units.min")}
            value={filters.minPrice}
            onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            className="h-9 text-sm rounded-lg border-slate-200"
          />
          <Input
            type="number"
            placeholder={t("units.max")}
            value={filters.maxPrice}
            onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            className="h-9 text-sm rounded-lg border-slate-200"
          />
        </div>
      </div>

      {/* Room Type */}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
          {t("units.roomType")}
        </label>
        <div className="flex flex-wrap gap-2">
          {ROOM_TYPES.map((type) => (
            <button
              key={type}
              onClick={() =>
                onFilterChange({
                  roomType: filters.roomType === type ? "" : type,
                })
              }
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                filters.roomType === type
                  ? "bg-navy text-white border-navy"
                  : "bg-white text-slate-600 border-slate-200 hover:border-navy"
              }`}
            >
              {t(`units.roomTypes.${type}`, type)}
            </button>
          ))}
        </div>
      </div>

      {/* Gender Type */}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
          {t("units.genderType")}
        </label>
        <div className="flex flex-wrap gap-2">
          {GENDER_TYPES.map((type) => (
            <button
              key={type}
              onClick={() =>
                onFilterChange({
                  genderType: filters.genderType === type ? "" : type,
                })
              }
              className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
                filters.genderType === type
                  ? "bg-orange text-white border-orange"
                  : "bg-white text-slate-600 border-slate-200 hover:border-orange"
              }`}
            >
              {t(`units.genderTypes.${type}`, type)}
            </button>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1.5 block">
          {t("units.facilities")}
        </label>
        <div className="flex flex-wrap gap-2">
          {FACILITIES.map((fac) => (
            <button
              key={fac}
              onClick={() => toggleFacility(fac)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                activeFacilities.includes(fac)
                  ? "bg-orange/10 text-orange border-orange"
                  : "bg-white text-slate-500 border-slate-200 hover:border-orange"
              }`}
            >
              {fac}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
