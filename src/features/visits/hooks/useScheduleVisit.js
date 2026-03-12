import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { visitsService } from "@/features/visits/services/visits.api";

/**
 * Hook for the "Schedule a Visit" page.
 * USER selects a date and submits; on success navigate to /visits.
 */
export function useScheduleVisit(unitId) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [proposedDate, setProposedDate] = useState("");
  const [proposedTime, setProposedTime] = useState("");

  const { mutate: submitVisit, isPending: isSubmitting } = useMutation({
    mutationFn: () =>
      visitsService.scheduleVisit(unitId, {
        // combine date "YYYY-MM-DD" and time "HH:mm"
        proposedDate: new Date(`${proposedDate}T${proposedTime}:00`).toISOString(),
      }),
    onSuccess: () => {
      toast.success(t("visits.scheduleSuccess"));
      queryClient.invalidateQueries({ queryKey: ["my-visits"] });
      navigate("/visits");
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || t("common.error");
      toast.error(msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proposedDate) {
      toast.error(t("visits.dateRequired"));
      return;
    }
    if (!proposedTime) {
      toast.error(t("visits.timeRequired"));
      return;
    }
    // Must be a future date
    if (new Date(`${proposedDate}T${proposedTime}:00`) <= new Date()) {
      toast.error(t("visits.dateMustBeFuture"));
      return;
    }
    submitVisit();
  };

  return {
    proposedDate,
    setProposedDate,
    proposedTime,
    setProposedTime,
    handleSubmit,
    isSubmitting,
  };
}
