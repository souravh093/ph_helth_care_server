import { pick } from "../../../shared/pick";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminFilterableField, optionsFilter } from "./admin.constant";
import { AdminServices } from "./admin.service";

const getAdmins = catchAsync(async (req, res) => {
  const finalObj = pick(req.query, adminFilterableField);
  const options = pick(req.query, optionsFilter)
  
  const result = await AdminServices.getAdminsIntoDB(finalObj, options);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data fetched",
    data: result,
  });
});

export const AdminController = {
  getAdmins,
};
