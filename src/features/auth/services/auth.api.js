import { apiClient } from "@/shared/lib/axios";

export const authService = {
  signUp: (data) =>
    apiClient.post("/auth/sign-up", data).then((res) => res.data),

  signIn: (data) =>
    apiClient.post("/auth/sign-in", data).then((res) => res.data),

  googleLogin: (token) =>
    apiClient.post("/auth/google-login", { token }).then((res) => res.data),

  forgotPassword: (email) =>
    apiClient.post("/auth/forgot-password", { email }).then((res) => res.data),

  verifyResetCode: (data) =>
    apiClient.post("/auth/verify-reset-code", data).then((res) => res.data),

  resetPassword: (data) =>
    apiClient.post("/auth/reset-password", data).then((res) => res.data),
};
