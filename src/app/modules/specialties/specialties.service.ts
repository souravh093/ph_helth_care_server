import { Specialties } from "@prisma/client";
import prisma from "../../../db/db.config";

const createSpecialtyIntoDB = async (payload: Specialties) => {
    return await prisma.specialties.create({
        data: payload,
    });
}

const getSpecialtiesFromDB = async () => {
    return await prisma.specialties.findMany();
}

const getSpecialtyByIdFromDB = async (id: string) => {
    return await prisma.specialties.findUnique({
        where: {
            id
        }
    });
}

const updateSpecialtyByIdIntoDB = async (id: string, payload: Specialties) => {
    return await prisma.specialties.update({
        where: {
            id
        },
        data: payload
    });
}

const deleteSpecialtyByIdFromDB = async (id: string) => {
    return await prisma.specialties.delete({
        where: {
            id
        }
    });
}

export const specialtiesService = {
    createSpecialtyIntoDB,
    getSpecialtiesFromDB,
    getSpecialtyByIdFromDB,
    updateSpecialtyByIdIntoDB,
    deleteSpecialtyByIdFromDB
}