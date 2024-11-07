import { pick } from "../../../shared/pick";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminFilterableField, optionsFilter } from "./admin.constant";
import { AdminServices } from "./admin.service";

const getAdmins = catchAsync(async (req, res) => {
  const finalObj = pick(req.query, adminFilterableField);
  const options = pick(req.query, optionsFilter);

  const { data, meta } = await AdminServices.getAdminsIntoDB(finalObj, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data fetched",
    meta,
    data,
  });
});

const getById = catchAsync(async (req, res) => {
  const result = await AdminServices.getByIdFromDB(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data fetched",
    data: result,
  });
});

const updateById = catchAsync(async (req, res) => {
  const result = await AdminServices.updateByIdInDB(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data updated",
    data: result,
  });
});

export const AdminController = {
  getAdmins,
  getById,
  updateById,
};
