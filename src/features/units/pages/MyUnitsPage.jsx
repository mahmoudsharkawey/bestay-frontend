import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Plus,
  Pencil,
  Trash2,
  MapPin,
  Building2,
  Eye,
  Star,
  Calendar,
  BookOpen,
  Users,
} from "lucide-react";
import { useMyUnits } from "@/features/units/hooks/useMyUnits";
import { Button } from "@/shared/components/ui/button";

/* ─── Status badge ──────────────────────────────────── */
function StatusBadge({ status }) {
  const isActive = status === "ACTIVE";
  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${
        isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-red-400"}`}
      />
      {isActive ? "Active" : "Deleted"}
    </span>
  );
}

/* ─── Stat pill ─────────────────────────────────────── */
function StatPill({ icon: Icon, value, label, color = "text-slate-400" }) {
  return (
    <span className="flex items-center gap-1 text-xs text-slate-400">
      <Icon className={`h-3 w-3 ${color}`} />
      <span className="font-medium text-slate-600">{value ?? 0}</span>
      <span>{label}</span>
    </span>
  );
}

export default function MyUnitsPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    units,
    isLoading,
    isDeleting,
    deleteId,
    confirmDelete,
    cancelDelete,
    handleDelete,
  } = useMyUnits();

  const activeUnits = units.filter((u) => u.status !== "DELETED");
  const deletedUnits = units.filter((u) => u.status === "DELETED");

  const renderUnit = (unit) => {
    const isDeleted = unit.status === "DELETED";
    return (
      <div
        key={unit.id}
        className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex transition-all ${
          isDeleted
            ? "border-red-100 opacity-60 grayscale"
            : "border-slate-100 hover:shadow-md"
        }`}
      >
        {/* Image */}
        <div className="w-36 h-auto shrink-0 overflow-hidden relative">
          <img
            src={
              unit.images?.[0] ||
              "https://placehold.co/144x120/1B3D6F/white?text=Unit"
            }
            alt={unit.title}
            className="w-full h-full object-cover"
          />
          {isDeleted && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white text-xs font-bold bg-red-500 px-2 py-0.5 rounded-full">
                Deleted
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
          <div className="flex items-start justify-between gap-2">
            {/* Left: title + meta */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h3 className="font-semibold text-navy text-sm line-clamp-1">
                  {unit.title}
                </h3>
                <StatusBadge status={unit.status} />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {unit.city}
                </span>
                <span className="bg-slate-100 px-2 py-0.5 rounded-full text-slate-600">
                  {t(`units.roomTypes.${unit.roomType}`, unit.roomType)}
                </span>
                <span className="bg-orange/10 text-orange px-2 py-0.5 rounded-full font-medium">
                  ${unit.price}/mo
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {!isDeleted && (
                <button
                  onClick={() => navigate(`/units/${unit.id}`)}
                  className="p-2 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                  title={t("common.view")}
                >
                  <Eye className="h-4 w-4" />
                </button>
              )}
              {!isDeleted && (
                <button
                  onClick={() => navigate(`/units/${unit.id}/edit`)}
                  className="p-2 text-slate-400 hover:text-navy hover:bg-slate-100 rounded-lg transition-colors"
                  title={t("common.edit")}
                >
                  <Pencil className="h-4 w-4" />
                </button>
              )}
              {!isDeleted && (
                <button
                  onClick={() => confirmDelete(unit.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title={t("common.delete")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-4 mt-2 pt-2 border-t border-slate-50">
            {unit.averageRating !== undefined && (
              <StatPill
                icon={Star}
                value={
                  unit.averageRating
                    ? Number(unit.averageRating).toFixed(1)
                    : "—"
                }
                label={t("units.rating", "rating")}
                color="text-yellow-400"
              />
            )}
            <StatPill
              icon={Users}
              value={unit.reviewCount}
              label={t("units.reviews")}
              color="text-purple-400"
            />
            <StatPill
              icon={Calendar}
              value={unit.visitCount}
              label={t("nav.visits")}
              color="text-orange"
            />
            <StatPill
              icon={BookOpen}
              value={unit.bookingCount}
              label={t("nav.bookings")}
              color="text-green-500"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-navy">
              {t("units.myUnits")}
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              {t("units.myUnitsSubtitle")}
            </p>
          </div>
          <Button
            onClick={() => navigate("/units/new")}
            className="bg-orange hover:bg-orange-hover text-white rounded-xl gap-2"
          >
            <Plus className="h-4 w-4" />
            {t("units.addUnit")}
          </Button>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl h-28 animate-pulse border border-slate-100"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!isLoading && units.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-100">
            <Building2 className="h-14 w-14 text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium mb-2">
              {t("units.noUnitsYet")}
            </p>
            <p className="text-slate-300 text-sm mb-5">
              {t("units.noUnitsHint")}
            </p>
            <Button
              onClick={() => navigate("/units/new")}
              className="bg-orange hover:bg-orange-hover text-white rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("units.addFirstUnit")}
            </Button>
          </div>
        )}

        {/* Active Units */}
        {!isLoading && activeUnits.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              {t("units.activeUnits", "Active Units")} ({activeUnits.length})
            </h2>
            <div className="space-y-4">{activeUnits.map(renderUnit)}</div>
          </section>
        )}

        {/* Deleted Units */}
        {!isLoading && deletedUnits.length > 0 && (
          <section>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              {t("units.deletedUnits", "Deleted Units")} ({deletedUnits.length})
            </h2>
            <div className="space-y-4">{deletedUnits.map(renderUnit)}</div>
          </section>
        )}

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
    </div>
  );
}
