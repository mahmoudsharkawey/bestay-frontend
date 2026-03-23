import { useTranslation } from "react-i18next";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  PREFERENCE_UNIT_TYPES,
  PREFERENCE_GENDER_TYPES,
  PREFERENCE_FACILITIES,
} from "@/features/user-preference/constants";

/**
 * Pure presentational form for user preferences.
 * @param {{ form: object, onSubmit: () => void, isPending: boolean, isEdit: boolean }} props
 */
export default function UserPreferenceForm({
  form,
  onSubmit,
  isPending,
  isEdit = false,
}) {
  const { t } = useTranslation();

  return (
    <Form {...form}>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
        {/* Row 1: Unit Type & Gender Type */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Unit Type — button group */}
          <FormField
            control={form.control}
            name="unitType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("preferences.unitType")}</FormLabel>
                <FormControl>
                  <div className="grid grid-cols-3 gap-3">
                    {PREFERENCE_UNIT_TYPES.map((type) => (
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
                        {t(`units.unitTypes.${type}`, type)}
                      </button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Type — color-coded button group */}
          <FormField
            control={form.control}
            name="genderType"
            render={({ field }) => {
              const colors = {
                MALE_ONLY: "border-blue-500 bg-blue-500 text-white",
                FEMALE_ONLY: "border-pink-500 bg-pink-500 text-white",
              };
              const hoverColors = {
                MALE_ONLY: "hover:border-blue-300",
                FEMALE_ONLY: "hover:border-pink-300",
              };
              return (
                <FormItem>
                  <FormLabel>{t("preferences.genderType")}</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3">
                      {PREFERENCE_GENDER_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => field.onChange(type)}
                          className={`py-3 px-4 rounded-xl border-2 text-sm font-semibold transition-all ${
                            field.value === type
                              ? colors[type]
                              : `border-slate-200 text-slate-600 ${hoverColors[type]}`
                          }`}
                        >
                          {t(`units.genderTypes.${type}`, type)}
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {/* Row 2: Budget Range */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="minBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("preferences.minBudget")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxBudget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("preferences.maxBudget")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="5000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 3: City & University */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("preferences.city")} *</FormLabel>
                <FormControl>
                  <Input placeholder={t("preferences.cityPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("preferences.university")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("preferences.universityPlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Row 4: Rooms & Max Distance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("preferences.rooms")}</FormLabel>
                <FormControl>
                  <Input type="number" min="1" placeholder="1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="maxDistance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("preferences.maxDistance")}</FormLabel>
                <FormControl>
                  <Input type="number" placeholder={t("preferences.distancePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Furnished Checkbox */}
        <FormField
          control={form.control}
          name="furnished"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 space-y-0 cursor-pointer hover:bg-slate-50 transition-colors">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="h-5 w-5 rounded border-slate-300 data-[state=checked]:bg-orange data-[state=checked]:border-orange"
                />
              </FormControl>
              <div className="space-y-0.5">
                <FormLabel className="text-base font-medium cursor-pointer">
                  {t("preferences.furnished")}
                </FormLabel>
                <p className="text-sm text-slate-500">
                  {t("preferences.furnishedHint")}
                </p>
              </div>
            </FormItem>
          )}
        />

        {/* Facilities Checkboxes */}
        <FormField
          control={form.control}
          name="facilities"
          render={() => (
            <FormItem>
              <FormLabel className="text-base font-medium">
                {t("preferences.facilities")}
              </FormLabel>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2">
                {PREFERENCE_FACILITIES.map((facility) => (
                  <FormField
                    key={facility}
                    control={form.control}
                    name="facilities"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(facility)}
                            onCheckedChange={(checked) => {
                              const current = field.value || [];
                              field.onChange(
                                checked
                                  ? [...current, facility]
                                  : current.filter((f) => f !== facility),
                              );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal cursor-pointer">
                          {t(`units.facilityLabels.${facility}`, facility.replace(/_/g, " "))}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending}
          className="w-full sm:w-auto bg-orange hover:bg-orange-hover text-white font-semibold rounded-lg h-11 px-8"
        >
          {isPending && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
          {isEdit
            ? t("preferences.update")
            : t("preferences.save")}
        </Button>
      </form>
    </Form>
  );
}
