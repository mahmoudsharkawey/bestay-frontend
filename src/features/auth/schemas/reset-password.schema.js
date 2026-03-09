import { z } from "zod";
import i18n from "@/i18n";
const t = (key) => i18n.t(key);

export const resetPasswordSchema = z.object({
  email: z.string().email({ message: t("validation.emailInvalid") }),
  newPassword: z.string().min(8, { message: t("validation.passwordMin") }),
});
