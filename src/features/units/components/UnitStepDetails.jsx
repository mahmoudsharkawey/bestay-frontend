import { useTranslation } from "react-i18next";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { ROOM_TYPES, GENDER_TYPES } from "@/features/units/constants";

export default function UnitStepDetails({ form }) {
  const { t } = useTranslation();
  const furnished = form.watch("furnished");

  return (
    <div className="space-y-6">
      {/* Room Type */}
      <FormField
        control={form.control}
        name="roomType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("units.form.roomType")}</FormLabel>
            <FormControl>
              <div className="grid grid-cols-3 gap-3">
                {ROOM_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => field.onChange(type)}
                    className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                      field.value === type
                        ? "border-navy bg-navy text-white"
                        : "border-slate-200 text-slate-600 hover:border-navy/50"
                    }`}
                  >
                    {t(`units.roomTypes.${type}`, type)}
                  </button>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Gender Type */}
      <FormField
        control={form.control}
        name="genderType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("units.form.genderType")}</FormLabel>
            <FormControl>
              <div className="grid grid-cols-2 gap-3">
                {GENDER_TYPES.map((type) => {
                  const colors = {
                    MALE_ONLY: "border-blue-500 bg-blue-500 text-white",
                    FEMALE_ONLY: "border-pink-500 bg-pink-500 text-white",
                  };
                  const hoverColors = {
                    MALE_ONLY: "hover:border-blue-300",
                    FEMALE_ONLY: "hover:border-pink-300",
                  };
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => field.onChange(type)}
                      className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                        field.value === type
                          ? colors[type] || "border-navy bg-navy text-white"
                          : `border-slate-200 text-slate-600 ${hoverColors[type] || ""}`
                      }`}
                    >
                      {t(`units.genderTypes.${type}`, type)}
                    </button>
                  );
                })}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Furnished toggle */}
      <FormField
        control={form.control}
        name="furnished"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("units.form.furnished")}</FormLabel>
            <FormControl>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => field.onChange(true)}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    field.value
                      ? "border-green-500 bg-green-500 text-white"
                      : "border-slate-200 text-slate-600 hover:border-green-300"
                  }`}
                >
                  ✓ {t("units.form.yes")}
                </button>
                <button
                  type="button"
                  onClick={() => field.onChange(false)}
                  className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                    !field.value
                      ? "border-slate-500 bg-slate-500 text-white"
                      : "border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  ✗ {t("units.form.no")}
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
