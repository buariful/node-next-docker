import express, { Request, Response } from "express";
import { UserModel } from "./user.model";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const payload = req.body;

    const result = await UserModel.create(payload);
    return res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await UserModel.find({});
    return res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error?.message,
    });
  }
});

export const UserRoutes = router;
