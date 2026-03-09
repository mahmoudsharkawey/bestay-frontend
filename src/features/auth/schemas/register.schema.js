import { z } from "zod";
import i18n from "@/i18n";
const t = (key) => i18n.t(key);

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, { message: t("validation.nameMin") })
    .max(20, { message: t("validation.nameMax") }),
  email: z.string().email({ message: t("validation.emailInvalid") }),
  password: z.string().min(8, { message: t("validation.passwordMin") }),
  phone: z.string().min(1, { message: t("validation.phoneRequired") }),
  role: z.enum(["USER", "LANDLORD"]).default("USER"),
});
