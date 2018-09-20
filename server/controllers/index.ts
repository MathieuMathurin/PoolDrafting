import { Router } from "express";
import { router as playersController } from "./playersController";
import { router as poolersController } from "./poolersController";
import { router as meController } from "./meController";

export const router = Router();
router.use(playersController);
router.use(poolersController);
router.use(meController);