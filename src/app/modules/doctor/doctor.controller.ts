import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { DoctorServices } from "./doctor.service";

const getDoctors = catchAsync(async (req, res) => {
  const { meta, result } = await DoctorServices.getDoctors(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctors fetched successfully",
    meta: meta,
    data: result,
  });
});

const getDoctorById = catchAsync(async (req, res) => {
  const doctor = await DoctorServices.getDoctorById(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor fetched successfully",
    data: doctor,
  });
});

const updateDoctor = catchAsync(async (req, res) => {
  const doctor = await DoctorServices.updateDoctor(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor updated successfully",
    data: doctor,
  });
});

const deleteDoctor = catchAsync(async (req, res) => {
  await DoctorServices.deleteDoctor(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Doctor deleted successfully",
  });
});

export const DoctorController = {
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};