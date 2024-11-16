import { Router } from "express";
import { AuthController } from "./auth.controller";
import validationRequest from "../../middlewares/validationRequest";
import { AuthValidations } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/login",
  validationRequest(AuthValidations.loginValidationSchema),
  AuthController.loginUser
);

router.post("/refresh-token", AuthController.refreshToken);

router.post(
  "/change-password",
  auth("ADMIN", "DOCTOR", "PATIENT", "SUPER_ADMIN"),
  AuthController.changedPassword
);

export const AuthRoutes = router;
