import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  BookOpen,
  TrendingUp,
  Eye,
  MapPin,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useLandlordStats } from "@/features/landlord/hooks/useLandlordStats";
import { useMyUnits } from "@/features/units/hooks/useMyUnits";

/* ── Stat card ─────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, color, to }) {
  const inner = (
    <div
      className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 ${to ? "cursor-pointer" : ""}`}
    >
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-navy">{value}</p>
        <p className="text-sm text-slate-500">{label}</p>
      </div>
    </div>
  );
  return to ? <Link to={to}>{inner}</Link> : inner;
}

const STATUS_STYLES = {
  PENDING_OWNER: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED_BY_OWNER: "bg-red-100 text-red-700",
  CONFIRMED: "bg-blue-100 text-blue-700",
  CANCELLED: "bg-slate-100 text-slate-500",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  BOOKED: "bg-green-100 text-green-700",
};

function StatusBadge({ status, type = "visit" }) {
  const { t } = useTranslation();
  
  // Map API status (UPPER_SNAKE) to translation key (camelCase)
  const getTranslationKey = (s) => {
    const map = {
      PENDING_OWNER: "pendingOwner",
      APPROVED: "approved",
      REJECTED_BY_OWNER: "rejectedByOwner",
      CONFIRMED: "confirmed",
      CANCELLED: "cancelled",
      COMPLETED: "completed",
      BOOKED: "confirmed", // Bookings use 'confirmed' for 'BOOKED'
    };
    return map[s] || s.toLowerCase();
  };

  const translationKey = getTranslationKey(status);
  const label = t(`${type === "visit" ? "visits" : "bookings"}.status.${translationKey}`);

  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_STYLES[status] || "bg-slate-100 text-slate-500"}`}
    >
      {label || status}
    </span>
  );
}

/* ── Main page ──────────────────────────────────────── */
export default function LandlordDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    units,
    visits,
    bookings,
    isLoading,
    totalUnits,
    totalVisits,
    totalBookings,
  } = useLandlordStats();
  const { confirmDelete, cancelDelete, handleDelete, deleteId, isDeleting } =
    useMyUnits();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-navy">
              {t("landlord.dashboard")}
            </h1>
            <p className="text-slate-500 text-sm mt-0.5">
              {t("landlord.dashboardSubtitle")}
            </p>
          </div>
          <Button
            onClick={() => navigate("/units/new")}
            className="bg-orange hover:bg-orange-hover text-white rounded-xl gap-2 h-10"
          >
            <Plus className="h-4 w-4" />
            {t("units.addUnit")}
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={Building2}
            label={t("landlord.totalUnits")}
            value={isLoading ? "—" : totalUnits}
            color="bg-navy/10 text-navy"
            to="/units/my"
          />
          <StatCard
            icon={Calendar}
            label={t("landlord.totalVisits")}
            value={isLoading ? "—" : totalVisits}
            color="bg-orange/10 text-orange"
            to="/landlord/visits"
          />
          <StatCard
            icon={BookOpen}
            label={t("landlord.totalBookings")}
            value={isLoading ? "—" : totalBookings}
            color="bg-green-100 text-green-700"
            to="/landlord/bookings"
          />
        </div>

        {/* Units table */}
        <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="font-semibold text-navy">{t("units.myUnits")}</h2>
            <Link
              to="/units/my"
              className="text-xs text-orange hover:underline"
            >
              {t("common.viewAll")}
            </Link>
          </div>
          {isLoading ? (
            <div className="divide-y divide-slate-50">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse bg-slate-50 m-4 rounded-xl"
                />
              ))}
            </div>
          ) : units.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-slate-300 gap-3">
              <Building2 className="h-12 w-12" />
              <p className="text-sm font-medium text-slate-400">
                {t("units.noUnitsYet")}
              </p>
              <Button
                onClick={() => navigate("/units/new")}
                className="bg-orange hover:bg-orange-hover text-white rounded-xl mt-1"
              >
                <Plus className="h-4 w-4 mr-2" /> {t("units.addUnit")}
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {units.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-slate-100">
                    <img
                      src={
                        unit.images?.[0] ||
                        "https://placehold.co/48x48/1B3D6F/white?text=U"
                      }
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm truncate">
                      {unit.title}
                    </p>
                    <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" />
                      {unit.city}
                      <span className="mx-1">·</span>
                      <span className="font-medium text-orange">
                        ${unit.price}/mo
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => navigate(`/units/${unit.id}`)}
                      className="p-2 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                      title={t("common.view")}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => navigate(`/units/${unit.id}/edit`)}
                      className="p-2 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                      title={t("common.edit")}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => confirmDelete(unit.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title={t("common.delete")}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Visits + Bookings side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visits */}
          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="font-semibold text-navy flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange" />
                {t("landlord.recentVisits")}
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
            ) : visits.length === 0 ? (
              <div className="text-center py-10 text-slate-300">
                <Calendar className="h-8 w-8 mx-auto mb-2" />
                <p className="text-sm text-slate-400">
                  {t("landlord.noVisits")}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-50">
                {visits.slice(0, 5).map((visit) => (
                  <div
                    key={visit.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-700">
                        {visit.user?.name || "Student"}
                      </p>
                      <p className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {visit.proposedDate
                          ? new Date(visit.proposedDate).toLocaleDateString()
                          : "—"}
                      </p>
                    </div>
                    <StatusBadge status={visit.status} type="visit" />
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Bookings */}
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
        </div>
      </div>

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h2 className="text-lg font-bold text-navy mb-2">
              {t("units.confirmDelete")}
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              {t("units.confirmDeleteDesc")}
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={cancelDelete}
                className="flex-1 rounded-xl"
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white rounded-xl"
              >
                {isDeleting ? t("common.deleting") : t("common.delete")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
