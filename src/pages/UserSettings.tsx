// Protected page accessible only to users with the "user" role.
// Intended for displaying or managing user-specific settings.

export default function UserSettings() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-6 text-gray-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold mb-2">User Settings</h1>
        <p className="text-lg">
          This page is accessible only by users with the <strong>user</strong> role.
        </p>
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
