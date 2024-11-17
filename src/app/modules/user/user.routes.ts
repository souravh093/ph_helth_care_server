import { Router } from "express";
import { UserController } from "./user.controller";
import auth from "../../middlewares/auth";
import { upload } from "../../utils/fileUploder";

const router = Router();

router.post(
  "/",
  auth("ADMIN", "SUPER_ADMIN"),
  upload.single("file"),
  UserController.createAdmin
);

export const UserRoutes = router;
