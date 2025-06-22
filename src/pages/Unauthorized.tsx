export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
      <p className="text-lg mb-4">You do not have permission to view this page.</p>
      <a href="/dashboard" className="text-blue-600 hover:underline">Go to Dashboard</a>
    </div>
  );
}
