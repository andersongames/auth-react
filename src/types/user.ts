import type { Role } from "../constants/roles";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
}
