export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="space-y-6 flex flex-col items-center justify-center p-6 text-center bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <h1 className="text-4xl font-bold tracking-tight mb-2">404</h1>
        <p className="text-lg mb-4">Page not found.</p>
        <a href="/login" className="text-blue-600 hover:underline">Back to login</a>
      </div>
    </div>
  );
}
