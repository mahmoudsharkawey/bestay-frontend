import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { unitsService } from "@/features/units/services/units.api";
import {
  unitSchema,
  unitEditSchema,
} from "@/features/units/schemas/unit.schema";

const TOTAL_STEPS = 3;

/**
 * Hook for the multi-step create/edit unit form.
 * @param {{ mode: 'create'|'edit', unit?: object }} options
 */
export function useCreateEditUnit({ mode = "create", unit = null } = {}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1);

  const form = useForm({
    resolver: zodResolver(mode === "edit" ? unitEditSchema : unitSchema),
    defaultValues: unit
      ? {
          title: unit.title || "",
          description: unit.description || "",
          city: unit.city || "",
          address: unit.address || "",
          university: unit.university || "",
          price: unit.price || "",
          rooms: unit.rooms || "",
          distance: unit.distance || "",
          latitude: unit.latitude || "",
          longitude: unit.longitude || "",
          furnished: unit.furnished ?? false,
          roomType: unit.roomType || "",
          genderType: unit.genderType || "",
          facilities: unit.facilities || [],
          images: unit.images || [],
        }
      : {
          title: "",
          description: "",
          city: "",
          address: "",
          university: "",
          price: "",
          rooms: "",
          distance: "",
          latitude: "",
          longitude: "",
          furnished: false,
          roomType: "",
          genderType: "",
          facilities: [],
          images: [],
        },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data) =>
      mode === "edit"
        ? unitsService.updateUnit(unit.id, data)
        : unitsService.createUnit(data),
    onSuccess: () => {
      toast.success(
        mode === "edit" ? t("units.updateSuccess") : t("units.createSuccess"),
      );
      queryClient.invalidateQueries({ queryKey: ["my-units"] });
      navigate("/units/my");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || t("common.error"));
    },
  });

  const nextStep = async () => {
    // Validate only relevant fields per step
    const stepFields = {
      1: ["title", "description", "city", "address", "university", "price"],
      2: ["roomType", "genderType"],
      3: [],
    };
    const valid = await form.trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = form.handleSubmit((data) => mutate(data));

  return {
    form,
    step,
    totalSteps: TOTAL_STEPS,
    nextStep,
    prevStep,
    onSubmit,
    isPending,
    mode,
  };
}
