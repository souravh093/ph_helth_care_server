import { Admin, Doctor, Patient, Prisma, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../../db/db.config";
import bcrypt from "bcryptjs";
import {
  TAdminUser,
  TDoctorUser,
  TPatientUser,
} from "../../types/admin.inteface";
import { TAdminOptionsRequest } from "../../interfaces/pagination";
import { calculatePagination } from "../../utils/paginationHelper";
import { userSearchableFields } from "./user.constant";
import { JwtPayload } from "jsonwebtoken";

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

const getAllFromDB = async (query: any, options: TAdminOptionsRequest) => {
  const { searchTerm, ...filterData } = query as { [key: string]: any };
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
  // learn query handler
  const andConditions: Prisma.UserWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: userSearchableFields.map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: filterData[key],
        },
      })),
    });
  }

  const whereClause: Prisma.UserWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};
  const result = await prisma.user.findMany({
    where: whereClause,
    skip,
    take: limit,
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      needPasswordChange: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      patient: true,
      doctor: true,
    },
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.user.count({ where: whereClause });

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const changeStatus = async (id: string, payload: { status: UserStatus }) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: payload.status,
    },
  });

  return result;
};

const getMyProfile = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
      status: UserStatus.ACTIVE,
    },
    select: {
      id: true,
      email: true,
      role: true,
      status: true,
      needPasswordChange: true,
      createdAt: true,
      updatedAt: true,
      admin: true,
      doctor: true,
      patient: true,
    },
  });

  return result;
};

const updateMyProfile = async (user: JwtPayload, payload: Admin | Doctor | Patient) => {
  const result = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      [user.role.toLowerCase()]: {
        update: payload,
      },
    },
    include: {
      admin: true,
      doctor: true,
      patient: true,
    },
  });

  return result;
}

export const UsersServices = {
  createAdminIntoDB,
  createDoctorIntoDB,
  createPatientIntoDB,
  getAllFromDB,
  changeStatus,
  getMyProfile,
  updateMyProfile,
};
