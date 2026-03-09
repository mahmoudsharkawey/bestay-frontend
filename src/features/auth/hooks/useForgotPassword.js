import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { forgotPasswordSchema } from "@/features/auth/schemas/forgot-password.schema";
import { authService } from "@/features/auth/services/auth.api";

export function useForgotPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const { mutate: sendCode, isPending } = useMutation({
    mutationFn: (data) => authService.forgotPassword(data.email),
    onSuccess: () => {
      toast.success(t("auth.resetCodeSent"));
      navigate("/verify-reset-code", {
        state: { email: form.getValues("email") },
      });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || t("common.error"));
    },
  });

  return { form, sendCode, isPending, t };
}
