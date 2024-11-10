import { z } from "zod";

const adminValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }).optional(),
    contactNumber: z
      .string({ required_error: "Contact number is required" })
      .optional(),
  }),
});

export const AdminValidations = {
  adminValidationSchema,
};
