import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../services/authService";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Schema validation using Zod
const registerSchema = z
  .object({
    name: z.string().min(2, "Name must have at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must have at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "Please select a valid role." }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
         role: data.role,
      });

      toast.success("User successfully registered!");

      // Redirect after short delay
      setTimeout(() => {
        navigate("/login");
      }, 2000); // 2 seconds
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Registration failed.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="w-full sm:w-[90%] md:w-[80%] max-w-md mx-auto p-4 sm:p-6 border rounded-xl shadow-md bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
        <div>
          <label htmlFor="name" className="block text-sm sm:text-base">Name</label>
          <input
            id="name"
            autoComplete="name"
            {...register("name")}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

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
            autoComplete="new-password"
            type="password"
            {...register("password")}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm sm:text-base">Confirm Password</label>
          <input
            id="confirmPassword"
            autoComplete="new-password"
            type="password"
            {...register("confirmPassword")}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* ⚠️ Role selection is only available here for demonstration/testing purposes.
          In a real-world application, roles would be assigned server-side and not exposed in a public signup form. */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium mb-1">
            Select your role
          </label>
          <select
            id="role"
            {...register("role")}
            className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className="text-sm sm:text-base mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}