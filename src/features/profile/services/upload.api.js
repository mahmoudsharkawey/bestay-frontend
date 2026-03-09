import { apiClient } from "@/shared/lib/axios";

export const uploadService = {
  uploadFiles: (files, context = "general") => {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    formData.append("context", context);
    return apiClient
      .post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },
};
