import { useTranslation } from "react-i18next";
import {
  STATUS_STYLES,
  STATUS_TRANSLATION_MAP,
} from "@/features/landlord/constants";

export default function StatusBadge({ status, type = "visit" }) {
  const { t } = useTranslation();

  const translationKey =
    STATUS_TRANSLATION_MAP[status] || status.toLowerCase();
  const label = t(
    `${type === "visit" ? "visits" : "bookings"}.status.${translationKey}`,
  );

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[status] || "bg-slate-100 text-slate-500"}`}
    >
      {label || status}
    </span>
  );
}
