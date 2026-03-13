import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/features/admin/services/admin.api";

/**
 * useAdminUsers — paginated user list with block/unblock/role mutations.
 */
export function useAdminUsers(params = {}) {
  const queryClient = useQueryClient();
  const queryKey = ["admin-users", params];

  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: () => adminService.getUsers(params),
    retry: 1,
  });

  const blockMutation = useMutation({
    mutationFn: (id) => adminService.blockUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const unblockMutation = useMutation({
    mutationFn: (id) => adminService.unblockUser(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const roleMutation = useMutation({
    mutationFn: ({ id, role }) => adminService.changeRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  return {
    users: data?.data?.users || [],
    total: data?.data?.pagination?.total || 0,
    isLoading,
    blockUser: blockMutation.mutate,
    unblockUser: unblockMutation.mutate,
    changeRole: roleMutation.mutate,
    isBlocking: blockMutation.isPending,
    isChangingRole: roleMutation.isPending,
  };
}
