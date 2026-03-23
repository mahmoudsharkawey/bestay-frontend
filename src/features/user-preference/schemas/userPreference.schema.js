import { z } from "zod";
import i18n from "@/i18n";

// Lazy translation — always reads current language at validation time
const t = (key) => i18n.t(key);

export const userPreferenceSchema = z
  .object({
    unitType: z.enum(["ROOM", "APARTMENT", "STUDIO"], {
      required_error: t("validation.unitTypeRequired"),
    }),
    minBudget: z
      .union([z.string(), z.number()])
      .transform((v) => (v === "" ? undefined : Number(v)))
      .refine((v) => v === undefined || v >= 0, {
        message: t("validation.minBudgetPositive"),
      }),
    maxBudget: z
      .union([z.string(), z.number()])
      .transform((v) => (v === "" ? undefined : Number(v)))
      .refine((v) => v === undefined || v > 0, {
        message: t("validation.maxBudgetPositive"),
      }),
    city: z.string().min(2, { message: t("validation.preferenceCityRequired") }),
    university: z
      .string()
      .optional()
      .or(z.literal("")),
    maxDistance: z
      .union([z.string(), z.number()])
      .transform((v) => (v === "" ? undefined : Number(v)))
      .optional(),
    rooms: z
      .union([z.string(), z.number()])
      .transform((v) => (v === "" ? undefined : Number(v)))
      .refine((v) => v === undefined || v > 0, {
        message: t("validation.roomsPositive"),
      }),
    furnished: z.boolean().default(false),
    genderType: z.enum(["MALE_ONLY", "FEMALE_ONLY"], {
      required_error: t("validation.genderTypeRequired"),
    }),
    facilities: z.array(z.string()).optional().default([]),
  })
  .refine(
    (data) => {
      if (data.minBudget != null && data.maxBudget != null) {
        return data.minBudget <= data.maxBudget;
      }
      return true;
    },
    {
      message: t("validation.minLessMax"),
      path: ["maxBudget"],
    },
  );
