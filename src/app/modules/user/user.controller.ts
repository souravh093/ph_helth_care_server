import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UsersServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
    console.log(req.body);
  const result = await UsersServices.createAdminIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Admin signup successfully",
    data: result,
  });
});

export const UserController = {
    createAdmin,
}
