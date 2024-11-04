import { UserRole } from "@prisma/client";
import prisma from "../../../db/db.config";
import bcrypt from "bcryptjs";

const createAdminIntoDB = async (payload: any) => {
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

export const UsersServices = {
  createAdminIntoDB,
};
