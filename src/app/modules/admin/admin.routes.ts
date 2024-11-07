import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/", AdminController.getAdmins);
router.get("/:id", AdminController.getById);
router.patch("/:id", AdminController.updateById);

export const AdminRoutes = router;
