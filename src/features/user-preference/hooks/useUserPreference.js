import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { userPreferenceService } from "@/features/user-preference/services/userPreference.api";
import { userPreferenceSchema } from "@/features/user-preference/schemas/userPreference.schema";
import { DEFAULT_PREFERENCE_VALUES } from "@/features/user-preference/constants";

const QUERY_KEY = ["user-preference"];

/**
 * Hook for managing user preferences (CRUD + form).
 */
export function useUserPreference() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // ── Fetch current preference ────────────────────────────────
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => userPreferenceService.getMyPreference(),
  });

  const preference = data?.data ?? null;

  // ── Form ────────────────────────────────────────────────────
  const form = useForm({
    resolver: zodResolver(userPreferenceSchema),
    defaultValues: DEFAULT_PREFERENCE_VALUES,
    values: preference
      ? {
          unitType: preference.unitType || "",
          minBudget: preference.minBudget ?? "",
          maxBudget: preference.maxBudget ?? "",
          city: preference.city || "",
          university: preference.university || "",
          maxDistance: preference.maxDistance ?? "",
          rooms: preference.rooms ?? "",
          furnished: preference.furnished ?? false,
          genderType: preference.genderType || "",
          facilities: preference.facilities || [],
        }
      : undefined,
  });

  // ── Create / Upsert ────────────────────────────────────────
  const createOrUpdateMutation = useMutation({
    mutationFn: (formData) => userPreferenceService.createOrUpdate(formData),
    onSuccess: () => {
      toast.success(t("preferences.saveSuccess"));
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["matching-units"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || t("common.error"));
    },
  });

  // ── Partial Update ─────────────────────────────────────────
  const updateMutation = useMutation({
    mutationFn: (formData) => userPreferenceService.update(formData),
    onSuccess: () => {
      toast.success(t("preferences.updateSuccess"));
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["matching-units"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || t("common.error"));
    },
  });

  // ── Delete ─────────────────────────────────────────────────
  const deleteMutation = useMutation({
    mutationFn: () => userPreferenceService.delete(),
    onSuccess: () => {
      toast.success(t("preferences.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["matching-units"] });
      form.reset(DEFAULT_PREFERENCE_VALUES);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || t("common.error"));
    },
  });

  // ── Public API ─────────────────────────────────────────────
  const createOrUpdate = () =>
    form.handleSubmit((data) => createOrUpdateMutation.mutate(data))();

  const updatePreference = () =>
    form.handleSubmit((data) => updateMutation.mutate(data))();

  const deletePreference = () => deleteMutation.mutate();

  return {
    preference,
    form,
    isLoading,
    isError,
    error,
    createOrUpdate,
    updatePreference,
    deletePreference,
    isPending:
      createOrUpdateMutation.isPending ||
      updateMutation.isPending ||
      deleteMutation.isPending,
  };
}
