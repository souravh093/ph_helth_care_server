import { pick } from "../../../shared/pick";
import { TCloudinaryResponse } from "../../types/file";
import catchAsync from "../../utils/catchAsync";
import { uploadCloudinary } from "../../utils/fileUploder";
import sendResponse from "../../utils/sendResponse";
import { optionsFilter } from "../admin/admin.constant";
import { userFilterableFields } from "./user.constant";
import { UsersServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  let userData = JSON.parse(req.body.data);

  if (req.file) {
    const uploadFile = (await uploadCloudinary(
      req.file
    )) as TCloudinaryResponse;
    userData.admin.profilePhoto = uploadFile.secure_url;
  }

  const result = await UsersServices.createAdminIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin signup successfully",
    data: result,
  });
});

const createDoctor = catchAsync(async (req, res) => {
  let userData = JSON.parse(req.body.data);

  if (req.file) {
    const uploadFile = (await uploadCloudinary(
      req.file
    )) as TCloudinaryResponse;
    userData.doctor.profilePhoto = uploadFile.secure_url;
  }

  const result = await UsersServices.createDoctorIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Doctor signup successfully",
    data: result,
  });
});

const createPatient = catchAsync(async (req, res) => {
  let userData = JSON.parse(req.body.data);

  if (req.file) {
    const uploadFile = (await uploadCloudinary(
      req.file
    )) as TCloudinaryResponse;
    userData.patient.profilePhoto = uploadFile.secure_url;
  }

  const result = await UsersServices.createPatientIntoDB(userData);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Patient signup successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const finalObj = pick(req.query, userFilterableFields);
  const options = pick(req.query, optionsFilter);

  const { data, meta } = await UsersServices.getAllFromDB(finalObj, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users data fetched",
    meta,
    data,
  });
});

const changeProfileStatus = catchAsync(async (req, res) => {
  const result = await UsersServices.changeStatus(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users Profile update data fetched",
    data: result,
  });
});

export const UserController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUsers,
  changeProfileStatus,
};
