import { Router } from "express";
import { specialtiesController } from "./specialties.controller";
import { upload } from "../../utils/fileUploder";
import auth from "../../middlewares/auth";
import validationRequest from "../../middlewares/validationRequest";
import { specialtiesValidation } from "./specialties.valiation";

const router = Router();

router.get("/", specialtiesController.getSpecialties);
router.post(
  "/",
//   auth("ADMIN", "SUPER_ADMIN", "DOCTOR"),
//   validationRequest(specialtiesValidation.createSpecialtyValidation),
  upload.single("file"),
  specialtiesController.createSpecialty
);

router.delete("/:id", specialtiesController.deleteSpecialty);

export const SpecialtiesRoutes = router;
