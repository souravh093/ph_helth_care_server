import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/fileUploder";
import validationRequest from "../../middlewares/validationRequest";
import { UserValidation } from "./user.validation";

const router = Router();

router.get("/", auth("ADMIN", "SUPER_ADMIN"), UserController.getAllUsers);
router.get(
  "/me",
  auth("ADMIN", "DOCTOR", "SUPER_ADMIN", "USER"),
  UserController.getMyProfile
);

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

router.patch(
  "/:id/status",
  auth("SUPER_ADMIN", "ADMIN"),
  UserController.changeProfileStatus
);

router.put(
  "/me",
  auth("SUPER_ADMIN", "ADMIN", "DOCTOR", "PATIENT"),
  upload.single("file"),
  UserController.updateMyProfile
);

export const UserRoutes = router;
