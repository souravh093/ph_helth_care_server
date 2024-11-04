import { Prisma } from "@prisma/client";
import prisma from "../../../db/db.config";

const getAdminsIntoDB = async (query: Record<string, any>) => {
    const {searchTerm, ...filterData} = query
  // learn query handler
  const andConditions: Prisma.AdminWhereInput[] = [];
  const searchFields = ["name", "email"];

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

  if(Object.keys(filterData).length > 0) {
    andConditions.push({
        AND: Object.keys(filterData).map((key) => ({
            [key]: {
                equals: filterData[key] 
            }
        }))
    })
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
  });

  return result;
};

export const AdminServices = {
  getAdminsIntoDB,
};
