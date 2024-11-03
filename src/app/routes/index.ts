import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";

const router = Router();

const modulesRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
];

modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
