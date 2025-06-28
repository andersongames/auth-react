import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";

export default function Footer() {
  return (
    <footer className="w-full border-t transition-colors border-gray-200 dark:border-gray-800 py-4 px-6 text-sm text-gray-600 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p>Built for demo purposes – 2025</p>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/andersongames/auth-react"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <GitHubIcon />
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/anderson-games-540216170/?locale=en_US"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          <LinkedInIcon />
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
