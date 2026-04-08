import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Sparkles, BedDouble, Users } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { PREFERENCE_FACILITIES } from "@/features/user-preference/constants";

const ROOM_TYPES = ["SINGLE", "DOUBLE", "SHARED"];
const GENDER_TYPES = ["MALE_ONLY", "FEMALE_ONLY"];

const ROOM_TYPE_ICONS = {
  SINGLE: "🛏️",
  DOUBLE: "🛏️🛏️",
  SHARED: "👥",
};

const GENDER_COLORS = {
  MALE_ONLY: {
    active: "border-blue-500 bg-blue-500 text-white shadow-blue-200",
    hover: "hover:border-blue-300",
  },
  FEMALE_ONLY: {
    active: "border-pink-500 bg-pink-500 text-white shadow-pink-200",
    hover: "hover:border-pink-300",
  },
};

const pricingFormSchema = z.object({
  city: z.string().min(1, "City is required"),
  rooms: z.coerce.number().int().positive("Rooms must be > 0"),
  roomType: z.enum(ROOM_TYPES, { required_error: "Room type is required" }),
  genderType: z.enum(GENDER_TYPES, {
    required_error: "Gender type is required",
  }),
  furnished: z.boolean().optional(),
  facilities: z.array(z.string()).optional(),
  price: z.coerce.number().positive().optional().or(z.literal("")),
  university: z.string().optional(),
});

/**
 * Form for hypothetical pricing analysis (POST /pricing/suggest).
 * Uses button-group selectors (matching UserPreferenceForm patterns) instead of dropdowns.
 * @param {{ onSubmit: (data: object) => void, isLoading: boolean }} props
 */
