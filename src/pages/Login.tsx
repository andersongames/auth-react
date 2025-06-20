import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const loggedOut = new URLSearchParams(location.search).get("loggedOut");
  const expired = new URLSearchParams(location.search).get("expired");

  async function onSubmit(data: LoginFormData) {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      navigate("/dashboard");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Login failed.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    // Prevent duplicate toast messages when using React.StrictMode in development.
    // React.StrictMode intentionally mounts and unmounts components twice to detect side effects.
    // Without a static `id`, toast() would fire twice on first load (e.g. for logout or session expiration).
    // Using a fixed `id` ensures each toast is shown only once per event.
    
    if (isAuthenticated) {
      navigate("/dashboard");
      return;
    }

    if (loggedOut === "true") {
      toast.success("You have been logged out.", { id: "logout-toast" });
      navigate("/login", { replace: true });
    }

    if (expired === "true") {
      toast.error("Your session has expired.", { id: "expired-toast" });
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, loggedOut, expired, navigate]);

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] max-w-md mx-auto p-4 sm:p-6 border rounded-xl shadow-md bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
        <div>
          <label htmlFor="email" className="block text-sm sm:text-base">Email</label>
          <input
            id="email"
            autoComplete="email"
            type="email"
            {...register("email")}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm sm:text-base">Password</label>
          <input
            id="password"
            autoComplete="current-password"
            type="password"
            {...register("password")}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-sm sm:text-base mt-4 text-center">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}