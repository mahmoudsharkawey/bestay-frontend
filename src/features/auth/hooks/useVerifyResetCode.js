import { useRef, useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { authService } from "@/features/auth/services/auth.api";

export function useVerifyResetCode() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newCode = [...code];
    pasted.split("").forEach((char, i) => {
      newCode[i] = char;
    });
    setCode(newCode);
    const nextEmpty = pasted.length < 6 ? pasted.length : 5;
    inputRefs.current[nextEmpty]?.focus();
  };

  const { mutate: verify, isPending } = useMutation({
    mutationFn: () =>
      authService.verifyResetCode({ email, resetCode: code.join("") }),
    onSuccess: () => {
      toast.success(t("auth.codeVerified"));
      navigate("/reset-password", { state: { email } });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || t("common.error"));
    },
  });

  const { mutate: resend } = useMutation({
    mutationFn: () => authService.forgotPassword(email),
    onSuccess: () => {
      toast.success(t("auth.resetCodeSent"));
      setCountdown(60);
    },
  });

  const isFull = code.every((d) => d !== "");

  return {
    code,
    handleChange,
    handleKeyDown,
    handlePaste,
    inputRefs,
    countdown,
    verify,
    resend,
    isPending,
    isFull,
    email,
    t,
  };
}
