import { Admin, Prisma, UserStatus } from "@prisma/client";
import prisma from "../../../db/db.config";
import { searchFields } from "./admin.constant";
import { calculatePagination } from "../../utils/paginationHelper";
import { TAdminFilterRequest } from "./admin.interface";
import { TAdminOptionsRequest } from "../../interfaces/pagination";

const getAdminsIntoDB = async (
  query: TAdminFilterRequest,
  options: TAdminOptionsRequest
) => {
  const { searchTerm, ...filterData } = query as { [key: string]: any };
  const { limit, page, skip, sortBy, sortOrder } = calculatePagination(options);
  // learn query handler
  const andConditions: Prisma.AdminWhereInput[] = [];

  if (query.searchTerm) {
    andConditions.push({
      OR: searchFields.map((field) => ({
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

  andConditions.push({
    isDeleted: false,
  });

  //   if (query.searchTerm) {
  //     andConditions.push({
  //       OR: [
  //         {
  //           name: {
  //             contains: query.searchTerm,
  //             mode: "insensitive", // Learn
  //           },
  //         },
  //         {
  //           email: {
  //             contains: query.searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //       ],
  //     });
  //   }

  const whereClause: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereClause,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.admin.count({ where: whereClause });

  return {
    data: result,
    meta: {
      page,
      limit,
      total,
    },
  };
};

const getByIdFromDB = async (id: string): Promise<Admin | null> => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

const updateByIdInDB = async (id: string, payload: Admin): Promise<Admin | null> => {
  const isAdminExist = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  if (!isAdminExist) {
    throw new Error("Admin not found");
  }

  const updatedAdmin = await prisma.admin.update({
    where: {
      id,
      isDeleted: false,
    },
    data: payload,
  });

  return updatedAdmin;
};

const deleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (prisma) => {
    const adminDeletedData = await prisma.admin.delete({
      where: {
        id,
      },
    });

    await prisma.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });

    return adminDeletedData;
  });

  return result;
};

const softDeleteFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (prisma) => {
    const adminDeletedData = await prisma.admin.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    await prisma.user.update({
      where: {
        email: adminDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeletedData;
  });

  return result;
};

export const AdminServices = {
  getAdminsIntoDB,
  getByIdFromDB,
  updateByIdInDB,
  deleteFromDB,
  softDeleteFromDB,
};
