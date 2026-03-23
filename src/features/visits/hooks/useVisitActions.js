import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { visitsService } from "@/features/visits/services/visits.api";

/**
 * Hook providing all visit lifecycle action mutations.
 * Used in MyVisitsPage for both USER and LANDLORD roles.
 */
export function useVisitActions() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // State for the reschedule flow (landlord proposes new date)
  const [rescheduleVisitId, setRescheduleVisitId] = useState(null);
  const [rescheduleDate, setRescheduleDate] = useState("");

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: ["my-visits"] });

  // ─── LANDLORD actions ────────────────────────────────────────────────────

  const { mutate: approve, isPending: isApproving } = useMutation({
    mutationFn: (visitId) => visitsService.approveVisit(visitId),
    onSuccess: () => {
      toast.success(t("visits.approveSuccess"));
      invalidate();
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || t("common.error")),
  });

  const { mutate: reject, isPending: isRejecting } = useMutation({
    mutationFn: (visitId) => visitsService.rejectVisit(visitId),
    onSuccess: () => {
      toast.success(t("visits.rejectSuccess"));
      invalidate();
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || t("common.error")),
  });

  const { mutate: reschedule, isPending: isRescheduling } = useMutation({
    mutationFn: ({ visitId, newDate }) =>
      visitsService.rescheduleVisit(visitId, { newDate }),
    onSuccess: () => {
      toast.success(t("visits.rescheduleSuccess"));
      setRescheduleVisitId(null);
      setRescheduleDate("");
      invalidate();
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || t("common.error")),
  });

  const handleRescheduleSubmit = (visitId) => {
    if (!rescheduleDate) {
      toast.error(t("visits.dateRequired"));
      return;
    }

    // Convert the selected YYYY-MM-DD date to a proper ISO string
    const isoDate = new Date(rescheduleDate).toISOString();
    if (new Date(isoDate) <= new Date()) {
      toast.error(t("visits.dateMustBeFuture"));
      return;
    }
    reschedule({ visitId, newDate: isoDate });
  };

  const { mutate: confirm, isPending: isConfirming } = useMutation({
    mutationFn: ({ visitId, data }) => visitsService.confirmVisit(visitId, data),
    onSuccess: () => {
      toast.success(t("visits.confirmSuccess"));
      invalidate();
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || t("common.error")),
  });

  // ─── USER actions ────────────────────────────────────────────────────────

  const { mutate: cancel, isPending: isCancelling } = useMutation({
    mutationFn: (visitId) => visitsService.cancelVisit(visitId),
    onSuccess: () => {
      toast.success(t("visits.cancelSuccess"));
      invalidate();
    },
    onError: (err) =>
      toast.error(err?.response?.data?.message || t("common.error")),
  });

  const { mutate: acceptReschedule, isPending: isAcceptingReschedule } =
    useMutation({
      mutationFn: (visitId) => visitsService.acceptReschedule(visitId),
      onSuccess: () => {
        toast.success(t("visits.acceptRescheduleSuccess"));
        invalidate();
      },
      onError: (err) =>
        toast.error(err?.response?.data?.message || t("common.error")),
    });

  const { mutate: rejectReschedule, isPending: isRejectingReschedule } =
    useMutation({
      mutationFn: (visitId) => visitsService.rejectReschedule(visitId),
      onSuccess: () => {
        toast.success(t("visits.rejectRescheduleSuccess"));
        invalidate();
      },
      onError: (err) =>
        toast.error(err?.response?.data?.message || t("common.error")),
    });

  return {
    // Landlord
    approve,
    isApproving,
    reject,
    isRejecting,
    reschedule,
    isRescheduling,
    rescheduleVisitId,
    setRescheduleVisitId,
    rescheduleDate,
    setRescheduleDate,
    handleRescheduleSubmit,
    confirm,
    isConfirming,
    // User
    cancel,
    isCancelling,
    acceptReschedule,
    isAcceptingReschedule,
    rejectReschedule,
    isRejectingReschedule,
  };
}
