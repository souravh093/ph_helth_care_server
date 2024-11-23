import { z } from "zod";

const createSpecialtyValidation = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }),
  }),
});

export const specialtiesValidation = {
  createSpecialtyValidation,
};
