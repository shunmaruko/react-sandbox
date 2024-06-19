import { z } from "zod";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  role: "ADMIN" | "USER";
};

export type AuthResponse = {
  jwt: string;
  user: User;
};

const loginInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(5, "Required"),
});

const registerInputSchema = z.object({
  email: z.string().min(1, "Required"),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  password: z.string().min(1, "Required"),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export type RegisterInput = z.infer<typeof registerInputSchema>;
