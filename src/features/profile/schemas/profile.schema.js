import { z } from "zod";
import i18n from "@/i18n";
const t = (key) => i18n.t(key);

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, { message: t("validation.nameMin") })
    .optional(),
  phone: z.string().optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z
    .string()
    .min(1, { message: t("validation.currentPasswordRequired") }),
  newPassword: z.string().min(8, { message: t("validation.newPasswordMin") }),
});
