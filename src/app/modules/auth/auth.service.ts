import prisma from "../../../db/db.config";
import AppError from "../../errors/AppError";
import { generateToken } from "../../utils/generateToken";
import { TAuthLogin } from "./auth.interface";
import bcrypt from "bcryptjs";
import { verifyToken } from "../../utils/verifyToken";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

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

export const AuthServices = {
  login,
  refreshToken,
};
