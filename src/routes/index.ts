import { Router } from "express";
import todoRouter from "./todoRoutes.js";

const router = Router();

router.use("/todo", todoRouter);

export default router;
