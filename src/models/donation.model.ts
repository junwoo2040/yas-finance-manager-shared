import { z } from "zod";
import validator from "validator";
import { User } from "./user.model";
import { Pagination } from "./utils.model";

export const CreateDonationInput = z.object({
  donorName: z.string().min(1, "Donor name is required"),
  donorContact: z
    .string()
    .min(1, "Donor contact is required")
    .email()
    .or(z.string().refine(validator.isMobilePhone)),
  amount: z.coerce.number().gt(0, "Amount must be greater than zero"),
});

export type ICreateDonationInput = z.infer<typeof CreateDonationInput>;

export const DeleteDonationInput = z.object({
  id: z.string().uuid(),
});

export type IDeleteDonationInput = z.infer<typeof DeleteDonationInput>;

export const Donation = z.object({
  id: z.string().uuid(),
  donorName: z.string(),
  donorContact: z
    .string()
    .email()
    .or(z.string().refine(validator.isMobilePhone)),
  amount: z.coerce.number(),
  createdAt: z.coerce.date(),
  author: User.nullable(),
});

export type IDonation = z.infer<typeof Donation>;

export const PaginatedDonations = z.object({
  data: Donation.array(),
  pagination: Pagination,
});

export type IPaginatedDonations = z.infer<typeof PaginatedDonations>;
