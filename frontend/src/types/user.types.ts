export interface User {
  _id: string;
  userName: string;
  role: string;
  instrument: string;
  createdAt: string;
}

export type UserRole = "admin" | "user" | null;
