import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Link from "../components/Link";
import Input from "../components/Input";
import { handleUnexpectedError } from "../utils/handleUnexpectedError";
import { errorMessages } from "../constants/errorMessages";
import { successMessages } from "../constants/successMessages";

const loginSchema = z.object({
  email: z.string().email(errorMessages.invalidEmail),
  password: z.string().min(1, errorMessages.requiredPassword),
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
      handleUnexpectedError(error, errorMessages.loginFailed);
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
      toast.success(successMessages.loggedOut, { id: "logout-toast" });
      navigate("/login", { replace: true });
    }

    if (expired === "true") {
      toast.error(errorMessages.sessionExpired, { id: "expired-toast" });
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, loggedOut, expired, navigate]);

  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="w-full sm:w-[90%] md:w-[80%] max-w-md mx-auto p-4 sm:p-6 border shadow-md rounded-2xl space-y-6 flex flex-col transition-colors bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-tight mb-4">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
          <Input
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            {...register("email")}
            errorMessage={errors.email?.message}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            autoComplete="new-password"
            {...register("password")}
            errorMessage={errors.password?.message}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Login"
            )}
          </button>

          <p className="text-sm sm:text-base mt-6 space-y-4 text-center">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}