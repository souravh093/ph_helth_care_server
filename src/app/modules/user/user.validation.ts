import { Gender } from "@prisma/client";
import { z } from "zod";

const createDoctorValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: "Password is Required" })
      .min(6)
      .max(255),
    doctor: z.object({
      name: z.string({ required_error: "Name is Required" }),
      email: z.string({ required_error: "Email is Required" }).email(),
      contactNumber: z.string({ required_error: "Contact Number is Required" }),
      address: z.string({ required_error: "Address is Required" }).optional(),
      registrationNumber: z.string({
        required_error: "Registration Number is Required",
      }),
      experience: z
        .number({ required_error: "Experience is Required" })
        .optional(),
      gender: z.enum([Gender.FEMALE, Gender.MALE]),
      appointmentFee: z.number({
        required_error: "Appointment Fee is Required",
      }),
      qualification: z.string({ required_error: "Qualification is Required" }),
      currentWorkingPlace: z.string({
        required_error: "Current Working Place is Required",
      }),
      designation: z.string({ required_error: "Designation is Required" }),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

const createPatientValidationSchema = z.object({
  body: z.object({
    password: z
      .string({ required_error: "Password is Required" })
      .min(6)
      .max(255),
    patient: z.object({
      name: z.string({ required_error: "Name is Required" }),
      email: z.string({ required_error: "Email is Required" }).email(),
      contactNumber: z.string({ required_error: "Contact Number is Required" }),
      address: z.string({ required_error: "Address is Required" }).optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

export const UserValidation = {
  createDoctorValidationSchema,
  createPatientValidationSchema,
};
