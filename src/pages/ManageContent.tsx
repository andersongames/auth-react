// Protected page accessible to users with role "admin" or "editor".

import Link from "../components/Link";

export default function ManageContent() {
  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="space-y-6 flex flex-col items-center justify-center p-6 text-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Content Management</h1>
          <p className="text-lg">
            This page is accessible to users with the <strong>admin</strong> or <strong>editor</strong> role.
          </p>
          <Link to="/dashboard">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
