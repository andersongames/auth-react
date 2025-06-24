export const ROLES = {
  ADMIN: "admin",
  USER: "user",
  EDITOR: "editor",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];