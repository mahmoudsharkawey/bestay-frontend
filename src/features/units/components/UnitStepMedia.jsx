import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";
import { Upload, X, Check } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/shared/lib/axios";
import { FACILITIES } from "@/features/units/constants";

export default function UnitStepMedia({ form }) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);
  const images = form.watch("images") || [];
  const facilities = form.watch("facilities") || [];

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    try {
      const formData = new FormData();
      files.forEach((f) => formData.append("files", f));
      formData.append("context", "unit_images");
      const res = await apiClient.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const newUrls = res.data?.data?.urls || [];
      form.setValue("images", [...images, ...newUrls]);
      toast.success(t("units.form.uploadSuccess"));
    } catch {
      toast.error(t("units.form.uploadError"));
    }
  };

  const removeImage = (url) => {
    form.setValue(
      "images",
      images.filter((img) => img !== url),
    );
  };

  const toggleFacility = (fac) => {
    const updated = facilities.includes(fac)
      ? facilities.filter((f) => f !== fac)
      : [...facilities, fac];
    form.setValue("facilities", updated);
  };

  return (
    <div className="space-y-6">
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {t("units.form.images")}
        </label>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center cursor-pointer hover:border-orange hover:bg-orange/5 transition-all"
        >
          <Upload className="h-8 w-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">{t("units.form.uploadHint")}</p>
          <p className="text-xs text-slate-400 mt-1">
            {t("units.form.uploadMax")}
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
        {/* Uploaded images preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {images.map((url, i) => (
              <div
                key={i}
                className="relative group rounded-xl overflow-hidden h-24"
              >
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(url)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Facilities */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {t("units.form.facilities")}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {FACILITIES.map((fac) => (
            <button
              key={fac}
              type="button"
              onClick={() => toggleFacility(fac)}
              className={`flex items-center gap-2 py-2.5 px-3 rounded-xl border text-sm transition-all ${
                facilities.includes(fac)
                  ? "border-orange bg-orange/10 text-orange"
                  : "border-slate-200 text-slate-600 hover:border-orange/50"
              }`}
            >
              {facilities.includes(fac) && (
                <Check className="h-3.5 w-3.5 shrink-0" />
              )}
              {fac}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
