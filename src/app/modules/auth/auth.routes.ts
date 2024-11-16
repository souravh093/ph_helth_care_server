import { Router } from "express";
import { AuthController } from "./auth.controller";
import validationRequest from "../../middlewares/validationRequest";
import { AuthValidations } from "./auth.validation";

const router = Router();

router.post(
  "/login",
  validationRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser
);

router.post(
  "/refresh-token",
  AuthController.refreshToken
);

export const AuthRoutes = router;
