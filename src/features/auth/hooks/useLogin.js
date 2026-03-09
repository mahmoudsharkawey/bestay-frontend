import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useState } from "react";

import { loginSchema } from "@/features/auth/schemas/login.schema";
import { authService } from "@/features/auth/services/auth.api";
import { useAuthStore } from "@/shared/stores/auth.store";

export function useLogin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (res) => {
      login(res.data.user, res.data.token);
      toast.success(t("auth.welcomeBack") + "!");
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || t("auth.loginFailed"));
    },
  });

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await authService.googleLogin(credentialResponse.credential);
      login(res.data.user, res.data.accessToken);
      toast.success(t("auth.welcomeBack") + "!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || t("auth.loginFailed"));
    }
  };

  return {
    form,
    signIn,
    isPending,
    showPassword,
    setShowPassword,
    handleGoogleSuccess,
    t,
  };
}
