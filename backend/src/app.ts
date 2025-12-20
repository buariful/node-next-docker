/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.route";
import cors from "cors";
const app: Application = express();

//parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cors
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Docker!!! ",
  });
});

//throwing an error
app.get("/error", (req, res) => {
  throw new Error("This is a forced error");
});

// custom routes
app.use("/user", UserRoutes);

//error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    message: err.message,
  });
});

//Not Found
app.use((req: Request, res: Response) => {
  res.status(404).json({
    message: "Not Found",
  });
});

export default app;
