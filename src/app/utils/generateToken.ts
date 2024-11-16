import jwt, { Secret } from "jsonwebtoken";

type TGenerateToken = {
  payload: {
    email: string;
    role: string;
    id: string;
  };
  secret: Secret;
  expiresIn: string | number;
};

export const generateToken = ({
  payload,
  secret,
  expiresIn,
}: TGenerateToken) => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn: expiresIn,
  });
};