export default function PricingExplorerForm({ onSubmit, isLoading }) {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(pricingFormSchema),
    defaultValues: {
      city: "",
      rooms: "",
      roomType: "",
      genderType: "",
      furnished: false,
      facilities: [],
      price: "",
      university: "",
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const selectedFacilities = watch("facilities") || [];
  const selectedRoomType = watch("roomType");
  const selectedGenderType = watch("genderType");
  const isFurnished = watch("furnished");

  const toggleFacility = (facility) => {
    const current = selectedFacilities;
    const updated = current.includes(facility)
      ? current.filter((f) => f !== facility)
      : [...current, facility];
    setValue("facilities", updated, { shouldValidate: true });
  };

  const processSubmit = (data) => {
    // Clean optional fields
    const cleaned = { ...data };
    if (!cleaned.price && cleaned.price !== 0) delete cleaned.price;
    if (!cleaned.university) delete cleaned.university;
    if (!cleaned.facilities?.length) delete cleaned.facilities;
    onSubmit(cleaned);
  };

  return (
    <form
      onSubmit={handleSubmit(processSubmit)}
      className="space-y-6"
      id="pricing-explorer-form"
    >
      {/* Room Type — Button Group */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5">
          <BedDouble className="h-4 w-4 text-slate-400" />
          {t("pricing.form.roomType")} <span className="text-red-400">*</span>
        </Label>
        <div className="grid grid-cols-3 gap-3">
          {ROOM_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() =>
                setValue("roomType", type, { shouldValidate: true })
              }
              className={`relative py-3.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                selectedRoomType === type
                  ? "border-navy bg-navy text-white shadow-lg shadow-navy/20 scale-[1.02]"
                  : "border-slate-200 text-slate-600 hover:border-navy/40 hover:bg-slate-50"
              }`}
            >
              <span className="block text-base mb-0.5">
                {ROOM_TYPE_ICONS[type]}
              </span>
              {t(`units.roomTypes.${type}`)}
            </button>
          ))}
        </div>
        {errors.roomType && (
          <p className="text-xs text-red-500 mt-1">{errors.roomType.message}</p>
        )}
      </div>

      {/* Gender Type — Color-Coded Button Group */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5">
          <Users className="h-4 w-4 text-slate-400" />
          {t("pricing.form.genderType")}{" "}
          <span className="text-red-400">*</span>
        </Label>
        <div className="grid grid-cols-2 gap-3">
          {GENDER_TYPES.map((type) => {
            const isActive = selectedGenderType === type;
            const colors = GENDER_COLORS[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setValue("genderType", type, { shouldValidate: true })
                }
                className={`py-3.5 px-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? `${colors.active} shadow-lg scale-[1.02]`
                    : `border-slate-200 text-slate-600 ${colors.hover} hover:bg-slate-50`
                }`}
              >
                <span className="block text-base mb-0.5">
                  {type === "MALE_ONLY" ? "♂" : "♀"}
                </span>
                {t(`units.genderTypes.${type}`)}
              </button>
            );
          })}
        </div>
        {errors.genderType && (
          <p className="text-xs text-red-500 mt-1">
            {errors.genderType.message}
          </p>
        )}
      </div>

      {/* Row: City + University */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pricing-city">
            {t("pricing.form.city")} <span className="text-red-400">*</span>
          </Label>
          <Input
            id="pricing-city"
            placeholder={t("preferences.cityPlaceholder")}
            className="h-11 rounded-xl"
            {...register("city")}
          />
          {errors.city && (
            <p className="text-xs text-red-500">{errors.city.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pricing-university">
            {t("pricing.form.university")}
          </Label>
          <Input
            id="pricing-university"
            placeholder={t("preferences.universityPlaceholder")}
            className="h-11 rounded-xl"
            {...register("university")}
          />
        </div>
      </div>

      {/* Row: Rooms + Price */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="pricing-rooms">
            {t("pricing.form.rooms")} <span className="text-red-400">*</span>
          </Label>
          <Input
            id="pricing-rooms"
            type="number"
            min="1"
            placeholder="2"
            className="h-11 rounded-xl"
            {...register("rooms")}
          />
          {errors.rooms && (
            <p className="text-xs text-red-500">{errors.rooms.message}</p>
          )}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="pricing-price">{t("pricing.form.price")}</Label>
          <Input
            id="pricing-price"
            type="number"
            min="0"
            placeholder={t("pricing.form.pricePlaceholder")}
            className="h-11 rounded-xl"
            {...register("price")}
          />
        </div>
      </div>

      {/* Furnished — Enhanced Checkbox Card */}
      <label
        htmlFor="pricing-furnished"
        className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-all duration-200 ${
          isFurnished
            ? "border-orange bg-orange/5 shadow-sm"
            : "border-slate-200 hover:border-orange/40 hover:bg-slate-50"
        }`}
      >
        <Checkbox
          id="pricing-furnished"
          checked={isFurnished}
          onCheckedChange={(v) => setValue("furnished", !!v)}
          className="h-5 w-5 rounded border-slate-300 data-[state=checked]:bg-orange data-[state=checked]:border-orange"
        />
        <div className="space-y-0.5">
          <span className="text-sm font-medium">
            {t("pricing.form.furnished")}
          </span>
          <p className="text-xs text-slate-500">
            {t("preferences.furnishedHint")}
          </p>
        </div>
      </label>

      {/* Facilities — Pill Buttons */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">
          {t("pricing.form.facilities")}
        </Label>
        <div className="flex flex-wrap gap-2">
          {PREFERENCE_FACILITIES.map((facility) => {
            const isSelected = selectedFacilities.includes(facility);
            return (
              <button
                key={facility}
                type="button"
                onClick={() => toggleFacility(facility)}
                className={`text-xs px-3.5 py-2 rounded-full border transition-all duration-200 font-medium ${
                  isSelected
                    ? "bg-orange text-white border-orange shadow-sm shadow-orange/20"
                    : "bg-white text-slate-600 border-slate-200 hover:border-orange/50 hover:text-orange"
                }`}
              >
                {t(`units.facilityLabels.${facility}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-orange hover:bg-orange/90 text-white rounded-xl h-12 gap-2 text-sm font-semibold shadow-lg shadow-orange/20 transition-all hover:shadow-xl hover:shadow-orange/30"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="h-4 w-4" />
        )}
        {isLoading
          ? t("pricing.form.analyzing")
          : t("pricing.form.analyzePrice")}
      </Button>
    </form>
  );
}
