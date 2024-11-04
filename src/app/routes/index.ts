import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AdminRoutes } from "../modules/admin/admin.routes";

const router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
