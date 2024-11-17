import prisma from "../../../db/db.config";
import AppError from "../../errors/AppError";
import { generateToken } from "../../utils/generateToken";
import { TAuthLogin } from "./auth.interface";
import bcrypt from "bcryptjs";
import { verifyToken } from "../../utils/verifyToken";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import { TChangePassword } from "../../types/changePassword.interface";
import { sendEmail } from "../../utils/sendEmail";
import jwt from "jsonwebtoken";

const login = async (payload: TAuthLogin) => {
  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectedPassword = await bcrypt.compare(
    payload.password,
    isExistUser.password
  );

  if (!isCorrectedPassword) {
    throw new AppError(401, "Password not valid");
  }

  const jwtPayload = {
    email: isExistUser.email,
    role: isExistUser.role,
    id: isExistUser.id,
  };

  const accessToken = generateToken({
    payload: jwtPayload,
    secret: config.jwtAccessSecret as Secret,
    expiresIn: "5m",
  });

  const refreshToken = generateToken({
    payload: jwtPayload,
    secret: config.jwtRefreshSecret as Secret,
    expiresIn: "30m",
  });

  return {
    accessToken,
    refreshToken,
    needPasswordChange: isExistUser.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decoded;
  try {
    decoded = verifyToken(token, config.jwtRefreshSecret as Secret);
  } catch (error) {
    throw new AppError(401, "You are not authorized");
  }

  const isExistUser = await prisma.user.findUniqueOrThrow({
    where: {
      email: decoded.email,
      status: UserStatus.ACTIVE,
    },
  });

  const jwtPayload = {
    email: isExistUser.email,
    role: isExistUser.role,
    id: isExistUser.id,
  };

  const accessToken = generateToken({
    payload: jwtPayload,
    secret: config.jwtAccessSecret as Secret,
    expiresIn: "5m",
  });

  return {
    accessToken,
    needPasswordChange: isExistUser.needPasswordChange,
  };
};

const changePassword = async (email: string, payload: TChangePassword) => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isExistUser) {
    throw new AppError(404, "User not found");
  }

  const isPasswordMatch = bcrypt.compareSync(
    payload.oldPassword,
    isExistUser.password
  );

  if (!isPasswordMatch) {
    throw new AppError(401, "Password Not Match");
  }

  const hashPassword = bcrypt.hashSync(payload.newPassword, 10);

  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password: hashPassword,
    },
  });

  return "Password changed successfully";
};

const forgetPassword = async (email: string) => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isExistUser) {
    throw new AppError(404, "Invalid Email");
  }

  const token = generateToken({
    payload: { email: isExistUser.email, id: isExistUser.id },
    secret: config.jwtAccessSecret as Secret,
    expiresIn: "1h",
  });

  const resetLink = `${config.client_url}/reset-password?id=${isExistUser.id}&token=${token}`;

  sendEmail(resetLink, email);

  return "Check your email to reset your password";
};

const resetPassword = async (payload: {
  id: string;
  newPassword: string;
  token: string;
}) => {
  const isExistUser = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!isExistUser) {
    throw new AppError(404, "Invalid Email");
  }

  if (!payload.token) {
    throw new AppError(400, "Token is required");
  }

  const decoded = jwt.verify(
    payload.token,
    config.jwtAccessSecret as Secret
  ) as JwtPayload;

  if (decoded.id !== isExistUser.id) {
    throw new AppError(401, "Invalid token");
  }

  const hashedPassword = bcrypt.hashSync(payload.newPassword, 10);

  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return "Password reset successfully";
};

export const AuthServices = {
  login,
  refreshToken,
  changePassword,
  forgetPassword,
  resetPassword,
};
