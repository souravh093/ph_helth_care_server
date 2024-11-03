import express, { Application, Request, Response } from "express";
import cors from "cors";
import notFoundRoute from "./app/middlewares/notFoundRoutes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";

const app: Application = express();

// middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin", "Accept"],
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// global route
app.use("/api/v1", router);

// error handle
app.use(notFoundRoute);
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "PH HEATH CARE SERVER RUNNING 😎",
  });
});

export default app;
