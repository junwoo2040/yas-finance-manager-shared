import { z } from "zod";
import { Pagination } from "./utils.model";

export const User = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  school: z.string().nullable(),
  isAdmin: z.boolean(),
  createdAt: z.coerce.date(),
});

export type IUser = z.infer<typeof User>;

export const Login = z.object({
  username: z.string().min(1, "This field is required"),
  password: z.string().min(1, "This field is required"),
});

export type ILogin = z.infer<typeof Login>;

export const CreateAccountRequestInput = z
  .object({
    firstName: z
      .string()
      .min(1, "This field is required")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(1, "This field is required")
      .max(50, "Last name must be less than 50 characters"),
    username: z
      .string()
      .min(1, "This field is required")
      .min(6, "Username must be between 6 to 20 characters")
      .max(20, "Username must be between 6 to 20 characters"),
    email: z.string().email().min(1, "This field is required").max(60),
    school: z
      .string()
      .min(0)
      .max(100, "School name must be less than 100 characters")
      .nullable(),
    password: z
      .string()
      .min(1, "This field is required")
      .min(8, "Password must be at least 8 characters")
      .regex(
        /(?=.*[!@#$%^&*])/,
        "Password must contain at least one special character",
      )
      .regex(
        /(?=.*[a-z])/,
        "Password must contain at least one lowercase letter",
      )
      .regex(
        /(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter",
      )
      .regex(/^(?=[^\s])/, "Password must not contain any spaces"),
    confirmPassword: z.string().min(1, "This field is required"),
  })
  .refine((schema) => schema.password === schema.confirmPassword, {
    message: "Password must match",
    path: ["confirmPassword"],
  });

export type ICreateAccountRequestInput = z.infer<
  typeof CreateAccountRequestInput
>;

export const AcceptAccountRequestInput = z.object({
  id: z.string().uuid(),
});

export type IAcceptAccountRequestInput = z.infer<
  typeof AcceptAccountRequestInput
>;

export const DenyAccountRequestInput = z.object({
  id: z.string().uuid(),
});

export type IDenyAccountRequestInput = z.infer<typeof DenyAccountRequestInput>;

export const AccountRequest = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  password: z.string(),
  school: z.string().nullable(),
  createdAt: z.coerce.date(),
});

export type IAccountRequest = z.infer<typeof AccountRequest>;

export const PaginatedAccountRequests = z.object({
  data: AccountRequest.array(),
  pagination: Pagination,
});

export type IPaginatedAccountRequests = z.infer<
  typeof PaginatedAccountRequests
>;
