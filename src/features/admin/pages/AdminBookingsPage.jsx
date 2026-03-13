import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "@/features/admin/components/DataTable";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { useAdminBookings } from "@/features/admin/hooks/useAdminBookings";

const LIMIT = 10;

export default function AdminBookingsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { bookings, total, isLoading } = useAdminBookings({
    page,
    limit: LIMIT,
  });

  const totalPages = Math.ceil(total / LIMIT) || 1;

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: t("admin.bookingId"),
        cell: ({ row }) => (
          <span className="font-mono text-xs text-slate-500">
            {(row.original.id || "").slice(0, 8)}…
          </span>
        ),
      },
      {
        accessorKey: "user",
        header: t("admin.tenant"),
        cell: ({ row }) => (
          <span className="text-sm font-medium text-slate-700">
            {row.original.user?.name || row.original.userId?.slice(0, 8) || "—"}
          </span>
        ),
      },
      {
        accessorKey: "unit",
        header: t("admin.property"),
        cell: ({ row }) => (
          <span className="text-sm text-slate-600 truncate max-w-[160px] block">
            {row.original.unit?.title || row.original.unitId?.slice(0, 8) || "—"}
          </span>
        ),
      },
      {
        accessorKey: "startDate",
        header: t("admin.startDate"),
        cell: ({ row }) =>
          row.original.startDate
            ? new Date(row.original.startDate).toLocaleDateString()
            : "—",
      },
      {
        accessorKey: "endDate",
        header: t("admin.endDate"),
        cell: ({ row }) =>
          row.original.endDate
            ? new Date(row.original.endDate).toLocaleDateString()
            : "—",
      },
      {
        accessorKey: "status",
        header: t("admin.status"),
        cell: ({ row }) => <StatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "createdAt",
        header: t("admin.created"),
        cell: ({ row }) =>
          row.original.createdAt
            ? new Date(row.original.createdAt).toLocaleDateString()
            : "—",
      },
    ],
    [t]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {t("admin.bookingsTitle")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("admin.bookingsSubtitle")}
        </p>
      </div>

      <DataTable
        columns={columns}
        data={bookings}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
