import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useUserPreference } from "@/features/user-preference/hooks/useUserPreference";
import UserPreferenceForm from "@/features/user-preference/components/UserPreferenceForm";
import PreferenceCard from "@/features/user-preference/components/PreferenceCard";
import { Loader2, SlidersHorizontal, Sparkles } from "lucide-react";

export default function UserPreferencePage() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  const {
    preference,
    form,
    isLoading,
    createOrUpdate,
    deletePreference,
    isPending,
  } = useUserPreference();

  const showForm = !preference || isEditing;

  const handleSubmit = () => {
    createOrUpdate();
    setIsEditing(false);
  };

  const handleDelete = () => {
    deletePreference();
    setIsEditing(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-orange" />
      </div>
    );
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-navy text-white py-10 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <SlidersHorizontal className="h-8 w-8 mx-auto mb-3 text-orange" />
          <h1 className="text-3xl font-bold mb-2">{t("preferences.title")}</h1>
          <p className="text-white/70">{t("preferences.subtitle")}</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        {/* Loading state */}
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        ) : (
          <>
            {/* Preference Card (read-only) */}
            {preference && !isEditing && (
              <PreferenceCard
                preference={preference}
                onEdit={() => setIsEditing(true)}
                onDelete={handleDelete}
                isDeleting={isPending}
              />
            )}

            {/* Preference Form */}
            {showForm && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-navy mb-6">
                  {preference
                    ? t("preferences.editTitle")
                    : t("preferences.createTitle")}
                </h2>
                <UserPreferenceForm
                  form={form}
                  onSubmit={handleSubmit}
                  isPending={isPending}
                  isEdit={!!preference}
                />
              </div>
            )}
          </>
        )}

        {/* AI Recommendations CTA */}
        {preference && (
          <section className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-200/60 p-6 text-center">
            <Sparkles className="h-8 w-8 mx-auto mb-3 text-orange" />
            <h2 className="text-xl font-semibold text-navy mb-2">
              {t("preferences.matchingUnits")}
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              {t("recommendations.subtitle")}
            </p>
            <a
              href="/recommendations"
              className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-medium px-6 py-2.5 rounded-full transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              {t("preferences.viewRecommendations")}
            </a>
          </section>
        )}
      </div>
    </div>
  );
}
