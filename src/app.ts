import express, { Application, Request, Response } from "express"
import cors from "cors";

const app: Application = express();

// middlewares
app.use(cors());


app.get("/", (req: Request, res: Response) => {
    res.json({
        message: "PH HEATH CARE SERVER RUNNING 😎"
    })
})

export default app;