import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../services/authService";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ROLES } from "../constants/roles";
import Link from "../components/Link";
import Input from "../components/Input";
import { handleUnexpectedError } from "../utils/handleUnexpectedError";
import { errorMessages } from "../constants/errorMessages";
import { successMessages } from "../constants/successMessages";

// Schema validation using Zod
const registerSchema = z
  .object({
    name: z.string().min(2, errorMessages.nameTooShort).max(50, errorMessages.nameTooLong),
    email: z.string().email(errorMessages.invalidEmail).max(100, errorMessages.emailTooLong),
    password: z
      .string()
      .min(8, errorMessages.passwordTooShort)
      .max(72, errorMessages.passwordTooLong)
      .regex(/[A-Z]/, errorMessages.passwordMissingUppercase)
      .regex(/[a-z]/, errorMessages.passwordMissingLowercase)
      .regex(/[0-9]/, errorMessages.passwordMissingNumber)
      .regex(/[^A-Za-z0-9]/, errorMessages.passwordMissingSymbol),
    confirmPassword: z.string(),
    role: z.enum(["user", "admin", "editor"], {
      errorMap: () => ({ message: errorMessages.invalidRole }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: errorMessages.passwordsDontMatch,
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const [passwordValue, setPasswordValue] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterFormData) {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });

      toast.success(successMessages.registrationSuccess);

      // Redirect after short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 seconds
    } catch (error: unknown) {
      handleUnexpectedError(error, errorMessages.registrationFailed);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-[calc(100vh-var(--layout-offset))] flex items-center justify-center">
      <div className="w-full sm:w-[90%] md:w-[80%] max-w-md mx-auto p-4 sm:p-6 border shadow-md rounded-2xl space-y-6 flex flex-col transition-colors bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold tracking-tight mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex flex-col">
          <Input
            id="name"
            label="Name"
            type="name"
            autoComplete="name"
            {...register("name")}
            errorMessage={errors.name?.message}
          />
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
            onChange={(e) => {
              setPasswordValue(e.target.value);
            }}
          />
          {/* Password requirements list */}
          <ul className="text-xs space-y-1 ml-1 mt-1" aria-live="polite">
            <li className={passwordValue.length >= 8 ? "text-green-600" : "text-red-600"}>
              • At least 8 characters
            </li>
            <li className={/[A-Z]/.test(passwordValue) ? "text-green-600" : "text-red-600"}>
              • One uppercase letter
            </li>
            <li className={/[a-z]/.test(passwordValue) ? "text-green-600" : "text-red-600"}>
              • One lowercase letter
            </li>
            <li className={/[0-9]/.test(passwordValue) ? "text-green-600" : "text-red-600"}>
              • One number
            </li>
            <li className={/[^A-Za-z0-9]/.test(passwordValue) ? "text-green-600" : "text-red-600"}>
              • One special character
            </li>
          </ul>
          <Input
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            autoComplete="new-password"
            {...register("confirmPassword")}
            errorMessage={errors.confirmPassword?.message}
          />

          {/* ⚠️ Role selection is only available here for demonstration/testing purposes.
            In a real-world application, roles would be assigned server-side and not exposed in a public signup form. */}
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="role" className="block text-sm sm:text-base font-medium transition-colors text-gray-700 dark:text-gray-300 mb-1">
              Select your role
            </label>
            <select
              id="role"
              defaultValue="admin"
              {...register("role")}
              className="w-full border p-2 rounded-lg shadow-sm transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.values(ROLES).map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </option>
              ))}
            </select>
            {errors.role && (
              <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors duration-200 ease-in-out hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span data-testid="spinner" className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-sm sm:text-base mt-6 space-y-4 text-center">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}