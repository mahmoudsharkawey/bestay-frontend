import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapPin, Calendar, CreditCard } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/shared/components/ui/button";
import StatusBadge from "./StatusBadge";

export default function BookingCard({ booking }) {
  const { t } = useTranslation();

  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:shadow-md transition-shadow"
    >
      <Link to={`/units/${booking.unit?.id}`} className="shrink-0 group">
        {booking.unit?.images?.[0] ? (
          <img
            src={booking.unit.images[0]}
            alt={booking.unit?.title || "Property"}
            className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-xl group-hover:opacity-90 transition-opacity"
          />
        ) : (
          <div className="w-full sm:w-32 h-48 sm:h-32 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 transition-colors">
            <MapPin className="h-8 w-8" />
          </div>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <Link
            to={`/units/${booking.unit?.id}`}
            className="font-semibold text-navy hover:text-orange transition-colors text-lg"
          >
            {booking.unit?.title || t("bookings.unknownUnit")}
          </Link>
          <StatusBadge status={booking.status} />
        </div>

        <div className="flex flex-col gap-2 text-sm text-slate-500 mb-4">
          <p className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-slate-400" />
            {booking.unit?.city || "—"}
          </p>
          <p className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-slate-400" />
            {booking.startDate
              ? format(new Date(booking.startDate), "MMM d, yyyy")
              : "—"}
          </p>
        </div>

        {(booking.status === "CONFIRMED" ||
          booking.status === "COMPLETED") && (
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
            {booking.status === "CONFIRMED" && (
              <div className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                {t("bookings.paymentConfirmed")}
              </div>
            )}

            {(booking.status === "COMPLETED" ||
              booking.status === "CONFIRMED") && (
              <Button
                variant="outline"
                className="ml-auto text-xs h-8"
                onClick={() =>
                  window.alert("Review modal hooked here from Phase 6")
                }
              >
                {t("reviews.leaveReview")}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
