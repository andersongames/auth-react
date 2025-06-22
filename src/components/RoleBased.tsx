import { useAuth } from "../context/AuthContext";
import type { Role } from "../constants/roles";

interface RoleBasedProps {
  allowedRoles: Role[]; // ex: ['admin', 'user']
  children: React.ReactNode;
}

export default function RoleBased({ allowedRoles, children }: RoleBasedProps) {
  const { user } = useAuth();

  if (!user || !allowedRoles.includes(user.role as Role)) {
    return null;
  }

  return <>{children}</>;
}
