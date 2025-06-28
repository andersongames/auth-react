import { useDarkMode } from "../hooks/useDarkMode";

export default function ThemeToggle() {
  const [enabled, setEnabled] = useDarkMode();

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className={`cursor-pointer p-2 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2
        ${enabled
          ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500"
          : "bg-yellow-400 text-yellow-900 hover:bg-yellow-500 focus:ring-yellow-500"
        }`}
      aria-label="Toggle theme"
      title={enabled ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        key={enabled ? "light" : "dark"}
        className="block transition-transform duration-300 ease-in-out transform scale-110"
      >
        {enabled ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
