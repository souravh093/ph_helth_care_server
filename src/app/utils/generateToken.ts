import jwt from "jsonwebtoken";

type TGenerateToken = {
  payload: {
    email: string;
    role: string;
    id: string;
  };
  secret: string;
  expiresIn: string;
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
