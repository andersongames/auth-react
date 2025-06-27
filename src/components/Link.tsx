import { Link as RouterLink } from "react-router-dom";

interface AppLinkProps extends React.ComponentProps<typeof RouterLink> {
  className?: string;
}

export default function Link({ to, children, className = "", ...rest }: AppLinkProps) {
  return (
    <RouterLink
      to={to}
      className={`font-medium text-blue-600 underline hover:text-blue-700 transition-colors ${className}`}
      {...rest}
    >
      {children}
    </RouterLink>
  );
}
