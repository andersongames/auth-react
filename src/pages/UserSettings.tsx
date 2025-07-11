// Protected page accessible only to users with the "user" role.
// Intended for displaying or managing user-specific settings.

import Link from "../components/Link";

export default function UserSettings() {
  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="space-y-6 flex flex-col items-center justify-center text-center p-6 transition-colors bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">User Settings</h1>
          <p className="text-lg">
            This page is accessible only by users with the <strong>user</strong> role.
          </p>
          <Link to="/dashboard">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
