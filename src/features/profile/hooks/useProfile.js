import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
  updateProfileSchema,
  changePasswordSchema,
} from "@/features/profile/schemas/profile.schema";
import { userService } from "@/features/profile/services/user.api";
import { uploadService } from "@/features/profile/services/upload.api";
import { useAuthStore } from "@/shared/stores/auth.store";

/** Fetch current user profile */
export function useProfileQuery() {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: ["me"],
    queryFn: () => userService.getMe(token).then((res) => res.data),
  });
}

/** Update user profile (name, phone) */
export function useUpdateProfile() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user: authUser, setUser } = useAuthStore();

  return useMutation({
    mutationFn: userService.updateMe,
    onSuccess: (res) => {
      toast.success(t("profile.profileUpdated"));
      setUser({ ...authUser, ...res.data });
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || t("profile.updateFailed"));
    },
  });
}

/** Upload user avatar and update profile */
export function useAvatarUpload() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { user, setUser } = useAuthStore();
  const [preview, setPreview] = useState(null);

  const mutation = useMutation({
    mutationFn: async (file) => {
      const uploadRes = await uploadService.uploadFiles([file], "user_avatar");
      const url = uploadRes.data.urls[0];
      return userService.updateMe({ picture: url });
    },
    onSuccess: (res) => {
      toast.success(t("profile.avatarUpdated"));
      setUser({ ...user, ...res.data });
      queryClient.invalidateQueries({ queryKey: ["me"] });
      setPreview(null);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || t("profile.uploadFailed"));
      setPreview(null);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (!file) return;
      setPreview(URL.createObjectURL(file));
      mutation.mutate(file);
    },
    [mutation],
  );

  return { ...mutation, preview, setPreview, onDrop };
}

/** Change user password */
export function useChangePassword() {
  const { t } = useTranslation();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldPassword: "", newPassword: "" },
  });

  const mutation = useMutation({
    mutationFn: userService.changePassword,
    onSuccess: () => {
      toast.success(t("profile.passwordChanged"));
      form.reset();
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || t("profile.passwordChangeFailed"),
      );
    },
  });

  return {
    form,
    changePassword: mutation.mutate,
    isPending: mutation.isPending,
  };
}

/** Profile form with edit state */
export function useProfileForm(user) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user?.name || "", phone: user?.phone || "" },
  });

  return { form, isEditing, setIsEditing };
}
