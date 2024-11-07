import { Admin, Prisma } from "@prisma/client";
import prisma from "../../../db/db.config";
import { searchFields } from "./admin.constant";
import { calculatePagination } from "../../utils/paginationHelper";

const getAdminsIntoDB = async (
  query: Record<string, any>,
  options: Record<string, any>
) => {
  const { searchTerm, ...filterData } = query;
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

const getByIdFromDB = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
    }
  });

  return result;
}

const updateByIdInDB = async (id: string, payload: Admin) => {
  const isAdminExist = await prisma.admin.findUnique({
    where: {
      id,
    },
  });

  if (!isAdminExist) {
    throw new Error("Admin not found");
  }

  const updatedAdmin = await prisma.admin.update({
    where: {
      id,
    },
    data: payload,
  });


  return updatedAdmin;
}

export const AdminServices = {
  getAdminsIntoDB,
  getByIdFromDB,
  updateByIdInDB,
};
