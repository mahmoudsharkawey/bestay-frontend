import { apiClient } from "@/shared/lib/axios";

export const userService = {
  getMe: (token) => apiClient.get("/users/me",{token}).then((res) => res.data),
  updateMe: (data) => apiClient.put("/users/me", data).then((res) => res.data),
  changePassword: (data) =>
    apiClient.patch("/users/change-password", data).then((res) => res.data),
};
