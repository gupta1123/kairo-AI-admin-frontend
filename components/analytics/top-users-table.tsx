import { UsersTable } from "@/components/users/users-table";
import type { AdminUserSummary } from "@/lib/types";

export function TopUsersTable({ users }: { users: AdminUserSummary[] }) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-base font-black text-stone-950">Top users by usage</h2>
        <p className="mt-1 text-sm font-medium text-stone-500">
          Ranked by chat sessions plus workspace actions.
        </p>
      </div>
      <UsersTable users={users} />
    </section>
  );
}
