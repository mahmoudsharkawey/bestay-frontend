import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useUserPreference } from "@/features/user-preference/hooks/useUserPreference";
import { useMatchingUnits } from "@/features/user-preference/hooks/useMatchingUnits";
import UserPreferenceForm from "@/features/user-preference/components/UserPreferenceForm";
import PreferenceCard from "@/features/user-preference/components/PreferenceCard";
import MatchingUnitsList from "@/features/user-preference/components/MatchingUnitsList";
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

  const { units: matchingUnits, isLoading: matchingLoading } = useMatchingUnits(
    { enabled: !!preference },
  );

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

        {/* Matching Units */}
        {preference && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-orange" />
              <h2 className="text-xl font-semibold text-navy">
                {t("preferences.matchingUnits")}
              </h2>
            </div>
            <MatchingUnitsList
              units={matchingUnits}
              isLoading={matchingLoading}
            />
          </section>
        )}
      </div>
    </div>
  );
}
