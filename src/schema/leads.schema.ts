import { z } from "zod";

export const leadSchema = (mode: string) =>
  z.object({
    contactPerson: z.string().trim().min(1, "Contact person is required"),

    organization: z.string().trim().min(1, "Organization is required"),

    title: z.string().trim().min(1, "Title is required"),

    label: z.string().trim().optional(),
    value: z.string().trim().optional(),
    currency: z.string(),
    owner: z.string().trim().min(1, "Owner is required"),

    closeDate: z.string().optional(),

    sourceChannel: z.string().optional(),

    sourceChannelId: z.string().optional(),

    phone: z.array(
      z.object({
        value: z
          .string()
          .trim()
          .regex(/^\d*$/, "Phone number must contain only digits")
          .refine(
            (val) => val === "" || val.length >= 10,
            "Phone number must be at least 10 digits",
          )
          .refine(
            (val) => val === "" || val.length <= 15,
            "Phone number cannot exceed 15 digits",
          ),
        type: z.string(),
      }),
    ),

    email: z.array(
      z.object({
        value: z.string().trim().email("Invalid email address"),
        type: z.string(),
      }),
    ),
    address: z
      .string()
      .trim()
      .max(300, "Address cannot exceed 300 characters")
      .optional(),
  });
