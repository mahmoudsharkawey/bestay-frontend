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
 * Remove empty strings, undefined, and empty arrays from the data
 * so we only send actually changed values to the backend on edit.
 */
function cleanPayload(data) {
  return Object.fromEntries(
    Object.entries(data).filter(([, v]) => {
      if (v === "" || v === null || v === undefined) return false;
      if (Array.isArray(v) && v.length === 0) return false;
      return true;
    }),
  );
}

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
    mutationFn: (data) => {
      const payload = mode === "edit" ? cleanPayload(data) : data;
      return mode === "edit"
        ? unitsService.updateUnit(unit.id, payload)
        : unitsService.createUnit(payload);
    },
    onSuccess: () => {
      toast.success(
        mode === "edit" ? t("units.updateSuccess") : t("units.createSuccess"),
      );
      queryClient.invalidateQueries({ queryKey: ["my-units"] });
      queryClient.invalidateQueries({ queryKey: ["unit", unit?.id] });
      navigate("/units/my");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || t("common.error"));
    },
  });

  const nextStep = async () => {
    const stepFields = {
      1: ["title", "description", "city", "address", "university", "price"],
      2: ["roomType", "genderType"],
      3: [],
    };
    const valid = await form.trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Explicit submit — called only from the final step's button click
  // NOT from a form submit event, so no accidental triggers are possible
  const submitForm = () => form.handleSubmit((data) => mutate(data))();

  return {
    form,
    step,
    totalSteps: TOTAL_STEPS,
    nextStep,
    prevStep,
    submitForm,
    isPending,
    mode,
  };
}
