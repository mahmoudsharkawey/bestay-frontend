import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Calendar, Loader2 } from "lucide-react";
import { useMyBookings } from "@/features/bookings/hooks/useBookings";
import BookingFilters from "@/features/bookings/components/BookingFilters";
import BookingCard from "@/features/bookings/components/BookingCard";

export default function BookingsPage() {
  const { t } = useTranslation();
  const { bookings, isLoading, isError, statusFilter, setStatusFilter } =
    useMyBookings();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy">
            {t("bookings.myBookings")}
          </h1>
          <p className="text-slate-500 mt-1">{t("bookings.subtitle")}</p>

          {/* Tabs */}
          <BookingFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
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
              <BookingCard key={booking.id || booking._id} booking={booking} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
