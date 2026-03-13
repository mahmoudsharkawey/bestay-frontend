import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Star } from "lucide-react";
import DataTable from "@/features/admin/components/DataTable";
import { useAdminReviews } from "@/features/admin/hooks/useAdminReviews";

const LIMIT = 10;

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < rating
              ? "fill-orange text-orange"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function AdminReviewsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { reviews, total, isLoading } = useAdminReviews({
    page,
    limit: LIMIT,
  });

  const totalPages = Math.ceil(total / LIMIT) || 1;

  const columns = useMemo(
    () => [
      {
        accessorKey: "user",
        header: t("admin.reviewer"),
        cell: ({ row }) => (
          <span className="text-sm font-medium text-slate-700">
            {row.original.user?.name || "—"}
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
        accessorKey: "rating",
        header: t("admin.rating"),
        cell: ({ row }) => <StarRating rating={row.original.rating || 0} />,
      },
      {
        accessorKey: "comment",
        header: t("admin.comment"),
        cell: ({ row }) => (
          <p className="text-sm text-slate-600 truncate max-w-[240px]">
            {row.original.comment || (
              <span className="italic text-slate-400">
                {t("admin.noComment")}
              </span>
            )}
          </p>
        ),
      },
      {
        accessorKey: "createdAt",
        header: t("admin.date"),
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
          {t("admin.reviewsTitle")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("admin.reviewsSubtitle")}
        </p>
      </div>

      <DataTable
        columns={columns}
        data={reviews}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
