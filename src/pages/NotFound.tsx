export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="text-lg mb-4">Page not found.</p>
      <a href="/login" className="text-blue-600 hover:underline">Back to login</a>
    </div>
  );
}
