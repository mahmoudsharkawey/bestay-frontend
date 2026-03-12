import { useTranslation } from "react-i18next";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { MapPin } from "lucide-react";
import LeafletMap from "@/shared/components/LeafletMap";

export default function UnitStepBasicInfo({ form }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-5">
      {/* Title */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("units.form.title")}</FormLabel>
            <FormControl>
              <Input
                placeholder={t("units.form.titlePlaceholder")}
                {...field}
                className="h-11 rounded-lg border-slate-200"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("units.form.description")}</FormLabel>
            <FormControl>
              <Textarea
                placeholder={t("units.form.descriptionPlaceholder")}
                rows={4}
                {...field}
                className="rounded-lg border-slate-200 resize-none"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* City + Address */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("units.form.city")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("units.form.cityPlaceholder")}
                  {...field}
                  className="h-11 rounded-lg border-slate-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("units.form.address")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("units.form.addressPlaceholder")}
                  {...field}
                  className="h-11 rounded-lg border-slate-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* University + Distance */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="university"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("units.form.university")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("units.form.universityPlaceholder")}
                  {...field}
                  className="h-11 rounded-lg border-slate-200"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("units.form.distance")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="0.8"
                    {...field}
                    className="h-11 rounded-lg border-slate-200 pr-12"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    km
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Price + Rooms */}
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("units.form.price")}</FormLabel>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">
                    $
                  </span>
                  <Input
                    type="number"
                    placeholder="1200"
                    {...field}
                    className="h-11 pl-8 rounded-lg border-slate-200"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rooms"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("units.form.rooms")}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min="1"
                  placeholder="1"
                  {...field}
                  className="h-11 rounded-lg border-slate-200"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Latitude + Longitude */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100 mb-6">
        {/* Map Selection */}
        <div className="col-span-1 md:col-span-2 space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <FormLabel className="text-slate-700 font-semibold text-base">
              {t("units.form.selectOnMap")}
            </FormLabel>
            <span className="text-xs text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
              {t("units.form.mapHint")}
            </span>
          </div>
          <LeafletMap
            mode="select"
            searchPlaceholder={t("units.form.searchAddress")}
            className="h-[400px] w-full rounded-2xl overflow-hidden border-2 border-white shadow-xl ring-1 ring-slate-100"
            initialPosition={{
              lat: parseFloat(form.watch("latitude")),
              lng: parseFloat(form.watch("longitude")),
            }}
            onChange={(pos) => {
              form.setValue("latitude", pos.lat.toFixed(6));
              form.setValue("longitude", pos.lng.toFixed(6));
            }}
          />
        </div>
      </div>
    </div>
  );
}
