import { z } from "zod";
import validator from "validator";

import { User } from "./user.model";
import { Pagination } from "./utils.model";

export const CreateSalesInput = z.object({
  clientName: z.string(),
  clientContact: z
    .string()
    .email()
    .or(z.string().refine(validator.isMobilePhone)),
  product: z.coerce.string(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  discount: z.coerce.number().nullable(),
});

export type ICreateSalesInput = z.infer<typeof CreateSalesInput>;

export const DeleteSalesInput = z.object({
  id: z.string().uuid(),
});

export type IDeleteSalesInput = z.infer<typeof DeleteSalesInput>;

export const Sales = z.object({
  id: z.string().uuid(),
  clientName: z.string(),
  clientContact: z
    .string()
    .email()
    .or(z.string().refine(validator.isMobilePhone)),
  product: z.coerce.string(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  discount: z.coerce.number().nullable(),
  createdAt: z.coerce.date(),
  author: User.nullable(),
});

export type ISales = z.infer<typeof Sales>;

export const PaginatedSales = z.object({
  data: Sales.array(),
  pagination: Pagination,
});

export type IPaginatedSales = z.infer<typeof PaginatedSales>;
