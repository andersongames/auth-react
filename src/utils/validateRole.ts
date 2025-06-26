import { ROLES } from "../constants/roles";
import type { Role } from "../constants/roles";

export function isValidRole(value: string): value is Role {
  return (Object.values(ROLES) as Role[]).includes(value as Role);
}
