import config from "../../config";
import prisma from "../../db/db.config";
import AppError from "../errors/AppError";
import { TRole } from "../types/role.interface";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

const auth = (...roles: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (!bearerToken) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    const token = bearerToken.split(" ")[1];

    const decodedToken = jwt.verify(
      token,
      config.jwtAccessSecret as Secret
    ) as JwtPayload;

    const { role, email } = decodedToken;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError(404, "User not found");
    }

    if (roles && !roles.includes(role)) {
      throw new AppError(403, "You are not authorized to access this route");
    }

    req.user = decodedToken as JwtPayload;

    next();
  });
};

export default auth;
