import { Doctor, Prisma } from "@prisma/client";
import { buildPrismaQuery } from "../../builder/prismaBuilderQuery";
import prisma from "../../../db/db.config";

const getDoctors = async (query: Record<string, any>) => {
  const doctorQuery = buildPrismaQuery<
    Prisma.DoctorWhereInput,
    Prisma.DoctorOrderByWithRelationInput
  >({
    searchFields: ["name", "email"],
    searchTerm: query.searchTerm,
    filter: query.filter && JSON.parse(query.filter),
    orderBy: query.orderBy && JSON.parse(query.orderBy),
    page: query.page,
    limit: query.limit,
  });

  const doctorItems = await prisma.doctor.count({
    where: doctorQuery.where,
  });

  const totalPages = Math.ceil(doctorItems / doctorQuery.take);

  const result = await prisma.doctor.findMany({
    ...doctorQuery,
  });

  return {
    meta: {
      total: doctorItems,
      limit: doctorQuery.take,
      page: totalPages,
    },
    result,
  };
};

const getDoctorById = async (id: string) => {
  return await prisma.doctor.findUnique({
    where: {
      id: id,
    },
  });
};

const updateDoctor = async (id: string, payload: Doctor) => {
  await prisma.doctor.findFirstOrThrow({
    where: {
      id,
    },
  });

  const updatedDoctorData = await prisma.doctor.update({
    where: {
      id,
    },
    data: payload,
  });

  return updatedDoctorData;
};

const deleteDoctor = async (id: string) => {
  return await prisma.doctor.delete({
    where: {
      id: id,
    },
  });
};

export const DoctorServices = {
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
