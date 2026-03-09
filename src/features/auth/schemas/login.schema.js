import { z } from "zod";
import i18n from "@/i18n";
const t = (key) => i18n.t(key);

export const loginSchema = z.object({
  email: z.string().email({ message: t("validation.emailInvalid") }),
  password: z.string().min(1, { message: t("validation.passwordRequired") }),
});
