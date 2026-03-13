import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { MoreHorizontal, Shield, ShieldOff, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import DataTable from "@/features/admin/components/DataTable";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { useAdminUsers } from "@/features/admin/hooks/useAdminUsers";

const LIMIT = 10;

export default function AdminUsersPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);

  const { users, total, isLoading, blockUser, unblockUser, changeRole } =
    useAdminUsers({ page, limit: LIMIT });

  const totalPages = Math.ceil(total / LIMIT) || 1;

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: t("admin.userName"),
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={row.original.picture} />
              <AvatarFallback className="bg-navy/10 text-navy text-xs">
                {(row.original.name || "U").charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium text-slate-800 text-sm truncate">
                {row.original.name || "—"}
              </p>
              <p className="text-xs text-slate-400">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: t("admin.role"),
        cell: ({ row }) => <StatusBadge status={row.original.role} />,
      },
      {
        accessorKey: "isBlocked",
        header: t("admin.status"),
        cell: ({ row }) => (
          <StatusBadge
            status={row.original.isBlocked ? "BLOCKED" : "ACTIVE"}
          />
        ),
      },
      {
        accessorKey: "createdAt",
        header: t("admin.joined"),
        cell: ({ row }) =>
          row.original.createdAt
            ? new Date(row.original.createdAt).toLocaleDateString()
            : "—",
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {row.original.isBlocked ? (
                <DropdownMenuItem onClick={() => unblockUser(row.original.id)}>
                  <ShieldOff className="h-4 w-4 mr-2" />
                  {t("admin.unblockUser")}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  onClick={() => blockUser(row.original.id)}
                  className="text-red-600 focus:text-red-600"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {t("admin.blockUser")}
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              {["USER", "LANDLORD", "ADMIN"]
                .filter((r) => r !== row.original.role)
                .map((role) => (
                  <DropdownMenuItem
                    key={role}
                    onClick={() =>
                      changeRole({ id: row.original.id, role })
                    }
                  >
                    <UserCog className="h-4 w-4 mr-2" />
                    {t("admin.changeRoleTo", { role })}
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [t, blockUser, unblockUser, changeRole]
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          {t("admin.usersTitle")}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          {t("admin.usersSubtitle")}
        </p>
      </div>

      <DataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
