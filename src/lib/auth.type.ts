import { z } from "zod";

export type Role = "ADMIN" | "USER";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

export const loginInputSchema = z.object({
  email: z.string().min(1, "Required").email({ message: "Invalid email" }),
  password: z.string().min(5, "Required"),
});

export const registerInputSchema = z.object({
  email: z.string().min(1, "Required").email({ message: "Invalid email" }),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  password: z.string().min(5, "Must be longer than 5 length"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export type RegisterInput = z.infer<typeof registerInputSchema>;
