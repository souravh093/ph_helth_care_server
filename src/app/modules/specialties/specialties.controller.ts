import { TCloudinaryResponse } from "../../types/file";
import catchAsync from "../../utils/catchAsync";
import { uploadCloudinary } from "../../utils/fileUploder";
import sendResponse from "../../utils/sendResponse";
import { specialtiesService } from "./specialties.service";

const createSpecialty = catchAsync(async (req, res) => {
  let specialtiesData = JSON.parse(req.body.data);

  if (req.file) {
    const uploadFile = (await uploadCloudinary(
      req.file
    )) as TCloudinaryResponse;
    specialtiesData.icon = uploadFile.secure_url;
  }

  const result = await specialtiesService.createSpecialtyIntoDB(
    specialtiesData
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Specialty created successfully",
    data: result,
  });
});

const getSpecialties = catchAsync(async (req, res) => {
  const result = await specialtiesService.getSpecialtiesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialties fetched successfully",
    data: result,
  });
});

const deleteSpecialty = catchAsync(async (req, res) => {
  const { id } = req.params;

  await specialtiesService.deleteSpecialtyByIdFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Specialty deleted successfully",
  });
});

export const specialtiesController = {
  createSpecialty,
  getSpecialties,
  deleteSpecialty,
};
