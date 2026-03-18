import { useTranslation } from "react-i18next";
import { STATUS_CONFIG } from "@/features/visits/constants";

export default function StatusBadge({ status }) {
  const { t } = useTranslation();
  const cfg = STATUS_CONFIG[status] || {
    label: status,
    color: "bg-slate-100 text-slate-500",
  };
  return (
    <span
      className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.color}`}
    >
      {t(cfg.label, status)}
    </span>
  );
}
