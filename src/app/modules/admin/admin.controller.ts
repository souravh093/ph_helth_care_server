import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const getAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAdminsIntoDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data fetched",
    data: result,
  });
});

export const AdminController = {
    getAdmins,
}
