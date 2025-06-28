import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  errorMessage?: string;
}

export default function Input({
  id,
  label,
  errorMessage,
  type = "text",
  autoComplete,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="block text-sm sm:text-base font-medium transition-colors text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        autoComplete={autoComplete}
        className="w-full border p-2 rounded-lg shadow-sm transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />

      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
}
