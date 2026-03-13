import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { MapPin, DollarSign } from "lucide-react";
import DataTable from "@/features/admin/components/DataTable";
import { adminService } from "@/features/admin/services/admin.api";
import { apiClient } from "@/shared/lib/axios";

const LIMIT = 10;

export default function AdminListingsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-listings", page],
    queryFn: () =>
      apiClient
        .get("/units/all", { params: { page, limit: LIMIT } })
        .then((r) => r.data),
    retry: 1,
  });

  const units = data?.data?.units || data?.data || [];
  const total = data?.data?.total || 0;
  const totalPages = Math.ceil(total / LIMIT) || 1;

  const columns = useMemo(
    () => [
      {
        accessorKey: "title",
        header: t("admin.unitTitle"),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
              <img
                src={
                  row.original.images?.[0] ||
                  "https://placehold.co/40x40/1B3D6F/white?text=U"
                }
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-slate-800 text-sm truncate max-w-[200px]">
                {row.original.title}
              </p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {row.original.city}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "price",
        header: t("admin.price"),
        cell: ({ row }) => (
          <span className="font-semibold text-orange">
            ${row.original.price}/mo
          </span>
        ),
      },
      {
        accessorKey: "roomType",
        header: t("admin.roomType"),
        cell: ({ row }) => (
          <span className="text-sm text-slate-600">
            {row.original.roomType?.replace(/_/g, " ") || "—"}
          </span>
        ),
      },
      {
        accessorKey: "genderType",
        header: t("admin.genderType"),
        cell: ({ row }) => (
          <span className="text-sm text-slate-600">
            {row.original.genderType?.replace(/_/g, " ") || "—"}
          </span>
        ),
      },
      {
        accessorKey: "owner",
        header: t("admin.owner"),
        cell: ({ row }) => (
          <span className="text-sm text-slate-600">
            {row.original.owner?.name || "—"}
          </span>
        ),
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
          {t("admin.listingsTitle")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("admin.listingsSubtitle")}
        </p>
      </div>

      <DataTable
        columns={columns}
        data={units}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
