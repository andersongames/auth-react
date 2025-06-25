// Protected page accessible only to users with the "admin" role.
// Demonstrates role-based access control using ProtectedRoute.

export default function AdminDashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6 text-gray-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-lg">Only users with the admin role can see this page.</p>
        <a
          href="/admin-dashboard/user-list"
          className="text-blue-600 underline hover:text-blue-800 my-4 block"
        >
          View All Registered Users
        </a>
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
