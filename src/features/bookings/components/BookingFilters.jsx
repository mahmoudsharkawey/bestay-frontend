import { useTranslation } from "react-i18next";
import { TAB_STATUSES } from "@/features/bookings/constants";

export default function BookingFilters({ statusFilter, setStatusFilter }) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hide">
      {TAB_STATUSES.map((status) => (
        <button
          key={status}
          onClick={() => setStatusFilter(status)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
            statusFilter === status
              ? "bg-navy text-white shadow-md shadow-navy/10"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          {status === "ALL"
            ? t("bookings.tabs.all")
            : t(`bookings.tabs.${status.toLowerCase()}`, status)}
        </button>
      ))}
    </div>
  );
}
