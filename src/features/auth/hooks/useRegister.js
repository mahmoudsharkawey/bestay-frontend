import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { useState } from "react";

import { registerSchema } from "@/features/auth/schemas/register.schema";
import { authService } from "@/features/auth/services/auth.api";
import { useAuthStore } from "@/shared/stores/auth.store";

export function useRegister() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      role: "USER",
    },
  });

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: authService.signUp,
    onSuccess: (res) => {
      login(res.data.user, res.data.token);
      toast.success(t("auth.accountCreated"));
      navigate("/");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || t("auth.registrationFailed"));
    },
  });

  const handleNextStep = async () => {
    const valid = await form.trigger(["name", "email", "password", "phone"]);
    if (valid) setStep(2);
  };

  const selectedRole = form.watch("role");

  return {
    form,
    signUp,
    isPending,
    step,
    setStep,
    showPassword,
    setShowPassword,
    handleNextStep,
    selectedRole,
    t,
  };
}
