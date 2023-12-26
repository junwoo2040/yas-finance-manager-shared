import { z } from "zod";

export const PaginationQuery = z.object({
  page: z.coerce.number().int().positive(),
  limit: z.coerce.number().int().gt(0),
});

export type IPaginationQuery = z.infer<typeof PaginationQuery>;

export const Pagination = z.object({
  recordCount: z.number().int().gte(0),
  pageCount: z.number().int().gte(0),
  currentPage: z.number().int().gte(0),
  limit: z.number().int().positive(),
});

export type IPagination = z.infer<typeof Pagination>;
