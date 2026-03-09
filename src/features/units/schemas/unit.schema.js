import { z } from "zod";
import i18n from "@/i18n";

// Lazy translation — always reads current language at validation time
const t = (key) => i18n.t(key);

// ── Create schema: all required fields enforced ─────────────────────────────
export const unitSchema = z.object({
  title: z.string().min(5, { message: t("validation.titleMin") }),
  description: z.string().min(20, { message: t("validation.descriptionMin") }),
  city: z.string().min(2, { message: t("validation.cityRequired") }),
  address: z.string().min(5, { message: t("validation.addressRequired") }),
  university: z
    .string()
    .min(2, { message: t("validation.universityRequired") }),
  price: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => v > 0, { message: t("validation.pricePositive") }),
  rooms: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => v > 0, { message: t("validation.roomsRequired") })
    .optional(),
  distance: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" ? undefined : Number(v)))
    .optional(),
  latitude: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" ? undefined : Number(v)))
    .optional(),
  longitude: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" ? undefined : Number(v)))
    .optional(),
  furnished: z.boolean().default(false),
  roomType: z.enum(["SINGLE", "DOUBLE", "SHARED"], {
    required_error: t("validation.roomTypeRequired"),
  }),
  genderType: z.enum(["MALE_ONLY", "FEMALE_ONLY"], {
    required_error: t("validation.genderTypeRequired"),
  }),
  facilities: z.array(z.string()).optional().default([]),
  images: z.array(z.string()).optional().default([]),
});

// ── Edit schema: every field is optional — only validated if provided ────────
export const unitEditSchema = z.object({
  title: z
    .string()
    .min(5, { message: t("validation.titleMin") })
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(20, { message: t("validation.descriptionMin") })
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .min(2, { message: t("validation.cityRequired") })
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(5, { message: t("validation.addressRequired") })
    .optional()
    .or(z.literal("")),
  university: z
    .string()
    .min(2, { message: t("validation.universityRequired") })
    .optional()
    .or(z.literal("")),
  price: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .refine((v) => v > 0, { message: t("validation.pricePositive") })
    .optional(),
  rooms: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .optional(),
  distance: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" ? undefined : Number(v)))
    .optional(),
  latitude: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" ? undefined : Number(v)))
    .optional(),
  longitude: z
    .union([z.string(), z.number()])
    .transform((v) => (v === "" ? undefined : Number(v)))
    .optional(),
  furnished: z.boolean().optional(),
  roomType: z.enum(["SINGLE", "DOUBLE", "SHARED"]).optional(),
  genderType: z.enum(["MALE_ONLY", "FEMALE_ONLY"]).optional(),
  facilities: z.array(z.string()).optional(),
  images: z.array(z.string()).optional(),
});
