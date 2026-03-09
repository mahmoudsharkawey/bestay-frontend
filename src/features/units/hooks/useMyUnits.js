import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { unitsService } from "@/features/units/services/units.api";

/**
 * Hook for landlord's unit management (list + delete).
 */
export function useMyUnits() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["my-units"],
    queryFn: () => unitsService.getMyUnits(),
  });

  const { mutate: deleteUnit, isPending: isDeleting } = useMutation({
    mutationFn: (id) => unitsService.deleteUnit(id),
    onSuccess: () => {
      toast.success(t("units.deleteSuccess"));
      queryClient.invalidateQueries({ queryKey: ["my-units"] });
      setDeleteId(null);
    },
    onError: (err) => {
      const msg = err?.response?.data?.message || "";
      if (msg.toLowerCase().includes("active bookings or visits")) {
        toast.error(t("units.cannotDeleteActive"));
      } else {
        toast.error(msg || t("common.error"));
      }
    },
  });

  const confirmDelete = (id) => setDeleteId(id);
  const cancelDelete = () => setDeleteId(null);
  const handleDelete = () => deleteId && deleteUnit(deleteId);

  return {
    units: data?.data || [],
    isLoading,
    isError,
    isDeleting,
    deleteId,
    confirmDelete,
    cancelDelete,
    handleDelete,
  };
}
