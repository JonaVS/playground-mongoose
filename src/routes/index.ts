import { Router } from "express";
import todoRouter from "./todoRoutes.js";
import tagRouter from "./tagRoutes.js";

const router = Router();

router.use("/todo", todoRouter);
router.use("/tag", tagRouter )

export default router;
