import { UserRole } from "@prisma/client";
import prisma from "../../../db/db.config";
import bcrypt from "bcryptjs";
import { TAdminUser, TDoctorUser, TPatientUser } from "../../types/admin.inteface";


const createAdminIntoDB = async (payload: TAdminUser) => {
  const hashPassword: string = await bcrypt.hash(payload.password, 10);

  const userData = {
    email: payload.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (prisma) => {
    await prisma.user.create({
      data: userData,
      include: {
        admin: true,
      },
    });

    const createAdmin = await prisma.admin.create({
      data: payload.admin,
    });

    return createAdmin;
  });

  return result;
};

const createDoctorIntoDB = async (payload: TDoctorUser) => {
  const hashPassword: string = await bcrypt.hash(payload.password, 10);

  const userData = {
    email: payload.doctor.email,
    password: hashPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (prisma) => {
    await prisma.user.create({
      data: userData,
      include: {
        doctor: true,
      },
    });

    const createDoctor = await prisma.doctor.create({
      data: payload.doctor,
    });

    return createDoctor;
  });

  return result;
};

const createPatientIntoDB = async (payload: TPatientUser) => {
  const hashPassword: string = await bcrypt.hash(payload.password, 10);

  const userData = {
    email: payload.patient.email,
    password: hashPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (prisma) => {
    await prisma.user.create({
      data: userData,
      include: {
        doctor: true,
      },
    });

    const createPatient = await prisma.patient.create({
      data: payload.patient,
    });

    return createPatient;
  });

  return result;
};

export const UsersServices = {
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
};
