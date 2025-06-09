import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { userId, logout } = useAuth();

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <p className="mb-4">Welcome! Your user ID is <strong>{userId}</strong>.</p>
      <button
        onClick={logout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
