import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/fileUploder";
import validationRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.post(
  "/create-admin",
  auth("ADMIN", "SUPER_ADMIN"),
  upload.single("file"),
  UserController.createAdmin
);

router.post(
  "/create-doctor",
  auth("ADMIN", "SUPER_ADMIN"),
  upload.single("file"),
  UserController.createDoctor
);

router.post(
  "/create-patient",
  upload.single("file"),
  UserController.createPatient
);

export const UserRoutes = router;
