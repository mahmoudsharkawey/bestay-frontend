import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useState } from "react";

import { resetPasswordSchema } from "@/features/auth/schemas/reset-password.schema";
import { authService } from "@/features/auth/services/auth.api";

export function useResetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email, newPassword: "" },
  });

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: authService.resetPassword,
    onSuccess: () => {
      toast.success(t("auth.passwordResetSuccess"));
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || t("common.error"));
    },
  });

  return {
    form,
    resetPassword,
    isPending,
    showPassword,
    setShowPassword,
    email,
    t,
  };
}
