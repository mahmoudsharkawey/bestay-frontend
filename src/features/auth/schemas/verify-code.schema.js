import { z } from "zod";
import i18n from "@/i18n";
const t = (key) => i18n.t(key);

export const verifyCodeSchema = z.object({
  email: z.string().email({ message: t("validation.emailInvalid") }),
  resetCode: z.string().length(6, { message: t("validation.resetCodeLength") }),
});
