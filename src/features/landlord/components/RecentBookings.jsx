import { useTranslation } from "react-i18next";
import { BookOpen } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function RecentBookings({ bookings, isLoading }) {
  const { t } = useTranslation();

  return (
    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <h2 className="font-semibold text-navy flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-green-500" />
          {t("landlord.recentBookings")}
        </h2>
      </div>
      {isLoading ? (
        <div className="p-4 space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-12 animate-pulse bg-slate-50 rounded-xl"
            />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-10 text-slate-300">
          <BookOpen className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm text-slate-400">
            {t("landlord.noBookings")}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-slate-50">
          {bookings.slice(0, 5).map((booking) => (
            <div
              key={booking.id}
              className="flex items-center justify-between px-6 py-3"
            >
              <div>
                <p className="text-sm font-medium text-slate-700">
                  {booking.user?.name || "Student"}
                </p>
                <p className="text-xs text-slate-400 truncate max-w-[160px]">
                  {booking.unit?.title || booking.unitId}
                  <span className="mx-1">·</span>
                  {booking.createdAt
                    ? new Date(booking.createdAt).toLocaleDateString()
                    : "—"}
                </p>
              </div>
              <StatusBadge status={booking.status} type="booking" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
