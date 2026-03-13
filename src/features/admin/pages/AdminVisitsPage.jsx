import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DataTable from "@/features/admin/components/DataTable";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { useAdminVisits } from "@/features/admin/hooks/useAdminVisits";

const LIMIT = 10;

export default function AdminVisitsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { visits, total, isLoading } = useAdminVisits({
    page,
    limit: LIMIT,
  });

  const totalPages = Math.ceil(total / LIMIT) || 1;

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: t("admin.visitId"),
        cell: ({ row }) => (
          <span className="font-mono text-xs text-slate-500">
            {(row.original.id || "").slice(0, 8)}…
          </span>
        ),
      },
      {
        accessorKey: "user",
        header: t("admin.visitor"),
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
        accessorKey: "proposedDate",
        header: t("admin.proposedDate"),
        cell: ({ row }) =>
          row.original.proposedDate
            ? new Date(row.original.proposedDate).toLocaleDateString()
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
          {t("admin.visitsTitle")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("admin.visitsSubtitle")}
        </p>
      </div>

      <DataTable
        columns={columns}
        data={visits}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
