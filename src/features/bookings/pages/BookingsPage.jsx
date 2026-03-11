import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MapPin, Calendar, CreditCard, ChevronRight, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { useMyBookings } from "@/features/bookings/hooks/useBookings";
import { Button } from "@/shared/components/ui/button";

const STATUS_CONFIG = {
  PENDING: {
    label: "bookings.status.pending",
    color: "bg-amber-100 text-amber-700",
  },
  CONFIRMED: {
    label: "bookings.status.confirmed",
    color: "bg-emerald-100 text-emerald-800",
  },
  COMPLETED: {
    label: "bookings.status.completed",
    color: "bg-blue-100 text-blue-700",
  },
  CANCELLED: {
    label: "bookings.status.cancelled",
    color: "bg-slate-100 text-slate-500",
  },
};

const TAB_STATUSES = ["ALL", "CONFIRMED", "COMPLETED", "CANCELLED", "PENDING"];

function StatusBadge({ status }) {
  const { t } = useTranslation();
  const cfg = STATUS_CONFIG[status] || {
    label: status,
    color: "bg-slate-100 text-slate-500",
  };
  return (
    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${cfg.color}`}>
      {t(cfg.label, status)}
    </span>
  );
}

export default function BookingsPage() {
  const { t } = useTranslation();
  const [statusFilter, setStatusFilter] = useState("ALL");
  const { data, isLoading, isError } = useMyBookings();

  const allBookings = data?.data || [];
  const bookings = statusFilter === "ALL" 
    ? allBookings 
    : allBookings.filter(b => b.status === statusFilter);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">
            {t("bookings.myBookings")}
          </h1>
          <p className="text-slate-500 mt-1">
            {t("bookings.subtitle")}
          </p>

          {/* Tabs */}
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
                {status === "ALL" ? t("bookings.tabs.all") : t(`bookings.tabs.${status.toLowerCase()}`, status)}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-orange" />
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-red-100">
            <p className="text-red-500 font-medium">{t("common.error")}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm border-dashed">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">
              {t("bookings.noBookings")}
            </h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              {t("bookings.noBookingsHint")}
            </p>
            <Link
              to="/units"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-orange hover:bg-orange-hover text-white font-semibold transition-colors"
            >
              {t("bookings.browseUnits")}
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div 
                key={booking.id || booking._id}
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
                      {booking.startDate ? format(new Date(booking.startDate), "MMM d, yyyy") : "—"}
                    </p>
                  </div>

                  {booking.status === "CONFIRMED" || booking.status === "COMPLETED" ? (
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                      {booking.status === "CONFIRMED" && (
                         <div className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                           <CreditCard className="h-4 w-4" />
                           {t("bookings.paymentConfirmed")}
                         </div>
                      )}
                      
                      {/* Review logic from Phase 6 */}
                      {(booking.status === "COMPLETED" || booking.status === "CONFIRMED") && (
                        <Button 
                           variant="outline" 
                           className="ml-auto text-xs h-8"
                           onClick={() => window.alert('Review modal hooked here from Phase 6')}
                        >
                          {t("reviews.leaveReview")}
                        </Button>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
