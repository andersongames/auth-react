// Protected page accessible only to users with the "admin" role.
// Demonstrates role-based access control using ProtectedRoute.
// Although this page is already protected by ProtectedRoute (admin-only),
// we still use <RoleBased> to conditionally render certain elements.
// This ensures visual security, avoids exposing irrelevant UI,
// and keeps the component reusable in case it's rendered elsewhere.

import RoleBased from "../components/RoleBased";
import { ROLES } from "../constants/roles";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6 bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Admin Panel</h1>
        <p className="text-lg">Only users with the admin role can see this page.</p>
        <RoleBased allowedRoles={[ROLES.ADMIN]}>
          <a
            href="/admin-dashboard/user-list"
            className="text-blue-600 underline hover:text-blue-800 my-4 block"
          >
            View All Registered Users
          </a>
        </RoleBased>
        <a
          href="/dashboard"
          className="text-blue-600 underline hover:text-blue-800 mt-4 block"
        >
          Go to Dashboard
        </a>
      </div>
    </div>
  );
}
