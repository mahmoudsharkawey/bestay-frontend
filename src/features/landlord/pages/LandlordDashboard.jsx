import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Building2, Calendar, BookOpen, Plus, DollarSign } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useLandlordStats } from "@/features/landlord/hooks/useLandlordStats";
import { useMyUnits } from "@/features/units/hooks/useMyUnits";
import StatCard from "@/features/landlord/components/StatCard";
import UnitsList from "@/features/landlord/components/UnitsList";
import RecentVisits from "@/features/landlord/components/RecentVisits";
import RecentBookings from "@/features/landlord/components/RecentBookings";
import DeleteUnitDialog from "@/features/landlord/components/DeleteUnitDialog";

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
        <UnitsList
          units={units}
          isLoading={isLoading}
          onView={(id) => navigate(`/units/${id}`)}
          onEdit={(id) => navigate(`/units/${id}/edit`)}
          onDelete={(id) => confirmDelete(id)}
        />

        {/* Visits + Bookings side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentVisits visits={visits} isLoading={isLoading} />
          <RecentBookings bookings={bookings} isLoading={isLoading} />
        </div>

        {/* Pricing Insights CTA */}
        <section className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl border border-indigo-200/60 p-6 text-center">
          <DollarSign className="h-8 w-8 mx-auto mb-3 text-orange" />
          <h2 className="text-xl font-semibold text-navy mb-2">
            {t("pricing.dashboardCta")}
          </h2>
          <p className="text-slate-500 text-sm mb-4">
            {t("pricing.dashboardCtaHint")}
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-orange hover:bg-orange/90 text-white font-medium px-6 py-2.5 rounded-full transition-colors"
          >
            <DollarSign className="h-4 w-4" />
            {t("pricing.dashboardCta")}
          </a>
        </section>
      </div>

      {/* Delete confirmation dialog */}
      <DeleteUnitDialog
        open={!!deleteId}
        onClose={cancelDelete}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
