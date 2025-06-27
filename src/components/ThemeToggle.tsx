import { useDarkMode } from "../hooks/useDarkMode";

export default function ThemeToggle() {
  const [enabled, setEnabled] = useDarkMode();

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      className="text-xl cursor-pointer"
      aria-label="Toggle theme"
    >
      {enabled ? "☀️" : "🌙"}
    </button>
  );
}
