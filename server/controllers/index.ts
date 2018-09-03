import { Router } from "express";
import { router as playersController } from "./playersController";
import { router as poolersController } from "./poolersController";

export const router = Router();
router.use(playersController);
router.use(poolersController);