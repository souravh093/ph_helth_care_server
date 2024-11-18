import { Gender } from "@prisma/client";

type TAdmin = {
  name: string;
  email: string;
  contactNumber: string;
};

export type TAdminUser = {
  password: string;
  admin: TAdmin;
};

type TDoctor = {
  name: string;
  email: string;
  contactNumber: string;
  address?: string;
  registrationNumber: string;
  experience?: number;
  gender: Gender;
  appointmentFee: number;
  qualification: string;
  currentWorkingPlace: string;
  designation: string;
  isDeleted?: boolean;
};

export type TDoctorUser = {
  password: string;
  doctor: TDoctor;
};