// Protected page accessible only to users with the "admin" role.
// Demonstrates role-based access control using ProtectedRoute.
// Although this page is already protected by ProtectedRoute (admin-only),
// we still use <RoleBased> to conditionally render certain elements.
// This ensures visual security, avoids exposing irrelevant UI,
// and keeps the component reusable in case it's rendered elsewhere.

import Link from "../components/Link";
import RoleBased from "../components/RoleBased";
import { ROLES } from "../constants/roles";

export default function AdminDashboard() {
  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="space-y-6 flex flex-col items-center justify-center text-center p-6 transition-colors bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Panel</h1>
          <p className="text-lg">Only users with the admin role can see this page.</p>
          <RoleBased allowedRoles={[ROLES.ADMIN]}>
            <Link to="/admin-dashboard/user-list">
              View All Registered Users
            </Link>
          </RoleBased>
          <Link to="/dashboard">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
