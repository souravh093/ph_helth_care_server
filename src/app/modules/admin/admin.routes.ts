import { Router } from "express";
import { AdminController } from "./admin.controller";
import validationRequest from "../../middlewares/validationRequest";
import { AdminValidations } from "./admin.validation";

const router = Router();

router.get("/", AdminController.getAdmins);
router.get("/:id", AdminController.getById);
router.patch(
  "/:id",
  validationRequest(AdminValidations.adminValidationSchema),
  AdminController.updateById
);
router.delete("/:id", AdminController.deleteAdmin);
router.delete("/soft/:id", AdminController.softDeleteAdmin);

export const AdminRoutes = router;
