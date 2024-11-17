import catchAsync from "../../utils/catchAsync";
import { uploadCloudinary } from "../../utils/fileUploder";
import sendResponse from "../../utils/sendResponse";
import { UsersServices } from "./user.service";

const createAdmin = catchAsync(async (req, res) => {
  let userData = JSON.parse(req.body.data);

  if (req.file) {
    const uploadFile = (await uploadCloudinary(req.file)) as {
      secure_url: string;
    };
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

export const UserController = {
  createAdmin,
};
