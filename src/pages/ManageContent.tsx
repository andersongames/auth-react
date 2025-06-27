// Protected page accessible to users with role "admin" or "editor".

export default function ManageContent() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center text-gray-900 dark:text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Content Management</h1>
        <p className="text-lg">
          This page is accessible to users with the <strong>admin</strong> or <strong>editor</strong> role.
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
