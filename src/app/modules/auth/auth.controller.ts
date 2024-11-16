import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const { accessToken, needPasswordChange, refreshToken } =
    await AuthServices.login(req.body);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login Successfully",
    data: { accessToken, needPasswordChange },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login Successfully",
    data: result,
  });
});

const changedPassword = catchAsync(async (req, res) => {
  const {email} = req.user;
  const result = await AuthServices.changePassword(email, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result
  })
})

export const AuthController = {
  loginUser,
  refreshToken,
  changedPassword,
};
